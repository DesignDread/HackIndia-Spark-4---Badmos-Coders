import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import GeolocationApproval from "./components/GeoLocation";
import {  Contact, Roadmap, Navbar,  Footer ,  Info , Rules ,UserProfile} from "./components";
import { Loader } from './constants';
import  { useState } from 'react';


const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA4
    ReactGA.initialize('G-P5V0RZMFD0'); 
  }, []);

  useEffect(() => {
    // Log page views on route change
    ReactGA.send('pageview');
  }, [location]);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch or image load
    const timer = setTimeout(() => {
      setLoading(false);  // Set loading to false after data is loaded
    }, 2000); // 2 second delay for demo purposes

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);


return (
  <div>
    {loading ? (
      // Loading spinner or text
      <div className="flex flex-col justify-center items-center h-screen">
        <img src={Loader} alt="Loading" className='h-96 animate-spin ' />
      </div>
    ) : (
          <div className='bg-cover bg-no-repeat bg-center'>
      <div className="relative z-0">
        <div className=" bg-cover bg-no-repeat bg-center">
          <Navbar />
        </div>
        <div className="relative z-0">
        <Contact />
        <Info/>
        <Roadmap/>
        <Rules/>
       {/* <GeolocationApproval/> */}
       <Footer /> 
        </div>
       
      </div>
      {/* <UserProfile/> */}
    </div>
    )}
  </div>
);
};

// const WrappedApp = () => (
//   // <BrowserRouter>
//     <App />
//    {/* </BrowserRouter> */}
// );


export default App;
