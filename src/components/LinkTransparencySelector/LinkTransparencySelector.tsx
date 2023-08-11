import { Switch, Typography } from "@mui/material";
import React from "react";

import { useUserThemeContext } from "../../providers/UserThemeProvider";

export const LinkTransparencySelector: React.FC = () => {
  const userTheme = useUserThemeContext();
  const onClick = () => {
    if (userTheme.buttonTransparency === "transparency-on") {
      userTheme.setButtonTransparency("");
    } else {
      userTheme.setButtonTransparency("transparency-on");
    }
  };
  return (
    <div>
      <div>
        <Typography sx={{ mb: 1, mt: 1, fontWeight: "bold" }} variant="h5">
          Link Transparency
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        <Switch
          checked={userTheme.buttonTransparency === "transparency-on"}
          onChange={onClick}
        />
      </div>
    </div>
  );
};
