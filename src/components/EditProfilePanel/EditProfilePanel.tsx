import {
  Button,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { getBio, getUser, updateBio, updateName, updateProfileImage } from "../../db/api";
import { UploadProfileImage } from "../UploadProfileImage/UploadProfileImage";
export const EditProfilePanel: React.FC = () => {
  const auth = useAuthContext();
  const uid = auth?.user?.uid;
  const [images, setImages] = React.useState([] as any);
  const [localImagePaths, setLocalImagePaths] = React.useState<string[]>([]);
  const [bioText, setBioText] = React.useState("");
  const [name, setName] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);

  const setImagePaths = (localImagePaths: string[]) => {
    setLocalImagePaths((p) => [...p, ...localImagePaths]);
  };
  const onImageChange = (e: any) => {
    console.log(e);
    setImages([...e.target.files]);
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioText(e.target.value);
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSave = () => {
    updateProfileImage(uid || "", localImagePaths[0]);
    setOpen(false);
  };
  React.useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    getUser({ uid })
      .then((res) => {
        console.log("uto", res);
        setUser(res);
        setName(res.name);
      })
      .then(() => setLoading(false));
    getBio({ uid }).then((res) => setBioText(res));
  }, [uid]);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        marginTop: "8px",
      }}
    >
      <div style={{ alignItems: "center", padding: "4px", display: "flex" }}>
        <div
          style={{
            alignItems: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {uid ? (
            <UploadProfileImage
              photoURL={localImagePaths[0] || user.photoURL}
              images={images}
              setImagePaths={setImagePaths}
              onImageChange={onImageChange}
              uid={uid}
            />
          ) : (
            <Skeleton
              variant="circular"
              height={150}
              width={150}
              sx={{ mb: 1 }}
            />
          )}
          {open && (
            <Button sx={{ mt: 1 }} variant="contained" onClick={onSave}>
              Save
            </Button>
          )}
        </div>
      </div>
      <TextField
      sx={{mb:1}}
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ mr: 1 }} position="start">
              <Typography color='gray'>Name:</Typography>
            </InputAdornment>
          ),
        }}
        disabled={!uid}
        value={name}
        rows={1}
        onBlur={() => {
          uid && updateName({ uid, name });
        }}
        onChange={onNameChange}
      />

      <TextField
        disabled
        sx={{ mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ mr: 1 }} position="start">
              <Typography color='gray'>Username:</Typography>
            </InputAdornment>
          ),
        }}
        value={"@" + (user?.username || "username")}
      />
      <TextField
        disabled={!uid}
        value={bioText}
        rows={3}
        multiline
        onBlur={() => {
          uid && updateBio({ uid, bio: bioText });
        }}
        onChange={onChange}
        placeholder="Bio"
      />
    </div>
  );
};
