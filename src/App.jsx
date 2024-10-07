/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";
import WrappedApp from "./WrappedApp";
import Navbar from "./components/Navbar";
import CreateGame from "./pages/CreateGame";
import AllGames from "./pages/AllGames";
import PrivateRoute from "./pages/PrivateRoute"; // Import the PrivateRoute
import { ContractContext } from "./context";
import { useContext } from "react";
import Login from "./components/usable/Login";

import { initGA, logPageView } from "./analytics.js";


const App = () => {
  const { currentAccount } = useContext(ContractContext);

  const logPageViewOnRender = () => {
    logPageView();
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={

          <WrappedApp  logPageView={logPageViewOnRender}  />
          
          } />
        <Route path="/login" element={<Login />} />

        <Route path="/allgames" element={<AllGames />} />
        
        {/* Protected routes */}
        <Route
          path="/creategame"
          element={
            // <PrivateRoute>
              <CreateGame />
            // </PrivateRoute>
          }
        />
        <Route
          path="/livegame"
          element={
            // <PrivateRoute>
              <h1>LiveGame</h1>
            // </PrivateRoute>
          }
        />
        <Route
          path="/livecontext"
          element={
            // <PrivateRoute>
              <h1>LiveContext</h1>
            // </PrivateRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
