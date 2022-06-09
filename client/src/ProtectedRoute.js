import React, { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const { Auth } = useState(false);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
