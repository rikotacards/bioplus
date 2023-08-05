import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { User } from "firebase/auth";
const storage = getStorage();

export const claimUsername = async () => {};
interface GetUsernameProps {
  uid: string;
}

export const getUsername = async ({ uid }: GetUsernameProps) => {
  // Used at the start, when user creates username
  // We check if the username exists or not.
  // if no, user can claim the username.
  const usernamesRef = doc(firestore, "usernames", uid);
  const snap = await getDoc(usernamesRef);
  if (snap.exists()) {
    const name = snap.data()
    console.log('username', name)
    return snap.data();
  }
  return undefined;
};

export const getUsernameFromUsers = async ({ uid }: GetUsernameProps) => {
  // Used at the start, when user creates username
  // We check if the username exists or not.
  // if no, user can claim the username.
  const usernamesRef = doc(firestore, "users", uid);
  const snap = await getDoc(usernamesRef);
  if (snap.exists()) {
    const name = snap.data()
    console.log('name', name)
    return snap.data()?.username;
  }
  return undefined;
};

export const getUser = async ({ uid }: GetUsernameProps) => {
  // Used at the start, when user creates username
  // We check if the username exists or not.
  // if no, user can claim the username.
  const usernamesRef = doc(firestore, "users", uid);
  const snap = await getDoc(usernamesRef);
  if (snap.exists()) {
    const name = snap.data()
    console.log('name', name)
    return snap.data() as User
  }
  return {};
};

interface UpdateUsernameProps {
  uid: string;
  username: string;
}

export const getUsernameDetails = async (username: string) => {
  // Checks the usernames collections
  // owner is the uid
  const usernamesRef = doc(firestore, "usernames", username);
  const snap = await getDoc(usernamesRef);
  if (snap.exists()) {
    const data = snap.data();
    return data;
  }
  return undefined;
};

export const addUsername = async ({ uid, username }: UpdateUsernameProps) => {
  // check all usernames
  const lowercase = username.toLowerCase();
  const usernameDetails = await getUsernameDetails(lowercase);
  if (usernameDetails) {
    throw new Error("Username already exists");
  } else {
    await setDoc(doc(firestore, "usernames", lowercase), {
      uid: uid,
    });
    await setDoc(doc(firestore, 'users', uid), {username: lowercase}, {merge: true, mergeFields: ['username']})
  }
};

export const addUserToDb = async ({
  uid,
  photoUrl,
}: {
  uid: string;
  photoUrl: string;
}) => {
  try {
    const userProfileRef = doc(firestore, "users", uid);
    const snap = await getDoc(userProfileRef);
    if (snap.exists()) {
      return;
    } else {
      setDoc(userProfileRef, { uid: uid, photoUrl }, { merge: true });
    }
  } catch (e) {
    throw new Error("Error when adding user");
  }
};

export const getLinksByUid = async ({ uid }: { uid: string }) => {
  const links = await getDocs(collection(firestore, "users", uid, "links"));
  const linksArray = links.docs.map((link) => link.data());
  return linksArray;
};
export const getLinksByUsername = async ({
  username,
}: {
  username: string;
}) => {
  const usernameDetails = await getUsernameDetails(username);
  if (!usernameDetails) {
    throw new Error("No username");
  }
  const uid = usernameDetails?.uid;
  const links = await getDocs(collection(firestore, "users", uid, "links"));
  const res = links.docs.map((doc) => doc.data());
  return res;
};

export const getPublicProfileLinks = async (uid: string) => {
  const snap = await getDoc(doc(firestore, 'users',uid))
  if(snap.exists()){
    return snap.data()
  }
}

export const onLinksChange = (uid: string, setState) => {
  const q = query(
    collection(firestore, "users", uid, "links"),
    orderBy("timeStamp", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const links = [] as any;
    querySnapshot.forEach((doc) => {
      links.push(doc.data());
    });
    setState(links);
  });
};
export const addLink = async ({
  title = "",
  link,
  isDisplayed = true,
  uid,
}: {
  uid: string;
  title?: string;
  link: string;
  isDisplayed?: boolean;
}) => {
  const linkRef = doc(collection(firestore, "users", uid, "links"));
  const linkData = {
    title,
    link,
    isDisplayed,
    uid,
    linkId: linkRef.id,
    clicks: 0,
    timeStamp: serverTimestamp(),
  };
  await setDoc(linkRef, linkData)
  return linkRef.id;
  
};
export const incrementLinkClick = ({uid, linkId}:{uid: string, linkId: string}) => {
  setDoc(doc(firestore, "users", uid, "links", linkId), {clicks: increment(1)}, {merge: true});
}

export const getLinkDetails = async({uid, linkId}: {uid: string, linkId: string}) => {
  try{
    const res = await getDoc(doc(firestore, "users", uid, "links", linkId))
    if(res.exists()){
      return res.data()
    }
  }catch(e){
    throw new Error('couldn get')
  }
}

export const updateLink = async ({
  uid,
  linkId,
  data,
}: {
  linkId: string;
  uid: string;
  title?: string;
  link?: string;
  isDisplayed?: boolean;
  data: { [key: string]: any };
}) => {
  const ref = doc(firestore, "users", uid, "links", linkId);
  await setDoc(ref, data, { merge: true });
};

export const deleteLink = async ({
  uid,
  linkId,
}: {
  uid: string;
  linkId: string;
}) => {
  try {
    await deleteDoc(doc(firestore, "users", uid, "links", linkId));
  } catch (e) {
    throw new Error("Could not delete");
  }
};

export const updateOrdering = async ({
  uid,
  data,
}: {
  uid: string;
  data: { order: string[] };
}) => {
  try {
    setDoc(doc(firestore, "users", uid, "preferences", "order"), data, {
      merge: true,
    });
  } catch (e) {
    console.log(e);
    throw new Error("Could not update positions");
  }
};

export const getOrder = async ({ uid }: { uid: string }) => {
  try {
    const snapShot = await getDoc(
      doc(firestore, "users", uid, "preferences", "order")
    );
    if (snapShot.exists()) {
      return snapShot.data() as any;
    } else {
      return [];
    }
  } catch (e) {
    throw new Error("Could not retrieve ordering");
  }
};

export type Link = { title: string; link: string; linkId: string; isDisplayed: boolean }

export const updateLinksNew = (
  uid: string,
  links: { title: string; link: string; linkId: string; isDisplayed: boolean }[]
) => {
  console.log(links)
  
  setDoc(doc(firestore,'users',uid),{links},{merge: true})
};

export const deleteLinkNew = (uid: string, index: number, links: Link[]) => {
  links.splice(index,1)
  updateLinksNew(uid, links)
}

export const onSnapshotUser = (uid:string, setState: (links: Link[]) => void) => onSnapshot(doc(firestore,'users',uid), (doc) => {
  const data = doc.data() as any || []
  setState(data?.links || []);
})

export const updateBio = ({uid, bio}:{uid: string, bio: string}) => {
  setDoc(doc(firestore,'users',uid), {bio}, {merge: true})
}
export const getBio = async({uid}: {uid: string}) => {
  const usernamesRef = doc(firestore, "users", uid);
  const snap = await getDoc(usernamesRef);
  if(snap.exists()){
    return snap.data().bio
  } return ''
}
export const getImagePath = (imagePath: string) => {
  const pathReference = ref(storage, imagePath);
  return getDownloadURL(pathReference)
    .then((url) => url)
    .catch((e) => {
      return e;
    });
};
export const updateProfileImage = async (
  uid: string,
  localImagePath: string
) => {
  if (!localImagePath) {
    return;
  }
  const storageRef = ref(storage, `${uid}/profieImage/profileImage.jpg`);
  const snapshot = await uploadString(storageRef, localImagePath, "data_url");
  const url = await getImagePath(snapshot.ref.fullPath);
  await setDoc(
    doc(firestore, "users", uid),
    {
      photoUrl: url,
    },
    { merge: true }
  );
};