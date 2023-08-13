import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";
import '../Backgrounds/Sunset.css'
const linkStyle = { mb: 1, borderRadius: "10px" }
const links = [1,2,3,5,6] 

export const MockProfileWithBackground: React.FC = () => {
  return (
    <div className={'sunset'} style={{width: '200px', height: '100%'}}>
      <CardContent
        sx={{ display: "flex", alignItems: "center", flexDirection: "column"}}
      >
        <Skeleton
          variant="circular"
          animation="wave"
          height={80}
          width={80}
          sx={{ mb: 1 }}
        />
        {links.map((link) => <Skeleton
          variant="rectangular"
          sx={linkStyle}
          animation="wave"
          height={20}
          width={"100%"}
        />)}
        

        
        
      </CardContent>
    </div>
  );
};
