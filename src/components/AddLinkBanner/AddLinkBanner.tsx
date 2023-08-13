import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./AddLinkBanner.css";
import { useNavigate } from "react-router-dom";
export const AddLinkBanner: React.FC = () => {
  const nav = useNavigate();
  return (
    <Card
      className="gradient-box"
      sx={{ mb: 1, borderRadius: "10px", display: "flex" }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Express yourself to the fullest. 
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Share without limits.
        </Typography>
       
        <div>
          <Typography>
            Add your links and share with people across the web.
          </Typography>
        </div>
        <div style={{textAlign: 'center'}}>
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
            onClick={() => {nav('/')}}
          >
            <Typography sx={{fontWeight: 'bold'}}>Sign up </Typography>
          </Button>
            <Typography sx={{fontWeight: 'bold'}}>
              For analytics and all themes, $5.99 / month (limited offer)
            </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
