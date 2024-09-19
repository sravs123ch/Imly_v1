// import React, { createContext, useState } from 'react';

// // Create the context
// export const CustomerContext = createContext();

// // Provider component
// export const CustomerProvider = ({ children }) => {
//   const [customerDetails, setCustomerDetails] = useState(null);

//   // Function to fetch customer data by ID
//   const getCustomerById = async (customerId) => {
//     try {
//       const response = await fetch(`https://imlystudios-backend-mqg4.onrender.com/api/getCustomerbyId/${customerId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch customer details');
//       }
//       const data = await response.json();
//       setCustomerDetails(data);  // Set fetched data into the context state
//       return data;
//     } catch (error) {
//       console.error('Error fetching customer details:', error);
//       throw error;
//     }
//   };

//   return (
//     <CustomerContext.Provider value={{ customerDetails, setCustomerDetails, getCustomerById }}>
//       {children}
//     </CustomerContext.Provider>
//   );
// };

import React, { createContext, useState } from 'react';
import {GETALLCUSTOMERSBYID_API} from "../Constants/apiRoutes"
// Create the context
export const CustomerContext = createContext();

// Provider component
export const CustomerProvider = ({ children }) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  // Function to fetch customer data by ID using the JWT token
  const getCustomerById = async (customerId) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('JWT token is missing');
      return;
    }

    try {
      const response = await fetch(
        // `https://imlystudios-backend-mqg4.onrender.com/api/getCustomerbyId/${customerId}`, 
        `${GETALLCUSTOMERSBYID_API}/${customerId}`,
        {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Include the JWT token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer details');
      }

      const data = await response.json();
      console.log('Fetched Customer Details:', data);

      setCustomerDetails(data);  // Set fetched data into the context state
      return data;
    } catch (error) {
      console.error('Error fetching customer details:', error);
      throw error;
    }
  };

  return (
    <CustomerContext.Provider value={{ customerDetails, setCustomerDetails, getCustomerById }}>
      {children}
    </CustomerContext.Provider>
  );
};
