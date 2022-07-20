import * as React from "react";
import {
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import { useState, useEffect, useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
const handleChange = (event) => { };
export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerCNIC, setCustomerCNIC] = useState('');
  const [customerPhoneNo, setCustomerPhoneNo] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [seller_id, setSeller_id] = useState('');
  const [amountPayed, setAmountPayed] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [customer_id, setCustomer_id] = useState('');
  // const [monthlyInstallmentAmount,setMonthlyInstallmentAmount]=useState("");
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  useLayoutEffect(() => {
    console.log({ token });
    if (token != null) {
      console.log("we are in if");
      console.log("token.KistEase_seller_Token:", token.KistEase_seller_Token);
      api
        .get("/", {
          headers: {
            auth_TOKEN: token.KistEase_seller_Token,
          },
        })
        .then((result) => {
          console.log("seller_id", { result });
          if (result) {
            console.log(" Dashboard remain here ");
            console.log(result.data.rootUser);
            setSeller_id(result.data.rootUser);
          } else {
            window.alert(result.error);
          }
        })
        .catch((err) => {
          console.log({ err });
          navigate("/ShopLogin");
        });
    }
  }, []);
  useEffect(() => {
    console.table({ seller_id })
  }, [seller_id])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const updatePayment = () => {
    console.table(customerCNIC, seller_id, amountPayed)
    api.post("updateInstallmentPayment", { customer_id: customer_id, seller_id: seller_id, amountPayed: amountPayed })
      .then(result => {
        console.log({ result })
      })
      .catch(err => {
        console.log({ err })
      })
    handleClose()
  }

  useEffect(() => {
    console.log({ props })
    console.log("installment Status", props?.installmentStatus)
    setCustomer_id(props?.customerDetails?._id)
    setCustomerCNIC(props?.customerDetails?.CNICNO)
    setCustomerName(props?.customerDetails?.customerName)
    setCustomerPhoneNo(props?.customerDetails?.customerPhoneNo.slice(3))
    setCustomerEmail(props?.customerDetails?.customerEmail)
    setCustomerAddress(props?.customerDetails?.customerAddress)
  }, [])
  useEffect(() => {
    if (props.installmentAmount == amountPayed) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [props?.installmentAmount, amountPayed])
  return (
    <div>
      <IconButton aria-label="delete" size="large" onClick={handleClickOpen}>
        <CurrencyRubleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <center>
          {" "}
          <DialogTitle fontWeight="bold">
            Receive Installment
          </DialogTitle>{" "}
        </center>

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                size="small"
                name="CNIC"
                disabled
                required
                fullWidth
                id="CNIC"
                type="number"
                label="CNIC"
                value={customerCNIC}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 13);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <ContactMailIcon />{" "}
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                size="small"
                disabled
                name="Name"
                fullWidth
                id="Name"
                label="Name"
                value={customerName}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <AccountCircle />{" "}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel> Phone Number </InputLabel>
                <OutlinedInput
                  disabled
                  id="PhoneNumber"
                  size="small"
                  value={customerPhoneNo}
                  startAdornment={
                    <InputAdornment position="start">+92</InputAdornment>
                  }
                  label="Phone Number"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                size="small"
                disabled
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={customerEmail}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <AlternateEmailIcon />{" "}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                size="small"
                disabled
                name="Customer_Address"
                fullWidth
                id="Customer_Address"
                label="Customer Address"
                value={customerAddress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <LocationOnIcon />{" "}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel> Minimum Amount </InputLabel>
                <OutlinedInput
                  disabled
                  size="small"
                  id="MinimumAmount"
                  value={props?.installmentAmount}
                  startAdornment={
                    <InputAdornment position="start">Rs</InputAdornment>
                  }
                  label="Minimum Amount"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel> Receiving Amount </InputLabel>
                <OutlinedInput
                  id="ReceivingAmount"
                  type="number"
                  size="small"

                  startAdornment={
                    <InputAdornment position="start">Rs</InputAdornment>
                  }
                  onChange={(e) => { setAmountPayed(e.target.value) }}
                  label="Receiving Amount"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 13);
                  }}
                />
              </FormControl>
            </Grid>
            {/* Installment:{props?.installmentStatus} */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isDisabled} onClick={updatePayment}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
