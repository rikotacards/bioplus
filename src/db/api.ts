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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { User } from "firebase/auth";
import { getCountry, getState } from "../util/getCountry";
import { UserCustom } from "../providers/AuthProvider";
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
    const name = snap.data();
    console.log("username", name);
    return snap.data();
  }
  return undefined;
};

export const getUsernameFromUid = async ({ uid }: GetUsernameProps) => {
  try {
    const usernamesRef = doc(firestore, "users", uid);
    const snap = await getDoc(usernamesRef);
    if (snap.exists()) {
      console.log(snap.data());
      return snap.data().username;
    }
    return undefined;
  } catch (e) {
    throw e;
  }
  // Used at the start, when user creates username
  // We check if the username exists or not.
  // if no, user can claim the username.
};

export const getUser = async ({ uid }: GetUsernameProps) => {
  // Used at the start, when user creates username
  // We check if the username exists or not.
  // if no, user can claim the username.
  const usernamesRef = doc(firestore, "users", uid);
  const snap = await getDoc(usernamesRef);
  if (snap.exists()) {
    const name = snap.data();
    console.log(name);
    return snap.data() as UserCustom;
  }
  return undefined;
};

interface UpdateUsernameProps {
  uid: string;
  username: string;
}

export const getUidFromUsername = async (username: string) => {
  // used for when accessing profile via path
  // Checks the usernames collections
  // owner is the uid
  try {
    const cleaned = username.toLowerCase();
    console.log("cleaned", cleaned);
    const usernamesRef = doc(firestore, "usernames", cleaned);
    const snap = await getDoc(usernamesRef);
    if (snap.exists()) {
      const data = snap.data();
      return data;
    }
    return undefined;
  } catch (e) {
    throw e;
  }
};

export const addUsername = async ({ uid, username }: UpdateUsernameProps) => {
  // check all usernames
  const lowercase = username.toLowerCase();
  const usernameDetails = await getUidFromUsername(lowercase);
  if (usernameDetails) {
    throw new Error("Username already exists");
  } else {
    await setDoc(doc(firestore, "usernames", lowercase), {
      uid: uid,
    });
    await setDoc(
      doc(firestore, "users", uid),
      { username: lowercase },
      { merge: true, mergeFields: ["username"] }
    );
  }
};

export const addUserToDb = async ({
  uid,
  photoUrl,
}: {
  uid: string;
  photoUrl: string | null;
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
  const usernameDetails = await getUidFromUsername(username);
  if (!usernameDetails) {
    throw new Error("No username");
  }
  const uid = usernameDetails?.uid;
  const links = await getDocs(collection(firestore, "users", uid, "links"));
  const res = links.docs.map((doc) => doc.data());
  return res;
};

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
export type LinkDetails = {
  clicks: number;
  referrer: { [key: string]: number };
  geo: { [key: string]: number };
  link: string;
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
  await setDoc(linkRef, linkData);
  return linkRef.id;
};
export const incrementLinkClick = async ({
  uid,
  linkId,
}: {
  uid: string;
  linkId: string;
}) => {
  try {
    const country = getCountry();
    const state = getState();
    console.log(uid, linkId);
    const res = await setDoc(
      doc(firestore, "users", uid, "links", linkId),
      {
        clicks: increment(1),
        geo: { [country]: increment(1), [state || ""]: increment(1) },
        referrer: { [window?.document?.referrer || "direct"]: increment(1) },
      },
      { merge: true }
    );
    return res;
  } catch (e) {
    console.log("ERR", e);
  }
};

export const getLinkDetails = async ({
  uid,
  linkId,
}: {
  uid: string;
  linkId: string;
}) => {
  try {
    const res = await getDoc(doc(firestore, "users", uid, "links", linkId));
    if (res.exists()) {
      return res.data();
    }
  } catch (e) {
    throw new Error("couldn get");
  }
};

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

export type Link = {
  title: string;
  link: string;
  linkId: string;
  isDisplayed: boolean;
};

export const updateLinksNew = (
  uid: string,
  links: { title: string; link: string; linkId: string; isDisplayed: boolean }[]
) => {
  console.log("UPDATE CALLED", links);

  setDoc(doc(firestore, "users", uid), { links }, { merge: true });
};

export const deleteLinkNew = (uid: string, index: number, links: Link[]) => {
  links.splice(index, 1);
  updateLinksNew(uid, links);
};

export const onSnapshotUser = (
  uid: string,
  setState: (links: Link[]) => void
) =>
  onSnapshot(doc(firestore, "users", uid), (doc) => {
    const data = (doc.data() as any) || [];
    console.log("from snapshot", uid, data);
    setState(data?.links || []);
  });

export const updateBio = ({ uid, bio }: { uid: string; bio: string }) => {
  setDoc(doc(firestore, "users", uid), { bio }, { merge: true });
};
export const getBio = async ({ uid }: { uid: string }) => {
  const usernamesRef = doc(firestore, "users", uid);
  const snap = await getDoc(usernamesRef);
  if (snap.exists()) {
    return snap.data().bio;
  }
  return "";
};
export const getImagePath = (imagePath: string) => {
  const pathReference = ref(storage, imagePath);
  return getDownloadURL(pathReference)
    .then((url) => url)
    .catch((e) => {
      throw e;
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

export const updateTheme = async (uid: string, localImagePath: string) => {
  if (!localImagePath) {
    return;
  }
  const storageRef = ref(storage, `${uid}/backgroundImage/backgroundImage.jpg`);
  const snapshot = await uploadString(storageRef, localImagePath, "data_url");
  const url = await getImagePath(snapshot.ref.fullPath);
  await setDoc(
    doc(firestore, "users", uid),
    {
      theme: { backgroundImage: url },
    },
    { merge: true }
  );
};

export const updateBackgroundImage = async ({
  uid,
  file,
}: {
  uid: string;
  file: string;
}) => {
  const path = `${uid}/backgroundImage/b.jpg`;
  const storageRef = ref(storage, path);
  try {
    await uploadString(storageRef, file, "data_url");
    const downloadUrl = await getImagePath(path);
    console.log(downloadUrl);
    return downloadUrl;
  } catch (e) {
    throw e;
  }
};
export const uploadImage = async ({
  file,
  path,
}: {
  file: string;
  path: string;
}) => {
  const storageRef = ref(storage, path);
  try {
    await uploadString(storageRef, file, "data_url");
    const downloadUrl = await getImagePath(path);
    console.log(downloadUrl);
    return downloadUrl;
  } catch (e) {
    throw e;
  }
};
export const deleteImage = async ({ path }: { path: string }) => {
  const storageRef = ref(storage, path);
  try {
    await deleteObject(storageRef);
  } catch (e) {
    throw e;
  }
};

export type UserTheme = {
  backgroundClassName: string;
  buttonTextAlignment: string;
  buttonTransparency: string;
  buttonClassName: string;
};
export const getTheme = async ({ uid }: { uid: string }) => {
  try {
    const snapshot = await getDoc(doc(firestore, "themes", uid));
    if (snapshot.exists()) {
      return snapshot.data();
    }
  } catch (e) {
    throw e;
  }
};
export const updateUserTheme = async ({
  uid,
  theme,
}: {
  uid: string;
  theme: UserTheme;
}) => {
  // backgroundclassname
  try {
    console.log("update user theme");
    setDoc(doc(firestore, "themes", uid), { theme }, { merge: true });
  } catch (e) {
    throw e;
  }
};
