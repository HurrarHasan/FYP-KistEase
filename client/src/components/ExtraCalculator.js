import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function Installmentcalculator() {
  const [advancePayment, setAdvancePayment] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [installmentPaymentDuration, setInstalmentPaymentDuration] =
    useState(0);
  const [installmentResult, setInstallmentResult] = useState(0);
  const [durrationArray, setDurrationArray] = useState([]);
  const calculateInterest = async () => {
    console.log(interestRate);
    console.log("totalAmount-(advancePayment?advancePayment:0)");
    let first0 = totalAmount - (advancePayment ? advancePayment : 0);
    console.log({ first0 });
    console.log("first0*interestRate");
    let first1 = first0 * interestRate;
    console.log({ first1 });
    let first2 = parseInt(first1) + parseInt(totalAmount);
    console.log("parseInt(first1)+parseInt(totalAmount)");
    console.log({ first2 });
    setInstallmentResult(Math.round(first2 / installmentPaymentDuration));
    console.log({ interestRate, first1, first2, installmentResult });
  };

  return (
    <>
      <h1>Installment Calculator</h1>
      <div style={{ marginTop: "100px", alignContent: "center" }}>
        <TextField
          label="Down Payment"
          variant="outlined"
          onChange={(e) => setAdvancePayment(e.target.value)}
        />

        <TextField
          label="Total Amount"
          variant="outlined"
          onChange={(e) => setTotalAmount(e.target.value)}
        />

        <TextField
          label="Interest(%)"
          variant="outlined"
          onChange={(e) => setInterestRate(e.target.value / 100)}
        />

        <TextField
          label="Duration"
          variant="outlined"
          onChange={(e) => setInstalmentPaymentDuration(e.target.value)}
        />

        <Button onClick={calculateInterest}> CalculateInterest </Button>
      </div>
      <div>
        <h1>Installment Result</h1>

        <h1>
          {installmentResult ? installmentResult + " Rs Per Mount Payment" : ""}
        </h1>
      </div>
    </>
  );
}

export default Installmentcalculator;
