import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";
import '../Backgrounds/Rainbow.css'
export const MockTrendline: React.FC = () => {
  return (
    <div  style={{ width: "200px", height: '100%' }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
      >
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          height={100}
          width={50}
          sx={{}}
          className={'rainbow'}

        />
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          height={150}
          width={50}
          className={'rainbow'}

        />
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          height={200}
          width={50}
          className={'rainbow'}
        />
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          height={250}
          width={50}
          className={'rainbow'}

        />
      </CardContent>
    </div>
  );
};
