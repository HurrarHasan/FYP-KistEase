import { useState, useEffect } from "react";
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
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

export default function FormDialog(props) {
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });

  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerCNICNO, setCustomerCNICNO] = useState("");
  const [customerEmailAddress, setCustomerEmailAddress] = useState("");
  const [customerPhoneNo, setCustomerPhoneNo] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customer_id, setCustomer_id] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("triggered")
    console.log("Props", props);
    setCustomerName(props.customerDetails.customerName);
    setCustomerCNICNO(props.customerDetails.CNICNO);
    setCustomerEmailAddress(props.customerDetails.customerEmail);
    setCustomerPhoneNo(props.customerDetails.customerPhoneNo);
    setCustomerAddress(props.customerDetails.customerAddress);
    setCustomer_id(props.customerDetails._id);
  }, []);
  useEffect(() => {
    console.table({
      customerName,
      customerCNICNO,
      customerEmailAddress,
      customerPhoneNo,
      customerAddress,
      customer_id,
    });
  }, [
    customerName,
    customerCNICNO,
    customerEmailAddress,
    customerPhoneNo,
    customerAddress,
    customer_id
  ]);
  const updateCustomerDetails = () => {
    api
      .post("updatecustomer", {
        customer_id: customer_id,
        customerCNICNO: customerCNICNO,
        customerEmail: customerEmailAddress,
        customerPhoneNo: customerPhoneNo,
        customerAddress: customerAddress,
        customerName: customerName
      })
      .then(result => {
        console.log({ result })
        handleClose()
        console.log("we are at navigate")
        // navigate(`/Single/${customer_id}`)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      });
  };
  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <center>
          {" "}
          <DialogTitle fontWeight="bold">
            Edit Customer Details
          </DialogTitle>{" "}
        </center>

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                // helperText="Specify Your Customer Name"
                label="Name"
                // disabled
                name="CustomerName"
                onChange={(e) => { setCustomerName(e.target.value) }}
                required
                value={customerName}
                CustomerName
                variant="outlined"
                size="small"
                // inputProps={{readOnly: true}}
                disabled
                onInput={toInputUppercase} // apply on input which do you want to be capitalize
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                TextField
                size="small"
                name="Customer_Cnic"
                value={customerCNICNO}
                required
                // disabled
                fullWidth
                id="Customer_Cnic"
                label="Cnic"
                type="number"
                // inputProps={{readOnly: true}}
                disabled
                onChange={(e) => { setCustomerCNICNO(e.target.value) }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={customerEmailAddress}
                onChange={(e) => { setCustomerEmailAddress(e.target.value) }}
                required
                email
                variant="outlined"
                size="small"
                onInput={toInputUppercase} // apply on input which do you want to be capitalize
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={customerPhoneNo}
                onChange={(e) => { setCustomerPhoneNo(e.target.value) }}
                type="string"
                phone
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={customerAddress}
                onChange={(e) => { setCustomerAddress(e.target.value) }}
                required
                country
                variant="outlined"
                size="small"
                onInput={toInputUppercase} // apply on input which do you want to be capitalize
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => updateCustomerDetails()}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
