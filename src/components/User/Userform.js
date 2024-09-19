
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { UserContext } from "../../Context/userContext";
// import { Combobox } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// const genderOptions = [
//   { id: "M", name: "Male" },
//   { id: "F", name: "Female" },
// ];
// const roleOptions = [
//   { id: "1", name: "Admin" },
//   { id: "2", name: "Store User" },
//   { id: "3", name: " Finance" },
//   { id: "4", name: "Production" },
//   { id: "5", name: "Techinical" },
// ];
// const storeNames = [
//   { id: "1", name: "ImlyStudio-Indiranagar" },
//   { id: "2", name: "ImlyStudio-Jakkur" },
//   { id: "3", name: "ImlyStudio-InfantryRoad" },
//   { id: "4", name: "ImlyStudio-HSRLayout" },
//   { id: "5", name: "ImlyStudio-HSRLayout" },
// ];
// function Userform() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { userDetails } = useContext(UserContext);

//   const isEditMode = Boolean(
//     location.state?.userDetails?.user || userDetails?.user
//   );

//   const [formData, setFormData] = useState(
//     location.state?.userDetails || {
//       TenantID: 1,
//       FirstName: "",
//       LastName: "",
//       Email: "",
//       Password: "",
//       PhoneNumber: "",
//       Gender: "",
//       RoleID: "",
//       AddressLine1: "",
//       AddressLine2: "",
//       CityID: "",
//       StateID: "",
//       CountryID: 5,
//       ZipCode: "",
//       ProfileImage: null,
//       Comments: "",
//     }
//   );

//   // useEffect(() => {
//   //   if (isEditMode) {
//   //     const user = location.state?.userDetails?.user || userDetails?.user;
//   //     if (user) {
//   //       setFormData({
//   //         FirstName: user.FirstName || "",
//   //         LastName: user.LastName || "",
//   //         Email: user.Email || "",
//   //         PhoneNumber: user.PhoneNumber || "",
//   //         Gender: user.Gender || "",
//   //         RoleID: user.RoleID || "",
//   //         ProfileImage: null,
//   //         Comments: user.Comments || "",
//   //         UserID: user.UserID || "",
//   //         Password: user.Password || "",
//   //         AddressLine1: user.Address?.AddressLine1 || "",
//   //         AddressLine2: user.Address?.AddressLine2 || "",
//   //         CityID: user.Address?.CityID || "",
//   //         StateID: user.Address?.StateID || "",
//   //         CountryID: user.Address?.CountryID || "",
//   //         ZipCode: user.Address?.ZipCode || "",
//   //       });
//   //     }
//   //   }
//   // }, [isEditMode, location.state?.userDetails?.user, userDetails?.user]);

//   // useEffect(() => {
//   //   if (isEditMode) {
//   //     const user = location.state?.userDetails?.user || userDetails?.user;
  
//   //     // Set user form data
//   //     setFormData({
//   //       FirstName: user.FirstName || "",
//   //       LastName: user.LastName || "",
//   //       Email: user.Email || "",
//   //       PhoneNumber: user.PhoneNumber || "",
//   //       Gender: user.Gender || "",
//   //       RoleID: user.RoleID || "", // Set RoleID
//   //       ProfileImage: null,
//   //       Comments: user.Comments || "",
//   //       UserID: user.UserID || "",
//   //       Password: user.Password || "",
//   //       AddressLine1: user.Address?.AddressLine1 || "",
//   //       AddressLine2: user.Address?.AddressLine2 || "",
//   //       CityID: user.Address?.CityID || "",
//   //       StateID: user.Address?.StateID || "",
//   //       CountryID: user.Address?.CountryID || "",
//   //       ZipCode: user.Address?.ZipCode || "",
//   //     });
  
//   //     // Set the selected gender
//   //     const selectedGender = genderOptions.find(
//   //       (gender) => gender.id === user?.Gender
//   //     );
//   //     setSelectedGender(selectedGender || "");
//   //      // Set the selected role
//   //      const selectedRole = roleOptions.find(
//   //       (role) => role.id === user?.RoleID
//   //     );
//   //     setSelectedRole(selectedRole || null);
  
//   //     // Initialize address form data
//   //     const userAddress = user?.Address;
  
//   //     // Fetch states and cities based on the user's address
//   //     if (userAddress?.CountryID) {
//   //       fetchStatesByCountry(userAddress.CountryID);
//   //     }
//   //     if (userAddress?.StateID) {
//   //       fetchCitiesByState(userAddress.StateID);
//   //     }
  
//   //     // Set the selected country, state, and city
//   //     setSelectedCountry(userAddress?.CountryID || null);
//   //     setSelectedState(userAddress?.StateID || null);
//   //     setSelectedCity(userAddress?.CityID || null);
  
    
//   //   }
//   // }, [
//   //   isEditMode,
//   //   location.state?.userDetails?.user,
//   //   userDetails?.user,
//   //   genderOptions,
//   //   roleOptions,
//   // ]);
  
//   // useEffect(() => {
//   //   if (isEditMode) {
//   //     const user = location.state?.userDetails?.user || userDetails?.user;
  
//   //     // Set user form data
//   //     setFormData({
//   //       FirstName: user.FirstName || "",
//   //       LastName: user.LastName || "",
//   //       Email: user.Email || "",
//   //       PhoneNumber: user.PhoneNumber || "",
//   //       Gender: user.Gender || "",
//   //       RoleID: user.RoleID || "", // Set RoleID
//   //       ProfileImage: null,
//   //       Comments: user.Comments || "",
//   //       UserID: user.UserID || "",
//   //       Password: user.Password || "",
//   //       AddressLine1: user.Address?.AddressLine1 || "",
//   //       AddressLine2: user.Address?.AddressLine2 || "",
//   //       CityID: user.Address?.CityID || "",
//   //       StateID: user.Address?.StateID || "",
//   //       CountryID: user.Address?.CountryID || "",
//   //       ZipCode: user.Address?.ZipCode || "",
//   //     });
  
//   //     // Set the selected gender
//   //     const selectedGender = genderOptions.find(
//   //       (gender) => gender.id === user?.Gender
//   //     );
//   //     setSelectedGender(selectedGender || "");
  
//   //     // Set the selected role
//   //     const selectedRole = roleOptions.find((role) => role.id === user?.RoleID);
//   //     setSelectedRole(selectedRole || null);
  
//   //     // Initialize address form data
//   //     const userAddress = user?.Address;
  
//   //     // Fetch states and cities based on the user's address
//   //     if (userAddress?.CountryID) {
//   //       fetchStatesByCountry(userAddress.CountryID).then(() => {
//   //         // After fetching states, set the selected state
//   //         setSelectedState(userAddress?.StateID || null);
  
//   //         // Fetch cities after states are fetched
//   //         if (userAddress?.StateID) {
//   //           fetchCitiesByState(userAddress.StateID).then(() => {
//   //             // Set the selected city after cities are fetched
//   //             setSelectedCity(userAddress?.CityID || null);
//   //           });
//   //         }
//   //       });
//   //     }
  
//   //     // Set the selected country
//   //     setSelectedCountry(userAddress?.CountryID || null);
//   //   }
//   // }, [
//   //   isEditMode,
//   //   location.state?.userDetails?.user,
//   //   userDetails?.user,
//   //   genderOptions,
//   //   roleOptions,
//   // ]);
//   // useEffect(() => {
//   //   if (isEditMode) {
//   //     const user = location.state?.userDetails?.user || userDetails?.user;
//   // console.log(user);
//   //     // Set user form data
//   //     setFormData({
//   //       FirstName: user.FirstName || "",
//   //       LastName: user.LastName || "",
//   //       Email: user.Email || "",
//   //       PhoneNumber: user.PhoneNumber || "",
//   //       Gender: user.Gender || "",
//   //       RoleID: user.RoleID || "", // Set RoleID
//   //       ProfileImage: null,
//   //       Comments: user.Comments || "",
//   //       UserID: user.UserID || "",
//   //       Password: user.Password || "",
//   //       AddressLine1: user.Address?.AddressLine1 || "",
//   //       AddressLine2: user.Address?.AddressLine2 || "",
//   //       CityID: user.Address?.CityName || "",
//   //       StateID: user.Address?.StateName || "",
//   //       CountryID: user.Address?.CountryName || "",
//   //       ZipCode: user.Address?.ZipCode || "",
//   //     });
  
//   //     // Set the selected gender
//   //     const selectedGender = genderOptions.find(
//   //       (gender) => gender.id === user?.Gender
//   //     );
//   //     setSelectedGender(selectedGender || "");
  
//   //     // Set the selected role
//   //     const selectedRole = roleOptions.find((role) => role.id === user?.RoleID);
//   //     setSelectedRole(selectedRole || null);
  
//   //     // Initialize address form data
//   //     const userAddress = user?.Address;
  
//   //     // Fetch states and cities based on the user's address
//   //     if (userAddress?.CountryID) {
//   //       fetchStatesByCountry(userAddress.CountryID).then(() => {
//   //         // After fetching states, set the selected state
//   //         setSelectedState(userAddress?.StateID || null);
  
//   //         // Fetch cities after states are fetched
//   //         if (userAddress?.StateID) {
//   //           fetchCitiesByState(userAddress.StateID).then(() => {
//   //             // Set the selected city after cities are fetched
//   //             setSelectedCity(userAddress?.CityID || null);
//   //           });
//   //         }
//   //       });
//   //     }
//   //     setSelectedCountry(userAddress?.CountryID || null);
//   //   }
//   // }, [
//   //   isEditMode,
//   //   location.state?.userDetails?.user,
//   //   userDetails?.user,
//   //   genderOptions,
//   //   roleOptions,
//   // ]);

  
//   const [countries, setCountries] = useState([]);
//   const [countryMap, setCountryMap] = useState({});
//   const [states, setStates] = useState([]);
//   const [stateMap, setStateMap] = useState({});
//   const [cities, setCities] = useState([]);
//   const [cityMap, setCityMap] = useState({});

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [query, setQuery] = useState("");

//   // useEffect(() => {
//   //   if (isEditMode) {
//   //     const user = location.state?.userDetails?.user || userDetails?.user;
//   //     console.log("User details in edit mode:", user);
  
//   //     // Set user form data
//   //     setFormData({
//   //       FirstName: user.FirstName || "",
//   //       LastName: user.LastName || "",
//   //       Email: user.Email || "",
//   //       PhoneNumber: user.PhoneNumber || "",
//   //       Gender: user.Gender || "",
//   //       RoleID: user.RoleID || "",
//   //       ProfileImage: null,
//   //       Comments: user.Comments || "",
//   //       UserID: user.UserID || "",
//   //       Password: user.Password || "",
//   //       AddressLine1: user.Address?.AddressLine1 || "",
//   //       AddressLine2: user.Address?.AddressLine2 || "",
//   //       CityID: user.Address?.CityName || "",   
//   //       StateID: user.Address?.StateName || "",
//   //       CountryID: user.Address?.CountryID.CountryName || "", 
//   //       ZipCode: user.Address?.ZipCode || "",
//   //     });
  
//   //     // Set the selected gender
//   //     const selectedGender = genderOptions.find(
//   //       (gender) => gender.id === user?.Gender
//   //     );
//   //     setSelectedGender(selectedGender || "");
  
//   //     // // Set the selected role
//   //     const selectedRole = roleOptions.find((role) => role.id === user?.RoleID);
//   //     setSelectedRole(selectedRole || " ");
    
//   //   setSelectedRole(selectedRole ? selectedRole.name : ""); 
     
//   //     // Initialize address form data
//   //     const userAddress = user?.Address;
//   //     console.log("User address:", userAddress);
  
  
//   //     if (userAddress) {
//   //       // Find the corresponding country, state, and city based on their IDs
//   //       const selectedCountry =
//   //         countries.find((country) => country.CountryID === userAddress.CountryID) || {};
//   //       const selectedState =
//   //         states.find((state) => state.StateID === userAddress.StateID) || {};
//   //       const selectedCity =
//   //         cities.find((city) => city.CityID === userAddress.CityID) || {};
    
//   //       // Populate the form fields with the selected address details
//   //       setFormData((prevState) => ({
//   //         ...prevState,
//   //         AddressID: userAddress.AddressID || 0,
//   //         CustomerID: prevState.CustomerID, // Keep the same customer ID
//   //         AddressLine1: userAddress.AddressLine1 || "",
//   //         AddressLine2: userAddress.AddressLine2 || "",
//   //         CityID: userAddress.CityID || "",
//   //         StateID: userAddress.StateID || "",
//   //         CountryID: userAddress.CountryID || "",
//   //         ZipCode: userAddress.ZipCode || "",
        
//   //       }));
    
//   //       // Set the country, state, and city dropdowns
//   //       setSelectedCountry(selectedCountry);
//   //       setSelectedState(selectedState);
//   //       setSelectedCity(selectedCity);
    
//   //       // Fetch states and cities based on the selected address
//   //       if (userAddress.CountryID) {
//   //         fetchStatesByCountry(userAddress.CountryID);
//   //       }
//   //       if (userAddress.StateID) {
//   //         fetchCitiesByState(userAddress.StateID);
//   //       }
    
//   //       console.log("Editing Address Data:", userAddress);
//   //     } else {
//   //       console.error("Selected address not found.");
//   //     }
//   //   }
//   // }, [
//   //   isEditMode,
//   //   location.state?.userDetails?.user,
//   //   userDetails?.user,
//   //   genderOptions,
//   //   roleOptions,
//   // //  countries,cities,states,
//   // ]);
//   useEffect(() => {
//     if (isEditMode) {
//       const user = location.state?.userDetails?.user || userDetails?.user;
//       console.log("User details in edit mode:", user);
  
//       // Set user form data
//       setFormData({
//         FirstName: user.FirstName || "",
//         LastName: user.LastName || "",
//         Email: user.Email || "",
//         PhoneNumber: user.PhoneNumber || "",
//         Gender: user.Gender || "",
//         RoleID: user.RoleID || "",
//         ProfileImage: null,
//         Comments: user.Comments || "",
//         UserID: user.UserID || "",
//         Password: user.Password || "",
//         AddressLine1: user.Address?.AddressLine1 || "",
//         AddressLine2: user.Address?.AddressLine2 || "",
//         CityID: user.Address?.CityID || "",   // Use CityID here
//         StateID: user.Address?.StateID || "", // Use StateID here
//         CountryID: user.Address?.CountryID || "", // Use CountryID here
//         ZipCode: user.Address?.ZipCode || "",
//       });
  
//       // Set the selected gender
//       const selectedGender = genderOptions.find(
//         (gender) => gender.id === user?.Gender
//       );
//       setSelectedGender(selectedGender || "");
  
//       // Set the selected role
//       const selectedRole = roleOptions.find(
//         (role) => role.id === String(user?.RoleID) // Ensure RoleID is compared as string
//       );
//       setSelectedRole(selectedRole ? selectedRole.name : ""); // Set the role name in combo box
  
//       // Initialize address form data
//       const userAddress = user?.Address;
//       console.log("User address:", userAddress);
  
//       if (userAddress) {
//         // Find the corresponding country, state, and city based on their IDs
//         const selectedCountry =
//           countries.find((country) => country.CountryID === userAddress.CountryID) || {};
//         const selectedState =
//           states.find((state) => state.StateID === userAddress.StateID) || {};
//         const selectedCity =
//           cities.find((city) => city.CityID === userAddress.CityID) || {};
  
//         // Populate the form fields with the selected address details
//         setFormData((prevState) => ({
//           ...prevState,
//           AddressID: userAddress.AddressID || 0,
//           CustomerID: prevState.CustomerID, // Keep the same customer ID
//           AddressLine1: userAddress.AddressLine1 || "",
//           AddressLine2: userAddress.AddressLine2 || "",
//           CityID: userAddress.CityID || "",
//           StateID: userAddress.StateID || "",
//           CountryID: userAddress.CountryID || "",
//           ZipCode: userAddress.ZipCode || "",
//         }));
  
//         // Set the country, state, and city dropdowns
//         setSelectedCountry(selectedCountry);
//         setSelectedState(selectedState);
//         setSelectedCity(selectedCity);
  
//         // Fetch states and cities based on the selected address
//         if (userAddress.CountryID) {
//           fetchStatesByCountry(userAddress.CountryID);
//         }
//         if (userAddress.StateID) {
//           fetchCitiesByState(userAddress.StateID);
//         }
  
//         console.log("Editing Address Data:", userAddress);
//       } else {
//         console.error("Selected address not found.");
//       }
//     }
//   }, [
//     isEditMode,
//     location.state?.userDetails?.user,
//     userDetails?.user,
//     genderOptions,
//     roleOptions,
//     //countries, cities, states, // These should not be in dependencies to avoid infinite loops
//   ]);
  
  
  
  
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         ProfileImage: file,
//       });
//     }
//   };

//   const [selectedGender, setSelectedGender] = useState(formData.Gender || "");
//   const [selectedStore, setSelectedStore] = useState(null);

//   const handleStoreChange = (store) => {
//     setSelectedStore(store);
//   };

//   const handleGenderChange = (gender) => {
//     setSelectedGender(gender);
//     setFormData({
//       ...formData,
//       Gender: gender.id,
//     });
//   };

//   const [selectedRole, setSelectedRole] = useState(formData.RoleID || "");

//   // const [countries, setCountries] = useState([]);
//   // const [countryMap, setCountryMap] = useState({});
//   // const [states, setStates] = useState([]);
//   // const [stateMap, setStateMap] = useState({});
//   // const [cities, setCities] = useState([]);
//   // const [cityMap, setCityMap] = useState({});

//   // const [selectedCountry, setSelectedCountry] = useState(null);
//   // const [selectedState, setSelectedState] = useState(null);
//   // const [selectedCity, setSelectedCity] = useState(null);
//   // const [query, setQuery] = useState("");

//   const handleRoleChange = (role) => {
//     setSelectedRole(role);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       RoleID: role.id,
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formDataToSend = new FormData();

//       // Append all formData fields to the new FormData object
//       Object.keys(formData).forEach((key) => {
//         if (key === "ProfileImage" && formData[key]) {
//           formDataToSend.append(key, formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       // Log each key-value pair
//       for (let pair of formDataToSend.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//       }

//       const apiUrl =
//         "https://imlystudios-backend-mqg4.onrender.com/api/users/createOrUpdateUser";
//       const isEditMode = Boolean(formData.UserID); // Check if UserID exists to determine if it's an update

//       const method = isEditMode ? "put" : "post"; // Choose method based on whether it's an edit or create

//       const response = await axios({
//         method,
//         url: apiUrl,
//         data: formDataToSend,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("Submission successful:", response.data);

//       // Handle response to get the filename (if applicable)
//       const { filename } = response.data;

//       console.log(
//         `${isEditMode ? "Updated" : "Created"} successfully: ${filename}`
//       );

//       navigate("/user");
//     } catch (error) {
//       if (error.response) {
//         console.error(
//           "Submission failed with response error:",
//           error.response.data
//         );
//       } else if (error.request) {
//         console.error(
//           "Submission failed with no response received:",
//           error.request
//         );
//       } else {
//         console.error("Submission failed with error:", error.message);
//       }
//     }
//   };

//   const handleCancel = () => {
//     navigate("/user");
//   };

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get(
//           "https://imlystudios-backend-mqg4.onrender.com/api/cities/getCountries"
//         );
//         const countryData = response.data.data;
//         setCountries(countryData);

//         // Create countryMap
//         const countryMapData = countryData.reduce((map, country) => {
//           map[country.CountryName] = country.CountryID;
//           return map;
//         }, {});
//         setCountryMap(countryMapData);

//         console.log("Fetched countries:", countryData);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const fetchStatesByCountry = async (countryId) => {
//     if (!countryId) return;

//     try {
//       const response = await axios.get(
//         `https://imlystudios-backend-mqg4.onrender.com/api/cities/getStatesByCountry?$filter=CountryID eq ${countryId}`
//       );
//       if (response.data.status === "SUCCESS") {
//         const stateData = response.data.data;
//         setStates(stateData);

//         // Create stateMap
//         const stateMapData = stateData.reduce((map, state) => {
//           map[state.StateName] = state.StateID;
//           return map;
//         }, {});
//         setStateMap(stateMapData);

//         console.log("Fetched states:", stateData);
//       }
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const fetchCitiesByState = async (stateId) => {
//     if (!stateId) return;

//     try {
//       const response = await axios.get(
//         `https://imlystudios-backend-mqg4.onrender.com/api/cities/getCitiesByState?$filter=StateID eq ${stateId}`
//       );
//       if (response.data.status === "SUCCESS") {
//         const cityData = response.data.data;
//         setCities(cityData);

//         // Create cityMap
//         const cityMapData = cityData.reduce((map, city) => {
//           map[city.CityName] = city.CityID;
//           return map;
//         }, {});
//         setCityMap(cityMapData);

//         console.log("Fetched cities:", cityData);
//       }
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };
//   const handleCountryChange = (selectedCountry) => {
//     if (!selectedCountry) return;

//     const countryID =
//       countryMap[selectedCountry.CountryName] || selectedCountry.CountryID;

//     setSelectedCountry(selectedCountry);
//     setFormData({
//       ...formData,
//       CountryID: countryID,
//       CountryName: selectedCountry.CountryName,
//     });
//     fetchStatesByCountry(countryID);
//   };

//   const handleStateChange = (state) => {
//     if (!state) return;

//     const stateID = stateMap[state.StateName] || state.StateID;

//     setSelectedState(state);
//     setFormData({
//       ...formData,
//       StateID: stateID,
//       StateName: state.StateName,
//     });

//     fetchCitiesByState(stateID);
//   };

//   const handleCityChange = (city) => {
//     if (!city) return;

//     const cityID = cityMap[city.CityName] || city.CityID;

//     setSelectedCity(city);
//     setFormData({
//       ...formData,
//       CityID: cityID,
//       CityName: city.CityName,
//     });
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <form onSubmit={handleFormSubmit}>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold mb-4 px-24">Users</h2>
//           </div>
//           <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
//             <div className="w-full">
//               <label
//                 htmlFor="storeName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Store Name
//               </label>
//               <Combobox value={selectedStore} onChange={handleStoreChange}>
//                 <div className="relative mt-1">
//                   <Combobox.Input
//                     id="storeName"
//                     className="block w-full rounded-md border border-gray-400 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     displayValue={(store) => store?.name || ""}
//                     placeholder="Select Store"
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {storeNames.map((store) => (
//                       <Combobox.Option
//                         key={store.id}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                         value={store}
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {store.name}
//                             </span>
//                             {selected && (
//                               <span
//                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
//                                   active ? "text-white" : "text-indigo-600"
//                                 }`}
//                               >
//                                 <CheckIcon
//                                   className="h-5 w-5"
//                                   aria-hidden="true"
//                                 />
//                               </span>
//                             )}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </div>
//               </Combobox>
//             </div>

//             <div>
//               <label
//                 htmlFor="RoleID"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Role
//               </label>
//               <Combobox
//                 value={selectedRole}
//                 onChange={handleRoleChange}
//                 as="div"
//               >
//                 <div className="relative mt-1">
//                   <Combobox.Input
//                     className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     displayValue={(role) => role?.name || ""}
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {roleOptions.map((role) => (
//                       <Combobox.Option
//                         key={role.id}
//                         value={role}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {role.name}
//                             </span>
//                             {selected ? (
//                               <span
//                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
//                                   active ? "text-white" : "text-indigo-600"
//                                 }`}
//                               >
//                                 <CheckIcon
//                                   className="h-5 w-5"
//                                   aria-hidden="true"
//                                 />
//                               </span>
//                             ) : null}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </div>
//               </Combobox>
//             </div>

//             {/* First Name */}
//             <div className="flex items-center">
//               <div className="w-full">
//                 <label
//                   htmlFor="FirstName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="FirstName"
//                   name="FirstName"
//                   value={formData.FirstName || ""}
//                   onChange={handleFormChange}
//                   required
//                   className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             {/* Address Line 1 */}
//             <div className="flex items-center">
//               <div className="w-full">
//                 <label
//                   htmlFor="AddressLine1"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Address Line 1
//                 </label>
//                 <input
//                   type="text"
//                   id="AddressLine1"
//                   name="AddressLine1"
//                   value={formData.AddressLine1 || ""}
//                   onChange={handleFormChange}
//                   required
//                   className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Last Name */}
//             <div>
//               <label
//                 htmlFor="LastName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="LastName"
//                 name="LastName"
//                 value={formData.LastName || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Address Line 2 */}
//             <div>
//               <label
//                 htmlFor="AddressLine2"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Address Line 2
//               </label>
//               <input
//                 type="text"
//                 id="AddressLine2"
//                 name="AddressLine2"
//                 value={formData.AddressLine2 || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="Email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="Email"
//                 name="Email"
//                 value={formData.Email || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* City */}
//             {/* <div>
//               <label
//                 htmlFor="CityID"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 CityID
//               </label>
//               <input
//                 type="number"
//                 id="CityID"
//                 name="CityID"
//                 value={formData.CityID}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div> */}

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="Country"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Country
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedCountry}
//                   onChange={handleCountryChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="Country"
//                       name="Country"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
//                       displayValue={(country) => country?.CountryName || ""} // Display selected country name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {countries
//                         .filter((country) =>
//                           country.CountryName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         )
//                         .map((country) => (
//                           <Combobox.Option
//                             key={country.CountryID}
//                             value={country} // Pass the full country object to onChange
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {country.CountryName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="Password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 id="Password"
//                 name="Password"
//                 type="password"
//                 value={formData.Password || ""}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* State */}
//             {/* <div>
//               <label
//                 htmlFor="StateID"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 StateID
//               </label>
//               <input
//                 type="number"
//                 id="StateID"
//                 name="StateID"
//                 value={formData.StateID || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div> */}

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="State"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   State
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedState}
//                   onChange={handleStateChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="State"
//                       name="State"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Handle the search query
//                       displayValue={(state) => state?.StateName || ""} // Show the selected state name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {states
//                         .filter((state) =>
//                           state.StateName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         ) // Filter based on query
//                         .map((state) => (
//                           <Combobox.Option
//                             key={state.StateID}
//                             value={state}
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {state.StateName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label
//                 htmlFor="PhoneNumber"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Phone Number
//               </label>
//               <input
//                 type="text"
//                 id="PhoneNumber"
//                 name="PhoneNumber"
//                 value={formData.PhoneNumber || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Zip Code */}
//             {/* <div>
//               <label
//                 htmlFor="ZipCode"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Zip Code
//               </label>
//               <input
//                 type="text"
//                 id="ZipCode"
//                 name="ZipCode"
//                 value={formData.ZipCode || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div> */}

//             {/* <div className="flex items-center gap-4">
//   <label className="w-1/3 text-xs font-medium text-gray-700">City</label>
//   <div className="w-full">
//     <Combobox as="div" value={selectedCity} onChange={handleCityChange}>
//       <div className="relative">
//         <Combobox.Input
//           className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//           onChange={(event) => setQuery(event.target.value)} // Handle the search query
//           displayValue={(city) => city?.CityName || ''} // Show the selected city name
//         />
//         <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//           <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//         </Combobox.Button>

//         <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//           {cities
//             .filter((city) => city.CityName.toLowerCase().includes(query.toLowerCase())) // Filter based on query
//             .map((city) => (
//               <Combobox.Option
//                 key={city.CityID}
//                 value={city}
//                 className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//               >
//                 <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                   {city.CityName}
//                 </span>
//                 <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                   <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                 </span>
//               </Combobox.Option>
//             ))}
//         </Combobox.Options>
//       </div>
//     </Combobox>
//   </div>
// </div> */}

//             <div className="flex items-center gap-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="City"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   City
//                 </label>
//                 <Combobox
//                   as="div"
//                   value={selectedCity}
//                   onChange={handleCityChange}
//                 >
//                   <div className="relative">
//                     <Combobox.Input
//                       id="City"
//                       name="City"
//                       className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       onChange={(event) => setQuery(event.target.value)} // Handle the search query
//                       displayValue={(city) => city?.CityName || ""} // Show the selected city name
//                     />
//                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                       <ChevronUpDownIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Combobox.Button>

//                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                       {cities
//                         .filter((city) =>
//                           city.CityName.toLowerCase().includes(
//                             query.toLowerCase()
//                           )
//                         ) // Filter based on query
//                         .map((city) => (
//                           <Combobox.Option
//                             key={city.CityID}
//                             value={city}
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
//                           >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                               {city.CityName}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           </Combobox.Option>
//                         ))}
//                     </Combobox.Options>
//                   </div>
//                 </Combobox>
//               </div>
//             </div>

//             {/* Gender */}
//             <div>
//               <label
//                 htmlFor="Gender"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Gender
//               </label>
//               <Combobox
//                 value={selectedGender}
//                 onChange={handleGenderChange}
//                 as="div"
//               >
//                 <div className="relative mt-1">
//                   <Combobox.Input
//                     className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     displayValue={(gender) => gender?.name || ""}
//                   />
//                   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                     <ChevronUpDownIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </Combobox.Button>
//                   <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     {genderOptions.map((gender) => (
//                       <Combobox.Option
//                         key={gender.id}
//                         value={gender}
//                         className={({ active }) =>
//                           `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                             active
//                               ? "bg-indigo-600 text-white"
//                               : "text-gray-900"
//                           }`
//                         }
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${
//                                 selected ? "font-semibold" : "font-normal"
//                               }`}
//                             >
//                               {gender.name}
//                             </span>
//                             {selected ? (
//                               <span
//                                 className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
//                                   active ? "text-white" : "text-indigo-600"
//                                 }`}
//                               >
//                                 <CheckIcon
//                                   className="h-5 w-5"
//                                   aria-hidden="true"
//                                 />
//                               </span>
//                             ) : null}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))}
//                   </Combobox.Options>
//                 </div>
//               </Combobox>
//             </div>

//             <div>
//               <label
//                 htmlFor="ZipCode"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Zip Code
//               </label>
//               <input
//                 type="text"
//                 id="ZipCode"
//                 name="ZipCode"
//                 value={formData.ZipCode || ""}
//                 onChange={handleFormChange}
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Profile Image */}
//             <div>
//               <label
//                 htmlFor="ProfileImage"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 id="ProfileImage"
//                 name="ProfileImage"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//             {/* Comments */}
//             <div className="sm:col-span-1">
//               <label
//                 htmlFor="Comments"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Comments
//               </label>
//               <textarea
//                 id="Comments"
//                 name="Comments"
//                 value={formData.Comments || ""}
//                 onChange={handleFormChange}
//                 rows={1}
//                 className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               ></textarea>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end gap-4">
//             <button
//               type="submit"
//               className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               {isEditMode ? "Update User" : "Create User"}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default Userform;



import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {CREATEORUPDATE_USERS_API,COUNTRIES_API,STATES_API,CITIES_API} from "../../Constants/apiRoutes";

const genderOptions = [
  { id: "M", name: "Male" },
  { id: "F", name: "Female" },
];
const roleOptions = [
  { id: "1", name: "Admin" },
  { id: "2", name: "Store User" },
  { id: "3", name: " Finance" },
  { id: "4", name: "Production" },
  { id: "5", name: "Techinical" },
];
const storeNames = [
  { id: "1", name: "ImlyStudio-Indiranagar" },
  { id: "2", name: "ImlyStudio-Jakkur" },
  { id: "3", name: "ImlyStudio-InfantryRoad" },
  { id: "4", name: "ImlyStudio-HSRLayout" },
  { id: "5", name: "ImlyStudio-HSRLayout" },
];
function Userform() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails } = useContext(UserContext);

  const isEditMode = Boolean(
    location.state?.userDetails?.user || userDetails?.user
  );

  const [formData, setFormData] = useState(
    location.state?.userDetails || {
      TenantID: 1,
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      Gender: "",
      RoleID: "",
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: 5,
      ZipCode: "",
      ProfileImage: null,
      Comments: "",
    }
  );
  
  const [countries, setCountries] = useState([]);
  const [countryMap, setCountryMap] = useState({});
  const [states, setStates] = useState([]);
  const [stateMap, setStateMap] = useState({});
  const [cities, setCities] = useState([]);
  const [cityMap, setCityMap] = useState({});

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const user = location.state?.userDetails?.user || userDetails?.user;
      console.log("User details in edit mode:", user);
  
      // Set user form data
      setFormData({
        FirstName: user.FirstName || "",
        LastName: user.LastName || "",
        Email: user.Email || "",
        PhoneNumber: user.PhoneNumber || "",
        Gender: user.Gender || "",
        RoleID: user.RoleID || "",
        ProfileImage: null,
        Comments: user.Comments || "",
        UserID: user.UserID || "",
        Password: user.Password || "",
        AddressLine1: user.Address?.AddressLine1 || "",
        AddressLine2: user.Address?.AddressLine2 || "",
        CityID: user.Address?.CityID || "",   // Use CityID here
        StateID: user.Address?.StateID || "", // Use StateID here
        CountryID: user.Address?.CountryID || "", // Use CountryID here
        ZipCode: user.Address?.ZipCode || "",
      });
  
      // Set the selected gender
      const selectedGender = genderOptions.find(
        (gender) => gender.id === user?.Gender
      );
      setSelectedGender(selectedGender || "");
  
      // Set the selected role
      const selectedRole = roleOptions.find(
        (role) => role.id === String(user?.RoleID) // Ensure RoleID is compared as string
      );
      setSelectedRole(selectedRole ? selectedRole.name : ""); // Set the role name in combo box
  
      // Initialize address form data
      const userAddress = user?.Address;
      console.log("User address:", userAddress);
  
      if (userAddress) {
        // Find the corresponding country, state, and city based on their IDs
        const selectedCountry =
          countries.find((country) => country.CountryID === userAddress.CountryID) || {};
        const selectedState =
          states.find((state) => state.StateID === userAddress.StateID) || {};
        const selectedCity =
          cities.find((city) => city.CityID === userAddress.CityID) || {};
  
        // Populate the form fields with the selected address details
        setFormData((prevState) => ({
          ...prevState,
          AddressID: userAddress.AddressID || 0,
          CustomerID: prevState.CustomerID, // Keep the same customer ID
          AddressLine1: userAddress.AddressLine1 || "",
          AddressLine2: userAddress.AddressLine2 || "",
          CityID: userAddress.CityID || "",
          StateID: userAddress.StateID || "",
          CountryID: userAddress.CountryID || "",
          ZipCode: userAddress.ZipCode || "",
        }));
  
        // Set the country, state, and city dropdowns
        setSelectedCountry(selectedCountry);
        setSelectedState(selectedState);
        setSelectedCity(selectedCity);
  
        // Fetch states and cities based on the selected address
        if (userAddress.CountryID) {
          fetchStatesByCountry(userAddress.CountryID);
        }
        if (userAddress.StateID) {
          fetchCitiesByState(userAddress.StateID);
        }
  
        console.log("Editing Address Data:", userAddress);
      } else {
        console.error("Selected address not found.");
      }
    }
  }, [
    isEditMode,
    location.state?.userDetails?.user,
    userDetails?.user,
    genderOptions,
    roleOptions,
    //countries, cities, states, // These should not be in dependencies to avoid infinite loops
  ]);
  
  
  
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        ProfileImage: file,
      });
    }
  };

  const [selectedGender, setSelectedGender] = useState(formData.Gender || "");
  const [selectedStore, setSelectedStore] = useState(null);

  const handleStoreChange = (store) => {
    setSelectedStore(store);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setFormData({
      ...formData,
      Gender: gender.id,
    });
  };

  const [selectedRole, setSelectedRole] = useState(formData.RoleID || "");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData((prevFormData) => ({
      ...prevFormData,
      RoleID: role.id,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append all formData fields to the new FormData object
      Object.keys(formData).forEach((key) => {
        if (key === "ProfileImage" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Log each key-value pair
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const apiUrl =
        // "https://imlystudios-backend-mqg4.onrender.com/api/users/createOrUpdateUser";
        CREATEORUPDATE_USERS_API
      const isEditMode = Boolean(formData.UserID); // Check if UserID exists to determine if it's an update

      const method = isEditMode ? "put" : "post"; // Choose method based on whether it's an edit or create

      const response = await axios({
        method,
        url: apiUrl,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Submission successful:", response.data);

      // Handle response to get the filename (if applicable)
      const { filename } = response.data;

      console.log(
        `${isEditMode ? "Updated" : "Created"} successfully: ${filename}`
      );

      navigate("/user");
    } catch (error) {
      if (error.response) {
        console.error(
          "Submission failed with response error:",
          error.response.data
        );
      } else if (error.request) {
        console.error(
          "Submission failed with no response received:",
          error.request
        );
      } else {
        console.error("Submission failed with error:", error.message);
      }
    }
  };

  const handleCancel = () => {
    navigate("/user");
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          // "https://imlystudios-backend-mqg4.onrender.com/api/cities/getCountries"
          COUNTRIES_API 
        );
        const countryData = response.data.data;
        setCountries(countryData);

        // Create countryMap
        const countryMapData = countryData.reduce((map, country) => {
          map[country.CountryName] = country.CountryID;
          return map;
        }, {});
        setCountryMap(countryMapData);

        console.log("Fetched countries:", countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const fetchStatesByCountry = async (countryId) => {
    if (!countryId) return;

    try {
      const response = await axios.get(
        // `https://imlystudios-backend-mqg4.onrender.com/api/cities/getStatesByCountry?$filter=CountryID eq ${countryId}`
        
 `${STATES_API}/${countryId}`
      );
      if (response.data.status === "SUCCESS") {
        const stateData = response.data.data;
        setStates(stateData);

        // Create stateMap
        const stateMapData = stateData.reduce((map, state) => {
          map[state.StateName] = state.StateID;
          return map;
        }, {});
        setStateMap(stateMapData);

        console.log("Fetched states:", stateData);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCitiesByState = async (stateId) => {
    if (!stateId) return;

    try {
      const response = await axios.get(
        // `https://imlystudios-backend-mqg4.onrender.com/api/cities/getCitiesByState?$filter=StateID eq ${stateId}`
         `${CITIES_API}/${stateId}`
      );
      if (response.data.status === "SUCCESS") {
        const cityData = response.data.data;
        setCities(cityData);

        // Create cityMap
        const cityMapData = cityData.reduce((map, city) => {
          map[city.CityName] = city.CityID;
          return map;
        }, {});
        setCityMap(cityMapData);

        console.log("Fetched cities:", cityData);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  const handleCountryChange = (selectedCountry) => {
    if (!selectedCountry) return;

    const countryID =
      countryMap[selectedCountry.CountryName] || selectedCountry.CountryID;

    setSelectedCountry(selectedCountry);
    setFormData({
      ...formData,
      CountryID: countryID,
      CountryName: selectedCountry.CountryName,
    });
    fetchStatesByCountry(countryID);
  };

  const handleStateChange = (state) => {
    if (!state) return;

    const stateID = stateMap[state.StateName] || state.StateID;

    setSelectedState(state);
    setFormData({
      ...formData,
      StateID: stateID,
      StateName: state.StateName,
    });

    fetchCitiesByState(stateID);
  };

  const handleCityChange = (city) => {
    if (!city) return;

    const cityID = cityMap[city.CityName] || city.CityID;

    setSelectedCity(city);
    setFormData({
      ...formData,
      CityID: cityID,
      CityName: city.CityName,
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 px-24">Users</h2>
          </div>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-16 md:px-24">
            <div className="w-full">
              <label
                htmlFor="storeName"
                className="block text-sm font-medium text-gray-700"
              >
                Store Name
              </label>
              <Combobox value={selectedStore} onChange={handleStoreChange}>
                <div className="relative mt-1">
                  <Combobox.Input
                    id="storeName"
                    className="block w-full rounded-md border border-gray-400 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    displayValue={(store) => store?.name || ""}
                    placeholder="Select Store"
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {storeNames.map((store) => (
                      <Combobox.Option
                        key={store.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={store}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {store.name}
                            </span>
                            {selected && (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                  active ? "text-white" : "text-indigo-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            <div>
              <label
                htmlFor="RoleID"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <Combobox
                value={selectedRole}
                onChange={handleRoleChange}
                as="div"
              >
                <div className="relative mt-1">
                  <Combobox.Input
                    className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    displayValue={(role) => role?.name || ""}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {roleOptions.map((role) => (
                      <Combobox.Option
                        key={role.id}
                        value={role}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {role.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                  active ? "text-white" : "text-indigo-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            {/* First Name */}
            <div className="flex items-center">
              <div className="w-full">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={formData.FirstName || ""}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {/* Address Line 1 */}
            <div className="flex items-center">
              <div className="w-full">
                <label
                  htmlFor="AddressLine1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="AddressLine1"
                  name="AddressLine1"
                  value={formData.AddressLine1 || ""}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                value={formData.LastName || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label
                htmlFor="AddressLine2"
                className="block text-sm font-medium text-gray-700"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="AddressLine2"
                name="AddressLine2"
                value={formData.AddressLine2 || ""}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full">
                <label
                  htmlFor="Country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <Combobox
                  as="div"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="Country"
                      name="Country"
                      className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
                      displayValue={(country) => country?.CountryName || ""} // Display selected country name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {countries
                        .filter((country) =>
                          country.CountryName.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        )
                        .map((country) => (
                          <Combobox.Option
                            key={country.CountryID}
                            value={country} // Pass the full country object to onChange
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                          >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">
                              {country.CountryName}
                            </span>
                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="Password"
                name="Password"
                type="password"
                value={formData.Password || ""}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full">
                <label
                  htmlFor="State"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <Combobox
                  as="div"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="State"
                      name="State"
                      className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) => setQuery(event.target.value)} // Handle the search query
                      displayValue={(state) => state?.StateName || ""} // Show the selected state name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {states
                        .filter((state) =>
                          state.StateName.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        ) // Filter based on query
                        .map((state) => (
                          <Combobox.Option
                            key={state.StateID}
                            value={state}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                          >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">
                              {state.StateName}
                            </span>
                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="PhoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="PhoneNumber"
                name="PhoneNumber"
                value={formData.PhoneNumber || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>


            <div className="flex items-center gap-4">
              <div className="w-full">
                <label
                  htmlFor="City"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Combobox
                  as="div"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <div className="relative">
                    <Combobox.Input
                      id="City"
                      name="City"
                      className="w-full rounded-md border border-gray-400 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) => setQuery(event.target.value)} // Handle the search query
                      displayValue={(city) => city?.CityName || ""} // Show the selected city name
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {cities
                        .filter((city) =>
                          city.CityName.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        ) // Filter based on query
                        .map((city) => (
                          <Combobox.Option
                            key={city.CityID}
                            value={city}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                          >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">
                              {city.CityName}
                            </span>
                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="Gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <Combobox
                value={selectedGender}
                onChange={handleGenderChange}
                as="div"
              >
                <div className="relative mt-1">
                  <Combobox.Input
                    className="block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    displayValue={(gender) => gender?.name || ""}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {genderOptions.map((gender) => (
                      <Combobox.Option
                        key={gender.id}
                        value={gender}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {gender.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                  active ? "text-white" : "text-indigo-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            <div>
              <label
                htmlFor="ZipCode"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="ZipCode"
                name="ZipCode"
                value={formData.ZipCode || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label
                htmlFor="ProfileImage"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="ProfileImage"
                name="ProfileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Comments */}
            <div className="sm:col-span-1">
              <label
                htmlFor="Comments"
                className="block text-sm font-medium text-gray-700"
              >
                Comments
              </label>
              <textarea
                id="Comments"
                name="Comments"
                value={formData.Comments || ""}
                onChange={handleFormChange}
                rows={1}
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isEditMode ? "Update User" : "Create User"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Userform;
