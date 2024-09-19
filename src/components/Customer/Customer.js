
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { FaTable } from "react-icons/fa";
import axios from "axios";
import { CustomerContext } from "../../Context/customerContext"; // Import CustomerContext
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { MdOutlineCancel } from 'react-icons/md';
import { GETALLCUSTOMERS_API ,DELETECUSTOMERSBYID_API,GETALLCUSTOMERSBYID_API } from '../../Constants/apiRoutes';


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
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function Customers() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const { setCustomerDetails } = useContext(CustomerContext);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const navigate = useNavigate();
  const [paginatedPeople, setPaginatedPeople] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
   // Mock data for store names
   // Mock data for store names
const storeNames = [
  { id: '1', name: 'ImlyStudio-Indiranagar' },
  { id: '2', name: 'ImlyStudio-Jakkur' },
  { id: '3', name: 'ImlyStudio-InfantryRoad' },
  { id: '4', name: 'ImlyStudio-HSRLayout' },
  { id: '5', name: 'ImlyStudio-HSRLayout' },
  ];
//   const getAllCustomers = async (pageNum, pageSize) => {
//     try {
//       const response = await axios.get(
//         // "https://imlystudios-backend-mqg4.onrender.com/api/customers/getAllCustomers",
//       // const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}customers/getAllCustomers`,
// // `${process.env.REACT_APP_API_BASE_URL}customers/getAllCustomers`,
// `${ GETALLCUSTOMERS_API}`,    
//         {
//           params: {
//             page: pageNum + 1,
//             limit: pageSize,
//           },
//         }
//       );
//       return {
//         customers: response.data.customers,
//         totalCount: response.data.totalItems,
//       };
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       throw error;
//     }
//   };

const getAllCustomers = async (pageNum, pageSize) => {
  console.log("Final API URL:", GETALLCUSTOMERS_API);

  try {
    const response = await axios.get(GETALLCUSTOMERS_API, {
      params: {
        page: pageNum + 1,
        limit: pageSize,
      },
    });

    return {
      customers: response.data.customers,
      totalCount: response.data.totalItems,
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

  useEffect(() => {
    fetchCustomers();
  }, [page, rowsPerPage]);
  
  console.log(paginatedPeople, "pp");
  
  // useEffect(() => {
  //   setPaginatedPeople(
  //     customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //   );
  // }, [customers, page, rowsPerPage]);

  useEffect(() => {
    fetchCustomers();
  }, [page, rowsPerPage, searchName]);

  const fetchCustomers = async () => {
    try {
      const { customers, totalCount } = await getAllCustomers(page, rowsPerPage);
      setCustomers(customers);
      setPaginatedPeople(customers);
      
      // Only update filtered customers if no search is active
      if (!isSearching) {
        setFilteredCustomers(customers); // Set initial filtered customers to all fetched data
      }
  
      setTotalCustomers(totalCount);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  const searchItems = (searchValue) => {
    setSearchName(searchValue);
  
    if (searchValue === "") {
      setIsSearching(false); // Reset search mode
      setFilteredCustomers(paginatedPeople); // Show all customers when search is cleared
    } else {
      setIsSearching(true); // Enable search mode
      const filteredData = paginatedPeople.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredCustomers(filteredData);
    }
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCustomerById = async (customerId) => {
    try {
      const response = await axios.get(
        `https://imlystudios-backend-mqg4.onrender.com/api/customers/getCustomerById/${customerId}`
        // `${GETALLCUSTOMERSBYID_API}/${customerId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  };

  const deleteCustomerById = async (customerId) => {
    try {
      const response = await axios.delete(
        `https://imlystudios-backend-mqg4.onrender.com/api/customers/deleteCustomer/${customerId}`
      
        // `${DELETECUSTOMERSBYID_API}/${customerId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  const handleEditClick = async (customerId) => {
    try {
      const customerDetails = await getCustomerById(customerId); // Use getCustomerById from context
      setCustomerDetails(customerDetails);
      navigate("/Customerform");
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  // Handle delete button click
  const handleDeleteClick = async (customerId) => {
    try {
      await deleteCustomerById(customerId);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExportCustomersData = async () => {
    try {
      const { customers } = await getAllCustomers(0, totalCustomers); // Fetch all users for export
      exportToExcel(customers, "Customers");
    } catch (error) {
      console.error("Error exporting users data:", error);
    }
  };

  const handleAddCustomerClick = () => {
    setCustomerDetails(null);
    navigate("/Customerform");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto">
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md ">
        {/* <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 lg:gap-4  w-full ">
          <h2 className="pl-4 p-2 pt-4 text-xl font-semibold ">Customers</h2>
          <div className="pl-0 relative flex flex-col p-2 ">
            <label htmlFor="searchName" className="text-sm font-medium"></label>
            <input
              id="searchName"
              type="text"
              placeholder="Search by Name or Email or Mobile"
              value={searchName}
              onChange={(e) => searchItems(e.target.value)}
              className=" mt-1 p-2 pr-10 border border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <IoIosSearch />
            </div>
          </div>
          <div className="ml-4">
  <label htmlFor="storeName" className="text-sm font-medium"></label>
  <select
    id="storeName"
    value={selectedStore}
    onChange={(e) => setSelectedStore(e.target.value)}
    className="mt-1 p-2 border border-gray-300 rounded-md w-64" // Updated width
  >
    <option value="">Select Store Name</option>
    {storeNames.map((store) => (
      <option key={store.id} value={store.name}>
        {store.name}
      </option>
    ))}
  </select>
</div>
        
          <ul className="p-2 justify-center flex gap-2 list-none">
         
            <li>
              <button
                type="button"
                className="mt-1 inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm sm:text-xs lg:text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                onClick={handleAddCustomerClick}
              >
                <FaPlus aria-hidden="true" className="-ml-0.5 h-4 w-4" />
                Add Customers
              </button>
            </li>

            <li>
              <button
                type="button"
                className="mt-1 inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm sm:text-xs lg:text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                onClick={handleExportCustomersData}
              >
                <FaTable aria-hidden="true" className="-ml-0.5 h-4 w-4" />
                Export Customers
              </button>
            </li>
          </ul>
        </div> */}
        {/* <div className="flex flex-wrap items-center justify-between w-full">
  <h2 className="pl-4 text-xl font-semibold">Customers</h2>
  
  <div className="p-2">
  <Combobox value={selectedStore} onChange={setSelectedStore}>
    <div className="relative mt-1 w-64">
      <Combobox.Input
        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        displayValue={(store) => store.name}
        placeholder="Select Store Name"
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
                active ? "bg-indigo-600 text-white" : "text-gray-900"
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

  <div className="relative flex items-center p-2">
    <input
      id="searchName"
      type="text"
      placeholder="Search by Name or Email or Mobile"
      value={searchName}
      onChange={(e) => searchItems(e.target.value)}
      className="mt-1 p-2 pr-10 border border-gray-300 rounded-md w-64"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
      <IoIosSearch />
    </div>
  </div>

  <ul className="flex items-center gap-2 p-2">
    <li>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        onClick={handleAddCustomerClick}
      >
        <FaPlus aria-hidden="true" className="-ml-0.5 h-4 w-4" />
        Add Customers
      </button>
    </li>

    <li>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        onClick={handleExportCustomersData}
      >
        <FaTable aria-hidden="true" className="-ml-0.5 h-4 w-4" />
        Export Customers
      </button>
    </li>
  </ul>
</div> */}
<div className="flex flex-col w-full">
  {/* First Row: Heading, Add Users, Export Users */}
  <div className="flex flex-wrap items-center justify-between w-full">
    <h2 className="pl-4 text-xl font-semibold">Customers</h2>

    {/* Action Buttons */}
    <ul className="flex flex-wrap items-center gap-2 p-2 justify-center w-full sm:w-auto sm:justify-end">
      <li>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleAddCustomerClick}
        >
          <FaPlus aria-hidden="true" className="-ml-0.5 h-4 w-4" />
          Add Customers
        </button>
      </li>
      <li>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleExportCustomersData}
        >
          <FaTable aria-hidden="true" className="-ml-0.5 h-4 w-4" />
          Export Customers
        </button>
      </li>
    </ul>
  </div>

  {/* Second Row: Store Combobox, Search Input */}
  <div className="flex flex-wrap items-center justify-center w-full mt-4 gap-4">
    {/* Store Combobox */}
    <div className="p-2 w-full sm:w-auto">
      <Combobox value={selectedStore} onChange={setSelectedStore}>
        <div className="relative mt-1 w-full sm:w-64">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            displayValue={(store) => store.name}
            placeholder="Select Store Name"
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
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
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

    {/* Search Input */}
    <div className="relative flex items-center p-2 w-full sm:w-auto">
      <input
        id="searchName"
        type="text"
        placeholder="Search by Name or Email or Mobile"
        value={searchName}
        onChange={(e) => searchItems(e.target.value)}
        className="mt-1 p-2 pr-10 border border-gray-300 rounded-md w-full sm:w-64"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <IoIosSearch />
      </div>
    </div>
  </div>
</div>

        {/* </div> */}
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: "25%" }}>Name</StyledTableCell>
                <StyledTableCell style={{ width: "20%" }}>
                  Email
                </StyledTableCell>
                <StyledTableCell style={{ width: "15%" }}>
                  Mobile No
                </StyledTableCell>
                {/* <StyledTableCell>Address</StyledTableCell> */}
                <StyledTableCell style={{ width: "15%" }}>
                  Gender
                </StyledTableCell>
                <StyledTableCell style={{ width: "20%" }}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              
              {filteredCustomers.map((person, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <div className="flex items-center space-x-2">
                      <span>{person.FirstName}</span>
                      <span>{person.LastName}</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>{person.Email}</StyledTableCell>
                  <StyledTableCell>{person.PhoneNumber}</StyledTableCell>

                  <StyledTableCell>
                    <span
                      className={`w-[68px] text-center inline-block px-3 py-2 text-xs font-semibold rounded-full ${
                        person.Gender === "M"
                          ? "bg-green-100 text-green-800 shadow-md"
                          : person.Gender === "F"
                          // ? "bg-pink-100 text-pink-800 shadow-md"
                           ? "bg-pink-100 text-red-400 shadow-md"
                          : "bg-gray-100 text-gray-800 shadow-md"
                      }`}
                    >
                      {person.Gender === null
                        ? "N/A"
                        : person.Gender === "M"
                        ? person.Gender + "ale"
                        : person.Gender + "emale"}
                    </span>
                  </StyledTableCell>
                  {/* <StyledTableCell>
                    <button
                      type="button"
                      onClick={() => handleEditClick(person.CustomerID)}
                      className=" m-0.5 inline-flex items-center gap-x-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                      <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(person.CustomerID)}
                      className=" inline-flex items-center gap-x-1 m-0.5 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                      <AiOutlineDelete aria-hidden="true" className="h-4 w-4" />
                      Delete
                    </button>
                  </StyledTableCell> */}
                  <StyledTableCell>
  {/* <button
    type="button"
    onClick={() => handleEditClick(person.CustomerID)}
    className="m-0.5 inline-flex items-center justify-center gap-x-2 rounded-md bg-blue-600 px-1 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 w-20 h-8"
  >
    <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
    Edit
  </button>
  <button
    type="button"
   onClick={() => handleEditClick(person.CustomerID)}
    className="inline-flex items-center justify-center gap-x-2 m-0.5 rounded-md bg-red-600 px-1 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 w-20 h-8"
  >
    <AiOutlineDelete aria-hidden="true" className="h-4 w-4" />
    Delete
  </button> */}
  <button
                      type="button"
                      onClick={() => handleEditClick(person.CustomerID)}
                      className=" m-0.5 inline-flex items-center gap-x-1 rounded-md hover:bg-sky-600 hover:text-white px-2 py-1 text-xs font-semibold  shadow-sm bg-[#d6eaf8] text-sky-900   "
                    >
                      <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditClick(person.CustomerID)}
                      className=" inline-flex items-center gap-x-1 m-0.5 rounded-md hover:bg-rose-600 hover:text-white px-2 py-1 text-xs font-semibold  shadow-sm bg-pink-100  text-rose-900     "
                    >
                      <MdOutlineCancel
                        fontSize=""
                        aria-hidden="true"
                        className="h-4 w-4 font-small"
                      />
                     Delete
                    </button>
</StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 25]}
                  colSpan={6}
                  count={totalCustomers}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Customers;