import * as React from "react";
import { Link } from "react-router-dom";
// import {statusPurchase} from "./Dashboard"
// Mui Components
import {
  Divider,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  List,
} from "@mui/material";

// Icons
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CalculateIcon from "@mui/icons-material/Calculate";
import InfoIcon from "@mui/icons-material/Info";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PreviewIcon from "@mui/icons-material/Preview";
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from '@mui/icons-material/Home';
// console.log("Status",{statusPurchase})
export const mainListItems = (
  <React.Fragment>
    <List>
      <Divider />
      {/* Home */}
      <ListItemButton component={Link} to="/">
        <ListItemIcon> <HomeIcon /> </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <Divider />
      {/* Installment Calculator */}
      <ListItemButton component={Link} to="/Calculator">
        <ListItemIcon>
          {" "}
          <CalculateIcon />{" "}
        </ListItemIcon>
        <ListItemText primary="Calculator" />
      </ListItemButton>

      {/* Notify */}
      <ListItemButton component={Link} to="/NotificationTable">
        <ListItemIcon>
          {" "}
          <NotificationsActiveIcon />{" "}
        </ListItemIcon>
        <ListItemText primary="Notify" />
      </ListItemButton>
      <Divider />

      {/* View All Products */}
      <ListItemButton component={Link} to="/ViewProductsCategory">
        <ListItemIcon>
          {" "}
          <InventoryIcon />{" "}
        </ListItemIcon>
        <ListItemText primary="Products Managment" />
      </ListItemButton>
      <Divider />

      {/* Status Checker */}
      <ListItemButton component={Link} to="/StatusChecker">
        <ListItemIcon>
          {" "}
          <PreviewIcon />{" "}
        </ListItemIcon>
        <ListItemText primary="Customer Status Checker" />
      </ListItemButton>
      <Divider />

      {/* Check Finances */}
      <Divider />
      <ListItemButton component={Link} to="/CheckFinances">
        <ListItemIcon>
          {" "}
          <MonetizationOnIcon />{" "}
        </ListItemIcon>
        <ListItemText primary="Check Finances" />
      </ListItemButton>

      <Divider />
      <Divider />
      {/* Customer Table */}
      <ListItemButton component={Link} to="/CustomersTable">
        <ListItemIcon>{/* {" "} <TableViewIcon /> {" "} */}</ListItemIcon>
        <ListItemText primary="Customers Table" />
      </ListItemButton>

      {/* Defaulter Table */}
      <ListItemButton component={Link} to="/DefaulterTable">
        <ListItemIcon>{/* {" "} <TableViewIcon /> {" "} */}</ListItemIcon>
        <ListItemText primary="Defaulter Table" />
      </ListItemButton>
      <Divider />
      <Divider />

    </List>
  </React.Fragment>
);
