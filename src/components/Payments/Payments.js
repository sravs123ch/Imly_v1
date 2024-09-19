



import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PayPal from "../../assests/Images/PayPal.png";
import GPay from "../../assests/Images/GPay.png";
import mastercard from "../../assests/Images/mastercard.png";
import amazonpay from "../../assests/Images/amazonpay.png";
import * as XLSX from 'xlsx';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { FaTable, FaPlus } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
import { IoIosSearch } from 'react-icons/io';


// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#003375', // Dark blue color
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Sample data with images
const initialPayments = [
  {
    paymentMethod: "PayPal",
    paymentDate: "06-09-2024",
    orderNumber: "ORD123456",
    customerName: "John Doe",
    amount: "₹150.00",
    icon: PayPal,
  },
  {
    paymentMethod: "GPay",
    paymentDate: "06-09-2024",
    orderNumber: "ORD163456",
    customerName: "John",
    amount: "₹156.00",
    icon: GPay,
  },
  {
    paymentMethod: "Mastercard",
    paymentDate: "06-09-2024",
    orderNumber: "ORD183456",
    customerName: "Doe",
    amount: "₹159.00",
    icon: mastercard,
  },
  {
    paymentMethod: "Amazon Pay",
    paymentDate: "06-09-2024",
    orderNumber: "ORD193456",
    customerName: "Tim",
    amount: "₹157.00",
    icon: amazonpay,
  },
];

export default function PaymentList() {
  const [payments, setPayments] = useState(initialPayments);
  const [formData, setFormData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchName, setSearchName] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedPayments = [...payments];
      updatedPayments[editingIndex] = formData;
      setPayments(updatedPayments);
      setEditingIndex(null);
    } else {
      setPayments([...payments, formData]);
    }
    setFormData(null);
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setFormData(null);
    setEditingIndex(null);
    setIsFormVisible(false);
  };

  const handleAddPaymentClick = () => {
    setFormData({
      paymentMethod: "",
      paymentDate: "",
      orderNumber: "",
      customerName: "",
      amount: "",
    });
    setEditingIndex(null);
    setIsFormVisible(true);
  };

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExportPaymentsData = () => {
    exportToExcel(payments, 'Payments');
  };

  const handleSearch = () => {
    const filteredPayments = payments.filter(payment =>
      payment.customerName.toLowerCase().includes(searchName.toLowerCase())
    );
    setPaginatedPayments(filteredPayments.slice(0, rowsPerPage));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payments.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [paginatedPayments, setPaginatedPayments] = useState([]);

  useEffect(() => {
    setPaginatedPayments(
      payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [payments, page, rowsPerPage]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:ml-10 lg:ml-72 w-auto shadow-lg rounded-lg bg-white">
      {!isFormVisible ? (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          {/* <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Payments</h2>
            <div className="flex items-center space-x-4">
              <div className="relative flex flex-col w-[20rem]">
                <label htmlFor="searchName" className="text-sm font-medium"></label>
                <input
                  id="searchName"
                  type="text"
                  placeholder="Search by Customer Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="mt-1 p-2 pr-10 border border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SearchIcon />
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-x-1 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700"
                onClick={handleAddPaymentClick}
              >
                <FaPlus aria-hidden="true" className="-ml-0.5 h-4 w-4" />
                Add Payment
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-x-1 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700"
                onClick={handleExportPaymentsData}
              >
                <FaTable aria-hidden="true" className="-ml-0.5 h-4 w-4" />
                Export Payments
              </button>
            </div>
          </div> */}

<div className="flex flex-wrap items-center justify-between w-full">
  <h2 className="pl-4 text-xl font-semibold">Payments</h2>
  
  <div className="relative flex items-center p-2">
    <input
      id="searchName"
      type="text"
      placeholder="Search by Name or Email or Mobile"
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
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
        onClick={handleAddPaymentClick}
      >
        <FaPlus aria-hidden="true" className="-ml-0.5 h-4 w-4" />
        Add Payments
      </button>
    </li>

    <li>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        onClick={handleExportPaymentsData}
      >
        <FaTable aria-hidden="true" className="-ml-0.5 h-4 w-4" />
        Export Payments
      </button>
    </li>
  </ul>
</div>

          <TableContainer component={Paper} className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Payment Method</StyledTableCell>
                  <StyledTableCell>Payment Date</StyledTableCell>
                  <StyledTableCell>Order Number</StyledTableCell>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPayments.map((payment, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <div className="flex items-center">
                        <img src={payment.icon} alt={payment.paymentMethod} className="h-6 w-6 mr-2"  />
                        <span class="py-4 px-6 text-sm text-gray-500">                         {payment.paymentMethod}
                        </span>
                      </div>
                    </StyledTableCell>
                    <td className="py-4 px-6 text-sm text-gray-500">{payment.paymentDate}</td>
                    <td class="py-4 px-6 text-sm text-gray-500">{payment.orderNumber}</td>

                    <StyledTableCell class="py-4 px-6 text-sm text-gray-500">{payment.customerName}</StyledTableCell>
                    <StyledTableCell class="py-4 px-6 text-sm text-gray-500">{payment.amount}</StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <StyledTableRow style={{ height: 53 * emptyRows }}>
                    <StyledTableCell colSpan={5} />
                  </StyledTableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                  class="py-4 px-6 text-sm text-gray-500"
                    rowsPerPageOptions={[5, 10, 25]}
                    component="td"
                    count={payments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingIndex !== null ? "Edit Payment" : "Add Payment"}
          </h2>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium">
              Payment Method
            </label>
            <input
              type="text"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleFormChange}
              className="mt-1 p-2 pr-10 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentDate" className="block text-sm font-medium">
              Payment Date
            </label>
            <input
              type="text"
              id="paymentDate"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleFormChange}
              className="mt-1 p-2 pr-10 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="orderNumber" className="block text-sm font-medium">
              Order Number
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleFormChange}
              className="mt-1 p-2 pr-10 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-sm font-medium">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleFormChange}
              className="mt-1 p-2 pr-10 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleFormChange}
              className="mt-1 p-2 pr-10 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 inline-flex items-center gap-x-1 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-x-1 rounded-md bg-custom-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-lightblue hover:text-gray-700"
            >
              {editingIndex !== null ? "Update" : "Add Payment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}