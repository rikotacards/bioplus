import { useRouteError } from "react-router-dom";
import React from 'react';
import { AddLinkWidget } from "../components/AddLinkWidget/AddLinkWidget";

export const ErrorPage: React.FC = ()=> {
  const error = useRouteError() as {statusText: string, message: string}
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>      
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}