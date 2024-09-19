
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomerContext } from "../../Context/customerContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Combobox } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CustomerSearch from "../Orders/CustomerSearch";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {CREATEORUPDATE_CUSTOMERS_API,CREATEORUPDATE_CUSTOMERS_ADDRESS_API, ORDERBYCUSTOMERID_API,
  COUNTRIES_API
  ,STATES_API,CITIES_API
 } from "../../Constants/apiRoutes";

// Define Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#003375",
    // backgroundColor: '#F0E68C',
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const steps = ["Customer Details", "Address", "Orders"];
const genderOptions = [
  { id: "M", name: "Male" },
  { id: "F", name: "Female" },
];
const storeNames = [
  { id: '1', name: 'ImlyStudio-Indiranagar' },
  { id: '2', name: 'ImlyStudio-Jakkur' },
  { id: '3', name: 'ImlyStudio-InfantryRoad' },
  { id: '4', name: 'ImlyStudio-HSRLayout' },
  { id: '5', name: 'ImlyStudio-HSRLayout' },
  ];

function AddCustomers() {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerDetails } = useContext(CustomerContext);
  // const [selectedGender, setSelectedGender] = useState(null);
  const [selectedReferralType, setSelectedReferralType] = useState(null);
  const [selectedReferenceSubOption, setSelectedReferenceSubOption] =
    useState(null);
  const [selectedSocialMediaPlatform, setSelectedSocialMediaPlatform] =
    useState(null);
  const [query, setQuery] = useState("");
  const [orderDetails, setOrderDetails] = useState({ refereeName: "" });

  const handleReferralTypeChange = (type) => setSelectedReferralType(type);
  const handleReferenceSubOptionChange = (option) =>
    setSelectedReferenceSubOption(option);
  const handleSocialMediaPlatformChange = (platform) =>
    setSelectedSocialMediaPlatform(platform);
  const handleRefereeNameChange = (e) =>
    setOrderDetails({ ...orderDetails, refereeName: e.target.value });

  const isEditMode = Boolean(
    location.state?.customerDetails?.customer || customerDetails?.customer
  );
  // Customer form data state
  const [customerFormData, setCustomerFormData] = useState({
    TenantID: 1,
    CustomerID: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
    Gender: "",
    Comments: "",
  });

  const [addressFormData, setAddressFormData] = useState({
    AddressID: 0,
    CustomerID: "",
    TenantID: 1,
    AddressLine1: "",
    AddressLine2: "",
    CityID: "",
    StateID: "",
    CountryID: "",
    ZipCode: "",
    Addresses: [],
  });
  const handleStepClick = (index) => {
    setActiveStep(index); // Set the active step to the clicked step
    // Add your logic to change the page or navigate here
  };

  const [error, setError] = useState("");
  const [selectedGender, setSelectedGender] = useState(
    customerFormData.Gender || ""
  );
  const [activeStep, setActiveStep] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countryMap, setCountryMap] = useState({});
  const [stateMap, setStateMap] = useState({});
  const [cityMap, setCityMap] = useState({});
  const [addresses, setAddresses] = useState([]);

  // useEffect(() => {
  //   if (isEditMode) {
  //     const customer =
  //       location.state?.customerDetails?.customer || customerDetails?.customer;

  //     setCustomerFormData({
  //       TenantID: customer?.TenantID || 1,
  //       CustomerID: customer?.CustomerID || 0,
  //       FirstName: customer?.FirstName || "",
  //       LastName: customer?.LastName || "",
  //       Email: customer?.Email || "",
  //       Password: "",
  //       ConfirmPassword: "",
  //       PhoneNumber: customer?.PhoneNumber || "",
  //       Gender: customer?.Gender || "",
  //       Comments: customer?.Comments || "",
  //     });

  //     setAddressFormData({
  //       CustomerID: customer?.CustomerID || 0,
  //       AddressID: customer?.Addresses?.AddressID || 0,
  //       AddressLine1: customer?.Addresses?.AddressLine1 || "",
  //       AddressLine2: customer?.Addresses?.AddressLine2 || "",
  //       CityID: customer?.Addresses?.CityID || "",
  //       StateID: customer?.Addresses?.StateID || "",
  //       CountryID: customer?.Addresses?.CountryID || "",
  //       ZipCode: customer?.Addresses?.ZipCode || "",
  //       Addresses: customer?.Addresses || [],
  //     });

  //     const address = customer?.Addresses?.[0]; // Get the first address (for simplicity)

  //     if (address) {
  //       // Find and set selected country
  //       const selectedCountry =
  //         countries.find(
  //           (country) => country.CountryID === address.CountryID
  //         ) || null;
  //       if (selectedCountry) {
  //         setSelectedCountry(selectedCountry);

  //         // Fetch states based on selected country, if not already loaded
  //         if (
  //           !states.some(
  //             (state) => state.CountryID === selectedCountry.CountryID
  //           )
  //         ) {
  //           fetchStatesByCountry(selectedCountry.CountryID);
  //         }
  //       }

  //       // Find and set selected state after country is set
  //       const selectedState =
  //         states.find((state) => state.StateID === address.StateID) || null;
  //       if (selectedState) {
  //         setSelectedState(selectedState);

  //         // Fetch cities based on selected state, if not already loaded
  //         if (!cities.some((city) => city.StateID === selectedState.StateID)) {
  //           fetchCitiesByState(selectedState.StateID);
  //         }
  //       }

  //       // Find and set selected city
  //       const selectedCity =
  //         cities.find((city) => city.CityID === address.CityID) || null;
  //       setSelectedCity(selectedCity);
  //     }

  //     // Set the customer ID for further use
  //     setCustomerId(customer?.CustomerID || 0);
  //   }
  // }, [
  //   isEditMode,
  //   location.state?.customerDetails?.customer,
  //   customerDetails?.customer,
  // ]);
//  const [addressTableData, setAddressTableData] = useState({
//   AddressLine1: "",
//   AddressLine2: "",
//   CityID: "",
//   StateID: "",
//   CountryID: "",
//   ZipCode: "",
//   Addresses: [],
// });
const [addressTableData, setAddressTableData] = useState([]); // Initial state is an empty array

  
  useEffect(() => {
    if (isEditMode) {
      const customer =
        location.state?.customerDetails?.customer || customerDetails?.customer;
  
      // Set customer form data
      setCustomerFormData({
        TenantID: customer?.TenantID || 1,
        CustomerID: customer?.CustomerID || 0,
        FirstName: customer?.FirstName || "",
        LastName: customer?.LastName || "",
        Email: customer?.Email || "",
        Password: "",
        ConfirmPassword: "",
        PhoneNumber: customer?.PhoneNumber || "",
        Gender: customer?.Gender || "",
        Comments: customer?.Comments || "",
      });
  
      // Set the selected gender
      const selectedGender = genderOptions.find(
        (gender) => gender.id === customer?.Gender
      );
      setSelectedGender(selectedGender || "");
  
      // Initialize address form data
      const firstAddress = customer?.Addresses?.[0];
      setAddressTableData({
        CustomerID: customer?.CustomerID || 0,
        AddressID: firstAddress?.AddressID || 0,
        AddressLine1: firstAddress?.AddressLine1 || "",
        AddressLine2: firstAddress?.AddressLine2 || "",
        CityID: firstAddress?.CityID || "",
        StateID: firstAddress?.StateID || "",
        CountryID: firstAddress?.CountryID || "",
        ZipCode: firstAddress?.ZipCode || "",
        Addresses: customer?.Addresses || [],
      });
      setAddressFormData({
        CustomerID: 0,
        AddressID: 0,
        AddressLine1: "",
        AddressLine2: "",
        CityID: "",
        StateID: "",
        CountryID: "",
        ZipCode: "",
        Addresses: [],
      });
  
  
      // Set address table data
      setAddressTableData({
        CustomerID: customer?.CustomerID || 0,
        Addresses: customer?.Addresses || [], // Ensure Addresses array is set
      });
  
      // Fetch states by country and cities by state based on the first address
      if (firstAddress?.CountryID) {
        fetchStatesByCountry(firstAddress.CountryID);
      }
      if (firstAddress?.StateID) {
        fetchCitiesByState(firstAddress.StateID);
      }
  
      // Set the selected country, state, and city
      setSelectedCountry(firstAddress?.CountryID || null);
      setSelectedState(firstAddress?.StateID || null);
      setSelectedCity(firstAddress?.CityID || null);
  
      // Set customer ID
      setCustomerId(customer?.CustomerID || 0);
    } else {
      // Clear data when not in edit mode
      setCustomerFormData({
        TenantID: 1,
        CustomerID: 0,
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        PhoneNumber: "",
        Gender: "",
        Comments: "",
      });
  
      setAddressFormData({
        CustomerID: 0,
        AddressID: 0,
        AddressLine1: "",
        AddressLine2: "",
        CityID: "",
        StateID: "",
        CountryID: "",
        ZipCode: "",
        Addresses: [],
      });
  
      setAddressTableData([]);
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);
    }
  }, [
    isEditMode,
    location.state?.customerDetails?.customer,
    customerDetails?.customer,
    genderOptions,
  ]);
  
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setCustomerFormData({ ...customerFormData, Gender: gender.id });
  };

  const handleCustomerFormChange = (e) => {
    const { name, value } = e.target;
    setCustomerFormData({
      ...customerFormData,
      [name]: value,
    });
  };

  const handleAddressFormChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData({
      ...addressFormData,
      [name]: value,
    });
  };

  const [customerId, setCustomerId] = useState(null);

  // const handleCustomerFormSubmit = async () => {
  //   const customerApiUrl =
  //     "https://imlystudios-backend-mqg4.onrender.com/api/customers/createOrUpdateCustomer";

  //   try {
  //     // Log the customer form data being sent to the API
  //     console.log("Customer Form Data:", customerFormData);

  //     // Create or update the customer
  //     const customerResponse = await axios.post(
  //       customerApiUrl,
  //       customerFormData
  //     );
  //     console.log("Customer Response:", customerResponse);

  //     const newCustomerId = customerResponse.data.CustomerID; // Ensure this is returned correctly

  //     if (!newCustomerId) {
  //       throw new Error("Failed to retrieve CustomerID from response.");
  //     }

  //     // Set the customerId in state, whether it's a new or existing customer
  //     setCustomerId(newCustomerId);

  //     console.log("Customer ID has been set:", newCustomerId);

  //     return newCustomerId;
  //   } catch (error) {
  //     console.error("Customer submission failed:", error);

  //     if (error.response) {
  //       console.error("Response data:", error.response.data);
  //       setError(
  //         `Failed to ${
  //           customerFormData.CustomerID ? "update" : "create"
  //         } customer: ` + error.response.data.message
  //       );
  //     } else if (error.request) {
  //       console.error("No response received:", error.request);
  //       setError("No response received from server.");
  //     } else {
  //       console.error("Error in setting up request:", error.message);
  //       setError("Error: " + error.message);
  //     }
  //   }
  // };
  const handleCustomerFormSubmit = async () => {
    const customerApiUrl =
      // "https://imlystudios-backend-mqg4.onrender.com/api/customers/createOrUpdateCustomer";
      CREATEORUPDATE_CUSTOMERS_API
    try {
      // Log the customer form data being sent to the API
      console.log("Customer Form Data:", customerFormData);
  
      // Create or update the customer
      const customerResponse = await axios.post(customerApiUrl, customerFormData);
      console.log("Customer Response:", customerResponse);
  
      const newCustomerId = customerResponse.data.CustomerID; // Ensure this is returned correctly
  
      if (!newCustomerId) {
        throw new Error("Failed to retrieve CustomerID from response.");
      }
  
      // Set the customerId in state, whether it's a new or existing customer
      setCustomerId(newCustomerId);
      console.log("Customer ID has been set:", newCustomerId);
  
      // After successful customer registration, move to the next step
      handleNext();
  
      return newCustomerId;
    } catch (error) {
      console.error("Customer submission failed:", error);
  
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(
          `Failed to ${
            customerFormData.CustomerID ? "update" : "create"
          } customer: ` + error.response.data.message
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response received from server.");
      } else {
        console.error("Error in setting up request:", error.message);
        setError("Error: " + error.message);
      }
    }
  };
  
  
  // const handleAddressFormSubmit = async (customerId) => {
  //   const addressesApiUrl =
  //     "https://imlystudios-backend-mqg4.onrender.com/api/customers/createOrUpdateAddress";

  //   try {
  //     // Push current form data into the Addresses array
  //     console.log("Address FormData", addressFormData);

  //     const newAddress = {
  //       AddressID: addressFormData.AddressID || 0,
  //       AddressLine1: addressFormData.AddressLine1 || "",
  //       AddressLine2: addressFormData.AddressLine2 || "",
  //       CityID: addressFormData.CityID || "",
  //       StateID: addressFormData.StateID || "",
  //       CountryID: addressFormData.CountryID || "",
  //       ZipCode: addressFormData.ZipCode || "",
  //     };

  //     // Add the new address to the Addresses array
  //     setAddressFormData((prevState) => ({
  //       ...prevState,
  //       Addresses: [...prevState.Addresses, newAddress],
  //     }));

  //     console.log("Updated Addresses Array:", addressFormData.Addresses);

  //     const addressData = {
  //       Addresses: addressFormData.Addresses,
  //       AddressID: newAddress.AddressID,
  //       CustomerID: customerId,
  //       TenantID: 1,
  //       AddressLine1: newAddress.AddressLine1,
  //       AddressLine2: newAddress.AddressLine2,
  //       CityID: newAddress.CityID,
  //       StateID: newAddress.StateID,
  //       CountryID: newAddress.CountryID,
  //       ZipCode: newAddress.ZipCode,
  //     };

  //     console.log("Final Address Data for Submission:", addressData);

  //     const addressResponse = await axios.post(addressesApiUrl, addressData);
  //     console.log("Address Response:", addressResponse.data);
  //   } catch (error) {
  //     console.error("Address submission failed:", error);

  //     if (error.response) {
  //       console.error("Response data:", error.response.data);
  //       setError(
  //         "Failed to submit address: " +
  //           (error.response.data.message || "Unknown error")
  //       );
  //     } else if (error.request) {
  //       console.error("No response received:", error.request);
  //       setError("No response received from server.");
  //     } else {
  //       console.error("Error in setting up request:", error.message);
  //       setError("Error: " + error.message);
  //     }
  //   }
  // };


  const handleAddressFormSubmit = async (customerId) => {
    const addressesApiUrl =
      // "https://imlystudios-backend-mqg4.onrender.com/api/customers/createOrUpdateAddress";
      CREATEORUPDATE_CUSTOMERS_ADDRESS_API;
  
    try {
      // Push current form data into the Addresses array
      console.log("Address FormData", addressFormData);
  
      const newAddress = {
        AddressID: addressFormData.AddressID || 0,
        AddressLine1: addressFormData.AddressLine1 || "",
        AddressLine2: addressFormData.AddressLine2 || "",
        CityID: addressFormData.CityID || "",
        StateID: addressFormData.StateID || "",
        CountryID: addressFormData.CountryID || "",
        ZipCode: addressFormData.ZipCode || "",
      };
  
      // Add the new address to the Addresses array
      setAddressFormData((prevState) => ({
        ...prevState,
        Addresses: [...prevState.Addresses, newAddress],
      }));
  
      console.log("Updated Addresses Array:", addressFormData.Addresses);
  
      const addressData = {
        Addresses: addressFormData.Addresses,
        AddressID: newAddress.AddressID,
        CustomerID: customerId,
        TenantID: 1,
        AddressLine1: newAddress.AddressLine1,
        AddressLine2: newAddress.AddressLine2,
        CityID: newAddress.CityID,
        StateID: newAddress.StateID,
        CountryID: newAddress.CountryID,
        ZipCode: newAddress.ZipCode,
      };
  
      console.log("Final Address Data for Submission:", addressData);
  
      const addressResponse = await axios.post(addressesApiUrl, addressData);
      console.log("Address Response:", addressResponse.data);
  
      // After successfully submitting the address, move to the next step
      handleNext();
    } catch (error) {
      console.error("Address submission failed:", error);
  
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(
          "Failed to submit address: " +
            (error.response.data.message || "Unknown error")
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response received from server.");
      } else {
        console.error("Error in setting up request:", error.message);
        setError("Error: " + error.message);
      }
    }
  };
  
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerId = customerFormData.CustomerID;

        if (!customerId) return; // Ensure customerId exists

        const response = await axios.get(
          // `https://imlystudios-backend-mqg4.onrender.com/api/customers/customers/getOrderByCustomerId/${customerId}`

          `${ORDERBYCUSTOMERID_API}/${customerId}`
        );
        setOrders(response.data.orders || []);
        console.log("Fetched Orders:", response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    // Only call fetchOrders if customerId exists
    if (customerFormData.CustomerID) {
      fetchOrders();
    }
  }, [customerFormData.CustomerID]); // Watch for changes in formData.CustomerID

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
    setAddressFormData({
      ...addressFormData,
      CountryID: countryID,
      CountryName: selectedCountry.CountryName,
    });
    fetchStatesByCountry(countryID);
    console.log(addressFormData);
  };

  const handleStateChange = (state) => {
    if (!state) return;

    const stateID = stateMap[state.StateName] || state.StateID;

    setSelectedState(state);
    setAddressFormData({
      ...addressFormData,
      StateID: stateID,
      StateName: state.StateName,
    });
    console.log(addressFormData);
    fetchCitiesByState(stateID);
  };

  const handleCityChange = (city) => {
    if (!city) return;

    const cityID = cityMap[city.CityName] || city.CityID;

    setSelectedCity(city);
    setAddressFormData({
      ...addressFormData,
      CityID: cityID,
      CityName: city.CityName,
    });
  };

  const handleReset = () => {
    setActiveStep(0);

    // Reset customer form data
    setCustomerFormData({
      TenantID: 1,
      CustomerID: null,
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      PhoneNumber: "",
      Gender: "",
      Comments: "",
    });

    // Reset address form data
    setAddressFormData({
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
    });
  };

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => false;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);

  const handleStoreChange = (store) => {
    setSelectedStore(store);
  };

  const handleEdit = (index) => {
    // Extract the selected address using the index
    const selectedAddress = addressTableData.Addresses[index];
  
    if (selectedAddress) {
      // Find the corresponding country, state, and city based on their IDs
      const selectedCountry =
        countries.find((country) => country.CountryID === selectedAddress.CountryID) || {};
      const selectedState =
        states.find((state) => state.StateID === selectedAddress.StateID) || {};
      const selectedCity =
        cities.find((city) => city.CityID === selectedAddress.CityID) || {};
  
      // Populate the form fields with the selected address details
      setAddressFormData((prevState) => ({
        ...prevState,
        AddressID: selectedAddress.AddressID || 0,
        CustomerID: prevState.CustomerID, // Keep the same customer ID
        AddressLine1: selectedAddress.AddressLine1 || "",
        AddressLine2: selectedAddress.AddressLine2 || "",
        CityID: selectedAddress.CityID || "",
        StateID: selectedAddress.StateID || "",
        CountryID: selectedAddress.CountryID || "",
        ZipCode: selectedAddress.ZipCode || "",
        Addresses: prevState.Addresses, // Keep the existing array of addresses
      }));
  
      // Set the country, state, and city dropdowns
      setSelectedCountry(selectedCountry);
      setSelectedState(selectedState);
      setSelectedCity(selectedCity);
  
      // Fetch states and cities based on the selected address
      if (selectedAddress.CountryID) {
        fetchStatesByCountry(selectedAddress.CountryID);
      }
      if (selectedAddress.StateID) {
        fetchCitiesByState(selectedAddress.StateID);
      }
  
      console.log("Editing Address Data:", selectedAddress);
    } else {
      console.error("Selected address not found.");
    }
  };
  
  // const handleDelete = async (index) => {
  //   // Get the AddressID of the selected address using the index
  //   const selectedAddress = addressFormData.Addresses[index];
  //   const addressId = selectedAddress.AddressID;

  //   if (!addressId) {
  //     console.error("No AddressID found for this address.");
  //     return;
  //   }

  //   const deleteApiUrl = `https://imlystudios-backend-mqg4.onrender.com/api/customers/deleteAddress/${addressId}`;

  //   try {
  //     // Make a DELETE request to the API
  //     const response = await axios.delete(deleteApiUrl);
  //     console.log("Delete Response:", response.data);

  //     // Remove the deleted address from the addressFormData state
  //     setAddressFormData((prevState) => ({
  //       ...prevState,
  //       Addresses: prevState.Addresses.filter((_, i) => i !== index),
  //     }));

  //     console.log("Address deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting address:", error);
  //     if (error.response) {
  //       console.error("Response data:", error.response.data);
  //     }
  //   }
  // };
 
  const handleDelete = async (addressId) => {
    if (!addressId) {
      console.error("No AddressID provided.");
      return;
    }
  
    const deleteApiUrl = `https://imlystudios-backend-mqg4.onrender.com/api/customers/deleteAddress/${addressId}`;
  
    try {
      // Make a DELETE request to the API
      const response = await axios.delete(deleteApiUrl);
      console.log("Delete Response:", response.data);
  
      // Remove the deleted address from the addressFormData state
      setAddressFormData((prevState) => ({
        ...prevState,
        Addresses: prevState.Addresses.filter((address) => address.AddressID !== addressId),
      }));
  
      console.log("Address deleted successfully.");
    } catch (error) {
      console.error("Error deleting address:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };
  

  const handleCancel = () => {
    navigate("/Customer");
  };

  const handleAddressFormDataCancel = () => {
    setAddressFormData({
      AddressID: 0,
      CustomerID: "",
      TenantID: 1,
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
      Addresses: [],
    });
  };

  return (
    <>
      {/* <div className="p-8 mr-10 mb-7 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-1/8 mt-8 bg-white shadow-lg rounded-lg"> */}
      <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto shadow-lg rounded-lg bg-white">
        <Box sx={{ width: "100%" }}>


          <Stepper activeStep={activeStep} className="mb-6" alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {
                onClick: () => handleStepClick(index), // Add onClick handler
                style: { cursor: "pointer" }, // Add cursor style for pointer
              };

              if (isStepOptional(index)) {
                // Optional step logic
              }

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography className="text-center text-xl mb-4">
                All steps completed - you're finished
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                className="justify-center"
              >
                <Button
                  onClick={handleReset}
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr" },
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 2,
                }}
              >
                {activeStep === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="flex items-center gap-4 w-full">
  <label htmlFor="storeName" className="w-1/3 text-xs font-medium text-gray-700">
    Store Name
  </label>
  <div className="w-full">
    <Combobox value={selectedStore} onChange={handleStoreChange}>
      <div className="relative mt-1">
        <Combobox.Input
          id="storeName"
          className="block w-full rounded-md border border-gray-400 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          displayValue={(store) => store?.name || ''}
          placeholder="Select Store"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {storeNames.map((store) => (
            <Combobox.Option
              key={store.id}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                  active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                }`
              }
              value={store}
            >
              {({ selected, active }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                    {store.name}
                  </span>
                  {selected && (
                    <span
                      className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        active ? 'text-white' : 'text-indigo-600'
                      }`}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
</div>
<div></div>
                    {/* First Name */}
                    <div className="flex items-center gap-4">
                      <label className="w-1/3 text-xs font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="FirstName"
                        value={customerFormData.FirstName}
                        onChange={handleCustomerFormChange}
                        className={`p-1 w-full border rounded-md ${
                          error ? "border-red-500" : "border-gray-400"
                        }`}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex items-center gap-4">
                      <label className="w-1/3 text-xs font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="LastName"
                        value={customerFormData.LastName}
                        onChange={handleCustomerFormChange}
                        className={`p-1 w-full border rounded-md ${
                          error ? "border-red-500" : "border-gray-400"
                        }`}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-center gap-4">
                      <label className="w-1/3 text-xs font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="PhoneNumber"
                        value={customerFormData.PhoneNumber}
                        onChange={handleCustomerFormChange}
                        className={`p-1 w-full border rounded-md ${
                          error ? "border-red-500" : "border-gray-400"
                        }`}
                      />
                    </div>

                    
 


                    {/* Email */}
                    <div className="flex items-center gap-4">
                      <label className="w-1/3 text-xs font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={customerFormData.Email}
                        onChange={handleCustomerFormChange}
                        className={`p-1 w-full border rounded-md ${
                          error ? "border-red-500" : "border-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-4">
    <label className="w-1/3 text-xs font-medium text-gray-700">Alternate Phone Number</label>
    <input
      type="text"
      name="AlternatePhoneNumber"
      value={customerFormData.AlternatePhoneNumber}
      onChange={handleCustomerFormChange}

      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`}
    />
  </div>

                    {/* Password */}
                    <div className="flex items-center gap-4">
                      <label className="w-1/3 text-xs font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        name="Password"
                        value={customerFormData.Password}
                        onChange={handleCustomerFormChange}
                        className={`p-1 w-full border rounded-md ${
                          error ? "border-red-500" : "border-gray-400"
                        }`}
                      />
                    </div>

                    {/* Confirm Password */}
                    {/* <div className="flex items-center gap-4">
                      <label className="w-1/3 text-xs font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="ConfirmPassword"
                        value={customerFormData.ConfirmPassword}
                        onChange={handleCustomerFormChange}
                        className={`p-1 w-full border rounded-md ${
                          error ? "border-red-500" : "border-gray-400"
                        }`}
                      />
                    </div> */}

                    {/* Gender */}
                    <div className="flex items-center gap-4">
                      <label className="w-1/3 text-xs font-medium text-gray-700">
                        Gender
                      </label>
                      <Combobox
                        value={selectedGender}
                        onChange={handleGenderChange}
                      >
                        <div className="relative w-full">
                          <Combobox.Input
                            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            displayValue={(gender) => gender.name}
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
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={gender}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected
                                          ? "font-semibold"
                                          : "font-normal"
                                      }`}
                                    >
                                      {gender.name}
                                    </span>
                                    {selected && (
                                      <span
                                        className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                          active
                                            ? "text-white"
                                            : "text-indigo-600"
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


                    <div className="flex flex-col gap-4">
                      {/* Referred By Field */}
                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-xs font-medium text-gray-700">
                          Referred By
                        </label>
                        <div className="w-full">
                          <Combobox
                            as="div"
                            value={selectedReferralType}
                            onChange={handleReferralTypeChange}
                          >
                            <div className="relative">
                              <Combobox.Input
                                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                                displayValue={(type) => type || ""}
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Combobox.Button>

                              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {["Social Media", "Walk-In", "Reference"].map(
                                  (type, index) => (
                                    <Combobox.Option
                                      key={index}
                                      value={type}
                                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                                    >
                                      <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                        {type}
                                      </span>
                                      <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Combobox.Option>
                                  )
                                )}
                              </Combobox.Options>
                            </div>
                          </Combobox>
                        </div>
                      </div>

                      {/* Conditional Rendering for Reference */}
                      {selectedReferralType === "Reference" && (
                        <div className="flex flex-col gap-4">
                          {/* Reference Sub-option */}
                          <div className="flex items-center gap-4">
                            <label className="w-1/3 text-xs font-medium text-gray-700">
                              Reference Sub-option
                            </label>
                            <div className="w-full">
                              <Combobox
                                as="div"
                                value={selectedReferenceSubOption}
                                onChange={handleReferenceSubOptionChange}
                              >
                                <div className="relative">
                                  <Combobox.Input
                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    onChange={(event) =>
                                      setQuery(event.target.value)
                                    }
                                    displayValue={(option) => option || ""}
                                  />
                                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </Combobox.Button>

                                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {["Director", "Employee", "Existing"].map(
                                      (option, index) => (
                                        <Combobox.Option
                                          key={index}
                                          value={option}
                                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                                        >
                                          <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                            {option}
                                          </span>
                                          <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </Combobox.Option>
                                      )
                                    )}
                                  </Combobox.Options>
                                </div>
                              </Combobox>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Conditional Rendering for Social Media */}
                      {selectedReferralType === "Social Media" && (
                        <div className="flex flex-col gap-4">
                          {/* Social Media Platform */}
                          <div className="flex items-center gap-4">
                            <label className="w-1/3 text-xs font-medium text-gray-700">
                              Social Media Platform
                            </label>
                            <div className="w-full">
                              <Combobox
                                as="div"
                                value={selectedSocialMediaPlatform}
                                onChange={handleSocialMediaPlatformChange}
                              >
                                <div className="relative">
                                  <Combobox.Input
                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    onChange={(event) =>
                                      setQuery(event.target.value)
                                    }
                                    displayValue={(platform) => platform || ""}
                                  />
                                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </Combobox.Button>

                                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {["Facebook", "Instagram", "Twitter"].map(
                                      (platform, index) => (
                                        <Combobox.Option
                                          key={index}
                                          value={platform}
                                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                                        >
                                          <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                            {platform}
                                          </span>
                                          <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </Combobox.Option>
                                      )
                                    )}
                                  </Combobox.Options>
                                </div>
                              </Combobox>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Error Message */}
                      {error && (
                        <p className="mt-2 text-red-600 text-xs">{error}</p>
                      )}
                    </div>

                    
                    {/* Comments */}
                    <div className="flex items-center gap-4">
                      <label className="w-1/3 text-xs font-medium text-gray-700">
                        Comments
                      </label>
                      <textarea
                        name="Comments"
                        value={customerFormData?.Comments || ""}
                        onChange={handleCustomerFormChange}
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        rows="1"
                      />
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                      <button
                        type="submit"
                        onClick={handleCustomerFormSubmit}
                        className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {activeStep === 1 && (
                  <div>
                    {/* Address Form */}
                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-xs font-medium text-gray-700">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          name="AddressLine1"
                          value={addressFormData.AddressLine1}
                          onChange={handleAddressFormChange}
                          className={`p-1 w-full border rounded-md ${
                            error ? "border-red-500" : "border-gray-400"
                          }`}
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-xs font-medium text-gray-700">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="AddressLine2"
                          value={addressFormData.AddressLine2}
                          onChange={handleAddressFormChange}
                          className={`p-1 mt-2 mb-1 w-full border rounded-md ${
                            error ? "border-red-500" : "border-gray-400"
                          }`}
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-xs font-medium text-gray-700">
                          Country
                        </label>
                        <div className="w-full">
                          <Combobox
                            as="div"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                          >
                            <div className="relative">
                              <Combobox.Input
                                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                } // Set the query for filtering
                                displayValue={(country) =>
                                  country?.CountryName || ""
                                } // Display selected country name
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

                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-xs font-medium text-gray-700">
                          State
                        </label>
                        <div className="w-full">
                          <Combobox
                            as="div"
                            value={selectedState}
                            onChange={handleStateChange}
                          >
                            <div className="relative">
                              <Combobox.Input
                                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                } // Handle the search query
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

                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-xs font-medium text-gray-700">
                          City
                        </label>
                        <div className="w-full">
                          <Combobox
                            as="div"
                            value={selectedCity}
                            onChange={handleCityChange}
                          >
                            <div className="relative">
                              <Combobox.Input
                                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                } // Handle the search query
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

                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-xs font-medium text-gray-700">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="ZipCode"
                          value={addressFormData.ZipCode}
                          onChange={handleAddressFormChange}
                          className={`p-1 mt-2 mb-1 w-full border rounded-md ${
                            error ? "border-red-500" : "border-gray-400"
                          }`}
                        />
                      </div>

                    
                      <div className="flex justify-end col-span-2">
                        <button
                          onClick={() => {
                            handleAddressFormSubmit(customerId); // Handle the form submission for a specific customer
                          }}
                          className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                        >
                          Add{" "}
                          <span className="text-lg">
                            <IoMdAddCircleOutline />
                          </span>
                        </button>
                    
                         
      <button
        type="button"
        onClick={handleCancel}
        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200 ml-2" // Added ml-2 here
      >
        Cancel
      </button>
  
                      </div>
                    </div> 
                   
                    {/* <TableContainer component={Paper} className="mt-4" sx={{ width: '80%' }}> */}
                    <TableContainer
                      component={Paper}
                      sx={{ width: "90%", margin: "0 auto", mt: 4 }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Address 1</StyledTableCell>
                            <StyledTableCell>Address 2</StyledTableCell>
                            <StyledTableCell>City</StyledTableCell>
                            <StyledTableCell>State</StyledTableCell>
                            <StyledTableCell>Zip Code</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {addressTableData.Addresses &&
                           addressTableData.Addresses.map((address, index) => {
                              if (typeof address === "object") {
                                // Resolve City and State names from their respective maps
                                const cityName =
                                  Object.keys(cityMap).find(
                                    (key) => cityMap[key] === address.CityID
                                  ) || "N/A";
                                const stateName =
                                  Object.keys(stateMap).find(
                                    (key) => stateMap[key] === address.StateID
                                  ) || "N/A";

                                return (
                                  <TableRow key={index}>
                                    <StyledTableCell>
                                      {address.AddressLine1 || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {address.AddressLine2 || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {cityName}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {stateName}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {address.ZipCode || ""}
                                    </StyledTableCell>
                                    {/* <StyledTableCell>
                                      <Button
                                        onClick={() => handleEdit(index)}
                                        startIcon={<FaEdit />}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className="mr-2"
                                      >
                                        Edit
                                      </Button>

                                      <Button
                                        onClick={() => handleDelete(index)}
                                        startIcon={<FaTrashAlt />}
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                      >
                                        Delete
                                      </Button>
                                    </StyledTableCell> */}
                                      {/* <StyledTableCell>
                    <button
                      type="button"
                      onClick={() => handleEdit(index)}
                      className=" m-0.5 inline-flex items-center gap-x-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                      <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className=" inline-flex items-center gap-x-1 m-0.5 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                      <AiOutlineDelete aria-hidden="true" className="h-4 w-4" />
                      Delete
                    </button>
                  </StyledTableCell>  */}
                   <StyledTableCell>
  <button
    type="button"
    onClick={() => handleEdit(index)}
    className="m-0.5 inline-flex items-center justify-center gap-x-2 rounded-md bg-blue-600 px-1 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 w-20 h-8"
  >
    <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
    Edit
  </button>
  <div key={address.AddressID}>
    <button
      type="button"
      onClick={() => handleDelete(address.AddressID)} // Passing AddressID
      className="inline-flex items-center justify-center gap-x-2 m-0.5 rounded-md bg-red-600 px-1 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 w-20 h-8"
    >
      <AiOutlineDelete aria-hidden="true" className="h-4 w-4" />
      Delete
    </button>
  </div>

</StyledTableCell>



                                  </TableRow>
                                );
                              } else if (typeof address === "string") {
                                const addressParts = address.split(", ");
                                return (
                                  <TableRow key={index}>
                                    <StyledTableCell>
                                      {addressParts[0] || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {addressParts[1] || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {addressParts[2] || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {addressParts[3] || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {addressParts[4] || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <Button
                                        onClick={() => handleEdit(index)}
                                        startIcon={<FaEdit />}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className="mr-2"
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        onClick={() => handleDelete(index)}
                                        startIcon={<FaTrashAlt />}
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                      >
                                        Delete
                                      </Button>
                                    </StyledTableCell>
                                  </TableRow>
                                );
                              }
                              return null;
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <div className="mt-6 flex justify-end gap-4">
                      {/* <button
              type="submit"
              // onClick={handleAddressFormSubmit}
              // When calling the function, ensure customerId is not an event
          //  onClick={() => handleAddressFormSubmit(customerId)}

              className="inline-flex justify-center rounded-md border border-transparent bg-custom-darkblue py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-custom-lightblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button> */}
                      {/* <button
              type="button"
              onClick={handleCancel}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:text-black shadow-sm hover:bg-red-200"
            >
              Cancel
            </button> */}
                    </div>
                  </div>
                )}
             
                   {activeStep === 2 && (
  <>
    <TableContainer
      component={Paper}
      sx={{ width: "90%", margin: "0 auto", mt: 4 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Name</StyledTableCell>
            <StyledTableCell>Order Date</StyledTableCell>
            <StyledTableCell>Total Amount</StyledTableCell>
            <StyledTableCell>Order Status</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order.OrderID}>
              <StyledTableCell>{order.OrderNumber}</StyledTableCell>
              <StyledTableCell>
                {new Date(order.OrderDate).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>${order.TotalAmount}</StyledTableCell>
              <StyledTableCell>{order.OrderStatus}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* Cancel Button aligned to the left */}
    <div className="mt-4 flex justify-end">
      <button
        type="button"
        onClick={handleCancel}
        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-200 hover:text-black"
      >
        Cancel
      </button>
    </div>
  </>
)}

                
              </Box>
              
              <Box
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                className="justify-between"
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Back
                </Button>
                {/* <Button
                  // onClick={activeStep === steps.length - 1 ? (isEditMode ? handleUpdateSubmit : handleFormSubmit) : handleNext}
                  onClick={activeStep === steps.length - 1 ? (handleFormSubmit) : handleNext}
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
                >
                  {activeStep === steps.length - 1 ? (isEditMode ? 'Update' : 'Submit') : 'Next'}
                </Button> */}
                
                <Button
                  onClick={() => handleNext()}
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Next
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </>
  );
}

export default AddCustomers;
