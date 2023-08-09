import React from "react";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { BackgroundName } from "../../configs/backgrounds";
import { BackgroundMapping } from "../../configs/backgroundMapping";
import { Box, Typography } from "@mui/material";
import "./BackgroundOption.css";
interface BackgroundOptionsProps {
  name: BackgroundName;
  isSelected?: boolean;
}
export const BackgroundOption: React.FC<BackgroundOptionsProps> = ({
  name,
}) => {
  const userTheme = useUserThemeContext();

  const onClick = (styleName: string) => {
    userTheme.setBackgroundClassName(styleName);
  };
  const isSelected = name === userTheme.backgroundClassName
  const background = <BackgroundMapping backgroundComponentName={name}/>
  return (
    <Box
    border={isSelected ? 1 : 0}
      borderRadius={1}
    >
      <div className="background-option" onClick={() => onClick(name)}>
        {background}
       
      </div>
      <div style={{ textAlign: "center" }}>
        <Typography>{name}</Typography>
      </div>
    </Box>
  );
};
