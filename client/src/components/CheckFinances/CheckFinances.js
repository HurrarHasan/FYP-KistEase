import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme} from "@mui/material/styles";
import { } from "react-router-dom";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from "react"
// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(month, installmentsreceived, totalvalueofsales, unreceivedamount, salesqty) {
  return { month, installmentsreceived, totalvalueofsales, unreceivedamount, salesqty };
}

const rows = [
  createData('January', "65000", 1590, 24, 4.0),
  createData('February', "98000", 2370, 37, 4.3),
  createData('March', "100000", 2620, 24, 6.0),
  createData('April', "68000", 3050, 67, 4.3),
  createData('May', "63000", 3560, 49, 3.9),
];
const theme = createTheme();

export default function CheckFinances() {
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [financeInfo, setfinanceInfo] = useState([])
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  const navigate = useNavigate();
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
          console.log({ result });
          if (result) {
            console.log(" Dashboard remain here ");
            console.log(result.data.rootUser);
            api
              .post("getFinance", { seller_id: result.data.rootUser })
              .then((result) => {
                setfinanceInfo(result.data.result)
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
          navigate("/ShopLogin");
        });
    }
  }, []);
  function setMonthName(string){
    switch(string){
      case "01":
        return "January";
      case "02":
        return "Febuary";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Check Finances Icon */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          {" "}
          <LockOutlinedIcon />{" "}
        </Avatar>

        {/* Check Finances Tittle */}
        <Typography component="h1" variant="h5">
          {" "}
          Check Finances{" "}
        </Typography>

        <Box
          component="form"
          noValidate
          encType="multipart/form-data"
          sx={{ mt: 3 }}
        >
          <br></br> <br></br>
          <TableContainer component={Paper}>
            <div className="bottom">
              <h1 className="title">Previous History</h1>
            </div>
            <Divider /> <Divider />

            <Grid container justifyContent="flex-end">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell align="center">Total Value Of Sales</TableCell>
                      <TableCell align="center">Installments Received</TableCell>
                      <TableCell align="center">UnReceived Amount</TableCell>
                      <TableCell align="center">Sales Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {financeInfo.map((row,key) => (
                      <TableRow
                        key={key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"> {setMonthName(row.date)} </TableCell>
                        <TableCell align="center">{row.montlyInstallment.reduce((a,b)=>a+b,0)+(row.installmentAmount.reduce((a,b)=>a+b,0)-row.montlyInstallment.reduce((a,b)=>a+b,0))}</TableCell>
                        <TableCell align="center">{row.montlyInstallment.reduce((a,b)=>a+b,0)}</TableCell>
                        <TableCell align="center">{row.installmentAmount.reduce((a,b)=>a+b,0)-row.montlyInstallment.reduce((a,b)=>a+b,0)}</TableCell>
                        <TableCell align="center">{row.sales}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </Grid>
          </TableContainer>
        </Box>
      </Box>

      {/* <Copycenter sx={{ mt: 5 }} /> */}
    </Container>
  );
}
