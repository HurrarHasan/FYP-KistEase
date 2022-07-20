import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react"
// Icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData1(
  ProductName,
  CustomerName,
  CustomerNumber,
  Emails,
  Paid,
  remaining,
  Price
) {
  return {
    ProductName,
    CustomerName,
    CustomerNumber,
    Emails,
    Paid,
    remaining,
    Price,
    PaymentHistory: [
      { date: "1 January 2022", invoiceId: "001", receivedamount: 2000 },
      { date: "2 Febuary 2022", invoiceId: "002", receivedamount: 1000 },
      { date: "3 March 2022", invoiceId: "003", receivedamount: 2000 },
      { date: "4 April 2022", invoiceId: "004", receivedamount: 1000 },
      { date: "5 May 2022", invoiceId: "005", receivedamount: 2000 },
      { date: "6 June 2022", invoiceId: "006", receivedamount: 1000 },
      { date: "7 July 2022", invoiceId: "007", receivedamount: 2000 },
      { date: "8 August 2022", invoiceId: "008", receivedamount: 1000 },
      { date: "9 September 2022", invoiceId: "009", receivedamount: 1000 },
      { date: "10 October 2022", invoiceId: "010", receivedamount: 1000 },
      { date: "11 November 2022", invoiceId: "011", receivedamount: 1000 },
      { date: "12 December 2022", invoiceId: "012", receivedamount: 1000 },
    ],
  };
}

function createData2(
  ProductName,
  CustomerName,
  CustomerNumber,
  Emails,
  Paid,
  remaining,
  Price
) {
  return {
    ProductName,
    CustomerName,
    CustomerNumber,
    Emails,
    Paid,
    remaining,
    Price,
    PaymentHistory: [
      { date: "1 January 2022", invoiceId: "001", receivedamount: 2000 },
      { date: "2 Febuary 2022", invoiceId: "002", receivedamount: 1000 },
      { date: "3 March 2022", invoiceId: "003", receivedamount: 2000 },
      { date: "4 April 2022", invoiceId: "004", receivedamount: 1000 },
      { date: "5 May 2022", invoiceId: "005", receivedamount: 2000 },
      { date: "6 June 2022", invoiceId: "006", receivedamount: 1000 },
      { date: "7 July 2022", invoiceId: "007", receivedamount: 2000 },
      { date: "8 August 2022", invoiceId: "008", receivedamount: 1000 },
      { date: "9 September 2022", invoiceId: "009", receivedamount: 1000 },
      { date: "10 October 2022", invoiceId: "010", receivedamount: 1000 },
      { date: "11 November 2022", invoiceId: "011", receivedamount: 1000 },
      { date: "12 December 2022", invoiceId: "012", receivedamount: 1000 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [productMonthlyInstallment, setProductMonthlyInstallment] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  console.log({ props })
  const getTotalPaid = async (data) => {
    const arr = data;
    const newarr = arr.filter(arr => { return arr?.payedAmount })
    console.log({ newarr })
    await setProductMonthlyInstallment(newarr)
  }
  const amountRemaining = (amount) => {
    console.log({ amount })
    let remainingamount = amount;
    console.log({ remainingamount })
    if (productMonthlyInstallment.length > 0) {
      console.log({ productMonthlyInstallment })
      for (let index = 0; index < productMonthlyInstallment.length; index++) {
        console.log("remainingamount", remainingamount, "productMonthlyInstallment", productMonthlyInstallment[index].payedAmount)
        remainingamount = remainingamount - productMonthlyInstallment[index].payedAmount;
      }
      console.log({ remainingamount })
      setRemainingAmount(remainingamount < 0 ? "Payment Complete" : remainingamount)
    }
  }
  useEffect(() => {
    getTotalPaid(props.row.productMonthlyInstallment);
    // amountRemaining(props.row.installmentAmount)
  }, [])
  useEffect(() => {
    let remainingamount = props.row.installmentAmount;
    console.log({ remainingamount })
    if (productMonthlyInstallment.length > 0) {
      console.log({ productMonthlyInstallment })
      for (let index = 0; index < productMonthlyInstallment.length; index++) {
        console.log("remainingamount", remainingamount, "productMonthlyInstallment", productMonthlyInstallment[index].payedAmount)
        remainingamount = remainingamount - (productMonthlyInstallment[index].payedAmount ? productMonthlyInstallment[index].payedAmount : 0);
      }
      console.log({ remainingamount })
      setRemainingAmount(remainingamount < 0 ? "Payment Complete" : remainingamount)
    }
    let paidAmount = row.downPayment;
    for (let index = 0; index < productMonthlyInstallment.length; index++) {
      if (productMonthlyInstallment[index].status === "Paid") {
        console.log("productMonthly", productMonthlyInstallment[index].status);
        paidAmount += productMonthlyInstallment[index].payedAmount;
      }
    }
    setPaidAmount(paidAmount)
  }, [productMonthlyInstallment])
  useEffect(() => {
    console.table({ remainingAmount, productMonthlyInstallment })
  }, [productMonthlyInstallment, remainingAmount])
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => { setOpen(!open) }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>{" "}
        </TableCell>
        <TableCell component="th" scope="row">
          {" "}
          {row.Products.productName}{" "}
        </TableCell>
        <TableCell align="center">{row.installmentStartDate}</TableCell>
        <TableCell align="center">{row.productMonthlyInstallment.length}</TableCell>
        <TableCell align="center">{paidAmount}</TableCell>
        {/* <TableCell align="center">{row.Paid}</TableCell> */}
        <TableCell align="center">{remainingAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {" "}
                MonthlyInstallment{" "}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {" "}
                  <TableRow>
                    <TableCell align="center">Due Date</TableCell>
                    <TableCell align="center">Payment Date</TableCell>
                    <TableCell align="center">Received Amount</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>{" "}
                </TableHead>
                <TableBody>
                  {productMonthlyInstallment.map((PaymentHistoryRow) => (
                    <TableRow key={PaymentHistoryRow.date}>
                      <TableCell align="center" component="th" scope="row">
                        {" "}
                        {PaymentHistoryRow.date}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {(PaymentHistoryRow?.payDate) ? PaymentHistoryRow?.payDate : "Not Paid"}
                      </TableCell>
                      <TableCell align="center">
                        {(PaymentHistoryRow?.payedAmount) ? "Rs." + PaymentHistoryRow?.payedAmount : "Pending"}
                      </TableCell>{" "}
                      <TableCell align="center">
                        {PaymentHistoryRow.status}
                      </TableCell>{" "}
                    </TableRow>
                  ))}
                </TableBody>{" "}
              </Table>{" "}
            </Box>{" "}
          </Collapse>{" "}
        </TableCell>{" "}
      </TableRow>{" "}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    CustomerName: PropTypes.number.isRequired,
    Emails: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    PaymentHistory: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        invoiceId: PropTypes.string.isRequired,
      })
    ).isRequired,
    ProductName: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
    Paid: PropTypes.number.isRequired,
  }).isRequired,
};

const rows1 = [
  createData1(
    "Mobile",
    "14/4/2021",
    "19",
    "16000",
    "34000"
  ),
];
const rows2 = [
  createData2(
    "Camera",
    "25/9/2020",
    "13",
    "12000",
    "38000"
  ),
];

export default function PaymentHistoryTable(props) {
  console.log({ props })
  // const [installmentTable, setInstallmentTable] = useState([])
  // useEffect(() => {
  //   setInstallmentTable(props.installmentInfo)
  // }, [])
  // useEffect(()=>{
  //   console.table({installmentTable})
  // },[installmentTable])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Product Name</TableCell>
            <TableCell align="center">Purchase Date</TableCell>
            <TableCell align="center">Duration (Months) </TableCell>
            <TableCell align="center">Paid</TableCell>
            <TableCell align="center">Remaining</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {" "}
          {props.installmentInfo.map((row, key) => (
            <Row key={key} row={row} />
          ))}{" "}
        </TableBody>
        <TableBody>
          {" "}
          {/* {rows2.map((row) => (
            <Row key={row.name} row={row} />
          ))}{" "} */}
        </TableBody>
      </Table>
    </TableContainer>

  );
}
