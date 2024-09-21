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
    borderRadius: "9999px",
    padding: "12px", // Adjusted padding for height
    fontSize: "14px", // Increased font size for better visibility
    marginRight: "10px", // Consistent gap between buttons
    marginBottom: "5px",
    width: "140px",
  };

  const buttonStylesInside = {
    height: "40px", // Fixed height for equal size
    color: "#1f2937",
    boxShadow: "none",
    // border: "1px solid #003375",
    borderRadius: "9999px",
    padding: "12px", // Adjusted padding for height
    fontSize: "14px", // Increased font size for better visibility
    marginTop: "10px", // Consistent gap between buttons
    marginRight: "5px",
    marginLeft: "5px",
    // boxShadow: "0 0 0 1px #92400e inset",
    boxShadow: "0 0 0 1px black inset",
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
          backgroundColor: selectedFilter === "All" ? "#db2777" : "#fbcfe8",
          color: selectedFilter === "All" ? "white" : "#9d174d",
          boxShadow: "0 0 0 1px #9d174d inset",
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
          backgroundColor: selectedFilter === "Pending" ? "#15803d" : "#d5f5e3",
          color: selectedFilter === "Pending" ? "white" : "#186a3b",
          boxShadow: "0 0 0 1px #186a3b inset",
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
            selectedFilter === "Quick Quote" ? "#0891b2" : "#cffafe",
          color: selectedFilter === "Quick Quote" ? "white" : "#155e75",
          boxShadow: "0 0 0 1px #155e75 inset",
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
            selectedFilter === "Initial Design" ? "#86198f  " : "#e8daef ",
          color: selectedFilter === "Initial Design" ? "white" : "#86198f",
          boxShadow: "0 0 0 1px #4a235a inset",
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
          // backgroundColor: "#fce7f3",
          // color: "#9d174d",
          color: "#92400e",
          boxShadow: "0 0 0 1px #92400e inset",
          backgroundColor:
            selectedFilter !== "All" &&
            selectedFilter !== "Pending" &&
            selectedFilter !== "Quick Quote" &&
            selectedFilter !== "Initial Design"
              ? "#92400e"
              : "#fef3c7",
          color:
            selectedFilter !== "All" &&
            selectedFilter !== "Pending" &&
            selectedFilter !== "Quick Quote" &&
            selectedFilter !== "Initial Design"
              ? "white"
              : "#92400e",
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
            backgroundColor: "#f1f5f9",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "Initial Measurement"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Initial Measurement" ? "white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "Revised Design"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Revised Design" ? "white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "Final Measurement"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Final Measurement" ? "white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "Signup Document"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Signup Document" ?"white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "Production"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Production" ? "white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "PDI"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "PDI" ? "white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "Dispatch"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Dispatch" ? "white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "Installation"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Installation" ? "white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor: "#fef3c7",
            // backgroundColor:
            //   selectedFilter === "Completed"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Completed" ? "white" : "#92400e",
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
            // color: "#92400e",
            // backgroundColor:
            //   selectedFilter === "Cancelled"
            //     ? "#92400e  "
            //     : "#fef3c7 ",
            // color: selectedFilter === "Cancelled" ? "white" : "#92400e",
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
