import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./AppearanceBanner.css";
import { useNavigate } from "react-router-dom";
export const AppearanceBanner: React.FC = () => {
  const nav = useNavigate();
  return (
    <Card
      className="gradient-box"
      sx={{ mb: 1, borderRadius: "10px", display: "flex" }}
    >
      <CardContent sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width:'100%'}}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Unlock full creativity. Own your space.
        </Typography>
       
        <div>
          <Typography>
            Select themes that reflect yourself the best.
          </Typography>
        </div>
        <div style={{textAlign: 'center', width: '100%'}}>
          <Button
          fullWidth
            sx={{
              textTransform: "capitalize",
              display: "flex",
              mt:1,
              mb:1,
              flexDirection: "column",
            }}
            size='large'
            variant="outlined"
            color='inherit'
          >
            <Typography sx={{fontWeight: 'bold'}}>Try Premium free for 7 days</Typography>
          </Button>
            <Typography sx={{fontWeight: 'bold'}}>
              $4.99 / month (limited offer)
            </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
