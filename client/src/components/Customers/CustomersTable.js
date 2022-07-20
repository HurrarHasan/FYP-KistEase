import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useCookies } from "react-cookie";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { } from "react-router-dom";
import Divider from "@mui/material/Divider";
import PreviewIcon from "@mui/icons-material/Preview";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
// Component
import ReceiveInstallmentDialog from "./ReceiveInstallmentDialog";

export default function BasicTable() {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [installmentStatus, setInstallmentStatus] = useState("");
  const [seller_id, setSeller_id] = useState("");
  const [monthlyInstallmentAmount, setMonthlyInstallmentAmount] = useState("");
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  useEffect(() => {
    console.table(customerDetails);
  }, [customerDetails]);
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
            api
              .post("getCustomers", { seller_id: result.data.rootUser })
              .then((result) => {
                console.log("we are at get customer");
                console.log(result);
                setCustomerDetails(result.data.result.reverse());
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            window.alert(result.error);
          }
        })
        .catch((err) => {
          console.log({ err });
          // navigate("/ShopLogin");
        });
    }
  }, []);
  const getInstallmentAmount = (customer_id, seller_id) => {
    console.log("Customer Table seller_id and customer CNIC");
    console.table({ customer_id, seller_id });
    if (customer_id !== "" && seller_id !== "") {
      api
        .post("getUserMonthlyInstallment", {
          customer_id: customer_id,
          seller_id: seller_id,
        })
        .then(async (result) => {
          console.log("result from getCustomerMontlyInstallment:", result.data);
          await setMonthlyInstallmentAmount(result.data.result);
          await setInstallmentStatus(result.data.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    console.log({ installmentStatus });
  }, [installmentStatus]);
  const getCustomer = (customer_id) => {
    console.log("we are at getCustomer");
    console.log({ customer_id });
    if (customer_id) {
      console.log({ customer_id });
      navigate(`/Single/${customer_id}`);
    }
  };
  var customerDetailsforInstallment;

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      {/* <SearchBar/> */}
      <div className="bottom">
        <h1 className="title">Customer Table</h1>
      </div>

      <Divider />
      <Divider />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Cnic</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerDetails.map((row, key) => (
            <TableRow key={key}>
              <TableCell align="center">

                <Button onClick={handleClickOpen}>
                  <center>
                    <Avatar
                      src={
                        row.customerPicture
                          ? `http://localhost:5000/images/${row.customerPicture}`
                          : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                      }
                      sx={{ width: 100, height: 100 }}
                      style={{ border: '3px solid lightgray' }}
                    />
                  </center>
                </Button>
                <Dialog
                   
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ width: 350, height: 350 }}
                      style={{ border: '3px solid lightgray' }}>
                      <Avatar
                        src={
                          row.customerPicture
                            ? `http://localhost:5000/images/${row.customerPicture}`
                            : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                        }
                        sx={{ width: 350, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                      />
                    </DialogContentText>
                  </DialogContent>

                </Dialog>

              </TableCell>

              <TableCell component="th" scope="row">
                {" "}
                {row.customerName}{" "}
              </TableCell>
              <TableCell align="center">{row.CNICNO}</TableCell>
              <TableCell align="center">{row.customerPhoneNo}</TableCell>
              <TableCell align="center">{row.customerEmail}</TableCell>
              <TableCell align="center">
                {row.isDefaulter ? (
                  <Alert variant="outlined" severity="error">
                    Banned
                  </Alert>
                ) : (
                  <Alert variant="outlined" severity="success">
                    Clear
                  </Alert>
                )}
              </TableCell>
              <TableCell>
                {" "}
                <IconButton
                  aria-label="delete"
                  size="large"
                  align="center"
                  onClick={() => {
                    getCustomer(row._id);
                  }}
                >
                  <PreviewIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="large"
                  align="center"
                  onClick={() => {
                    getInstallmentAmount(row._id, seller_id);
                  }}
                >
                  <ReceiveInstallmentDialog
                    installmentStatus={row.Installment[0].installmentStatus}
                    installmentAmount={parseInt(monthlyInstallmentAmount)}
                    customerDetails={row}
                  />
                </IconButton>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
