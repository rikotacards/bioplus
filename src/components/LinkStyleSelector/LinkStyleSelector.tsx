import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import "../../configs/linkStyles.css";
import clx from "clsx";
import { ColorPicker } from "../ColorPicker/ColorPicker";

const borderRadius = ["", "br-medium", "br-high"];
const outlined = [" outlined", "br-medium outlined", "br-high outlined"];


export const BorderRadiusSelector: React.FC = () => {
  const userTheme = useUserThemeContext();

 
  const borderRadiusChange = (className: string) => {
    userTheme.setButtonClassName(className);
  };
  return (
    <div>
      <Typography sx={{ mb: 1, mt: 1, fontWeight: "bold" }} variant="h5">
        Link Style
      </Typography>
      <Typography variant='h6'>Filled</Typography>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {borderRadius.map((borderRadiusClassName) => (
          <Box
            border={
              borderRadiusClassName === userTheme.buttonClassName
                ? 1
                : 0
            }
            borderRadius={1}
            padding={1}
            key={borderRadiusClassName}
            sx={{
              background: "primary",
            }}
            display={'flex'}
            alignItems={'center'}
            onClick={() => borderRadiusChange(borderRadiusClassName)}
            >
            <Button
            className={clx("common-link", borderRadiusClassName)}
              fullWidth
              variant='contained'
            ><div style={{display: 'none'}}>d</div></Button>
          </Box>
        ))}
      </div>
      <Typography variant='h6'>Outlined</Typography>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {outlined.map((borderRadiusClassName) => (
          <Box
            border={
              userTheme.buttonClassName === borderRadiusClassName ? 1 : 0
            }
            borderRadius={1}
            display={'flex'}
            alignContent={'center'}
            padding={1}
            key={borderRadiusClassName}
            >
            <Button
              onClick={() => borderRadiusChange(borderRadiusClassName)}
              className={clx("common-link", borderRadiusClassName)}
              fullWidth
              variant={
               'contained'
              }
            ><div style={{display: 'none'}}>k</div></Button>
          </Box>
        ))}
      </div>
      <Typography variant='h6'>Color</Typography>
      <ColorPicker property="linkBackgroundColor"/>
    </div>
  );
};
