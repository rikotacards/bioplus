import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { getImagePath, updateBackgroundImage } from "../../db/api";
import { useAuthContext } from "../../providers/AuthProvider";
import ImageIcon from '@mui/icons-material/Image';
export const CustomBackgroundImage: React.FC = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  const auth = useAuthContext();
  const uid = auth.user?.uid;
  const backgroundImagePath = `${uid}/backgroundImage/b.jpg`
  const [isOpenSave, setOpenSave] = React.useState(false);
  const userTheme = useUserThemeContext();
  const [localImagePath, setLocalImagePath] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if(!uid){
      return;
    }
    getImagePath(backgroundImagePath).then((res) => {
      if(res){
        setLocalImagePath(res)
      }
    }).then(() => setLoading(false))
  },[uid])

  const onSave = () => {
    if(!uid || !localImagePath){
      return;
    }
    updateBackgroundImage({uid, file:localImagePath}).then(() => {
      setOpenSave(false)
    })
  }

  const onClick = () => {
    if (!ref.current) {
      return;
    }
    ref.current.click();
  };
  const containerClick = () => {
    userTheme.setBackgroundClassName('customImage')
    userTheme.setCustomBackgroundImageSrc(localImagePath)
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) {
      return;
    }
    const file = e.target.files?.[0];
    if(!file){
      return;
    }
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onload = (e) => {
      if(!e?.target){
        return;
      }
      setLocalImagePath(() => e.target?.result as string);
      userTheme.setCustomBackgroundImageSrc(localImagePath);
      userTheme.setBackgroundClassName('customImage')
      setOpenSave(true);
    };
  };
  return (
    <div>
      <Box
      onClick={containerClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: "100px",
          overflow: "hidden",
          height: "150px",
          margin:'4px',
          justifyContent: 'center',
          borderRadius: "5px",
        }}
        border={1}
        
      >
       {isOpenSave && <Button onClick={(e) => { e.preventDefault(); onSave()}} sx={{ justifyContent: 'center'}} color='inherit' variant='contained' style={{position:'absolute'}}>
        save?
       </Button>}
       {
        !isLoading && !localImagePath && <ImageIcon/>
       }
       {
        isLoading && <CircularProgress/>
       }
       {!isLoading && localImagePath && <img  style={{objectFit:"cover", height:'100%', width: '100%' }} src={localImagePath} />}
      </Box>
      <input
        accept="image/*"
        type="file"
        ref={ref}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Button
        size="small"
        fullWidth
        sx={{ textTransform: "capitalize" }}
        color="inherit"
        onClick={onClick}
      >
        Choose img
      </Button>
    </div>
  );
};
