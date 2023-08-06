import React from "react";
import "./Flux.css";
import "./common.css";
import { getImagePath } from "../../db/api";
import { Box } from "@mui/material";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { useAuthContext } from "../../providers/AuthProvider";
export const CustomImage: React.FC = () => {
  const [imagePath, setImagePath] = React.useState<string|undefined>(undefined);
  const auth = useAuthContext();
  const uid = auth?.user?.uid
  const userTheme = useUserThemeContext();
  console.log('image', userTheme.customBackgroundImageSrc)
  const path = `${uid}/backgroundImage/b.jpg`
  React.useEffect(() => {
    getImagePath(path)
      .then((res) => {console.log('image', res);setImagePath(res)})
      .catch((e) => console.log("loser", e));
  }, [userTheme.customBackgroundImageSrc, imagePath]);

    return (
      <Box
        display={"flex"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="common-background"
      >
        {(imagePath || userTheme.customBackgroundImageSrc) && <img style={{objectFit: 'cover', height: '100%', width: '100%'}} src={ userTheme.customBackgroundImageSrc || imagePath}/>}
      
      </Box>
    );
  
  
};
