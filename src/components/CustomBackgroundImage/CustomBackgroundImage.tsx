import { Box, Button, CircularProgress, Paper } from "@mui/material";
import React from "react";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { getImagePath, updateBackgroundImage } from "../../db/api";
import { useAuthContext } from "../../providers/AuthProvider";
import ImageIcon from "@mui/icons-material/Image";
export const CustomBackgroundImage: React.FC = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  const auth = useAuthContext();
  const uid = auth.user?.uid;
  const backgroundImagePath = `${uid}/backgroundImage/b.jpg`;
  const userTheme = useUserThemeContext();
  const [localImagePath, setLocalImagePath] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    getImagePath(backgroundImagePath)
      .then((res) => {
        if (res) {
          setLocalImagePath(res);
          setLoading(false)
        }
      })
      .catch(() => setLoading(false));
  }, [uid]);



  const containerClick = () => {
    console.log('containerclick')
    if (!ref.current) {
      return;
    }
    if(userTheme.backgroundClassName!=='customImage'){
      userTheme.setBackgroundClassName('customImage')
      return;
    }
    ref.current.click();
  };
 
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) {
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
      if(!uid){
        return;
      }
      updateBackgroundImage({ uid, file: e.target?.result as string })
      setLocalImagePath(() => e.target?.result as string);
      userTheme.setCustomBackgroundImageSrc(e.target?.result);
      userTheme.setBackgroundClassName("customImage");
    };
  };
  return (
    <Box overflow={'hidden'} borderRadius={2} border={userTheme.backgroundClassName === 'customImage' ? 1 : 0}>
      <Paper elevation={userTheme.backgroundClassName === 'customImage' ? 10 : 0}>
      <Box
        onClick={containerClick}
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          width: "110px",
          overflow: "hidden",
          height: "160px",
          margin: "4px",

          justifyContent: "center",
          borderRadius: "5px",
        }}
        border={1}
      >
        {!isLoading && !localImagePath && <ImageIcon />}
        {isLoading && <CircularProgress />}
        {!isLoading && localImagePath && (
          <img
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            src={localImagePath}
          />
        )}
      </Box>
      <input
        accept="image/*"
        type="file"
        ref={ref}
        disabled={!uid}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Button
        size="small"
        fullWidth
        disabled={!uid}
        sx={{ textTransform: "capitalize" }}
        color="inherit"
      >
        Custom img
      </Button>
      </Paper>
    </Box>
  );
};
