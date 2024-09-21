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
import { UserRoleContext } from "../../Context/roleContext";
import {
  GETALLROLESS_API,
  GETALLROLESBYID_API,
  DELETEROLESBYID_API,
} from "../../Constants/apiRoutes";
import { MdOutlineCancel } from "react-icons/md";
import "../../style.css";
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";

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
//   "&:nth-of-type(even)": {
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

function UserRoles() {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [totalRoles, setTotalRoles] = useState(0);
  const navigate = useNavigate();
  const { setRoleDetails } = useContext(UserRoleContext);

  // Fetch roles data
  const getAllRoles = async (pageNum, pageSize, search = "") => {
    try {
      const response = await axios.get(
        // "https://imlystudios-backend-mqg4.onrender.com/api/userrole/getAllRoles",
        GETALLROLESS_API,
        {
          params: {
            page: pageNum + 1,
            // pageSize: pageSize,
            limit: pageSize,
            search: search,
          },
        }
      );
      return {
        roles: response.data.roles,
        totalCount: response.data.totalItems,
      };
    } catch (error) {}
  };

  useEffect(() => {
    fetchRoles();
  }, [page, rowsPerPage, searchName]);

  const fetchRoles = async () => {
    try {
      const { roles, totalCount } = await getAllRoles(
        page,
        rowsPerPage,
        searchName
      );
      setRoles(roles);
      setTotalRoles(totalCount);
    } catch (error) {
      console.error("Failed to fetch userroles", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fetch role details by ID
  const getRoleById = async (roleId) => {
    try {
      const response = await axios.get(
        // `https://imlystudios-backend-mqg4.onrender.com/api/userrole/getRoleById/${roleId}`
        `${GETALLROLESBYID_API}/${roleId}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Handle the deletion of a role
  const deleteRoleById = async (roleId) => {
    try {
      const response = await axios.delete(
        // `https://imlystudios-backend-mqg4.onrender.com/api/userrole/deleteRole/${roleId}`
        `${DELETEROLESBYID_API}/${roleId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting role:", error);
      throw error;
    }
  };

  // Handle edit button click
  const handleEditClick = async (roleId, roleName) => {
    navigate("/editroleform", { state: { roleId, roleName } });
  };

  // Handle delete button click
  const handleDeleteClick = async (roleId) => {
    try {
      await deleteRoleById(roleId);
      fetchRoles(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Export user roles data to Excel
  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExportUserRolesData = async () => {
    try {
      const { roles } = await getAllRoles(0, totalRoles); // Fetch all users for export
      exportToExcel(roles, "userRoles");
    } catch (error) {
      console.error("Error exporting userrole data:", error);
    }
  };

  const handleAddUserRoleClick = () => {
    setRoleDetails(null);
    navigate("/addroleform");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-72 w-auto">
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">

        <div className="body-container">
          <h2 className="heading">Roles</h2>
          <div className="search-button-group">
            <div className="search-container">
              <label htmlFor="searchName" className="sr-only">
                Search
              </label>
              <input
                id="searchName"
                type="text"
                placeholder="Search by Name or Email or Mobile"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="search-input"
              />
              <div className="search-icon-container">
                <IoIosSearch />
              </div>
            </div>

            <ul className="button-list">
              <li>
                <button
                  type="button"
                  className="action-button"
                  onClick={handleAddUserRoleClick}
                >
                  <FaPlus aria-hidden="true" className="icon" />
                  Add Roles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="action-button"
                  onClick={handleExportUserRolesData}
                >
                  <FaTable aria-hidden="true" className="icon" />
                  Export Roles
                </button>
              </li>
            </ul>
          </div>
        </div>

        <TableContainer
          component={Paper}
          className="mt-4"
          sx={{ width: "100%", margin: "0 auto", marginTop: "1rem" }}
        >
          <Table sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: "20%" }} align="left">
                  Role ID
                </StyledTableCell>
                <StyledTableCell sx={{ width: "20%" }} align="left">
                  Name
                </StyledTableCell>
                <StyledTableCell sx={{ width: "20%" }} align="center">
                  Status
                </StyledTableCell>
                <StyledTableCell
                  sx={{ width: "20%" }}
                  align="center"
                  colSpan={2}
                >
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((row) => (
                <StyledTableRow key={row.RoleID}>
                  <StyledTableCell align="left">{row.RoleID}</StyledTableCell>
                  <StyledTableCell align="left">{row.RoleName}</StyledTableCell>
                  <StyledTableCell align="center">
                    <span
                      className={`status-pill ${
                        row.Status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {row.Status}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditClick(row.RoleID, row.RoleName)}
                        className="button edit-button flex items-center"
                      >
                        <AiOutlineEdit
                          aria-hidden="true"
                          className="h-4 w-4 mr-1"
                        />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteClick(row.RoleID)}
                        className="button delete-button flex items-center"
                      >
                        <MdOutlineCancel
                          aria-hidden="true"
                          className="h-4 w-4 mr-1"
                        />
                        Delete
                      </button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 25]}
                  colSpan={4}
                  count={totalRoles}
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

export default UserRoles;
