import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./SignUpBanner.css";
export const SignUpCard: React.FC = () => {
  return (
    <Card
      className="gradient-box"
      sx={{ mb: 1, borderRadius: "10px", display: "flex" }}
      color="purple"
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Unlock powerful insights
        </Typography>
       
        <div>
          <Typography>
            Find out how your BioUp is performing with a Pro 7-day free
            trial. Cancel anytime.
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
          >
            <Typography sx={{fontWeight: 'bold'}}>Try Premium free for 7 days</Typography>
          </Button>
            <Typography sx={{fontWeight: 'bold'}}>
              $3.99 / month (limited offer)
            </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
