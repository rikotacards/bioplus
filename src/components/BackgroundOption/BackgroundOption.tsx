import React from "react";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { BackgroundName } from "../../configs/backgrounds";
import { BackgroundMapping } from "../../configs/backgroundMapping";
import { Box, Paper, Typography } from "@mui/material";
import "./BackgroundOption.css";
import LockIcon from '@mui/icons-material/Lock';
interface BackgroundOptionsProps {
  name: BackgroundName;
  isSelected?: boolean;
  isLocked: boolean;
}
export const BackgroundOption: React.FC<BackgroundOptionsProps> = ({
  name,
  isLocked
}) => {
  const userTheme = useUserThemeContext();

  const onClick = (styleName: string) => {
    userTheme.setBackgroundClassName(styleName);
  };
  const isSelected = name === userTheme.backgroundClassName;
  const background = <BackgroundMapping backgroundComponentName={name} />;
  return (
    <Box border={isSelected ? 0 : 0} borderRadius={1}>
      <Paper sx={{ zIndex: 0,padding:0.5 }} elevation={isSelected ? 10 : 0}>
        <div className="background-option" onClick={() => onClick(name)}>
          {isLocked && <div style={{display: 'flex', justifyContent:'flex-end', alignItems: 'center', padding: '8px'}}>
            <LockIcon sx={{ marginRight: '4px'}} fontSize="small"/>
            <Typography variant='caption'>Premium</Typography>
          </div>}
          {background}
        </div>
        <div style={{ textAlign: "center" }}>
          <Typography variant="body1">{name}</Typography>
        </div>
      </Paper>
    </Box>
  );
};
