
// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import PrinterIcon from '@mui/icons-material/Print';
// import { Edit } from '@mui/icons-material';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
// import Box from '@mui/material/Box';
// import StatusBadge from './Satus';
// import FilterBar from './FilterBar';
// import { styled } from '@mui/material/styles';
// import {GlobalContext} from "../../Context/GlobalContext"

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#003375",
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Orders = () => {
//   const { products, setProducts } = useContext(GlobalContext);
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const navigate = useNavigate();

//   const handleOrderUpdate = (orderId) => {
//     navigate("/update-order", { state: { orderId } });
//   };

//   const handleCancel = (id) => {
//     const newStatus = "Canceled";
//     setProducts((prevItems) =>
//       prevItems.map((item) =>
//         item.OrderID === id ? { ...item, OrderStatus: newStatus } : item
//       )
//     );
//   };

//   const filteredOrders = products.filter(
//     (product) =>
//       selectedFilter === "All" || product.OrderStatus === selectedFilter
//   );

//   const paginatedData = filteredOrders.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="px-4 sm:px-6 lg:px-8 pt-4 w-auto bg-white">
//         <div className="sm:flex sm:items-center">
//           <div className="sm:flex-auto">
//             <h2 className="text-xl mb-5 font-semibold">Orders</h2>
//           </div>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               alignItems: "center",
//               gap: { xs: 2, sm: 1 },
//               mx: "auto",
//             }}
//           >
//             <Button
//               variant="contained"
//               disableRipple
//               sx={{
//                 backgroundColor: "#003375",
//                 color: "white",
//                 mx: { xs: 0, sm: 1 },
//                 mb: { xs: 1, sm: 0 },
//                 boxShadow: "none",
//                 textTransform: "capitalize",
//                 fontSize: "0.875rem",
//                 ":hover": {
//                   backgroundColor: "#cadcfc",
//                   color: "#374151",
//                   boxShadow: "none",
//                 },
//                 width: { xs: "100%", sm: "auto" },
//               }}
//               startIcon={<HomeIcon />}
//               href="/AddOrders"
//             >
//               Create Order
//             </Button>
//             <Button
//               variant="contained"
//               disableRipple
//               sx={{
//                 backgroundColor: "#003375",
//                 color: "white",
//                 mr: { xs: 0, sm: 0 },
//                 boxShadow: "none",
//                 textTransform: "capitalize",
//                 fontSize: "0.875rem",
//                 ":hover": {
//                   backgroundColor: "#cadcfc",
//                   color: "#374151",
//                   boxShadow: "none",
//                 },
//                 width: { xs: "100%", sm: "auto" },
//               }}
//               startIcon={<PrinterIcon />}
//               href="/create-order"
//             >
//               Export Order
//             </Button>
//           </Box>
//         </div>
//         <div className="flex justify-center md:justify-end mb-4 px-4 md:px-0 mt-6">
//           <div className="flex flex-wrap justify-center space-x-2 md:space-x-2 md:justify-end">
//             <FilterBar
//               selectedFilter={selectedFilter}
//               onFilterChange={setSelectedFilter}
//             />
//           </div>
//         </div>

//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Order Id</StyledTableCell>
//                 <StyledTableCell>Product Name</StyledTableCell>
//                 <StyledTableCell align="center">Price</StyledTableCell>
//                 <StyledTableCell align="center">
//                   Payment Balance
//                 </StyledTableCell>
//                 <StyledTableCell align="center">Status</StyledTableCell>
//                 <StyledTableCell align="center">Update</StyledTableCell>
//                 <StyledTableCell align="center"></StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((product) => (
//                 <StyledTableRow key={product.OrderID}>
//                   <StyledTableCell>{product.OrderID}</StyledTableCell>
//                   <StyledTableCell>
//                     {product.CreatedBy || "N/A"}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     &#8377;{product.TotalAmount}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     &#8377;{product.TotalAmount - product.TotalQuantity}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <StatusBadge status={product.OrderStatus} />
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <button
//                       type="button"
//                       className={`rounded-md p-[3px] h-9 text-xs font-semibold text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2  ${
//                         product.OrderStatus === "Dispatched"
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : product.OrderStatus === "Canceled"
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-red-600 hover:bg-red-500 focus:ring-red-500"
//                       } whitespace-normal`}
//                       disabled={
//                         product.OrderStatus === "Dispatched" ||
//                         product.OrderStatus === "Canceled"
//                       }
//                       onClick={() => handleCancel(product.OrderID)}
//                     >
//                       {product.OrderStatus === "Dispatched" ? (
//                         <>
//                           Already <br /> Dispatched
//                         </>
//                       ) : product.OrderStatus === "Canceled" ? (
//                         "Canceled"
//                       ) : (
//                         "Cancel Order"
//                       )}
//                     </button>
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <Button
//                       onClick={() => handleOrderUpdate(product.OrderID)}
//                       variant="contained"
//                       startIcon={<Edit />}
//                       sx={{
//                         backgroundColor: "#2563eb",
//                         color: "white",
//                         fontSize: "0.75rem",
//                         padding: "4px 8px",
//                         borderRadius: "4px",
//                         boxShadow: "none",
//                         textTransform: "none",
//                         ":hover": {
//                           backgroundColor: "#3b82f6 ",
//                           boxShadow: "none",
//                         },
//                       }}
//                     >
//                       Edit
//                     </Button>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filteredOrders.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default Orders;



// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import PrinterIcon from '@mui/icons-material/Print';
// import { Edit } from '@mui/icons-material';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
// import Box from '@mui/material/Box';
// import StatusBadge from './Satus';
// import FilterBar from './FilterBar';
// import { styled } from '@mui/material/styles';
// import {GlobalContext} from "../../Context/GlobalContext"

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#003375",
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Orders = () => {
//   const { products, setProducts } = useContext(GlobalContext);
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const navigate = useNavigate();

//   const handleOrderUpdate = (orderId) => {
//     navigate("/edit-order", { state: { orderId } });
//   };

//   const handleCancel = (id) => {
//     const newStatus = "Canceled";
//     setProducts((prevItems) =>
//       prevItems.map((item) =>
//         item.OrderID === id ? { ...item, OrderStatus: newStatus } : item
//       )
//     );
//   };

//   const filteredOrders = products.filter(
//     (product) =>
//       selectedFilter === "All" || product.OrderStatus === selectedFilter
//   );

//   const paginatedData = filteredOrders.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="px-4 sm:px-6 lg:px-8 pt-4 w-auto bg-white">
//         <div className="sm:flex sm:items-center">
//           <div className="sm:flex-auto">
//             <h2 className="text-xl mb-5 font-semibold">Orders</h2>
//           </div>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               alignItems: "center",
//               gap: { xs: 2, sm: 1 },
//               mx: "auto",
//             }}
//           >
//             <Button
//               variant="contained"
//               disableRipple
//               sx={{
//                 backgroundColor: "#003375",
//                 color: "white",
//                 mx: { xs: 0, sm: 1 },
//                 mb: { xs: 1, sm: 0 },
//                 boxShadow: "none",
//                 textTransform: "capitalize",
//                 fontSize: "0.875rem",
//                 ":hover": {
//                   backgroundColor: "#cadcfc",
//                   color: "#374151",
//                   boxShadow: "none",
//                 },
//                 width: { xs: "100%", sm: "auto" },
//               }}
//               startIcon={<HomeIcon />}
//               href="/AddOrders"
//             >
//               Create Order
//             </Button>
//             <Button
//               variant="contained"
//               disableRipple
//               sx={{
//                 backgroundColor: "#003375",
//                 color: "white",
//                 mr: { xs: 0, sm: 0 },
//                 boxShadow: "none",
//                 textTransform: "capitalize",
//                 fontSize: "0.875rem",
//                 ":hover": {
//                   backgroundColor: "#cadcfc",
//                   color: "#374151",
//                   boxShadow: "none",
//                 },
//                 width: { xs: "100%", sm: "auto" },
//               }}
//               startIcon={<PrinterIcon />}
//               href="/create-order"
//             >
//               Export Order
//             </Button>
//           </Box>
//         </div>
//         <div className="flex justify-center md:justify-end mb-4 px-4 md:px-0 mt-6">
//           <div className="flex flex-wrap justify-center space-x-2 md:space-x-2 md:justify-end">
//             <FilterBar
//               selectedFilter={selectedFilter}
//               onFilterChange={setSelectedFilter}
//             />
//           </div>
//         </div>

//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Order Id</StyledTableCell>
//                 <StyledTableCell>Product Name</StyledTableCell>
//                 <StyledTableCell align="center">Price</StyledTableCell>
//                 <StyledTableCell align="center">
//                   Payment Balance
//                 </StyledTableCell>
//                 <StyledTableCell align="center">Status</StyledTableCell>
//                 <StyledTableCell align="center">Update</StyledTableCell>
//                 <StyledTableCell align="center"></StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((product) => (
//                 <StyledTableRow key={product.OrderID}>
//                   <StyledTableCell>{product.OrderID}</StyledTableCell>
//                   <StyledTableCell>
//                     {product.CreatedBy || "N/A"}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     &#8377;{product.TotalAmount}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     &#8377;{product.TotalAmount - product.TotalQuantity}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <StatusBadge status={product.OrderStatus} />
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <button
//                       type="button"
//                       className={`rounded-md p-[3px] h-9 text-xs font-semibold text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2  ${
//                         product.OrderStatus === "Dispatched"
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : product.OrderStatus === "Canceled"
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-red-600 hover:bg-red-500 focus:ring-red-500"
//                       } whitespace-normal`}
//                       disabled={
//                         product.OrderStatus === "Dispatched" ||
//                         product.OrderStatus === "Canceled"
//                       }
//                       onClick={() => handleCancel(product.OrderID)}
//                     >
//                       {product.OrderStatus === "Dispatched" ? (
//                         <>
//                           Already <br /> Dispatched
//                         </>
//                       ) : product.OrderStatus === "Canceled" ? (
//                         "Canceled"
//                       ) : (
//                         "Cancel Order"
//                       )}
//                     </button>
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <Button
//                       onClick={() => handleOrderUpdate(product.OrderID)}
//                       variant="contained"
//                       startIcon={<Edit />}
//                       sx={{
//                         backgroundColor: "#2563eb",
//                         color: "white",
//                         fontSize: "0.75rem",
//                         padding: "4px 8px",
//                         borderRadius: "4px",
//                         boxShadow: "none",
//                         textTransform: "none",
//                         ":hover": {
//                           backgroundColor: "#3b82f6 ",
//                           boxShadow: "none",
//                         },
//                       }}
//                     >
//                       Edit
//                     </Button>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filteredOrders.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default Orders;


// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import PrinterIcon from "@mui/icons-material/Print";
// import { Edit } from "@mui/icons-material";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import TablePagination from "@mui/material/TablePagination";
// import StatusBadge from "./Statuses";
// import FilterBar from "./FilterBar";
// import { GlobalContext } from "../../Context/GlobalContext";
// import { styled } from "@mui/material/styles";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
// import { IoIosSearch } from "react-icons/io";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   Box,
//   Button,
//   TextField,
//   InputAdornment,
//   IconButton,
//   TableFooter,
// } from "@mui/material";
// import { MdOutlineCancel } from "react-icons/md";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#003375",
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Orders = () => {
//   // const { products, setProducts } = useContext(GlobalContext);
//   const [products, setProducts] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const navigate = useNavigate();
//   const [searchName, setSearchName] = useState("");
//   const [totalOrders, setTotalOrders] = useState(0);

//   const getAllOrders = async (pageNum, pageSize, search = "") => {
//     try {
//       const response = await axios.get(
//         "https://imlystudios-backend-mqg4.onrender.com/api/orders/getAllOrders",
//         {
//           params: {
//             page: pageNum + 1,
//             limit: pageSize,
//             search: search,
//           },
//         }
//       );
//       return {
//         orders: response.data.data,
//         totalCount: response.data.totalRecords,
//       };
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       throw error;
//     }
//   };
//   useEffect(() => {
//     fetchOrders();
//   }, [page, rowsPerPage, searchName]);

//   const fetchOrders = async () => {
//     try {
//       const { orders, totalCount } = await getAllOrders(
//         page,
//         rowsPerPage,
//         searchName
//       );

//       setProducts(orders);
//       setTotalOrders(totalCount);
//     } catch (error) {
//       console.error("Failed to fetch customers", error);
//     }
//   };

//   console.log(products);

//   // const handleOrderUpdate = (orderId) => {
//   //   navigate("/Addorders", { state: { orderId } });const handleEditClick = async (roleId) => {
//   // };
//   const getOrderById = async (orderId) => {
//     try {
//       const response = await axios.get(
//         // `https://imlystudios-backend-mqg4.onrender.com/api/userrole/getRoleById/${roleId}`
//      `${GETORDERBYID_API}/${orderId}`,
//       );
//       console.log("UserRole retrieved successfully:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching UserRole:", error);
//       throw error;
//     }
//   };
//   const handleEditClick = async (orderId) => {
//     try {
//       const orderIdDetails= await getOrderById(orderId);
//       setOrderIdDetails(orderIdDetails);
//       navigate("/Addorders");
//     } catch (error) {
//       console.error("Error fetching UserRole details:", error);
//     }
//   };

//   const handleCancel = (id) => {
//     const newStatus = "Canceled";
//     setProducts((prevItems) =>
//       prevItems.map((item) =>
//         item.OrderID === id ? { ...item, OrderStatus: newStatus } : item
//       )
//     );
//   };


//   const filteredOrders = products.filter(
//     (product) =>
//       selectedFilter === "All" || product.OrderStatus === selectedFilter
//   );

//   const paginatedData = filteredOrders;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   const { setOrderIdDetails } = useContext(OrderContext);

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="px-4 sm:px-6 lg:px-8 pt-4 w-auto bg-white">
//         <div className="sm:flex sm:items-center sm:justify-between">
//           {/* Title Section */}
//           <div className="sm:flex-auto">
//             <h2 className="w-auto text-xl mb-5 font-semibold p-2">Orders</h2>
//           </div>

//           {/* Container for centering search box */}
//           <div className="flex w-[50%] justify-center sm:justify-center">
//             <TextField
//               variant="outlined"
//               placeholder="Search by Order Number / Customer Name"
//               size="small"
//               sx={{
//                 width: { xs: "100%", sm: "100%", md: "300px", lg: "400px" },
//                 mb: { xs: 2, sm: 2 },
//                 mx: { xs: 0, sm: 0 },

//               }}
//               InputProps={{
//                 sx: {
//                   fontSize: "0.875rem",
//                   ":hover fieldset": {
//                     borderColor: "#003375",
//                   },
//                 },
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </div>

         
//           <div className="sm:flex sm:items-center sm:ml-auto sm:mr-auto sm:justify-end">
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: "center",
//                 gap: { xs: 1, sm: 1 },
//               }}
//             >
//               {/* Create Order Button */}
//               <Button
//                 variant="contained"
//                 disableRipple
//                 sx={{
//                   backgroundColor: "#003375",
//                   color: "white",
//                   mx: { xs: 0, sm: 1 },
//                   mb: { xs: 1, sm: 0 },
//                   boxShadow: "none",
//                   textTransform: "capitalize",
//                   fontSize: "0.875rem",
//                    // Set a fixed height
//                   ":hover": {
//                     backgroundColor: "#cadcfc",
//                     color: "#374151",
//                     boxShadow: "none",
//                   },
//                   width: { xs: "70%", sm: "auto" },
//                 }}
//                 startIcon={<HomeIcon />}
//                 href="/AddOrders"
//               >
//                 Create Order
//               </Button>

//               {/* Export Order Button */}
//               <Button
//                 variant="contained"
//                 disableRipple
//                 sx={{
//                   backgroundColor: "#003375",
//                   color: "white",
//                   mr: { xs: 0, sm: 0 },
//                   boxShadow: "none",
//                   textTransform: "capitalize",
//                   fontSize: "0.875rem",
//                    // Set a fixed height
//                   ":hover": {
//                     backgroundColor: "#cadcfc",
//                     color: "#374151",
//                     boxShadow: "none",
//                   },
//                   width: { xs: "70%", sm: "auto" },
//                 }}
//                 startIcon={<PrinterIcon />}
//                 href="/create-order"
//               >
//                 Export Order
//               </Button>
//             </Box>
//           </div>
//         </div>

//         <div className="flex justify-center md:justify-center mb-4 px-4 md:px-0 mt-6">
//           <div className="flex flex-wrap justify-center space-x-2 md:space-x-2 md:justify-center lg:justify-end">
//             <FilterBar
//               selectedFilter={selectedFilter}
//               onFilterChange={setSelectedFilter}
//             />
//           </div>
//         </div>

//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Order Number</StyledTableCell>
//                 <StyledTableCell>Order Date</StyledTableCell>
//                 <StyledTableCell align="center">Project Type</StyledTableCell>
//                 <StyledTableCell align="center">Customer Name</StyledTableCell>
//                 <StyledTableCell align="center">Order Status</StyledTableCell>
//                 <StyledTableCell align="center" colSpan={2}>
//                   Update
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((product) => (
//                 <StyledTableRow key={product.OrderID}>
//                   <StyledTableCell>{product.OrderNumber}</StyledTableCell>
//                   <StyledTableCell>
//                     {new Date(product.OrderDate).toLocaleTimeString()}
//                     <br />
//                     {new Date(product.OrderDate).toLocaleDateString()}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {product.Type}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {product.OrderBy}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <StatusBadge status={product.OrderStatus} />
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <button
//                       type="button"
//                       onClick={() => handleOrderUpdate(product.OrderID)}
//                       className=" m-0.5 inline-flex items-center gap-x-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
//                     >
//                       <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
//                       Edit
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleCancel(product.OrderID)}
//                       className=" inline-flex items-center gap-x-1 m-0.5 rounded-md hover:bg-rose-600 hover:text-white px-2 py-1 text-xs font-semibold  shadow-sm bg-pink-100  text-rose-900     "
//                     >
//                       <MdOutlineCancel
//                         fontSize=""
//                         aria-hidden="true"
//                         className="h-4 w-4 font-small"
//                       />
//                       Cancel
//                     </button>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//             <TableFooter>
//               <TableRow>
//                 <TablePagination
//                   rowsPerPageOptions={[10, 20, 25]}
//                   colSpan={6}
//                   count={totalOrders}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   ActionsComponent={TablePaginationActions}
//                 />
//               </TableRow>
//             </TableFooter>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default Orders;


// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import PrinterIcon from "@mui/icons-material/Print";
// import { Edit } from "@mui/icons-material";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import TablePagination from "@mui/material/TablePagination";
// import StatusBadge from "./Statuses";
// import FilterBar from "./FilterBar";
// import { GlobalContext } from "../../Context/GlobalContext";
// import { styled } from "@mui/material/styles";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
// import { IoIosSearch } from "react-icons/io";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   Box,
//   Button,
//   TextField,
//   InputAdornment,
//   IconButton,
//   TableFooter,
// } from "@mui/material";
// import { MdOutlineCancel } from "react-icons/md";
// import axios from "axios";
// import { useTheme } from "@emotion/react";
// import PropTypes from "prop-types";
// import FirstPageIcon from "@mui/icons-material/FirstPage";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import LastPageIcon from "@mui/icons-material/LastPage";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#003375",
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function TablePaginationActions(props) {
//   const { count, page, rowsPerPage, onPageChange } = props;
//   const theme = useTheme();

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

// const Orders = () => {
//   // const { products, setProducts } = useContext(GlobalContext);
//   const [products, setProducts] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const navigate = useNavigate();
//   const [searchName, setSearchName] = useState("");
//   const [totalOrders, setTotalOrders] = useState(0);

//   const getAllOrders = async (pageNum, pageSize, search = "") => {
//     try {
//       const response = await axios.get(
//         "https://imlystudios-backend-mqg4.onrender.com/api/orders/getAllOrders",
//         {
//           params: {
//             page: pageNum + 1,
//             limit: pageSize,
//             search: search,
//           },
//         }
//       );
//       return {
//         orders: response.data.data,
//         totalCount: response.data.totalRecords,
//       };
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       throw error;
//     }
//   };
//   useEffect(() => {
//     fetchOrders();
//   }, [page, rowsPerPage, searchName]);

//   const fetchOrders = async () => {
//     try {
//       const { orders, totalCount } = await getAllOrders(
//         page,
//         rowsPerPage,
//         searchName
//       );

//       setProducts(orders);
//       setTotalOrders(totalCount);
//     } catch (error) {
//       console.error("Failed to fetch customers", error);
//     }
//   };

//   console.log(products);

//   const handleOrderUpdate = (orderId) => {
//     navigate("/update-order", { state: { orderId } });
//   };

//   const handleCancel = (id) => {
//     const newStatus = "Canceled";
//     setProducts((prevItems) =>
//       prevItems.map((item) =>
//         item.OrderID === id ? { ...item, OrderStatus: newStatus } : item
//       )
//     );
//   };

//   const filteredOrders = products.filter(
//     (product) =>
//       selectedFilter === "All" || product.OrderStatus === selectedFilter
//   );

//   const paginatedData = filteredOrders;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
//       <div className="px-4 sm:px-6 lg:px-8 pt-4 w-auto bg-white">
//         <div className="sm:flex sm:items-center sm:justify-between">
//           {/* Title Section */}
//           <div className="sm:flex-auto">
//             <h2 className="w-auto text-xl mb-5 font-semibold p-2">Orders</h2>
//           </div>

//           {/* Container for centering search box */}
//           <div className="flex w-[50%] justify-center sm:justify-center">
//             <TextField
//               variant="outlined"
//               placeholder="Search by Order Number / Customer Name"
//               size="small"
//               sx={{
//                 width: { xs: "100%", sm: "100%", md: "300px", lg: "400px" },
//                 mb: { xs: 2, sm: 2 },
//                 mx: { xs: 0, sm: 0 },

//               }}
//               InputProps={{
//                 sx: {
//                   fontSize: "0.875rem",
//                   ":hover fieldset": {
//                     borderColor: "#003375",
//                   },
//                 },
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </div>

         
//           <div className="sm:flex sm:items-center sm:ml-auto sm:mr-auto sm:justify-end">
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: "center",
//                 gap: { xs: 1, sm: 1 },
//               }}
//             >
//               {/* Create Order Button */}
//               <Button
//                 variant="contained"
//                 disableRipple
//                 sx={{
//                   backgroundColor: "#003375",
//                   color: "white",
//                   mx: { xs: 0, sm: 1 },
//                   mb: { xs: 1, sm: 0 },
//                   boxShadow: "none",
//                   textTransform: "capitalize",
//                   fontSize: "0.875rem",
//                    // Set a fixed height
//                   ":hover": {
//                     backgroundColor: "#cadcfc",
//                     color: "#374151",
//                     boxShadow: "none",
//                   },
//                   width: { xs: "70%", sm: "auto" },
//                 }}
//                 startIcon={<HomeIcon />}
//                 href="/AddOrders"
//               >
//                 Create Order
//               </Button>

//               {/* Export Order Button */}
//               <Button
//                 variant="contained"
//                 disableRipple
//                 sx={{
//                   backgroundColor: "#003375",
//                   color: "white",
//                   mr: { xs: 0, sm: 0 },
//                   boxShadow: "none",
//                   textTransform: "capitalize",
//                   fontSize: "0.875rem",
//                    // Set a fixed height
//                   ":hover": {
//                     backgroundColor: "#cadcfc",
//                     color: "#374151",
//                     boxShadow: "none",
//                   },
//                   width: { xs: "70%", sm: "auto" },
//                 }}
//                 startIcon={<PrinterIcon />}
//                 href="/create-order"
//               >
//                 Export Order
//               </Button>
//             </Box>
//           </div>
//         </div>

//         <div className="flex justify-center md:justify-center mb-4 px-4 md:px-0 mt-6">
//           <div className="flex flex-wrap justify-center space-x-2 md:space-x-2 md:justify-center lg:justify-end">
//             <FilterBar
//               selectedFilter={selectedFilter}
//               onFilterChange={setSelectedFilter}
//             />
//           </div>
//         </div>

//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Order Number</StyledTableCell>
//                 <StyledTableCell>Order Date</StyledTableCell>
//                 <StyledTableCell align="center">Project Type</StyledTableCell>
//                 <StyledTableCell align="center">Customer Name</StyledTableCell>
//                 <StyledTableCell align="center">Order Status</StyledTableCell>
//                 <StyledTableCell align="center" colSpan={2}>
//                   Update
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((product) => (
//                 <StyledTableRow key={product.OrderID}>
//                   <StyledTableCell>{product.OrderNumber}</StyledTableCell>
//                   <StyledTableCell>
//                     {new Date(product.OrderDate).toLocaleTimeString()}
//                     <br />
//                     {new Date(product.OrderDate).toLocaleDateString()}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {product.Type}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {product.OrderBy}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <StatusBadge status={product.OrderStatus} />
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <button
//                       type="button"
//                       onClick={() => handleOrderUpdate(product.OrderID)}
//                       className=" m-0.5 inline-flex items-center gap-x-1 rounded-md hover:bg-sky-600 hover:text-white px-2 py-1 text-xs font-semibold  shadow-sm bg-[#d6eaf8] text-sky-900   "
//                     >
//                       <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
//                       Edit
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleCancel(product.OrderID)}
//                       className=" inline-flex items-center gap-x-1 m-0.5 rounded-md hover:bg-rose-600 hover:text-white px-2 py-1 text-xs font-semibold  shadow-sm bg-pink-100  text-rose-900     "
//                     >
//                       <MdOutlineCancel
//                         fontSize=""
//                         aria-hidden="true"
//                         className="h-4 w-4 font-small"
//                       />
//                       Cancel
//                     </button>
//                   </StyledTableCell>
//                   {/* <StyledTableCell align="center">
//                     <button
//                       type="button"
//                       className={`rounded-md p-[3px] h-9 text-xs font-semibold text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2  ${
//                         product.OrderStatus === "Dispatched"
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : product.OrderStatus === "Canceled"
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-red-600 hover:bg-red-500 focus:ring-red-500"
//                       } whitespace-normal`}
//                       disabled={
//                         product.OrderStatus === "Dispatched" ||
//                         product.OrderStatus === "Canceled"
//                       }
//                       onClick={() => handleCancel(product.OrderID)}
//                     >
//                       {product.OrderStatus === "Dispatched" ? (
//                         <>
//                           Already <br /> Dispatched
//                         </>
//                       ) : product.OrderStatus === "Canceled" ? (
//                         "Canceled"
//                       ) : (
//                         "Cancel Order"
//                       )}
//                     </button>
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     <Button
//                       onClick={() => handleOrderUpdate(product.OrderID)}
//                       variant="contained"
//                       startIcon={<Edit />}
//                       sx={{
//                         backgroundColor: "#2563eb",
//                         color: "white",
//                         fontSize: "0.75rem",
//                         padding: "4px 8px",
//                         borderRadius: "4px",
//                         boxShadow: "none",
//                         textTransform: "none",
//                         ":hover": {
//                           backgroundColor: "#3b82f6 ",
//                           boxShadow: "none",
//                         },
//                       }}
//                     >
//                       Edit
//                     </Button>
//                   </StyledTableCell> */}
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//             <TableFooter>
//               <TableRow>
//                 <TablePagination
//                   rowsPerPageOptions={[10, 20, 25]}
//                   colSpan={6}
//                   count={totalOrders}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   ActionsComponent={TablePaginationActions}
//                 />
//               </TableRow>
//             </TableFooter>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default Orders;



import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PrinterIcon from "@mui/icons-material/Print";
import { Edit } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import StatusBadge from "./Statuses";
import FilterBar from "./FilterBar";
import { GlobalContext } from "../../Context/GlobalContext";
import { styled } from "@mui/material/styles";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";
import {OrderContext} from "../../Context/orderContext";
import axios from "axios";
import {GETORDERBYID_API} from "../../Constants/apiRoutes";

import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";
import "../../style.css";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#003375",
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

const Orders = () => {
  const { products, setProducts } = useContext(GlobalContext);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  // const handleOrderUpdate = (orderId) => {
  //   navigate("/Addorders", { state: { orderId } });const handleEditClick = async (roleId) => {
  // };
  const getOrderById = async (orderId) => {
    try {
      const response = await axios.get(
        // `https://imlystudios-backend-mqg4.onrender.com/api/userrole/getRoleById/${roleId}`
     `${GETORDERBYID_API}/${orderId}`,
      );
      console.log("UserRole retrieved successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching UserRole:", error);
      throw error;
    }
  };
  const handleEditClick = async (orderId) => {
    try {
      const orderIdDetails= await getOrderById(orderId);
      setOrderIdDetails(orderIdDetails);
      navigate("/Addorders");
    } catch (error) {
      console.error("Error fetching UserRole details:", error);
    }
  };

  const handleCancel = (id) => {
    const newStatus = "Canceled";
    setProducts((prevItems) =>
      prevItems.map((item) =>
        item.OrderID === id ? { ...item, OrderStatus: newStatus } : item
      )
    );
  };


  const filteredOrders = products.filter(
    (product) =>
      selectedFilter === "All" || product.OrderStatus === selectedFilter
  );

  const paginatedData = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { setOrderIdDetails } = useContext(OrderContext);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
      <div className="px-4 sm:px-6 lg:px-8 pt-4 w-auto bg-white">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Title Section */}
          <div className="sm:flex-auto">
            <h2 className="w-auto text-xl mb-5 font-semibold">Orders</h2>
          </div>

          {/* Container for centering search box */}
          <div className="flex w-[60%] justify-center sm:justify-center">
            <TextField
              variant="outlined"
              placeholder="Search by Order Number / Customer Name"
              size="small"
              sx={{
                width: { xs: "100%", sm: "100%", md: "400px", lg: "500px" },
                mb: { xs: 1, sm: 0 },
                mx: { xs: 0, sm: 1 },
              }}
              InputProps={{
                sx: {
                  fontSize: "0.875rem",
                  ":hover fieldset": {
                    borderColor: "#003375",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Container for buttons aligned at the end */}
          <div className="sm:flex sm:items-center sm:ml-auto sm:justify-end">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: { xs: 2, sm: 1 },
              }}
            >
              {/* Create Order Button */}
              <Button
                variant="contained"
                disableRipple
                sx={{
                  backgroundColor: "#003375",
                  color: "white",
                  mx: { xs: 0, sm: 1 },
                  mb: { xs: 1, sm: 0 },
                  boxShadow: "none",
                  textTransform: "capitalize",
                  fontSize: "0.875rem",
                  ":hover": {
                    backgroundColor: "#cadcfc",
                    color: "#374151",
                    boxShadow: "none",
                  },
                  width: { xs: "100%", sm: "auto" },
                }}
                startIcon={<HomeIcon />}
                href="/AddOrders"
              >
                Create Order
              </Button>

              {/* Export Order Button */}
              <Button
                variant="contained"
                disableRipple
                sx={{
                  backgroundColor: "#003375",
                  color: "white",
                  mr: { xs: 0, sm: 0 },
                  boxShadow: "none",
                  textTransform: "capitalize",
                  fontSize: "0.875rem",
                  ":hover": {
                    backgroundColor: "#cadcfc",
                    color: "#374151",
                    boxShadow: "none",
                  },
                  width: { xs: "100%", sm: "auto" },
                }}
                startIcon={<PrinterIcon />}
                href="/create-order"
              >
                Export Order
              </Button>
            </Box>
          </div>
        </div>

        <div className="flex justify-center md:justify-center mb-4 px-4 md:px-0 mt-6">
          <div className="flex flex-wrap justify-center space-x-2 md:space-x-2 md:justify-center lg:justify-end">
            <FilterBar
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
        </div>

        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Order Number</StyledTableCell>
                <StyledTableCell>Order Date</StyledTableCell>
                <StyledTableCell align="center">Project Type</StyledTableCell>
                <StyledTableCell align="center">Customer Name</StyledTableCell>
                <StyledTableCell align="center">Order Status</StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  Update
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((product) => (
                <StyledTableRow key={product.OrderID}>
                  <StyledTableCell>{product.OrderNumber}</StyledTableCell>
                  <StyledTableCell>
                    {new Date(product.OrderDate).toLocaleDateString()} <br />
                    {new Date(product.OrderDate).toLocaleTimeString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.Type}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.OrderBy}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusBadge status={product.OrderStatus} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="button-container">
  <button
    type="button"
    onClick={() => handleEditClick(product.OrderID)}
    className="button edit-button"
  >
    <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
    Edit
  </button>

  <button
    type="button"
    onClick={() => handleCancel(product.OrderID)}
    className="button delete-button"
  >
    <MdOutlineCancel aria-hidden="true" className="h-4 w-4" />
    Delete
  </button>
</div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer> */}
        <TableContainer component={Paper}>
  <Table
    sx={{ minWidth: 700, tableLayout: "fixed" }}  // Ensure equal width columns
    aria-label="customized table"
  >
    <TableHead>
      <TableRow>
        <StyledTableCell align="center" sx={{ width: '15%' }}>Order Number</StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '15%' }}>Order Date</StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '15%' }}>Project Type</StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '20%' }}>Customer Name</StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '15%' }}>Order Status</StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '20%' }} colSpan={2}>Update</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {paginatedData.map((product) => (
        <StyledTableRow key={product.OrderID}>
          <StyledTableCell align="center">{product.OrderNumber}</StyledTableCell>
          <StyledTableCell align="center">
            {new Date(product.OrderDate).toLocaleDateString()} <br />
            {new Date(product.OrderDate).toLocaleTimeString()}
          </StyledTableCell>
          <StyledTableCell align="center">{product.Type}</StyledTableCell>
          <StyledTableCell align="center">{product.OrderBy}</StyledTableCell>
          <StyledTableCell align="center">
            <StatusBadge status={product.OrderStatus} />
          </StyledTableCell>
          <StyledTableCell align="center">
            <div className="button-container">
              <button
                type="button"
                onClick={() => handleEditClick(product.OrderID)}
                className="button edit-button"
              >
                <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleCancel(product.OrderID)}
                className="button delete-button"
              >
                <MdOutlineCancel aria-hidden="true" className="h-4 w-4" />
                Delete
              </button>
            </div>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
  <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={filteredOrders.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
</TableContainer>

      </div>
    </div>
  );
};

export default Orders;
