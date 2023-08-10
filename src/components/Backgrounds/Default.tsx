import { Box, Paper } from "@mui/material";
import React from "react";
import './common.css'
export const Default: React.FC = () => {
  return (
    <Box sx={{border:1}} className='common-background'>
      <Paper />
    </Box>
  );
};
