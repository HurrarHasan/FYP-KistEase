import * as React from "react";
import { useState, useEffect } from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from '@mui/icons-material/Preview';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";

function createData(name, phonenumber, ProductName, Quantity, LastPaymentDate, RemainingAmount) {
  return { name, phonenumber, ProductName, Quantity, LastPaymentDate, RemainingAmount };
}

const rows = [
  createData("Hurrar", "03112273288", "Bike", "3", "1 Jan 2021", "25,000"),
  createData("Elliot", "03112273288", "Mobile", "1", "1 Jan 2021", "57,000"),
  createData("Hirdesh", "03112273288", "Laptop", "1", "1 Jan 2022", "24,000"),
  createData("Usama", "03112273288", "AC", "2", "1 Jan 2022", "43000"),
  createData("Mustafa", "03112273288", "Fridge", "1", "1 Jan 2022", "12000"),
];

export default function BasicTable() {
  const [blackList, setBlackList] = useState([]);
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  useEffect(() => {
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
            api
              .post("viewBlacklistedCustomers", { seller_id: result.data.rootUser })
              .then((result) => {
                console.log("we are at get customer");
                console.log(result.data.result);
                setBlackList(result.data.result);
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
  const redirect = (customer_id) => {
    console.log(customer_id)
    console.log(isNaN(customer_id))
    if (isNaN(customer_id)) {
      navigate(`/Single/${customer_id}`)
    } else {
      window.alert("Some Error")
    }
  }
  const remaining = (installment) => {
    let remainingamount = installment.installmentAmount;
    console.log({ remainingamount })
    if (installment.productMonthlyInstallment.length > 0) {
      console.log(installment.productMonthlyInstallment)
      for (let index = 0; index < installment.productMonthlyInstallment.length; index++) {
        if (installment.productMonthlyInstallment[index].status === "Paid") {
          console.log("remainingamount:", remainingamount, "productMonthlyInstallment:",
            installment.productMonthlyInstallment[index].payedAmount)
          remainingamount = remainingamount - installment.productMonthlyInstallment[index].payedAmount;
        }
      }
      console.log({ remainingamount })
      let returnRemaining = remainingamount < 0 ? "Payment Complete" : remainingamount;
      return returnRemaining;
    }
  }
  const getLastPaymentDate = (productMonthlyInstallment) => {
    console.log({ productMonthlyInstallment })
    console.warn("we are at getLastDate")
    for (let index = 0; index < productMonthlyInstallment.length; index++) {
      // console.log(productMonthlyInstallment[index])
      if (productMonthlyInstallment[index].status === "Pending") {
        console.log("In first If", productMonthlyInstallment[index])
        if (productMonthlyInstallment[index - 1] !== undefined) {
          console.log("In second If", productMonthlyInstallment[index])
          console.log(productMonthlyInstallment[index - 1].date)
          return productMonthlyInstallment[index - 1].date;
        } else {
          console.log("No Payments Were Made so Far")
          return "No Payments ";
        }
      }
    }
  }

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [ImagePreview, setImagePreview] = useState("");

  return (
    <TableContainer component={Paper}>
      <div className="bottom">
        <h1 className="title">Defaulter Table</h1>
      </div>

      <Divider />
      <Divider />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Last Payment Date</TableCell>
            <TableCell align="center">RemainingAmount</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blackList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
                            : ImagePreview
                        }
                        sx={{ width: 350, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                      />
                    </DialogContentText>
                  </DialogContent>

                </Dialog>

              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.customerName}
              </TableCell>
              <TableCell align="center">{row.customerPhoneNo}</TableCell>
              <TableCell align="center">{row.Productsdetails[0]?.productName}</TableCell>
              <TableCell align="center">{row.Installment.productQuantity}</TableCell>
              <TableCell align="center">{getLastPaymentDate(row.Installment.productMonthlyInstallment)}</TableCell>
              <TableCell align="center">{remaining(row.Installment)}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="delete" size="large" onClick={() => { redirect(row._id) }}>
                  <PreviewIcon fontSize="inherit" />
                </IconButton>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
