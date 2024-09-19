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
import { FaEdit, FaTrash, FaPlus, FaTable } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import { StoreContext } from '../../Context/storeContext';
import axios from 'axios';
import { GETALLSTORES_API ,GETALLSTORESBYID_API , DELETESTORESSBYID_API } from '../../Constants/apiRoutes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#003375',
    color: theme.palette.common.white,
    fontWeight: 'bold',
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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

function Stores() {
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [totalStores, setTotalStores] = useState(0);
  const { setStoreDetails } = useContext(StoreContext);
  const navigate = useNavigate();


  const getAllStores = async (pageNum, pageSize, search = "") => {
    try {
      const response = await axios.get(
        // "https://imlystudios-backend-mqg4.onrender.com/api/stores/getAllStores",
        GETALLSTORES_API,
        {
          params: {
            pageNumber: pageNum + 1,
            pageSize: pageSize,
            search: search
          }
        }
      );

      // Log the entire API response to understand its structure
      console.log("API Response:", response.data);

      return {
        stores: response.data.Stores || [], // Correctly access the 'Stores' field
        totalCount: response.data.totalItems || 0 // Use 'totalItems' for total count
      };
    } catch (error) {
      console.error("Error fetching stores:", error);
      throw error;
    }
  };

  const fetchStores = async () => {
    console.log("Fetching data for page:", page);
    try {
      const { stores, totalCount } = await getAllStores(page, rowsPerPage, searchName);
      console.log('Fetched stores:', stores);
      console.log('Total stores count:', totalCount);
      setStores(stores);
      setTotalStores(totalCount);
    } catch (error) {
      console.error('Failed to fetch stores', error);
    }
  };


  useEffect(() => {
    fetchStores();
  }, [page, rowsPerPage, searchName]);


  const handleChangePage = (event, newPage) => {
    console.log("Current page:", page);
    console.log("Requested page:", newPage);
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    console.log("Rows per page changed to:", event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0
  };

  const getStoreById = async (storeId) => {
    try {
      const response = await axios.get(
        // `https://imlystudios-backend-mqg4.onrender.com/api/stores/getStoreById/${storeId}`
        `${GETALLSTORESBYID_API}/${storeId}`
        
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching store:", error);
      throw error;
    }
  };

  const deleteStoreById = async (storeId) => {
    try {
      const response = await axios.delete(
        // `https://imlystudios-backend-mqg4.onrender.com/api/stores/deleteStore/${storeId}`
        `${DELETESTORESSBYID_API}/${storeId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting store:", error);
      throw error;
    }
  };

  const handleEdit = async (storeId) => {
    try {
      const storeDetails = await getStoreById(storeId);
      setStoreDetails(storeDetails);
      // Navigate to the update page with the store ID
      navigate(`/Storeform`);
    } catch (error) {
      console.error('Error handling edit:', error);
    }
  };

  const handleDelete = async (storeId) => {
    try {
      await deleteStoreById(storeId);
      fetchStores(); // Refresh store list after deletion
    } catch (error) {
      console.error('Error handling delete:', error);
    }
  };

  const handleExportStoresData = () => {
    const ws = XLSX.utils.json_to_sheet(stores);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stores");
    XLSX.writeFile(wb, "Stores.xlsx");
  };

  const handleAddStoreClick = () => {
    navigate("/Storeform"); // Navigate to the add store page
  };

  const handleEditClick = (storeId) => {
    handleEdit(storeId); // Call existing handleEdit function
  };

  const handleDeleteClick = (storeId) => {
    handleDelete(storeId); // Call existing handleDelete function
  };

  return (


    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold">Stores</h2>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex w-full sm:w-[20rem]">
              <label htmlFor="searchName" className="sr-only">
                Search
              </label>
              <input
                id="searchName"
                type="text"
                placeholder="Search by Name or Email or Mobile"
                value={searchName} // Assuming you have the state searchName already
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full p-2 pr-10 border-2 border-gray-600 rounded-md" // Updated to match the second example's border and layout
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <IoIosSearch />
              </div>
            </div>

            <ul className="flex flex-col sm:flex-row gap-2 list-none w-full sm:w-[20rem]">
              <li className="w-full">
                <button
                  type="button"
                  className="w-full inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus:outline-none"
                  onClick={handleAddStoreClick}
                >
                  <FaPlus aria-hidden="true" className="h-4 w-4" />
                  Add Stores
                </button>
              </li>
              <li className="w-full">
                <button
                  type="button"
                  className="w-full inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus:outline-none"
                  onClick={handleExportStoresData}
                >
                  <FaTable aria-hidden="true" className="h-4 w-4" />
                  Export Stores
                </button>
              </li>
            </ul>
          </div>
        </div>


        <TableContainer component={Paper} className="mt-4 rounded-lg shadow">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Store Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(stores || []).map((store, index) => (
                <StyledTableRow key={store.StoreID}>
                  <StyledTableCell>{store.StoreName}</StyledTableCell>
                  <StyledTableCell>{store.Email}</StyledTableCell>
                  <StyledTableCell>{store.Phone}</StyledTableCell>
                  <StyledTableCell>
                    {`${store.AddressLine1 || ''} ${store.AddressLine2 || ''}`}
                  </StyledTableCell>

                  {/* <StyledTableCell>
                    <button
                      type="button"
                      onClick={() => handleEditClick(store.StoreID)}
                      className="inline-flex items-center gap-x-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                      <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(store.StoreID)}
                      className="inline-flex items-center gap-x-1 ml-2 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                      <AiOutlineDelete aria-hidden="true" className="h-4 w-4" />
                      Delete
                    </button>
                  </StyledTableCell> */}
                      {/* <StyledTableCell>
  <button
    type="button"
    onClick={() => handleEditClick(store.StoreID)}
    className="m-0.5 inline-flex items-center justify-center gap-x-2 rounded-md bg-blue-500 px-1 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 w-20 h-8"
  >
    <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
    Edit
  </button>
  <button
    type="button"
    onClick={() => handleDeleteClick(store.StoreID)}
    className="inline-flex items-center justify-center gap-x-2 m-0.5 rounded-md bg-red-500 px-1 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 w-20 h-8"
  >
    <AiOutlineDelete aria-hidden="true" className="h-4 w-4" />
    Delete
  </button>
</StyledTableCell> */}
 <StyledTableCell>
  <button
    type="button"
    onClick={() => handleEditClick(store.StoreID)}
    className="m-0.5 inline-flex items-center justify-center gap-x-2 rounded-md bg-blue-600 px-1 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 w-20 h-8"
  >
    <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
    Edit
  </button>
  <button
    type="button"
    onClick={() => handleDeleteClick(store.StoreID)}
    className="inline-flex items-center justify-center gap-x-2 m-0.5 rounded-md bg-red-600 px-1 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 w-20 h-8"
  >
    <AiOutlineDelete aria-hidden="true" className="h-4 w-4" />
    Delete
  </button>
</StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  count={totalStores}
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
    </div >
  );
}

export default Stores;
