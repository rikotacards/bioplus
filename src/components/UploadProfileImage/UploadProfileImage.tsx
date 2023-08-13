import React from "react";
import { deleteImage, getImagePath, updateLink, updateUserPhotoURL, uploadImage } from "../../db/api";
import { useAuthContext } from "../../providers/AuthProvider";
import ImageIcon from "@mui/icons-material/Image";
import { Avatar, Box, Button, CircularProgress, Typography } from "@mui/material";
interface LinkThumbnailPanelProps {
  linkId: string | undefined;
}
export const UploadProfileImage: React.FC<LinkThumbnailPanelProps> = ({linkId}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const auth = useAuthContext();
  
  const uid = auth.user?.uid;
  const path = `${uid}/profieImage/profileImage.jpg`;
  const handleClick = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };
  const [localImagePath, setLocalImagePath] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (!uid) {
      setLoading(false);
      console.log('set')
      return;
    }
    getImagePath(path)
      .then((res) => {
        if (res) {
          setLocalImagePath(res);
          setLoading(false)
        } 
        setLoading(false)
      })
      .then(() => setLoading(false)).catch((e) => setLoading(false))
  }, [uid]);
const onDelete = () => {
  setLocalImagePath("")
  deleteImage({path});
}
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) {
      return;
    }
    if (!uid) {
      return;
    }
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (!e?.target) {
        return;
      }
      console.log(e.target.result)
      setLocalImagePath(() => e.target?.result as string);
      uploadImage({ path, file: e.target?.result as string }).then(
        (res) => {
          updateUserPhotoURL({uid, photoURL:res})
          setLoading(false);
        }
      );
    };

  };
  return (
    <div style={{padding: '8px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Avatar
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
       height: '120px',
       width: '120px',
        overflow: "hidden",
        margin: "4px",

        justifyContent: "center",
     
      }}
      src={localImagePath}

    >
     
    </Avatar>
      <input
        accept="image/*"
        type="file"
        ref={ref}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <div>
      </div>
        
    </div>
  );
};
