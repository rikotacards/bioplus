import { Typography } from "@mui/material";
import React from "react";
import { backgrounds } from "../../configs/backgrounds";
import { BackgroundOption } from "../BackgroundOption/BackgroundOption";
import { CustomBackgroundImage } from "../CustomBackgroundImage/CustomBackgroundImage";
import { useUserThemeContext } from "../../providers/UserThemeProvider";

export const BackgroundSelector: React.FC = () => {

  const userTheme = useUserThemeContext();
  
  return (
    <div>
      <div>
        <Typography sx={{ mb: 1, mt: 1, fontWeight: "bold" }} variant="h4">
          Background
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        <CustomBackgroundImage/>
        {backgrounds.map((b) => (
          <div
            key={b.name}
          >
            <BackgroundOption name={b.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
