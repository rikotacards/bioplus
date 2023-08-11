import { Button, Typography } from '@mui/material';
import React from 'react';
import clx from "clsx";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { useUserThemeContext } from '../../providers/UserThemeProvider';
const textAlign = [
  { name: "left", icon: <FormatAlignLeftIcon fontSize="small" /> },
  { name: "center", icon: <FormatAlignCenterIcon /> },
  { name: "right", icon: <FormatAlignRightIcon /> },
];
export const TextAlignmentSelector: React.FC = () => {
  const userTheme = useUserThemeContext();

  const alignmentChange = (alignment: string) => {
    userTheme.setButtonTextAlignment(alignment);
  };
  return (
    <>
    <Typography sx={{ mb: 1, mt: 1, fontWeight: "bold" }} variant="h5">
        Text Alignment
      </Typography>
       <div style={{ display: "flex", justifyContent: "space-between" }}>
       {textAlign.map((alignment) => (
         <Button
           key={alignment.name}
           sx={{ m: 1 }}
           onClick={() => {
             alignmentChange(alignment.name);
           }}
           variant={
             alignment.name === userTheme.buttonTextAlignment ? "contained" : "outlined"
           }
           fullWidth
         >
           {alignment.icon}
         </Button>
       ))}
     </div>
     </>
  )
}