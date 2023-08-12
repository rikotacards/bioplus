import {
  Button,
  Skeleton,
  TextField,
} from "@mui/material";
import React from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { getBio, getUser, updateBio, updateProfileImage } from "../../db/api";
import { UploadProfileImage } from "../UploadProfileImage/UploadProfileImage";
export const EditProfilePanel: React.FC = () => {
  const auth = useAuthContext();
  const uid = auth?.user?.uid;
  const [images, setImages] = React.useState([] as any);
  const [localImagePaths, setLocalImagePaths] = React.useState<string[]>([]);
  const [bioText, setBioText] = React.useState('')
  const [isLoading, setLoading] = React.useState(true);

  const setImagePaths = (localImagePaths: string[]) => {
    setLocalImagePaths((p) => [...p, ...localImagePaths]);
  };
  const onImageChange = (e: any) => {
    console.log(e)
    setImages([...e.target.files]);
    setOpen(true)
  };
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({})
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioText(e.target.value);
  }
  const onSave = () => {
    updateProfileImage(uid|| "", localImagePaths[0]);
    setOpen(false)
  };
  React.useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    getUser({ uid }).then((res) => { console.log('uto', res);setUser(res) }).then(()=> setLoading(false))
    getBio({ uid }).then((res) => setBioText(res))

  }, [uid])
  return (
    <div
      style={{ display: "flex", width: "100%", flexDirection: "column" }}
    >
      <div style={{ alignItems: 'center', padding: '4px', display: "flex" }}>
        <div style={{ alignItems: 'center', width: '100%', display: "flex", flexDirection: "column" }}>
          {uid ? <UploadProfileImage photoUrl={localImagePaths[0] || user.photoUrl} images={images} setImagePaths={setImagePaths} onImageChange={onImageChange} uid={uid} /> : <Skeleton variant="circular" height={150} width={150} sx={{mb:1}} />}
          {open && <Button sx={{mt:1}}  variant='contained' onClick={onSave}>Save</Button>}
        </div>
      </div>
      <TextField disabled sx={{ mb: 1 }} value={'@' + user?.username} />
      <TextField disabled={!uid} value={bioText} rows={3} multiline onBlur={() => { uid && updateBio({ uid, bio: bioText }) }} onChange={onChange} placeholder="Bio" />
    </div>
  );
};
