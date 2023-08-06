import React from "react";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { BackgroundName } from "../../configs/backgrounds";
import { backgroundMapping } from "../../configs/backgroundMapping";
import { Typography } from "@mui/material";
import "./BackgroundOption.css";
interface BackgroundOptionsProps {
  name: BackgroundName;
  isSelected?: boolean;
}
import ImageIcon from "@mui/icons-material/Image";
export const BackgroundOption: React.FC<BackgroundOptionsProps> = ({
  name,
  isSelected,
}) => {
  const userTheme = useUserThemeContext();

  const onClick = (styleName: string) => {
    userTheme.setBackgroundClassName(styleName);
  };
  const background = backgroundMapping[name];
  return (
    <div
      style={{
        border: isSelected ? "1px solid white" : undefined,
        borderRadius: "5px",
      }}
    >
      <div className="background-option" onClick={() => onClick(name)}>
        {background}
       
      </div>
      <div style={{ textAlign: "center" }}>
        <Typography>{name}</Typography>
      </div>
    </div>
  );
};
