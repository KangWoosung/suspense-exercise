import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops! An Error Occurred</h1>
        <h2>Status: {error.status}</h2>
        <h3>{error.statusText}</h3>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>Oops! An Error Occurred</h1>
      <p>
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </p>
      {error instanceof Error && (
        <pre>
          <code>{error.stack}</code>
        </pre>
      )}
    </div>
  );
};

export default ErrorPage;
