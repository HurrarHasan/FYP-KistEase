import "./single.scss";
import * as React from 'react';
import { useState, useEffect, useLayoutEffect } from "react";
import PaymentHistoryTable from "../Customers/PaymentHistoryTable";
// import List from "./Table";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import DescriptionIcon from '@mui/icons-material/Description';
// Designed Components
import EditStatusDialog from "./EditStatusDialog";
import EditCustomerDialog from "./EditCustomerDialog";
import ConfirmationDialogForSendingEmail from "./ConfirmationDialogForSendingEmail";

const Single = () => {
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  const [customerDetails, setCustomerDetails] = useState("");
  const [installmentInfo, setInsallmentInfo] = useState([]);
  const { id } = useParams();
  useLayoutEffect(() => {
    if (id) {
      console.log({ id });
      api
        .post("getCustomer", { customer_id: id })
        .then((result) => {
          console.log({ result });
          setCustomerDetails(result.data.result[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    console.table({ customerDetails });
    if (customerDetails) {
      api
        .post("getCustomerInstallment", {
          seller_id: customerDetails.seller_id,
          customer_id: customerDetails._id,
        })
        .then((result) => {
          console.log({ result });
          setInsallmentInfo(result.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [customerDetails]);

  const [open, setOpen] = React.useState(false);
  const [openCustomerPicture, setOpenCustomerPicture] = React.useState(false);
  const [openCustomerCNIC, setOpenCustomerCNIC] = React.useState(false);
  const [openGurantorPicture, setOpenGurantorPicture] = React.useState(false);
  const [openGuarantorCNIC, setOpenGuarantorCNIC] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenCustomerPicture = () => {
    setOpenCustomerPicture(true);
  };
  const handleClickCloseCustomerPicture = () => {
    setOpenCustomerPicture(false);
  };
  const handleClickOpenCustomerCNIC = () => {
    setOpenCustomerCNIC(true);
  };
  const handleClickCloseCustomerCNIC = () => {
    setOpenCustomerCNIC(false);
  };
  const handleClickOpenGuarantorPicture = () => {
    setOpenGurantorPicture(true);
  };
  const handleClickCloseGuarantorPicture = () => {
    setOpenGurantorPicture(false);
  };
  const handleClickOpenGuarantorCNIC = () => {
    setOpenGuarantorCNIC(true);
  };
  const handleClickCloseGuarantorCNIC = () => {
    setOpenGuarantorCNIC(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const sendInvoice =()=>{
    api.post("sendLegder",{seller_id: customerDetails.seller_id,
      customer_id: customerDetails._id})
      .then(result=>{
        console.log({result})
        })
      .catch(err=>{
        console.log({err})
      })
  }
  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        {/* --------------------------------------------------------- */}
        <div className="top">
          <div className="left">

            {/*  */}

            {/*  */}

            <h1 className="title">Customer Details</h1>
            <div className="item" >


              <div className="details">
                {/* Customer Image Start */}
                <IconButton onClick={handleClickOpenCustomerPicture}>
                  <PermIdentityIcon />
                </IconButton>
                <Dialog
                   
                  open={openCustomerPicture}
                  onClose={handleClickCloseCustomerPicture}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ width: 350, height: 350 }}
                      style={{ border: '3px solid lightgray' }}>
                      <Avatar key={customerDetails.customerPicture}
                        src={
                          customerDetails.customerPicture
                            ? `http://localhost:5000/images/${customerDetails.customerPicture}`
                            : ""
                        }
                        sx={{ width: 350, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                        variant="square"

                      />
                    </DialogContentText>
                  </DialogContent>

                </Dialog>
                {/* Customer Image End */}

                {/* CNIC Image Start */}
                <IconButton onClick={handleClickOpen}>
                  <BrandingWatermarkIcon />
                </IconButton>
                <Dialog
                   
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ width: 450, height: 350 }}
                      style={{ border: '3px solid lightgray' }}>
                      <Avatar
                        src={
                          customerDetails.customerCNIC
                            ? `http://localhost:5000/images/${customerDetails.customerCNIC}`
                            : ""
                        }
                        sx={{ width: 450, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                        variant="rounded"

                      />
                    </DialogContentText>
                  </DialogContent>

                </Dialog>
                {/* CNIC Image End */}

                {/* Utility Bill Image Start */}
                <IconButton onClick={handleClickOpenCustomerCNIC}>
                  <DescriptionIcon />
                </IconButton>
                <Dialog
                   
                  open={openCustomerCNIC}
                  onClose={handleClickCloseCustomerCNIC}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ width: 350, height: 350 }}
                      style={{ border: '3px solid lightgray' }}>
                      <Avatar
                        src={
                          customerDetails
                            ? `http://localhost:5000/images/${customerDetails.customerUtilityBill}`
                            : ""
                        }
                        sx={{ width: 350, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                        variant="square"

                      />
                    </DialogContentText>
                  </DialogContent>

                </Dialog>
                {/* Utility Bill Image End */}
                <h1 className="itemTitle">{customerDetails.customerName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">
                    {customerDetails.customerEmail}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">
                    {customerDetails.customerPhoneNo}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {customerDetails.customerAddress}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CNIC:</span>
                  <span className="itemValue">{customerDetails.CNICNO}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{(customerDetails.isDefaulter) ? "Banned" : "Clear"}</span>
                </div>
                <div>
                  <IconButton
                    size="small"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "1rem" }}
                  >
                    {customerDetails ? (
                      <EditCustomerDialog customerDetails={customerDetails} />
                    ) : (" ")}
                  </IconButton>
                  <IconButton
                    size="small"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "1rem" }}
                  >
                    <EditStatusDialog customerDetails={customerDetails} />
                  </IconButton>
                  <IconButton
                    size="small"
                    variant="contained"
                    fullWidth
                    color="primary"
                    style={{ marginTop: "1rem" }}
                  >
                    <ConfirmationDialogForSendingEmail sendInvoice={sendInvoice} />
                  </IconButton></div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------- */}

          <div className="left">
            <h1 className="title">Guarantor</h1>
            <div className="item">


              <div className="details">
                {/* Guarantor Image Start */}
                <IconButton onClick={handleClickOpenGuarantorPicture}>
                  <PermIdentityIcon />
                </IconButton>
                <Dialog
                   
                  open={openGurantorPicture}
                  onClose={handleClickCloseGuarantorPicture}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ width: 350, height: 350 }}
                      style={{ border: '3px solid lightgray' }}>
                      <Avatar
                        src={
                          customerDetails
                            ? `http://localhost:5000/images/${customerDetails.guarantorPicture}`
                            : ""
                        }
                        sx={{ width: 350, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                        variant="square"
                      />
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
                {/* Guarantor Image End */}

                {/* Guarantor CNIC Image Start */}
                <IconButton onClick={handleClickOpenGuarantorCNIC}>
                  <BrandingWatermarkIcon />
                </IconButton>
                <Dialog
                   
                  open={openGuarantorCNIC}
                  onClose={handleClickCloseGuarantorCNIC}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ width: 450, height: 350 }}
                      style={{ border: '3px solid lightgray' }}>
                      <Avatar key={customerDetails.guarantorPicture}
                        src={
                          customerDetails
                            ? `http://localhost:5000/images/${customerDetails.guarantorCNIC}`
                            : ""
                        }
                        sx={{ width: 450, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                        variant="rounded"

                      />
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
                {/* Guarantor CNIC Image End */}
                <h1 className="itemTitle">{customerDetails.guarantorName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">
                    {customerDetails.guarantorEmail}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">
                    {customerDetails.guarantorPhoneNo}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CNIC:</span>
                  <span className="itemValue">
                    {customerDetails.guarantorCNICNO}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* --------------------------------------------------------- */}

          {/* <div className="left"> </div> */}

        </div>
        <div className="bottom">
          <h1> Last Transactions </h1>
          {/* <List /> */}
          <PaymentHistoryTable installmentInfo={installmentInfo} />
        </div>
      </div>
    </div>
  );
};

export default Single;
