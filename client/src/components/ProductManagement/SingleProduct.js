import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { Select, MenuItem } from "@material-ui/core";
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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from "react-router-dom";
import EditProductDialog from "./EditProductDialog";
import { format } from "date-fns";
function createData(Name, Cnic, PhoneNumber, Email, Status) {
  return { Name, Cnic, PhoneNumber, Email, Status };
}

export default function BasicTable() {
  const [installmentDetails, setInstallmentDetails] = useState([]);
  const [productDetails, setProductDetails] = useState("");
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [installmentStatus, setInstallmentStatus] = useState("");
  const [seller_id, setSeller_id] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  useEffect(() => {
    console.warn({ installmentDetails });
    console.warn({ productDetails })
  }, [installmentDetails, productDetails]);
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
              .post("getInstallmentProductCustomerDetails", { seller_id: result.data.rootUser, makeYearId: id })
              .then((result) => {
                console.log("we are at get customer");
                console.log({ result });
                setProductDetails(result.data.result)
                setInstallmentDetails(result.data.installmentResult.reverse());
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

  useEffect(() => {
    console.log({ installmentStatus });
  }, [installmentStatus]);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  var formatter = new Intl.NumberFormat('pk-PK', {
    style: 'currency',
    currency: 'PKR'
  })
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function createData(name, calories, SellingPrice, Difference, protein) {
    return { name, calories, SellingPrice, Difference, protein };
  }

  const rows = [
    createData('Sold Date', "Selling Price With Interest Rate", "Selling Price", "Difference"),
    createData('Sold Date', "Selling Price With Interest Rate", "Selling Price", "Difference"),
    createData('Sold Date', "Selling Price With Interest Rate", "Selling Price", "Difference"),
    createData('Sold Date', "Selling Price With Interest Rate", "Selling Price", "Difference"),
    createData('Sold Date', "Selling Price With Interest Rate", "Selling Price", "Difference"),
  ];
    // Calculator methods
    const sellPriceWithInt = (productPrice, interestRate) => {
      let pPrice = parseInt(productPrice);
      let pintRate = parseInt(interestRate);
      let percentageAmount = pPrice * (pintRate / 100);
      return (percentageAmount + pPrice);
       
    }
  
    const difference = (productPrice, interestRate) => {
      let pPrice = parseInt(productPrice);
      let pintRate = parseInt(interestRate);
      let percentageAmount = pPrice * (pintRate / 100);
      let totalPrice = pPrice + percentageAmount
      return totalPrice - pPrice
    }
  return (
    <TableContainer component={Paper}>
      <div className="bottom">
        <h1 className="title">Product Details & Sales History</h1>
        <Divider />
      </div>

      <Divider />
      <Divider />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Brand Name</TableCell>
            <TableCell align="center">Model Name</TableCell>
            <TableCell align="center">Make Year</TableCell>
            <TableCell align="center">Available Stock</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          <TableRow >
            <TableCell align="center">

              <Button onClick={handleClickOpen}>
                <center>
                  <Avatar
                    src={
                      productDetails.productImage
                        ? `http://localhost:5000/images/${productDetails.productImage}`
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
                        productDetails.productImage
                          ? `http://localhost:5000/images/${productDetails.productImage}`
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
              {productDetails?.Brand?.brandName}{" "}
            </TableCell>
            <TableCell align="center">{productDetails?.Model?.modelName}</TableCell>
            <TableCell align="center">{productDetails?.makeYear}</TableCell>
            <TableCell align="center">{productDetails?.productQuantity}</TableCell>
            <TableCell align="center">{formatter.format(productDetails?.productPrice)}</TableCell>
            <TableCell>
              {" "}

              <IconButton>
                {(productDetails !== "") &&
                  <EditProductDialog productDetails={productDetails} productName={productDetails.Product.productName} />
                }
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/*  */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Selling Price With Interest Rate</TableCell>
            <TableCell align="center">Selling Price</TableCell>
            <TableCell align="center">Difference</TableCell>
            <TableCell align="center">View Buyer's Profile</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {installmentDetails.map((row, key) => (
            <TableRow
            key={key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center">{row.installmentStartDate}</TableCell>

            {/* Selling Price With Interest Rate */}
            <TableCell align="center">{formatter.format(sellPriceWithInt(row.productPrice, row.interestRate))}</TableCell>

            {/* Selling Price */}
            <TableCell align="center">{formatter.format(row.productPrice)}</TableCell>

            {/* Difference */}
            <TableCell align="center">{formatter.format(difference(row.productPrice, row.interestRate))}</TableCell>

            <TableCell align="center">
              <IconButton onClick={() => { navigate(`/Single/${row.customer_id}`) }}> <PreviewIcon /> </IconButton>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*  */}
    </TableContainer>

  );
}
