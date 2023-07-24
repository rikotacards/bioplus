import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

export const MockTrendline: React.FC = () => {
  return (
    <Card sx={{ width: "200px", height: '100%' }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
      >
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          height={100}
          width={50}
          sx={{}}
        />
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          height={150}
          width={50}
        />
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          height={200}
          width={50}
        />
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          height={250}
          width={50}
        />
      </CardContent>
    </Card>
  );
};
