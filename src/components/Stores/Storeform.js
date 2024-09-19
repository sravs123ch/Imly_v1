
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/storeContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {CREATEORUPDATE_STORES_API,STOREUSERSBYSTORE_ID_API,GETALLSTOREUSERSBYSTORE_ID_API,COUNTRIES_API,STATES_API,CITIES_API} from "../../Constants/apiRoutes";


// Styled table components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#003375",
    color: theme.palette.common.white,
    fontWeight: "bold",

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Steps for stepper
const steps = ["Store Details", "Store Users"];

function StoreForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeDetails } = useContext(StoreContext);
  const [storeUsers, setStoreUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryMap, setCountryMap] = useState({});
  const [stateMap, setStateMap] = useState({});
  const [cityMap, setCityMap] = useState({});
  const [formData, setFormData] = useState(
    location.state?.storeDetails || {
      TenantID: 1,
      StoreID: null,
      StoreName: "",
      Email: "",
      // Password: "",
      Phone: "",
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
    }
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const isEditMode = Boolean(
    location.state?.storeDetails?.store || storeDetails?.store
  );

  useEffect(() => {
    if (isEditMode) {
      const store = location.state?.storeDetails?.store || storeDetails?.store;
      console.log("Store data in edit mode:", store);  // Log store data
      setFormData({
        TenantID: store?.TenantID || 1,
        StoreID: store?.StoreID || null,
        StoreName: store?.StoreName || "",
        StoreCode: store?.StoreCode || "",
        Email: store?.Email || "",
        Phone: store?.Phone || "",
        AddressLine1: store?.AddressLine1 || "",  
        AddressLine2: store?.AddressLine2 || "",
        CityID: store?.CityID || "",
        StateID: store?.StateID || "",
        CountryID: store?.CountryID || "",
        ZipCode: store?.ZipCode || "",
      });
      
    }
  }, [isEditMode, location.state?.storeDetails?.store, storeDetails?.store]);
  
  


  // Fetch store users based on StoreID
  useEffect(() => {
    const fetchStoreUsers = async (storeId) => {
      if (!storeId) return; // Exit if no storeId

      try {
        const response = await axios.get(
          // `https://imlystudios-backend-mqg4.onrender.com/api/mapstoreusers/mapstoreuser/${storeId}`
          `${STOREUSERSBYSTORE_ID_API}/${storeId}`
        );
        setStoreUsers(response.data.users || []); // Set the users in state
      } catch (err) {
        console.error("Error fetching store users:", err);
        setError("Failed to fetch store users.");
      } finally {
        setLoading(false);
      }
    };

    // Only call fetchStoreUsers if StoreID exists
    if (formData.StoreID) {
      fetchStoreUsers(formData.StoreID);
    }
  }, [formData.StoreID]);

  // Handle search input changes
  //   const handleSearchChange = (e) => {
  //     setSearchQuery(e.target.value);
  //   };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const isUpdate = formData.StoreID ? true : false;
    const apiUrl =
      // "https://imlystudios-backend-mqg4.onrender.com/api/stores/createOrUpdateStore";
      CREATEORUPDATE_STORES_API

    try {
      const response = await axios.post(apiUrl, formData);
      navigate("/Stores");
    } catch (error) {
      console.error("Submission failed:", error);
      if (error.response) {
        setError(
          `Failed to ${isUpdate ? "update" : "create"} store: ` +
          error.response.data.message
        );
      } else if (error.request) {
        setError("No response received from server.");
      } else {
        setError("Error: " + error.message);
      }
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      TenantID: 1,
      StoreID: null,
      StoreName: "",
      Email: "",
      // Password: "",
      Phone: "",
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
    });
  };



  const isStepSkipped = (step) => false;
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [users, setUsers] = useState([]); // All users from the API
  const [filteredUsers, setFilteredUsers] = useState([]); // Users after filtering
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [query, setQuery] = useState('');
  const [tableUsers, setTableUsers] = useState([]); // Users added to the table
  const [selectedUsers, setSelectedUsers] = useState([]); // Users selected in the popup
  const [isModalOpen, setIsModalOpen] = useState(false); // Control the modal state

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          // "https://imlystudios-backend-mqg4.onrender.com/api/mapstoreusers/getallmapstoreuser"
          GETALLSTOREUSERSBYSTORE_ID_API 
        );
        const data = await response.json();
        const usersData = data.data.map((item) => ({
          ...item.User,
          StoreID: item.StoreID,
        }));
        setUsers(usersData); // Store all users data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
    
  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = users.filter(
        (user) =>
          user.FirstName.toLowerCase().includes(query) ||
          user.LastName.toLowerCase().includes(query) ||
          user.Email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
      setIsModalOpen(true); // Open the modal to show filtered results
    } else {
      setFilteredUsers([]); // Clear filtered users if the search query is empty
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle the addition of filtered users to the table
  const handleAddUsers = () => {
    setTableUsers((prevUsers) => [...prevUsers, ...selectedUsers]); // Add selected users to the table
    setSelectedUsers([]); // Clear selected users
    setIsModalOpen(false); // Close the modal after adding users
  };

  // Handle user selection in the popup (you can make this more complex to allow selecting multiple users)
  const handleSelectUser = (user) => {
    setSelectedUsers([user]); // Select the user to be added
  };


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          // 'https://imlystudios-backend-mqg4.onrender.com/api/cities/getCountries'
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

    const countryID = countryMap[selectedCountry.CountryName] || selectedCountry.CountryID;

    setSelectedCountry(selectedCountry);
    setFormData({
      ...formData,
      CountryID: countryID,
      CountryName: selectedCountry.CountryName
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
      StateName: state.StateName
    });
    fetchCitiesByState(stateID);
  };


  const handleCancel = () => {
    // Example: Reset form or navigate to a different page
    console.log('Cancel clicked');
    // If you want to navigate away from the form, for example:
    navigate('/Stores');  // This assumes you're using `react-router-dom` for navigation
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...tableUsers];
    updatedUsers.splice(index, 1);  // Remove the user at the specific index
    setTableUsers(updatedUsers);  // Update the state with the new array
  };
  

  const handleCityChange = (city) => {
    if (!city) return;

    const cityID = cityMap[city.CityName] || city.CityID;

    setSelectedCity(city);
    setFormData({
      ...formData,
      CityID: cityID,
      CityName: city.CityName
    });
  };


  return (
    <div className="p-6 mr-10 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-1/8 rounded-lg">
      <ToastContainer />
      <div className="p-6 mb-7 sm:px-6 lg:px-8 pt-4 bg-white shadow-lg rounded-lg">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={isStepSkipped(index) ? false : undefined}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography className="text-center text-xl mb-4">
                All steps completed - you're finished
              </Typography>
              <Box className="justify-center">
                <Button
                  onClick={handleReset}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <><div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Store Details Form */}
                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">StoreName</label>
                    <input
                      type="text"
                      name="StoreName"
                      value={formData.StoreName}
                      onChange={handleFormChange}
                      className={`p-1 mt-2 mb-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Address Line 1</label>
                    <input
                      type="text"
                      name="AddressLine1"
                      value={formData.AddressLine1}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">StoreCode</label>
                    <input
                      type="text"
                      name="StoreCode"
                      value={formData.StoreCode}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Address Line 2</label>
                    <input
                      type="text"
                      name="AddressLine2"
                      value={formData.AddressLine2}
                      onChange={handleFormChange}
                      className={`p-1 mt-2 mb-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Email</label>
                    <input
                      type="text"
                      name="Email"
                      value={formData.Email}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>



                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Country</label>
                    <div className="w-full">
                      <Combobox as="div" value={selectedCountry} onChange={handleCountryChange}>
                        <div className="relative">
                          <Combobox.Input
                            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            onChange={(event) => setQuery(event.target.value)} // Set the query for filtering
                            displayValue={(country) => country?.CountryName || ''} // Display selected country name
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Combobox.Button>

                          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {countries
                              .filter((country) => country.CountryName.toLowerCase().includes(query.toLowerCase())
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
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                </Combobox.Option>
                              ))}
                          </Combobox.Options>
                        </div>
                      </Combobox>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Contact</label>
                    <input
                      type="text"
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">State</label>
                    <div className="w-full">
                      <Combobox as="div" value={selectedState} onChange={handleStateChange}>
                        <div className="relative">
                          <Combobox.Input
                            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            onChange={(event) => setQuery(event.target.value)} // Handle the search query
                            displayValue={(state) => state?.StateName || ''} // Show the selected state name
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Combobox.Button>

                          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {states
                              .filter((state) => state.StateName.toLowerCase().includes(query.toLowerCase())) // Filter based on query
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
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                </Combobox.Option>
                              ))}
                          </Combobox.Options>
                        </div>
                      </Combobox>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">Zip Code</label>
                    <input
                      type="text"
                      name="ZipCode"
                      value={formData.ZipCode}
                      onChange={handleFormChange}
                      className={`p-1 w-full border rounded-md ${error ? 'border-red-500' : 'border-gray-400'}`} />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-1/3 text-xs font-medium text-gray-700">City</label>
                    <div className="w-full">
                      <Combobox as="div" value={selectedCity} onChange={handleCityChange}>
                        <div className="relative">
                          <Combobox.Input
                            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            onChange={(event) => setQuery(event.target.value)} // Handle the search query
                            displayValue={(city) => city?.CityName || ''} // Show the selected city name
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Combobox.Button>

                          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {cities
                              .filter((city) => city.CityName.toLowerCase().includes(query.toLowerCase())) // Filter based on query
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
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                </Combobox.Option>
                              ))}
                          </Combobox.Options>
                        </div>
                      </Combobox>
                    </div>
                  </div>
                </div><div className="mt-6 flex justify-end gap-4">
                    <button
                      type="submit"
                      onClick={handleFormSubmit}
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
                  </div></>
              )}


              {activeStep === 1 && (
                <div>
                  <div>
                    {/* Search bar */}
                    <div className="flex items-center justify-center mb-4">
                      <input
                        type="text"
                        placeholder="Search by Username"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border rounded p-2 w-64"
                      />
                    </div>

                    {/* Table displaying stored users */}
                    <TableContainer component={Paper}>
                      <Table aria-label="store users table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Phone</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell> {/* Add Action column */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableUsers.map((user, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                {user.FirstName} {user.LastName}
                              </StyledTableCell>
                              <StyledTableCell>{user.Email}</StyledTableCell>
                              <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
                              <StyledTableCell>
                                <Button
                                  onClick={() => handleRemoveUser(index)}  
                                  variant="contained"
                                  color="secondary"
                                >
                                  Remove
                                </Button>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <div className="mt-6 flex justify-end gap-4">
                      <button
                        type="submit"
                        onClick={handleFormSubmit}
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

                    {/* Modal to show filtered users */}
                    <Dialog open={isModalOpen} onClose={handleCloseModal}>
                      <DialogTitle>Filtered Users</DialogTitle>
                      <DialogContent>
                        <TableContainer component={Paper}>
                          <Table aria-label="filtered users table">
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredUsers.map((user) => (
                                <StyledTableRow key={user.UserID}>
                                  <StyledTableCell>
                                    {user.FirstName} {user.LastName}
                                  </StyledTableCell>
                                  <StyledTableCell>{user.Email}</StyledTableCell>
                                  <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
                                  <StyledTableCell>
                                    <Button
                                      onClick={() => handleSelectUser(user)}
                                      variant="contained"
                                    >
                                      Select
                                    </Button>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button
                          onClick={handleAddUsers}
                          variant="contained"
                          disabled={selectedUsers.length === 0} 
                        >
                          Add Users
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              )}

              <Box className="flex justify-between mt-4">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
}

export default StoreForm;