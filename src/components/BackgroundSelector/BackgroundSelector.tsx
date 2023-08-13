import { Card, Typography } from "@mui/material";
import React from "react";
import { backgrounds } from "../../configs/backgrounds";
import { BackgroundOption } from "../BackgroundOption/BackgroundOption";
import { CustomBackgroundImage } from "../CustomBackgroundImage/CustomBackgroundImage";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { useAuthContext } from "../../providers/AuthProvider";
export const BackgroundSelector: React.FC = () => {
  const auth = useAuthContext();
  const isPremium = auth.user?.isPremium
  return (
    <div style={{marginBottom: '8px'}}>
      <div>
        <Typography sx={{ mb: 1, mt: 1, fontWeight: "bold" }} variant="h5">
          Backgrounds
        </Typography>
      </div>
      <Card elevation={3} sx={{padding:1}}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <CustomBackgroundImage />
        {backgrounds.map((b) => {
          b.isPremium
          return (
            <div key={b.name}>
              <BackgroundOption isLocked={!isPremium} name={b.name} />
            </div>
          );
        })}
      </div>
      <Typography fontWeight={600} variant="h6">Color</Typography>
      <ColorPicker property="backgroundColor" />
      </Card>
    </div>
    
  );
};
