/* eslint-disable react/prop-types */

import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { ContractContext } from "../context";

const PrivateRoute = ({ children }) => {
  const { currentAccount } = useContext(ContractContext);

  // If the user is not logged in, redirect to the login page
  if (!currentAccount) {
    return <Navigate to="/login" />;
  }

  // If logged in, allow access to the route
  return children;
};

export default PrivateRoute;
