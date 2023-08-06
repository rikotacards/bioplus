import { Box, Button, Card, Paper, Typography } from "@mui/material";
import React from "react";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import "../../configs/linkStyles.css";
//todo
import clx from "clsx";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
const filled = ["", "br-medium", "br-high"];
const textAlign = [
  { name: "left", icon: <FormatAlignLeftIcon fontSize="small" /> },
  { name: "center", icon: <FormatAlignCenterIcon /> },
  { name: "right", icon: <FormatAlignRightIcon /> },
];
export const BorderRadiusSelector: React.FC = () => {
  const userThemeContext = useUserThemeContext();
  const [selectedAlignment, setAlignment] = React.useState("");
  const [selectedBr, setBr] = React.useState("");
  const alignmentChange = (alignment: string) => {
    setAlignment(alignment);
    userThemeContext.setButtonClassName(alignment);
  };
  const borderRadiusChange = (className: string) => {
    setBr(className);
    userThemeContext.setButtonClassName(className);
  };
  return (
    <div>
      <Typography sx={{ mb: 1, mt: 1, fontWeight: "bold" }} variant="h4">
        Link Style
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {filled.map((borderRadiusClassName) => (
          <Box
            key={borderRadiusClassName}
            sx={{background: 'primary', border: selectedBr === borderRadiusClassName ? 2 : 1 }}
            className={clx("common-link", borderRadiusClassName)}
            onClick={() => borderRadiusChange(borderRadiusClassName)}
          ><Button  sx={{height: '100%'}} fullWidth variant={selectedBr === borderRadiusClassName ? 'contained' : 'outlined'}></Button></Box>
        ))}
      </div>
      <Typography sx={{ mb: 1, mt: 1, fontWeight: "bold" }} variant="h4">
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
              alignment.name === selectedAlignment ? "contained" : "outlined"
            }
            fullWidth
          >
            {alignment.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};
