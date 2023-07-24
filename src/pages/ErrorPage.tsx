import React from 'react';
import { TopAppBar } from "../components/TopAppBar/TopAppBar";
import { Card, CardContent } from "@mui/material";

export const ErrorPage: React.FC = ()=> {

  return (
    <div id="error-page">
      <TopAppBar/>
      <Card>
        <CardContent>
          Page does not exist
        </CardContent>
      </Card>
    </div>
  );
}