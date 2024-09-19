// import React from 'react';
// import { FaList, FaTruck,FaClock, FaBan } from 'react-icons/fa';

// const FilterBar = ({ selectedFilter, onFilterChange }) => {
//   return (
//     <div className="flex space-x-4 p-4 bg-gray-100 rounded-md">
//       <button
//         className={`inline-flex items-center gap-x-1.5 px-4 py-2 text-sm font-semibold rounded-md ${
//           selectedFilter === 'All'
//             ? 'bg-red-500 text-white'
//             : 'bg-white text-gray-700'
//         }`}
//         onClick={() => onFilterChange('All')}
//       >
//         <FaList/>
//         All
//       </button>
//       <button
//         className={`inline-flex items-center gap-x-1.5 px-4 py-2 text-sm font-semibold rounded-md ${
//           selectedFilter === 'Delivered'
//             ? 'bg-red-500 text-white'
//             : 'bg-white text-gray-700'
//         }`}
//         onClick={() => onFilterChange('Delivered')}
//       >
//         <FaTruck/>
//         Delivered
//       </button>
//       <button
//         className={`inline-flex items-center gap-x-1.5 px-4 py-2 text-sm font-semibold rounded-md ${
//           selectedFilter === 'Pending'
//             ? 'bg-red-500 text-white'
//             : 'bg-white text-gray-700'
//         }`}
//         onClick={() => onFilterChange('Pending')}
//       >
//         <FaClock/>
//         Pending
//       </button>
//       <button
//         className={`inline-flex items-center gap-x-1.5 px-4 py-2 text-sm font-semibold rounded-md ${
//           selectedFilter === 'Canceled'
//             ? 'bg-red-500 text-white'
//             : 'bg-white text-gray-700'
//         }`}
//         onClick={() => onFilterChange('Canceled')}
//       >
//         <FaBan/>
//         Canceled
//       </button>
//     </div>
//   );
// };

// export default FilterBar;


// import React from 'react';
// import { FaList, FaTruck,FaClock, FaBan } from 'react-icons/fa';

// const FilterBar = ({ selectedFilter, onFilterChange }) => {
//   return (
//     <div className="flex space-x-4 p-4 bg-gray-100 rounded-md">
//       <button
//         className={`inline-flex items-center gap-x-1.5 px-4 py-2 text-sm font-semibold rounded-md ${
//           selectedFilter === 'All'
//             ? 'bg-custom-darkblue text-white hover:bg-custom-lightblue hover:text-gray-700'
//             : 'bg-white text-gray-700 hover:bg-custom-lightblue hover:text-gray-700'
//         }`}
//         onClick={() => onFilterChange('All')}
//       >
//         <FaList/>
//         All
//       </button>
//       <button
//         className={`inline-flex items-center gap-x-1.5 px-4 py-2 text-sm font-semibold rounded-md ${
//           selectedFilter === 'Dispatched'
//        ? 'bg-custom-darkblue text-white hover:bg-custom-lightblue hover:text-gray-700'
//             : 'bg-white text-gray-700 hover:bg-custom-lightblue hover:text-gray-700'
//         }`}
//         onClick={() => onFilterChange('Dispatched')}
//       >
//         <FaTruck/>
//         Dispatched
//       </button>
//       <button
//         className={`inline-flex items-center gap-x-1.5 px-4 py-2 text-sm font-semibold rounded-md ${
//           selectedFilter === 'Pending'
//          ? 'bg-custom-darkblue text-white hover:bg-custom-lightblue hover:text-gray-700'
//             : 'bg-white text-gray-700 hover:bg-custom-lightblue hover:text-gray-700'
//         }`}
//         onClick={() => onFilterChange('Pending')}
//       >
//         <FaClock/>
//         Pending
//       </button>
//       <button
//         className={`inline-flex items-center gap-x-1.5 px-4 py-2 text-sm font-semibold rounded-md ${
//           selectedFilter === 'Canceled'
//         ? 'bg-custom-darkblue text-white hover:bg-custom-lightblue hover:text-gray-700'
//             : 'bg-white text-gray-700 hover:bg-custom-lightblue hover:text-gray-700'
//         }`}
//         onClick={() => onFilterChange('Canceled')}
//       >
//         <FaBan/>
//         Cancelled
//       </button>
//     </div>
//   );
// };

// export default FilterBar;



import React, { useState } from "react";
import { FaList, FaTruck, FaBan } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import {
  PendingActions as PendingIcon,
  CheckBox as ApprovedIcon,
  Architecture as DesignIcon,
  PrecisionManufacturing as ProductionIcon,
  Engineering as TechnicalIcon,
  BorderBottom,
} from "@mui/icons-material";
import { MdOutlineTask } from "react-icons/md";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GppBadIcon from "@mui/icons-material/GppBad";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ListIcon from "@mui/icons-material/List";
import EngineeringIcon from "@mui/icons-material/Engineering";
import InventoryIcon from "@mui/icons-material/Inventory";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import StraightenIcon from "@mui/icons-material/Straighten";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";


const FilterBar = ({ selectedFilter, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const buttonStyles = {
    height: "40px", // Fixed height for equal size
    color: "#1f2937",
    boxShadow: "none",
    // border: "1px solid #003375",
    borderRadius: "0.375rem",
    padding: "12px", // Adjusted padding for height
    fontSize: "14px", // Increased font size for better visibility
    marginRight: "10px", // Consistent gap between buttons
    marginBottom: "5px",
  };

  const buttonStylesInside = {
    height: "40px", // Fixed height for equal size
    color: "#1f2937",
    boxShadow: "none",
    // border: "1px solid #003375",
    borderRadius: "0.375rem",
    padding: "12px", // Adjusted padding for height
    fontSize: "14px", // Increased font size for better visibility
    marginTop: "10px", // Consistent gap between buttons
    marginRight: "5px",
    marginLeft: "5px",
            // backgroundColor:"white"
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-0">
      {/* Display First Three Buttons */}
      <Button
        disableRipple
        variant="contained"
        startIcon={<ListIcon />}
        sx={{ mx: 1 }}
        style={{
          ...buttonStyles,
          textTransform: "capitalize",
          backgroundColor: selectedFilter === "All" ? "#003375" : "#f6ddcc",
          color: selectedFilter === "All" ? "white" : "#6e2c00  ",
        }}
        onClick={() => onFilterChange("All")}
      >
        All
      </Button>
      <Button
        disableRipple
        variant="contained"
        startIcon={<PendingActionsIcon />}
        style={{
          ...buttonStyles,
          textTransform: "capitalize",
          backgroundColor: selectedFilter === "Pending" ? "#003375" : "#d5f5e3",
          color: selectedFilter === "Pending" ? "white" : "#186a3b",
        }}
        onClick={() => onFilterChange("Pending")}
      >
        Pending
      </Button>
      <Button
        disableRipple
        variant="contained"
        startIcon={<ApprovedIcon />}
        style={{
          ...buttonStyles,
          textTransform: "capitalize",
          backgroundColor:
            selectedFilter === "Quick Quote" ? "#003375" : "#d6eaf8 ",
          color: selectedFilter === "Quick Quote" ? "white" : "#1b4f72 ",
        }}
        onClick={() => onFilterChange("Quick Quote")}
      >
        Quick Quote
      </Button>
      <Button
        disableRipple
        variant="contained"
        startIcon={<MdDesignServices />}
        style={{
          ...buttonStyles,
          textTransform: "capitalize",
          backgroundColor:
            selectedFilter === "Initial Design" ? "#003375" : "#e8daef ",
          color: selectedFilter === "Initial Design" ? "white" : "#4a235a",
        }}
        onClick={() => onFilterChange("Initial Design")}
      >
        Initial Design
      </Button>

      {/* More Button with Dropdown */}
      <Button
        disableRipple
        variant="contained"
        startIcon={<MoreHorizIcon />}
        onClick={handleMenuOpen}
        style={{
          ...buttonStyles,
          textTransform: "capitalize",
          backgroundColor: "#fce7f3",
          color: "#9d174d",
        }}
      >
        More
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: "200px",
            width: "220px",
            // backgroundColor: "#fce7f3",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            onFilterChange("Initial Measurement");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <StraightenIcon sx={{ mr: 1 }} />
          Initial Measurement
        </MenuItem>
        <MenuItem
          onClick={() => {
            onFilterChange("Revised Design");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <EngineeringIcon sx={{ mr: 1 }} />
          Revised Design
        </MenuItem>
        <MenuItem
          onClick={() => {
            onFilterChange("Final Measurement");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <DesignIcon sx={{ mr: 1 }} />
          Final Measurement
        </MenuItem>
        <MenuItem
          onClick={() => {
            onFilterChange("SignUp Document");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <FactCheckIcon sx={{ mr: 1 }} />
          Signup Document
        </MenuItem>
        <MenuItem
          onClick={() => {
            onFilterChange("Production");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <ProductionIcon sx={{ mr: 1 }} />
          Production
        </MenuItem>
        <MenuItem
          onClick={() => {
            onFilterChange("PDI");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <CameraOutdoorIcon sx={{ mr: 1 }} />
          PDI
        </MenuItem>
        <MenuItem
          onClick={() => {
            onFilterChange("Dispatch");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <LocalShippingIcon sx={{ mr: 1 }} />
          Dispatch
        </MenuItem>
        <MenuItem
          onClick={() => {
            onFilterChange("Installation");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <InventoryIcon sx={{ mr: 1 }} />
          Installation
        </MenuItem>

        <MenuItem
          onClick={() => {
            onFilterChange("Completed");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <ThumbUpIcon sx={{ mr: 1 }} />
          Completed
        </MenuItem>
        <MenuItem
          onClick={() => {
            onFilterChange("Cancelled");
            handleMenuClose();
          }}
          style={{
            ...buttonStylesInside,
            padding: "10px 15px",
            fontSize: "14px",
          }}
        >
          <GppBadIcon sx={{ mr: 1 }} />
          Cancelled
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterBar;
