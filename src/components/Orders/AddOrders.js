

import React, { useState, useContext, useEffect, useRef } from "react";
import { CustomerContext } from "../../Context/customerContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosCall, IoMdMail } from "react-icons/io";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUpload } from 'react-icons/fa'
import StatusBadge from './Statuses';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import {
  MdArrowBackIosNew,
  MdDelete,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { IoIosSearch, IoMdAddCircleOutline } from "react-icons/io";
import TablePagination from "@mui/material/TablePagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";
import { FiUpload } from "react-icons/fi";

import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import CustomerSearch from "./CustomerSearch"; // Import the new component
import { FaFileUpload } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import{ CREATE_ORDERS, COUNTRIES_API ,STATES_API,CITIES_API, SEARCH_CUSTOMERS, GETALLCUSTOMERS_API } from "../../Constants/apiRoutes";
const categories = [
  { id: 1, name: "Walk-in", subOptions: ["Newspaper ad"] },
  {
    id: 2,
    name: "Social Media",
    subOptions: ["Google", "Facebook", "Instagram"],
  },
  {
    id: 3,
    name: "Reference",
    subOptions: ["Existing Client", "Directors", "Employee"],
  },
];
const steps = ["Order Details", "Order Status", "payments"];

function AddOrders() {
  const { customerDetails } = useContext(CustomerContext); // Access the CustomerContext
  const handleCustomerSelect = (customer) => {
    setOrderDetails({
      ...orderDetails,
      CustomerID: customer.customerId,
      customerFirstName: customer.customerFirstName,
      customerLastName: customer.customerLastName,
      customerEmail: customer.customerEmail,
      customerPhone: customer.customerPhone,
    });
    setSelectedCustomer(customer); // Set selected customer
    setIsDialogOpen(true);
    setIsFocused(false); // Close the popup after autofill
    setSearchValue("");// Clear the search input after selection

  };
  const handleStepClick = (index) => {
    setActiveStep(index); // Set the active step to the clicked step
    // Add your logic to change the page or navigate here
  };
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State to manage selected customer
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orders1, setOrders1] = useState([]);
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const popupRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  useEffect(() => {
    if (isDialogOpen) {
      setSelectedCountry(selectedCustomer?.CountryID || "");
      setSelectedState(selectedCustomer?.StateID || "");
      setSelectedCity(selectedCustomer?.CityID || "");
    }
  }, [isDialogOpen, selectedCustomer]);
  useEffect(() => {
    if (isDialogOpen) {
      AOS.init(); // Reinitialize AOS animations
    }
  }, [isDialogOpen]);
  useEffect(() => {
    fetchData(searchValue);
  }, []);

  const fetchData = async (value) => {
    try {
      const response = await axios.get(
        // "https://imlystudios-backend-mqg4.onrender.com/api/customers/getAllCustomers",
        GETALLCUSTOMERS_API ,

        {
          params: {
            page: 2,
            pageSize: 10,
            search: value,
          },
        }
      );

      const filteredUsers = response.data.customers.filter((customer) => {
        return (
          value &&
          customer &&
          (customer.FirstName && customer.FirstName.toLowerCase().includes(value.toLowerCase())) ||
          (customer.LastName && customer.LastName.toLowerCase().includes(value.toLowerCase())) ||
          (customer.Email && customer.Email.toLowerCase().includes(value.toLowerCase())) ||
          (customer.PhoneNumber && customer.PhoneNumber.toLowerCase().includes(value.toLowerCase())) ||
          (customer.AddressLine1 && customer.AddressLine1.toLowerCase().includes(value.toLowerCase())) ||
          (customer.AddressLine2 && customer.AddressLine2.toLowerCase().includes(value.toLowerCase())) ||
          (customer.City && customer.City.toLowerCase().includes(value.toLowerCase())) ||
          (customer.State && customer.State.toLowerCase().includes(value.toLowerCase())) ||
          (customer.Country && customer.Country.toLowerCase().includes(value.toLowerCase())) ||
          (customer.Zipcode && customer.Zipcode.toLowerCase().includes(value.toLowerCase()))
          //  (customer.TenantID && customer.TenantID.toLowerCase().includes(value.toLowerCase()))||
          // (customer.CustomerID && customer.CustomerID.toLowerCase().includes(value.toLowerCase()))
        );
      });
      setResults(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleAutoFill = async () => {
    if (!selectedCustomer) {
      console.error("No customer selected.");
      return;
    }

    console.log("Selected Customer Data:", selectedCustomer); // Log to inspect the customer object

    // Assuming customer.Addresses is an array with the address details
    const addresses = selectedCustomer.Addresses && selectedCustomer.Addresses.length > 0 ? selectedCustomer.Addresses[0] : {};
    const { CountryID, StateID, CityID, AddressLine1, AddressLine2, ZipCode, PhoneNumber } = addresses;

    try {
      // Log the address data to check for PhoneNumber
      console.log("Address Data:", addresses);

      // Step 1: Set customer details
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        CustomerID: selectedCustomer.CustomerID || prevDetails.CustomerID || 0,
        customerFirstName: selectedCustomer.FirstName || prevDetails.customerFirstName || "",
        customerLastName: selectedCustomer.LastName || prevDetails.customerLastName || "",
        customerEmail: selectedCustomer.Email || prevDetails.customerEmail || "",
        customerPhone: selectedCustomer.PhoneNumber || prevDetails.customerPhone || "", // Ensure phone number is set
        AddressLine1: AddressLine1 || "",
        AddressLine2: AddressLine2 || "",
        ZipCode: ZipCode || "",
        TotalAmount: prevDetails.TotalAmount || selectedCustomer.TotalAmount || "",
        OrderStatus: prevDetails.OrderStatus || selectedCustomer.OrderStatus || "",
        OrderBy: prevDetails.OrderBy || selectedCustomer.OrderBy || "",
        Type: prevDetails.Type || selectedCustomer.Type || "",
        DeliveryDate: prevDetails.DeliveryDate || selectedCustomer.DeliveryDate || "",
        PaymentMethod: prevDetails.PaymentMethod || selectedCustomer.PaymentMethod || "",
        PaymentStatus: prevDetails.PaymentStatus || selectedCustomer.PaymentStatus || "",
        MaskedCardNumber: prevDetails.MaskedCardNumber || selectedCustomer.MaskedCardNumber || "",
        ExpectedCompleteDate: prevDetails.ExpectedCompleteDate || selectedCustomer.ExpectedCompleteDate || "",
        Comments: prevDetails.Comments || selectedCustomer.Comments || "",
        ReferedBy: prevDetails.ReferedBy || selectedCustomer.ReferedBy || "walk-in",
        PaymentComments: prevDetails.PaymentComments || selectedCustomer.PaymentComments || "",
        assginto: prevDetails.assginto || selectedCustomer.AssignedTo || "",
        AdvanceAmount: prevDetails.AdvanceAmount || selectedCustomer.AdvanceAmount || "",
        BalenceAmount: prevDetails.BalenceAmount || selectedCustomer.BalenceAmount || "",
        ExpectedDurationDays: prevDetails.ExpectedDurationDays || selectedCustomer.ExpectedDurationDays || "",
        DesginerName: prevDetails.DesginerName || selectedCustomer.DesignerName || "",
        UploadImages: prevDetails.UploadImages || selectedCustomer.UploadImages || "",
        choosefiles: prevDetails.choosefiles || selectedCustomer.ChooseFiles || "",
      }));

      // Explicitly update the phone number field if it's not updated
      if (PhoneNumber) {
        setOrderDetails(prevDetails => ({
          ...prevDetails,
          customerPhone: PhoneNumber
        }));
      }

      // Step 2: Handle country
      if (CountryID) {
        const country = countries.find(c => c.CountryID === CountryID);
        if (country) {
          setSelectedCountry(country);
          setOrderDetails(prevDetails => ({
            ...prevDetails,
            CountryID: CountryID,
            CountryName: country.CountryName,
          }));

          // Step 3: Fetch and handle states
          const stateResponse = await axios.get(`
            // https://imlystudios-backend-mqg4.onrender.com/api/cities/getStatesByCountry?$filter=CountryID eq ${CountryID}`

 `${STATES_API}/${CountryID}`
          );
          if (stateResponse.data.status === "SUCCESS") {
            const stateData = stateResponse.data.data;
            setStates(stateData);

            const state = stateData.find(s => s.StateID === StateID);
            if (state) {
              setSelectedState(state);
              setOrderDetails(prevDetails => ({
                ...prevDetails,
                StateID: StateID,
                StateName: state.StateName,
              }));

              // Step 4: Fetch and handle cities
              const cityResponse = await axios.get(
                // `https://imlystudios-backend-mqg4.onrender.com/api/cities/getCitiesByState?$filter=StateID eq ${StateID}`
                `${CITIES_API}/${StateID}`
              );
              if (cityResponse.data.status === "SUCCESS") {
                const cityData = cityResponse.data.data;
                setCities(cityData);

                const city = cityData.find(c => c.CityID === CityID);
                if (city) {
                  setSelectedCity(city);
                  setOrderDetails(prevDetails => ({
                    ...prevDetails,
                    CityID: CityID,
                    CityName: city.CityName,
                  }));
                }
              }
            }
          }
        }
      }

      // Optionally close dialog
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error during autofill:", error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  }

  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchData(value); // Trigger the search based on input value
  };
  useEffect(() => {
    // Hide the popup if clicked outside
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");

  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );

  const subOptions = selectedCategory
    ? categories.find((cat) => cat.id === selectedCategory.id)?.subOptions || []
    : [];
  const currentDate = new Date().toISOString().split("T")[0];

  const [orderDetails, setOrderDetails] = useState({
    TenantID: 1,
    CustomerID: customerDetails?.customerId || 0,
    OrderDate: currentDate,
    TotalQuantity: 0,
    Address: {
      AddressLine1: "",
      AddressLine2: "",
      CityID: "",
      StateID: "",
      CountryID: "",
      ZipCode: "",
      TenantID: 123
    },
    // AddressLine1: "",
    // AddressLine2: "",
    // CityID: "",
    // StateID: "",
    // CountryID: "",
    // ZipCode: "",
    TotalAmount: "",
    OrderStatus: "",
    OrderBy: "",
    Type: "",
    DeliveryDate: "",
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    customerPhone: "",
    PaymentMethod: "",
    PaymentStatus: "",
    MaskedCardNumber: "",
    ExpectedCompleteDate: "",
    Comments: "",
    ReferedBy: "walk-in",
    PaymentComments: "",
    assginto: "",
    AdvanceAmount: "",
    BalenceAmount: "",
    ExpectedDurationDays: "",
    DesginerName: "",
    UploadImages: "",
    choosefiles: "",
  });
  useEffect(() => {
    if (customerDetails) {
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        CustomerID: customerDetails.customerId,
      }));
    }
  }, [customerDetails]);

  console.log(results);
  const handleCategoryChange = (category) => {
    setQuery("");
    setSelectedCategory(category);
    setSelectedSubOption(""); // Reset sub-option when category changes
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      categories: category ? category.name : "",
    }));
  };
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);
  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };
  const handledate = (e) => {
    const { name, value } = e.target;

    setOrderDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, [name]: value };

      // If ExpectedDurationDays is changed, validate and update DeliveryDate automatically
      if (name === "ExpectedDurationDays") {
        const days = parseInt(value, 10); // Parse the value as an integer

        if (!isNaN(days) && days >= 0) {
          // Only update DeliveryDate if the value is a valid non-negative number
          const today = new Date();
          const deliveryDate = addDays(today, days + 1); // Add 1 extra day for a 5-day gap
          updatedDetails.DeliveryDate = deliveryDate;

          // Clear any previous error
          setErrors((prevErrors) => ({
            ...prevErrors,
            ExpectedDurationDays: '',
          }));
        } else if (value === '') {
          // Clear DeliveryDate if ExpectedDurationDays is cleared
          updatedDetails.DeliveryDate = '';
        } else {
          // Set an error message if the value is not a valid number
          setErrors((prevErrors) => ({
            ...prevErrors,
            ExpectedDurationDays: 'Please enter a valid number of days.',
          }));
        }
      }

      return updatedDetails;
    });
  };
  const handling = (e) => {
    const { name, value } = e.target;

    setOrderDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, [name]: value };

      // If ExpectedDurationDays is changed, validate and update DeliveryDate automatically
      if (name === "ExpectedDurationDays") {
        const days = parseInt(value, 10); // Parse the value as an integer

        if (!isNaN(days) && days >= 0) {
          // Only update DeliveryDate if the value is a valid non-negative number
          const today = new Date();
          const deliveryDate = addDays(today, days + 1); // Add 1 extra day for a 5-day gap
          updatedDetails.ExpectedCompleteDate = deliveryDate;

          // Clear any previous error
          setErrors((prevErrors) => ({
            ...prevErrors,
            ExpectedDurationDays: '',
          }));
        } else if (value === '') {
          // Clear DeliveryDate if ExpectedDurationDays is cleared
          updatedDetails.ExpectedCompleteDate = '';
        } else {
          // Set an error message if the value is not a valid number
          setErrors((prevErrors) => ({
            ...prevErrors,
            ExpectedDurationDays: 'Please enter a valid number of days.',
          }));
        }
      }

      return updatedDetails;
    });
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
    setImagePreviews([
      ...imagePreviews,
      ...newImages.map((img) => img.preview),
    ]);
   };

   const handleImageRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
   };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const existingCustomer = results.find(
      (customer) => customer.Email === orderDetails.customerEmail
    );

    // If the customer is not found in the fetched results, set CustomerID to 0
    const customerID = existingCustomer ? existingCustomer.CustomerID : 0;
    const data = new FormData();

    // Append all form data to the FormData object
    for (let key in orderDetails) {
      if (key !== "UploadImages" && key !== "choosefiles") {
        data.append(key, orderDetails[key]);
      }
    }
    images.forEach((image) => {
      data.append("UploadImages", image.file); // Appending multiple images with the same key
    });

    // Append PDF file
    if (pdfFile) {
      data.append("choosefiles", pdfFile);
    }

    try {
      const response = await axios.post(
        // "https://imlystudios-backend-mqg4.onrender.com/api/orders/createOrder",
        CREATE_ORDERS,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Order created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Order created successfully:", response.data);
    } catch (error) {
      console.log("Order created successfully:", data);
    }
    const newErrors = {};
    if (!orderDetails.OrderDate) {
      newErrors.OrderDate = "Order Date is required";
      console.log("Order Date is required");
    }
    if (!orderDetails.TotalQuantity) {
      newErrors.TotalQuantity = "Total Quantity is required";
      console.log("Total Quantity is required");
    }
    if (!orderDetails.AddressLine1) {
      newErrors.AddressLine1 = "Address Line 1 is required";
      console.log("Address Line 1 is required");
    }
    if (!orderDetails.AddressLine2) {
      newErrors.AddressLine2 = "Address Line 2 is required";
      console.log("Address Line 2 is required");
    }
    if (!orderDetails.CityID) {
      newErrors.CityID = "City ID is required";
      console.log("City ID is required");
    }
    if (!orderDetails.StateID) {
      newErrors.StateID = "State ID is required";
      console.log("State ID is required");
    }
    if (!orderDetails.CountryID) {
      newErrors.CountryID = "Country ID is required";
      console.log("Country ID is required");
    }
    if (!orderDetails.ZipCode) {
      newErrors.ZipCode = "Zip Code is required";
      console.log("Zip Code is required");
    }
    if (!orderDetails.TotalAmount) {
      newErrors.TotalAmount = "Total Amount is required";
      console.log("Total Amount is required");
    }
    if (!orderDetails.OrderStatus) {
      newErrors.OrderStatus = "Order Status is required";
      console.log("Order Status is required");
    }
    if (!orderDetails.OrderBy) {
      newErrors.OrderBy = "Order By is required";
      console.log("Order By is required");
    }
    if (!orderDetails.Type) {
      newErrors.Type = "Type is required";
      console.log("Type is required");
    }
    if (!orderDetails.DeliveryDate) {
      newErrors.DeliveryDate = "Delivery Date is required";
      console.log("Delivery Date is required");
    }
    if (!orderDetails.customerFirstName) {
      newErrors.customerFirstName = "Customer First Name is required";
      console.log("Customer First Name is required");
    }
    if (!orderDetails.customerLastName) {
      newErrors.customerLastName = "Customer Last Name is required";
      console.log("Customer Last Name is required");
    }
    if (!orderDetails.customerEmail) {
      newErrors.customerEmail = "Customer Email is required";
      console.log("Customer Email is required");
    }
    if (!orderDetails.customerPhone) {
      newErrors.customerPhone = "Customer Phone is required";
      console.log("Customer Phone is required");
    }
    if (!orderDetails.PaymentMethod) {
      newErrors.PaymentMethod = "Payment Method is required";
      console.log("Payment Method is required");
    }
    if (!orderDetails.PaymentStatus) {
      newErrors.PaymentStatus = "Payment Status is required";
      console.log("Payment Status is required");
    }
    if (!orderDetails.MaskedCardNumber) {
      newErrors.MaskedCardNumber = "Masked Card Number is required";
      console.log("Masked Card Number is required");
    }
    if (!orderDetails.ExpectedCompleteDate) {
      newErrors.ExpectedCompleteDate = "Expected Complete Date is required";
      console.log("Expected Complete Date is required");
    }
    if (!orderDetails.Comments) {
      newErrors.Comments = "Comments are required";
      console.log("Comments are required");
    }
    if (!orderDetails.ReferedBy) {
      newErrors.ReferedBy = "Referred By is required";
      console.log("Referred By is required");
    }
    if (!orderDetails.PaymentComments) {
      newErrors.PaymentComments = "Payment Comments are required";
      console.log("Payment Comments are required");
    }
    if (!orderDetails.assginto) {
      newErrors.assginto = "Assigned To is required";
      console.log("Assigned To is required");
    }
    if (!orderDetails.AdvanceAmount) {
      newErrors.AdvanceAmount = "Advance Amount is required";
      console.log("Advance Amount is required");
    }
    if (!orderDetails.BalenceAmount) {
      newErrors.BalenceAmount = "Balance Amount is required";
      console.log("Balance Amount is required");
    }
    if (!orderDetails.ExpectedDurationDays) {
      newErrors.ExpectedDurationDays = "Expected Duration Days is required";
      console.log("Expected Duration Days is required");
    }
    if (!orderDetails.DesginerName) {
      newErrors.DesginerName = "Designer Name is required";
      console.log("Designer Name is required");
    }
    if (images.length === 0) {
      newErrors.UploadImages = "Upload Images are required";
      console.log("Upload Images are required");
    }
    if (!pdfFile) {
      newErrors.choosefiles = "Choose Files is required";
      console.log("Choose Files is required");
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setSubmittedDetails({
      ...orderDetails,
      images: imagePreviews,
      category: selectedCategory?.name || "",
      subOption: selectedSubOption || "",
    }); // Store the submitted details including image previews
    setShowAlert(true);

    setOrderDetails({
      TenantID: 1,
      CustomerID: 0,
      OrderDate: currentDate,
      TotalQuantity: 0,
      Address: {
        AddressLine1: "",
        AddressLine2: "",
        CityID: "",
        StateID: "",
        CountryID: "",
        ZipCode: "",
        TenantID: 123
      },
      // AddressLine1: "",
      // AddressLine2: "",
      // CityID: "",
      // StateID: "",
      // CountryID: "",
      // ZipCode: "",
      TotalAmount: "",
      OrderStatus: "",
      OrderBy: "",
      Type: "",
      DeliveryDate: "",
      customerFirstName: "",
      customerLastName: "",
      customerEmail: "",
      customerPhone: "",
      PaymentMethod: "",
      PaymentStatus: "",
      MaskedCardNumber: "",
      ExpectedCompleteDate: "",
      Comments: "",
      ReferedBy: "walk-in",
      PaymentComments: "",
      assginto: "",
      AdvanceAmount: "",
      BalenceAmount: "",
      ExpectedDurationDays: "",
      DesginerName: "",
      UploadImages: "",
      choosefiles: "",
    });
    setImages([]);
    setImagePreviews([]);
    setSelectedSubOption("");

    setActiveStep(0); // Reset stepper to first step
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
   };

   const handleCancel = () => {
    setOrderDetails({
      TenantID: 1,
      CustomerID: customerDetails?.customerId || 0,
      OrderDate: currentDate,
      TotalQuantity: 0,
      Address: {
        AddressLine1: "",
        AddressLine2: "",
        CityID: "",
        StateID: "",
        CountryID: "",
        ZipCode: "",
        TenantID: 123
      },
      // AddressLine1: "",
      // AddressLine2: "",
      // CityID: "",
      // StateID: "",
      // CountryID: "",
      // ZipCode: "",
      TotalAmount: "",
      OrderStatus: "",
      OrderBy: "",
      Type: "",
      DeliveryDate: "",
      customerFirstName: "",
      customerLastName: "",
      customerEmail: "",
      customerPhone: "",
      PaymentMethod: "",
      PaymentStatus: "",
      MaskedCardNumber: "",
      ExpectedCompleteDate: "",
      Comments: "",
      ReferedBy: "walk-in",
      PaymentComments: "",
      assginto: "",
      AdvanceAmount: "",
      BalenceAmount: "",
      ExpectedDurationDays: "",
      DesginerName: "",
      UploadImages: "",
      choosefiles: "",
    });
    setActiveStep(0); // Optional: Reset to the first step
  };

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

  const amountToBePaid = orderDetails.TotalAmount - orderDetails.AdvanceAmount;
  const remainder = amountToBePaid / orderDetails.installments;
  const [showSearchCard, setShowSearchCard] = useState(false);
  const getFirstAddress = (addresses) => {
    // Assuming addresses is a comma-separated string or array of addresses
    if (Array.isArray(addresses)) {
      return addresses[0]; // Return the first address if it's an array
    }
    return addresses.split(',')[0]; // Return the first address from a comma-separated string
  };
  const handleDateChanging = (e) => {
    const { value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      DeliveryDate: value, // Manually update the DeliveryDate
    }));
  };
  const handleDateChang = (e) => {
    const { value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      ExpectedCompleteDate: value, // Manually update the DeliveryDate
    }));
  };
  const handleAddOrder = () => {
    // Validate the form fields
    const newErrors = {};
    if (!orderDetails.OrderStatus)
      newErrors.OrderStatus = "Order Status is required";
    if (!orderDetails.assginto) newErrors.assginto = "Assign To is required";
    if (!orderDetails.ExpectedDurationDays)
      newErrors.ExpectedDurationDays =
        "Expected Duration (In Days) is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Add the order to the orders array
      setOrders([...orders, orderDetails]);

      // Clear the form fields
      setOrderDetails({
        OrderStatus: "",
        assginto: "",
        ExpectedDurationDays: "",
      });
    }
  };

  const handleExistingUserClick = () => {
    setShowSearchCard(!showSearchCard);
  };

  const handleAddOrderes = () => {
    const newErrors = {};
    if (!orderDetails.PaymentMethod)
      newErrors.PaymentMethod = "PaymentMethod is required";
    if (!orderDetails.PaymentStatus)
      newErrors.PaymentStatus = "PaymentStatus is required";
    if (!orderDetails.MaskedCardNumber)
      newErrors.MaskedCardNumber = "MaskedCardNumber Type is required";
    if (!orderDetails.PaymentComments)
      newErrors.PaymentComments = "PaymentComments  is required";
    if (!orderDetails.AdvanceAmount)
      newErrors.AdvanceAmount = "Amount is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Add the order to the orders array
      setOrders1([...orders1, orderDetails]);

      // Clear the form fields
      setOrderDetails({
        PaymentMethod: "",
        PaymentStatus: "",
        MaskedCardNumber: "",
        PaymentComments: "",
        AdvanceAmount:"",
      });
    }
  };
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState("");
  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      setPdfPreview(URL.createObjectURL(file));
    }
  };

  const handlePdfRemove = () => {
    setPdfFile(null);
    setPdfPreview("");
  };
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleDelete = () => {
    setFile(null);
  };
  const [file1, setFile1] = useState(null);
  const handleFileChange1 = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile1(uploadedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleDelete1 = () => {
    setFile1(null);
  };
  const [selectedReferralType, setSelectedReferralType] = useState("");
  const [selectedReferenceSubOption, setSelectedReferenceSubOption] =
    useState("");
  const [selectedSocialMediaPlatform, setSelectedSocialMediaPlatform] =
    useState("");
  const [error, setError] = useState("");
  const handleReferralTypeChange = (value) => {
    setSelectedReferralType(value);
    setOrderDetails({ ...orderDetails, ReferedBy: value });
  };
  const handleReferenceSubOptionChange = (value) => {
    setSelectedReferenceSubOption(value);
  };
  const handleRefereeNameChange = (event) => {
    setOrderDetails({ ...orderDetails, refereeName: event.target.value });
  };
  const handleSocialMediaPlatformChange = (value) => {
    setSelectedSocialMediaPlatform(value);
    setOrderDetails({ ...orderDetails, socialMediaPlatform: value });
  };

  useEffect(() => {
    if (customerDetails) {
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        CustomerID: customerDetails.customerId,
        customerFirstName: customerDetails.customerFirstName,
        customerLastName: customerDetails.customerLastName,
        customerEmail: customerDetails.customerEmail,
        customerPhone: customerDetails.customerPhone,
      }));
    }
  }, [customerDetails]);

  const handleSearch = async () => {
    try {
      if (query.trim()) {
        const response = await axios.get(
          // `https://imlystudios-backend-mqg4.onrender.com/api/customers/getCustomerById/${query}`
       
            `${SEARCH_CUSTOMERS}/${query}`
        );
        setOrderDetails({
          ...orderDetails,
          CustomerID: response.data.customerId,
          customerFirstName: response.data.customerFirstName,
          customerLastName: response.data.customerLastName,
          customerEmail: response.data.customerEmail,
          customerPhone: response.data.customerPhone,
        });
        setError(null);
      } else {
        setError("Please enter a valid search query.");
      }
    } catch (err) {
      setError("Error fetching customer data.");
    }
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
        // `https://imlystudios-backend-mqg4.onrender.com/api/cities/getCitiesByState?$filter=StateID eq ${stateId}`);
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
    setOrderDetails({
      ...orderDetails,
      CountryID: countryID,
      CountryName: selectedCountry.CountryName
    });
    fetchStatesByCountry(countryID);
  };

  const handleStateChange = (state) => {
    if (!state) return;

    const stateID = stateMap[state.StateName] || state.StateID;

    setSelectedState(state);
    setOrderDetails({
      ...orderDetails,
      StateID: stateID,
      StateName: state.StateName
    });
    fetchCitiesByState(stateID);
  };

  const handleCityChange = (city) => {
    if (!city) return;

    const cityID = cityMap[city.CityName] || city.CityID;

    setSelectedCity(city);
    setOrderDetails({
      ...orderDetails,
      CityID: cityID,
      CityName: city.CityName
    });
  };


  return (
    <>
      <div className="p-6 mr-10 mb-7 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-1/8 mt-8 bg-white shadow-lg rounded-lg">
      <ToastContainer />
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} className="mb-6" alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {};
              // const labelProps = {};
              const labelProps = {
                onClick: () => handleStepClick(index), // Add onClick handler
                style: { cursor: 'pointer' }, // Add cursor style for pointer
              };

              if (isStepOptional(index)) {
                // Optional step logic
              }

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              // labelProps.onClick = () => handleStepClick(index); // Add onClick handler

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    {label} {/* Label for the step */}
                  </StepLabel>
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
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // 1 column by default, 2 columns for sm screens and above
                gap: 2,
                pt: 2,
                width: '100%', // Ensure the box takes the full width of the container
                maxWidth: '100%', // Prevent the box from exceeding the screen width
                '@media (max-width: 1300px)': {
                  gridTemplateColumns: "1fr", // Stack fields vertically below 1300px
                },
                '@media (max-width: 700px)': {
                  gridTemplateColumns: "1fr", // Keep one column layout for smaller screens
                  overflowX: "hidden", // Prevent overflow in the x-direction
                },
              }}
            
              >
                {activeStep === 0 && (
                  <>
                    <div className="grid ">

                      <div className="flex justify-left items-center h-full">
                        <div className="relative flex flex-col w-[32rem] pb-2">
                          <input
                            id="searchName"
                            type="text"
                            placeholder="Search by Name..."
                            value={searchValue}
                            onChange={handleSearchInput}
                            onFocus={() => setIsFocused(true)}
                            className="mt-1 p-2 pr-10 border border-gray-300 rounded-md"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <IoIosSearch aria-label="Search Icon" />
                          </div>

                          <div
                            className={`absolute top-full mt-1 border-solid border-2 rounded-lg p-2 w-full bg-white z-10 ${isFocused && results.length ? "block" : "hidden"
                              }`}
                          >
                            {results.length > 0 && (
                              <div className="mb-2 text-sm text-gray-600">
                                {results.length} Result{results.length > 1 ? "s" : ""}
                              </div>
                            )}

                            {[...new Map(results.map((result) => [result.CustomerID, result])).values()].map((result) => (
                              <div
                                className="relative cursor-pointer flex flex-col p-2 hover:bg-gray-100 group"
                                key={result.CustomerID}
                                onClick={() => handleCustomerSelect(result)}
                              >
                                <span className="font-medium">
                                  {result.FirstName} {result.LastName}
                                </span>
                                <div className="flex items-center text-sm text-gray-500">
                                  <IoIosCall className="w-4 h-4 mr-1" aria-label="Phone Icon" />
                                  <span>{result.PhoneNumber}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <IoMdMail className="w-4 h-4 mr-1" aria-label="Email Icon" />
                                  <span>{result.Email}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {isDialogOpen && selectedCustomer && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200 relative" data-aos="zoom-in">
                              <div className="absolute top-0 left-0 right-0 bg-gray-600 p-4 rounded-t-2xl border-b border-gray-400 flex items-center justify-between z-10" data-aos="fade-up">
                                <h2 className="text-3xl font-bold text-white">Customer Details</h2>
                                <button className="flex items-center justify-center text-white" onClick={handleClose} data-aos="fade-up">
                                  <span className="flex items-center justify-center h-5 w-5 bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-300 text-white text-xs">&#10005;</span>
                                </button>
                              </div>

                              <div className="pt-20 space-y-2">
                                <p className="text-gray-800 text-lg leading-tight" data-aos="fade-right"><strong>Name:</strong> {selectedCustomer.FirstName} {selectedCustomer.LastName}</p>
                                <p className="text-gray-800 text-lg leading-tight" data-aos="fade-right"><strong>Phone:</strong> {selectedCustomer.PhoneNumber}</p>
                                <p className="text-gray-800 text-lg leading-tight" data-aos="fade-right"><strong>Email:</strong> {selectedCustomer.Email}</p>

                                <div>
                                  <strong className="text-gray-800 text-lg leading-tight" data-aos="fade-up">Address:</strong>
                                  <div className="mt-2 space-y-2">
                                    {selectedCustomer.Addresses?.map((address, index) => (
                                      <div key={index} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105" data-aos="fade-left">
                                        <input
                                          type="radio"
                                          name="address"
                                          className="form-radio h-5 w-5 text-green-600 mr-4"
                                          checked={selectedAddress === address}
                                          onChange={() => handleAddressChange(address)}
                                        />
                                        <span className="text-gray-800">
                                          {address.AddressLine1}, {address.AddressLine2}, {address.CityID}, {address.StateID}, {address.CountryID}, {address.ZipCode}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end mt-6">
                                <button className="py-3 px-8 bg-gray-600 text-white rounded-lg hover:bg-gray-600 transition-all shadow-lg transform hover:scale-105" onClick={handleAutoFill} data-aos="fade-up">
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>


                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="customerFirstName"
                          value={orderDetails.customerFirstName}
                          onChange={handleChange}
                          className={` p-1 mt-2 mb-1 w-full border rounded-md ${errors.customerFirstName
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.customerFirstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.customerFirstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="customerLastName"
                          value={orderDetails.customerLastName}
                          onChange={handleChange}
                          className={` p-1 mt-2 mb-1 w-full border rounded-md ${errors.customerLastName
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.customerLastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.customerLastName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="customerEmail"
                          value={orderDetails.customerEmail}
                          onChange={handleChange}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.customerEmail
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.customerEmail && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.customerEmail}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="number"
                          name="customerPhone"
                          value={orderDetails.customerPhone}
                          onChange={handleChange}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.customerPhone
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.customerPhone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.customerPhone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Project Type
                        </label>
                        <select
                          name="Type"
                          value={orderDetails.Type}
                          onChange={handleChange}
                          className={`p-1 mt-2 mb-1 w-full border rounded-md ${errors.Type ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                          <option value="select a type">Select a Type</option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Wardrobe">Wardrobe</option>
                          <option value="Living">Living</option>
                          <option value="2 BHK">2 BHK</option>
                          <option value="3 BHK">3 BHK</option>
                          <option value="TV unit">
                             TV unit
                          </option>
                          <option value="Crockery">
                             Crockery
                          </option>
                          <option value=" Shoe rack">
                            Shoe rack
                          </option> 
                          <option value="Vanities">
                              Vanities
                          </option>
                          <option value="Others">
                              Others
                          </option>
                        </select>
                        {errors.Type && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.Type}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Expected Duration (In Days)
                        </label>
                        <input
                          type="number"
                          name="ExpectedDurationDays"
                          value={orderDetails.ExpectedDurationDays}
                          onChange={handling}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.ExpectedDurationDays
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.Comments && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.ExpectedDurationDays}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Order Date
                        </label>
                        <input
                          type="date"
                          name="OrderDate"
                          value={orderDetails.OrderDate || currentDate}
                          onChange={handleChange}
                          className={`p-1 mt-2 mb-1 w-full border rounded-md ${errors.OrderDate
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.OrderDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.OrderDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Expected Delivery Date
                        </label>
                        <input
                          type="date"
                          name="ExpectedCompleteDate"
                          value={orderDetails.ExpectedCompleteDate}
                          onChange={handleDateChang}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.ExpectedCompleteDate
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.ExpectedCompleteDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.ExpectedCompleteDate}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700">
                          Referred By
                        </label>
                        <Combobox
                          as="div"
                          value={selectedReferralType}
                          onChange={handleReferralTypeChange}
                        >
                          <div className="relative">
                            <Combobox.Input
                              className="w-full mt-2 mb-1 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(event) => setQuery(event.target.value)}
                              displayValue={(type) => type || ""}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <ChevronUpDownIcon
                                className="h-5 w-5  text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>

                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {["Social Media", "Walk-In", "Reference"].map(
                                (type, index) => (
                                  <Combobox.Option
                                    key={index}
                                    value={type}
                                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                  >
                                    <span className="block truncate group-data-[selected]:font-semibold">
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
                        {/* Conditionally render the additional input fields */}
                        {selectedReferralType === "Reference" && (
                          <div className="mt-4">
                            <label className="block text-xs font-medium text-gray-700">
                              Reference Sub-option
                            </label>
                            <Combobox
                              as="div"
                              value={selectedReferenceSubOption}
                              onChange={handleReferenceSubOptionChange}
                            >
                              <div className="relative">
                                <Combobox.Input
                                  className="w-full mt-2 mb-1 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                      >
                                        <span className="block truncate group-data-[selected]:font-semibold">
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
                        )}
                        {selectedReferralType === "Reference" &&
                          selectedReferenceSubOption && (
                            <div className="mt-4">
                              <label className="block text-xs font-medium text-gray-700">
                                Referee Name
                              </label>
                              <input
                                type="text"
                                name="refereeName"
                                value={orderDetails.refereeName}
                                onChange={handleRefereeNameChange}
                                className="w-full mt-2 mb-1 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          )}
                        {selectedReferralType === "Social Media" && (
                          <div className="mt-4">
                            <label className="block text-xs font-medium text-gray-700">
                              Social Media Platform
                            </label>
                            <Combobox
                              as="div"
                              value={selectedSocialMediaPlatform}
                              onChange={handleSocialMediaPlatformChange}
                            >
                              <div className="relative">
                                <Combobox.Input
                                  className="w-full mt-2 mb-1 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                      >
                                        <span className="block truncate group-data-[selected]:font-semibold">
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
                        )}
                        {error && (
                          <p className="mt-0 text-red-600 text-xs">{error}</p>
                        )}
                      </div>
                    </div>
                      {/* <div className="grid">

                      </div> */}
                    <div className="grid">
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Address line1
                        </label>
                        <input
                          type="text"
                          name="AddressLine1"
                          value={orderDetails.AddressLine1}
                          onChange={handleChange}
                          className={`p-1  mt-2 mb-1 w-full border rounded-md ${errors.AddressLine1
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.AddressLine1 && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.AddressLine1}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Address line2
                        </label>
                        <input
                          type="text"
                          name="AddressLine2"
                          value={orderDetails.AddressLine2}
                          onChange={handleChange}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.AddressLine2
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.AddressLine2 && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.AddressLine2}
                          </p>
                        )}
                      </div>

                      <div className="mt-0">
                        <label className="block text-xs font-medium text-gray-700">Country</label>
                        <div className="relative mt-2">
                          <Combobox as="div" value={selectedCountry} onChange={handleCountryChange}>
                            <div className="relative">
                              <Combobox.Input
                                className={`p-1 w-full border rounded-md ${errors.CountryID ? "border-red-500" : "border-gray-300"}`}
                                onChange={(event) => setQuery(event.target.value)}
                                displayValue={(country) => country?.CountryName || ''}
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </Combobox.Button>
                              <Combobox.Options className="absolute mt-1 max-h-60 w-full z-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {countries
                                  .filter((country) =>
                                    country.CountryName.toLowerCase().includes(query.toLowerCase())
                                  )
                                  .map((country) => (
                                    <Combobox.Option
                                      key={country.CountryID}
                                      value={country}
                                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
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
                          {errors.CountryID && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.CountryID}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700">State</label>
                        <div className="relative mt-2">
                          <Combobox as="div" value={selectedState} onChange={handleStateChange}>
                            <div className="relative">
                              <Combobox.Input
                                className={`p-1 w-full border rounded-md ${errors.StateID ? "border-red-500" : "border-gray-300"}`}
                                onChange={(event) => setQuery(event.target.value)}
                                displayValue={(state) => state?.StateName || ''}
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </Combobox.Button>
                              <Combobox.Options className="absolute mt-1 max-h-60 w-full z-20  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {states
                                  .filter((state) => state.StateName.toLowerCase().includes(query.toLowerCase()))
                                  .map((state) => (
                                    <Combobox.Option
                                      key={state.StateID}
                                      value={state}
                                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
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
                          {errors.StateID && (
                            <p className="text-red-500 text-sm mt-1">{errors.StateID}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700">City</label>
                        <div className="relative mt-2">
                          <Combobox as="div" value={selectedCity} onChange={handleCityChange}>
                            <div className="relative">
                              <Combobox.Input
                                className={`p-1 w-full border rounded-md ${errors.CityID ? "border-red-500" : "border-gray-300"}`}
                                onChange={(event) => setQuery(event.target.value)}
                                displayValue={(city) => city?.CityName || ''}
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </Combobox.Button>
                              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {cities
                                  .filter((city) => city.CityName.toLowerCase().includes(query.toLowerCase()))
                                  .map((city) => (
                                    <Combobox.Option
                                      key={city.CityID}
                                      value={city}
                                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
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
                          {errors.CityID && (
                            <p className="text-red-500 text-sm mt-1">{errors.CityID}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Zipcode
                        </label>
                        <input
                          type="number"
                          name="ZipCode"
                          value={orderDetails.ZipCode}
                          onChange={handleChange}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.ZipCode
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.ZipCode && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.ZipCode}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Comments
                        </label>
                        <input
                          type="text"
                          name="Comments"
                          value={orderDetails.Comments}
                          onChange={handleChange}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.Comments
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.Comments && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.Comments}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mt-1">
                          Total amount
                        </label>
                        <input
                          type="number"
                          name="TotalAmount"
                          value={orderDetails.TotalAmount}
                          onChange={handleChange}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.TotalAmount
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.TotalAmount && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.TotalAmount}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mt-1">
                          Advance amount
                        </label>

                        <input
                          type="number"
                          name="AdvanceAmount"
                          value={orderDetails.AdvanceAmount}
                          onChange={handleChange}
                          className={` p-1  mt-2 mb-1 w-full border rounded-md ${errors.AdvanceAmount
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.AdvanceAmount && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.AdvanceAmount}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mt-1">
                          Balance amount
                        </label>
                        <input
                          type="number"
                          name="AdvanceAmount"
                          value={
                            (orderDetails.BalenceAmount =
                              orderDetails.TotalAmount -
                              orderDetails.AdvanceAmount)
                          }
                          onChange={handleChange}
                          className={`p-1  mt-2 mb-1 w-full border rounded-md`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: " 1fr" }, // Ensure proper grid layout
                  gap: 2, // Adjust spacing between items
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 2,
                }}
              >
                {activeStep === 1 && (
                  <>
                    <>
                      {/* <div className="flex items-center justify-center gap-4">
                        <label className=" w-1/4 text-left text-xs font-medium text-gray-700">
                          Designer Name:
                        </label>
                        <input
                          type="text"
                          name="DesginerName"
                          value={orderDetails.DesginerName}
                          onChange={handleChange}
                          className={` p-1 w-1/4 border rounded-md ${errors.DesginerName
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.DesginerName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.DesginerName}
                          </p>
                        )}
                      </div> */}
                    </>
                    <div className="flex  items-cente ml-50 flex-col gap-4">
                      <div className="flex justify-center items-center gap-4">
                        <label className="w-1/4 text-left text-xs font-medium text-gray-700">
                          Order Status:
                        </label>
                        <select
                          name="OrderStatus"
                          value={orderDetails.OrderStatus}
                          onChange={handleChange}
                          className={`p-1 w-1/4 border rounded-md ${errors.OrderStatus ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                          <option value="">Select a Status</option>
                          <option value="Quick Qoute">Quick Qoute</option>
                          <option value="Initial Design">Initial Design</option>
                          <option value="Initial Measurements">Initial Measurements</option>
                          <option value="Revised Design(R1,R2,R#)">Revised Design(R1,R2,R#)</option>
                          <option value="Final Measurement">Final Measurement</option>
                          <option value="Signup Document">Signup Document</option>
                          <option value="Production">Production</option>
                          <option value="PDI">PDI</option>
                          <option value="Dispatch">Dispatch</option>
                          <option value="Installation">Installation</option>
                          <option value="Completion">Completion</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                        {errors.OrderStatus && (
                          <p className="text-red-500 text-sm ml-2">
                            {errors.OrderStatus}
                          </p>
                        )}
                      </div>

                      {/* <div className="flex justify-center items-center gap-4">
                        <label className="w-1/4 text-left text-xs font-medium text-gray-700">
                          Order By:
                        </label>
                        <input
                          type="text"
                          name="OrderBy"
                          value={orderDetails.OrderBy}
                          onChange={handleChange}
                          className={`p-1 w-1/4 border rounded-md ${errors.OrderBy ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.OrderBy && (
                          <p className="text-red-500 text-sm ml-2">
                            {errors.OrderBy}
                          </p>
                        )}
                      </div> */}
                      <div className="flex justify-center items-center gap-4">
                        <label className="w-1/4 text-left text-xs font-medium text-gray-700">
                          Assign To:
                        </label>
                        <input
                          type="text"
                          name="assginto"
                          value={orderDetails.assginto}
                          onChange={handleChange}
                          className={`p-1 w-1/4 border rounded-md ${errors.assginto ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.assginto && (
                          <p className="text-red-500 text-sm ml-2">
                            {errors.assginto}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-center items-center gap-4">
                        <label className="w-1/4 text-left text-xs font-medium text-gray-700">
                          Expected Duration (In Days):
                        </label>
                        <input
                          type="number"
                          name="ExpectedDurationDays"
                          value={orderDetails.ExpectedDurationDays}
                          onChange={handledate}
                          className={`p-1 w-1/4 border rounded-md ${errors.ExpectedDurationDays ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.ExpectedDurationDays && (
                          <p className="text-red-500 text-sm ml-2">
                            {errors.ExpectedDurationDays}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-center items-center gap-4">
                        <label className="w-1/4 text-left text-xs font-medium text-gray-700">
                          Delivery Date:
                        </label>
                        <input
                          type="date"
                          name="DeliveryDate"
                          value={orderDetails.DeliveryDate}
                          onChange={handleDateChanging}
                          className={`p-1 w-1/4 border rounded-md ${errors.DeliveryDate ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.DeliveryDate && (
                          <p className="text-red-500 text-sm ml-2">
                            {errors.DeliveryDate}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Flex container to align the "Upload Images" and "Upload PDF" on the same line */}
                    <div className="flex justify-center items-center gap-4">
                      {/* Upload Document Section */}
                      <label className="w-1/4 text-left   text-xs font-medium text-gray-700">
                        Upload Document:
                      </label>

                      <input
                        type="file"
                        multiple
                        accept="image/*,application/pdf,.doc,.docx"
                        onChange={handleImageChange} // Handle both image and document uploads
                        className="hidden"
                        id="UploadFiles"
                      />
                      <label
                        htmlFor="UploadFiles"
                        className="flex items-center justify-center px-4 py-2 p-1 w-1/4 border rounded-md border border-black-500 text-black-500 rounded-md cursor-pointer hover:bg-blue-50"
                      >
                        <FaUpload className="mr-2" /> {/* Upload icon next to text */}
                        <span>Upload File</span>
                      </label>
                    </div>

                    {/* Display Image Previews */}
                    {images.length > 0 && (
                      <div className="flex items-center mt-2 space-x-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative inline-block">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="w-24 h-24 object-cover"
                            />
                            <button
                              onClick={() => handleImageRemove(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Display PDF Preview */}
                    {pdfPreview && (
                      <div className="mt-2 flex items-center">
                        <a
                          href={pdfPreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View PDF
                        </a>
                        <button
                          onClick={handlePdfRemove}
                          className="ml-4 bg-red-500 text-white p-1 rounded-full text-xs"
                        >
                          x
                        </button>
                      </div>
                    )}

                    <div className="relative">
                      <button
                        onClick={handleAddOrder}
                        className="absolute bottom-2  right-0 w-18 inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                      >
                        Add{" "}
                        <span className="text-lg">
                          <IoMdAddCircleOutline />
                        </span>
                      </button>
                    </div>
                    {orders.length >= 0 && (
                      <>
                        <table className="min-w-full border-collapse border border-gray-300 mt-4 shadow-md">
  <thead className="bg-custom-darkblue text-white">
    <tr className="text-center border-b border-gray-300">
      <th className="px-4 py-3 font-medium border-r border-gray-300">Order Status</th>
      <th className="px-4 py-3 font-medium border-r border-gray-300">Assign To</th>
      <th className="px-4 py-3 font-medium border-r border-gray-300">Delivery Date</th>
      <th className="px-4 py-3 font-medium border-r border-gray-300">Document</th>
      <th className="px-4 py-3 font-medium border-r border-gray-300">Edit</th>
      <th className="px-4 py-3 font-medium">Delete</th>
    </tr>
  </thead>
  <tbody>
    {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
      <tr key={index} className="text-center border-b border-gray-300 hover:bg-gray-100">
        <td className="px-4 py-2 border-r border-gray-300 align-middle">
          <StatusBadge status={order.OrderStatus} />
        </td>
        <td className="px-4 py-2 border-r border-gray-300 align-middle">
          {order.assginto}
        </td>
        <td className="px-4 py-2 border-r border-gray-300 align-middle">
          {order.DeliveryDate}
        </td>
        <td className="px-4 py-2 border-r border-gray-300 align-middle">
          {/* View Button */}
          <a
            href={order.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center justify-center space-x-1"
          >
            <AiOutlineEye size={20} />
            <span>View</span>
          </a>

          {/* Download Button */}
          <a
            href={order.documentUrl}
            download
            className="text-green-500 hover:text-green-600 cursor-pointer flex items-center justify-center space-x-1"
          >
            <FiDownload size={20} />
            <span>Download</span>
          </a>
        </td>
        <td className="px-4 py-2 border-r border-gray-300 align-middle">
          <button
            onClick={''}
            className=" ml-9 text-blue-500 hover:text-blue-600 flex items-center justify-center"
          >
            <FaEdit size={20} />
          </button>
        </td>
        <td className="px-4 py-2 align-center">
          <button
            onClick={() => handleDelete(order)}
            className="ml-9 text-red-500 hover:text-red-600 flex items-center justify-center"
          >
            <FaTrashAlt size={20} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>





                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={orders.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </>
                    )}
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr " }, // Ensure proper grid layout
                  gap: 2, // Adjust spacing between items
                  pt: 2,
                }}
              >
                {activeStep === 2 && (
                  <>
                    <div className="flex ">
                      <label className="text-left  ml-44 w-1/4 mt-3  text-xs font-medium text-gray-700">
                        Payments Type:
                      </label>
                      <select
                        name="PaymentMethod"
                        value={orderDetails.PaymentMethod}
                        onChange={handleChange}
                        className={`p-1 w-1/4 border rounded-md ${errors.PaymentMethod
                          ? "border-red-500"
                          : "border-gray-300"
                          }`}
                      >
                        <option value="select a type">Select a Type</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                      </select>
                      {errors.PaymentMethod && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.PaymentMethod}
                        </p>
                      )}
                    </div>
                    <div className="flex ">
                      <label className="text-left  ml-44 w-1/4 mt-3  text-xs font-medium text-gray-700">
                        PaymentStatus
                      </label>
                      <select
                        name="PaymentStatus"
                        value={orderDetails.PaymentStatus}
                        onChange={handleChange}
                        className={`p-1 w-1/4 border rounded-md ${errors.PaymentStatus
                          ? "border-red-500"
                          : "border-gray-300"
                          }`}
                      >
                        <option value="select a type">Select a Status</option>
                        <option value="Processing">Processing</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                      {errors.PaymentStatus && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.PaymentStatus}
                        </p>
                      )}
                    </div>

                    <div className="flex ">
                      <label className="text-xs text-left mt-3 w-1/4 ml-44 font-medium text-gray-700">
                        PaymentsCardNumber:
                      </label>
                      <input
                        type="text"
                        name="MaskedCardNumber"
                        value={
                          orderDetails.MaskedCardNumber
                            ? orderDetails.MaskedCardNumber.replace(
                              /\d(?=\d{4})/g,
                              "*"
                            )
                            : ""
                        }
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                          if (value.length <= 16) {
                            handleChange({
                              target: { name: "MaskedCardNumber", value },
                            });
                          }
                        }}
                        className={`p-1 w-1/4 border rounded-md ${errors.MaskedCardNumber
                          ? "border-red-500"
                          : "border-gray-300"
                          }`}
                      />
                      {errors.MaskedCardNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.MaskedCardNumber}
                        </p>
                      )}
                    </div>
                    <div className="flex ">
                      <label className="text-xs text-left mt-3 w-1/4 ml-44 font-medium text-gray-700">
                        PaymentComments:
                      </label>
                      <input
                        type="text"
                        name="PaymentComments"
                        value={orderDetails.PaymentComments}
                        onChange={handleChange}
                        className={` p-1 w-1/4 border rounded-md ${errors.PaymentComments
                          ? "border-red-500"
                          : "border-gray-300"
                          }`}
                      />
                      {errors.PaymentComments && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.PaymentComments}
                        </p>
                      )}
                    </div>
                    <div className="flex ">
                      <label className="text-xs text-left mt-3 w-1/4 ml-44 font-medium text-gray-700">
                          Amount
                        </label>

                        <input
                          type="number"
                          name="AdvanceAmount"
                          value={orderDetails.AdvanceAmount}
                          onChange={handleChange}
                         className={` p-1 w-1/4 border rounded-md ${errors.AdvanceAmount
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.AdvanceAmount && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.AdvanceAmount}
                          </p>
                        )}
                      </div>
                    <div className="relative">
                      <button
                        onClick={handleAddOrderes}
                        className="absolute bottom-3 right-0 w-16 inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                      >
                        Add{" "}
                        <span className="text-lg">
                          <IoMdAddCircleOutline />
                        </span>
                      </button>
                    </div>

                    {orders1.length >= 0 && (
                      <><table className="min-w-full border-collapse border border-gray-300 mt-4 shadow-md">
                        <thead className="bg-custom-darkblue text-white">
                          <tr className="text-center border-b border-gray-300">
                            <th className="px-4 py-3 font-medium border-r">Payment Type</th>
                            <th className="px-4 py-3 font-medium border-r border-gray-300">Payment Status</th>
                            <th className="px-4 py-3 font-medium border-r border-gray-300">Payment Card Number</th>
                            <th className="px-4 py-3 font-medium border-r">Payment Comments</th>
                            <th className="px-4 py-3 font-medium border-r">Amount</th>
                            <th className="px-4 py-3 font-medium border-r">Edit</th>
                            <th className="px-4 py-3 font-medium">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders1
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order, index) => (
                              <tr key={index} className="text-center border-b border-gray-300 hover:bg-gray-100">
                                <td className="px-4 py-2 border-r">{order.PaymentMethod}</td>
                                <td className="px-4 py-2 border-r border-gray-300">
                                  <StatusBadge status={order.PaymentStatus} />
                                </td>
                                <td className="px-4 py-2 border-r border-gray-300">{order.MaskedCardNumber}</td>
                                <td className="px-4 py-2 border-r">{order.PaymentComments}</td>
                                <td className="px-4 py-2 border-r">{order. AdvanceAmount}</td>

                               
                                <td className="px-4 py-2 border-r border-gray-300">
                                  <button
                                    onClick={''}
                                    className="text-blue-500 hover:text-blue-600">
                                    <FaEdit size={20} />
                                  </button>
                                </td>
                                <td className="px-4 py-2">
                                  <button
                                    onClick={() => handleDelete(order)}
                                    className="text-red-500 hover:text-red-600">
                                    <FaTrashAlt size={20} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={orders1.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </>
                    )}
                  </>
                )}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <button
                  color="inherit"
                  onClick={handleBack}
                  className={`inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm ${activeStep === 0
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-custom-lightblue  hover:text-gray-700"
                    }`}
                  disabled={activeStep === 0}
                >
                  <MdArrowBackIosNew />
                  Back
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                <button
                  variant="contained"
                  onClick={handleCancel}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-300  px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover: hover:bg-gray-400 ml-2 mr-4"
                >
                  <RxCross1 />
                  Cancel
                </button>{" "}
                <button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 "
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  <MdOutlineArrowForwardIos />
                </button>
              </Box>
            </React.Fragment>
          )}
          {showAlert && (
            <div className="fixed top-0 right-0 w-full bg-green-500 text-white p-4 text-center">
              <span>Order added successfully!</span>
            </div>
          )}
          {submittedDetails && (
            <div className="mt-4 bg-gray-100 p-4 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                Submitted Order Details:
              </h3>
              <p>
                <strong>Tenant ID:</strong> {submittedDetails.TenantID}
              </p>
              <p>
                <strong>Customer ID:</strong> {submittedDetails.CustomerID}
              </p>
              <p>
                <strong>Order Date:</strong> {submittedDetails.OrderDate}
              </p>
              <p>
                <strong>Total Quantity:</strong>{" "}
                {submittedDetails.TotalQuantity}
              </p>
              <p>
                <strong>Address Line 1:</strong> {submittedDetails.AddressLine1}
              </p>
              <p>
                <strong>Address Line 2:</strong> {submittedDetails.AddressLine2}
              </p>
              <p>
                <strong>City ID:</strong> {submittedDetails.CityID}
              </p>
              <p>
                <strong>State ID:</strong> {submittedDetails.StateID}
              </p>
              <p>
                <strong>Country ID:</strong> {submittedDetails.CountryID}
              </p>
              <p>
                <strong>Zip Code:</strong> {submittedDetails.ZipCode}
              </p>
              <p>
                <strong>Total Amount:</strong> {submittedDetails.TotalAmount}
              </p>
              <p>
                <strong>Order Status:</strong> {submittedDetails.OrderStatus}
              </p>
              <p>
                <strong>Order By:</strong> {submittedDetails.OrderBy}
              </p>
              <p>
                <strong>Type:</strong> {submittedDetails.Type}
              </p>
              <p>
                <strong>Delivery Date:</strong> {submittedDetails.DeliveryDate}
              </p>
              <p>
                <strong>Customer First Name:</strong>{" "}
                {submittedDetails.customerFirstName}
              </p>
              <p>
                <strong>Customer Last Name:</strong>{" "}
                {submittedDetails.customerLastName}
              </p>
              <p>
                <strong>Customer Email:</strong>{" "}
                {submittedDetails.customerEmail}
              </p>
              <p>
                <strong>Customer Phone:</strong>{" "}
                {submittedDetails.customerPhone}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {submittedDetails.PaymentMethod}
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                {submittedDetails.PaymentStatus}
              </p>
              <p>
                <strong>Masked Card Number:</strong>{" "}
                {submittedDetails.MaskedCardNumber}
              </p>
              <p>
                <strong>Expected Complete Date:</strong>{" "}
                {submittedDetails.ExpectedCompleteDate}
              </p>
              <p>
                <strong>Comments:</strong> {submittedDetails.Comments}
              </p>
              <p>
                <strong>Referred By:</strong> {submittedDetails.ReferedBy}
              </p>
              <p>
                <strong>Payment Comments:</strong>{" "}
                {submittedDetails.PaymentComments}
              </p>
              <p>
                <strong>Assigned To:</strong> {submittedDetails.assginto}
              </p>
              <p>
                <strong>Advance Amount:</strong>{" "}
                {submittedDetails.AdvanceAmount}
              </p>
              <p>
                <strong>Balance Amount:</strong>{" "}
                {submittedDetails.BalenceAmount}
              </p>
              <p>
                <strong>Expected Duration Days:</strong>{" "}
                {submittedDetails.ExpectedDurationDays}
              </p>
              <p>
                <strong>Designer Name:</strong> {submittedDetails.DesginerName}
              </p>
              <p>
                <strong>Upload Images:</strong> {submittedDetails.UploadImages}
              </p>
              <p>
                <strong>Choose Files:</strong> {submittedDetails.choosefiles}
              </p>
              <p>
                <strong>Balance Amount (calculated):</strong>{" "}
                {submittedDetails.TotalAmount - submittedDetails.AdvanceAmount}
              </p>

              <div className="grid grid-cols-3 gap-4 mt-4">
                {submittedDetails.images &&
                  submittedDetails.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Final ${index}`}
                      className="w-full h-36 object-cover border rounded-md"
                    />
                  ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {submittedDetails.pdfPreview &&
                  submittedDetails.pdfPreview.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`PDF Preview ${index}`}
                      className="w-full h-36 object-cover border rounded-md"
                    />
                  ))}
              </div>
            </div>
          )}
        </Box>
      </div>
    </>
  );
}

export default AddOrders;