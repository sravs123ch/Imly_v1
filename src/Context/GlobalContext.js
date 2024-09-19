// // GlobalContext.js

// import React, { createContext, useState, useEffect } from 'react';

// const GlobalContext = createContext();

// const GlobalProvider = ({ children }) => {

//   const [products, setProducts] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch('https://imlystudios-backend-mqg4.onrender.com/api/customers/getAllCustomers');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         // Extract the customers array from the response
//         setCustomers(data.customers || []); // Ensure it's an array
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

    

//     fetchCustomers();
//   }, []);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://imlystudios-backend.onrender.com/api/orders/getAllOrders"
//         );
//         const result = await response.json();
//         setProducts(result.orders || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);


//   return (
//     <GlobalContext.Provider value={{ customers,products, loading, error }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export { GlobalContext, GlobalProvider };


// GlobalContext.js

import React, { createContext, useState, useEffect } from 'react';
import { GETALLCUSTOMERS_API,GET_ALL_ORDERS } from '../../src/Constants/apiRoutes';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     try {
  //       // const response = await fetch('https://imlystudios-backend-mqg4.onrender.com/api/customers/getAllCustomers');
  //       const response = await fetch(`${ GETALLCUSTOMERS_API}`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       // Extract the customers array from the response
  //       setCustomers(data.customers || []); // Ensure it's an array
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCustomers();
  // }, []);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(GETALLCUSTOMERS_API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data.customers || []); // Ensure it's an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCustomers();
  }, []); // Pass dependencies if necessary
  
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch
          // "https://imlystudios-backend-mqg4.onrender.com/api/orders/getAllOrders?page=1&limit=10"
          // GET_ALL_ORDERS
          (GET_ALL_ORDERS, {
            params: {
              page: 1,
              limit: 10,
            },
          });
      
        const result = await response.json();
        console.log('Fetched result:', result);
        // Use result.data instead of result.orders
        setProducts(result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <GlobalContext.Provider value={{ customers,products, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };


// import React, { createContext, useState, useEffect } from 'react';
// import { API_BASE_URL, GET_ALL_CUSTOMERS_ENDPOINT, GET_ALL_ORDERS_ENDPOINT, PAGE_LIMIT } from '../Constants/apiRoutes';
 
// const page = 1;
// const GlobalContext = createContext();
 
// const GlobalProvider = ({ children }) => {
 
//   const [products, setProducts] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch( `${API_BASE_URL}${GET_ALL_CUSTOMERS_ENDPOINT}?page=${page}&limit=${PAGE_LIMIT}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         // Extract the customers array from the response
//         setCustomers(data.customers || []); // Ensure it's an array
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchCustomers();
//   }, []);
 
 
 
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//            `${API_BASE_URL}${GET_ALL_ORDERS_ENDPOINT}?page=${page}&limit=${PAGE_LIMIT}`
//         );
//         const result = await response.json();
//         console.log('Fetched result:', result);
//         // Use result.data instead of result.orders
//         setProducts(result.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
 
//     fetchData();
//   }, []);
 
 
//   return (
//     <GlobalContext.Provider value={{ customers,products, loading, error }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };
 
// export { GlobalContext, GlobalProvider };
 