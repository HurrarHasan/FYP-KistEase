import * as React from "react";
import { useState, useEffect } from "react";
// Mui Components
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
// Icons
import CalculateIcon from "@mui/icons-material/Calculate";

export default function Calculator() {
  const [values, setValues] = useState({
    InterestRate: "",
    MonthlyInstallment: "",
    productPrice: "",
    downPayment: "",
    TotalAmount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  //productName Usestate
  const [productName, setProductName] = useState("");
  //productPrice Usestate
  const [productPrice, setProductPrice] = useState("");
  //installmentDuration Usestate
  const [installmentDuration, setInstallmentDuration] = useState("");
  //insterestRate Usestate
  const [interestRate, setInterestRate] = useState("");
  //downPayment Usestate
  const [downPayment, setDownPayment] = useState("");
  //monthlyInstallment Usestate
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  //totalAmount Usestate
  const [totalAmount, setTotalAmount] = useState("");
  //isDisabled Usestate
  const [isDisabled, setisDisabled] = useState(true);
  //errorMessage Usestate
  const [errorMessage, setErrorMessage] = useState("");
  // We use this useeffect hook for the conditional disabling of the calculate button
  useEffect(() => {
    console.log({
      productName,
      productPrice,
      installmentDuration,
      interestRate,
      downPayment,
      isDisabled,
    });
    if (
      productPrice !== undefined &&
      productPrice !== "" &&
      installmentDuration !== undefined &&
      installmentDuration !== "" &&
      interestRate !== undefined &&
      interestRate !== "" &&
      downPayment !== undefined &&
      downPayment !== ""
    ) {
      if (parseInt(downPayment) >= parseInt(productPrice)) {
        setisDisabled(true);
        setErrorMessage("DownPayment Is greater Than Product Price");
      } else {
        setisDisabled(false);
        setErrorMessage("");
      }
    } else {
      setisDisabled(true);
    }
  }, [
    productName,
    productPrice,
    installmentDuration,
    interestRate,
    downPayment,
    isDisabled,
  ]);
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        <Link color="inherit" href="">
        </Link>{" "}
      </Typography>
    );
  }
  const theme = createTheme();
  const calculateInstallment = (e) => {
    e.preventDefault();
    console.log({
      productPrice,
      downPayment,
      interestRate,
      installmentDuration,
    });

    // let step0_calculation = parseInt(productPrice) + parseInt(interestRate);
    // setTotalAmount(step0_calculation);
    // let step1_calculation = (step0_calculation - parseInt(downPayment)) / parseInt(installmentDuration)
    // setMonthlyInstallment(step1_calculation)

let pPrice = parseInt(productPrice);
let pintRate = parseInt(interestRate);
let pdownpayment = parseInt(downPayment);
let pinsduration = parseInt(installmentDuration);
let percentageAmount= pPrice * (pintRate/100);
let totalAmount= (percentageAmount + pPrice);
setTotalAmount(totalAmount);
let monthlyAmount = (totalAmount - pdownpayment) /pinsduration
setMonthlyInstallment(monthlyAmount)
  };

  return (
    <ThemeProvider theme={theme}>
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
          {/* Tittle Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <CalculateIcon />{" "}
          </Avatar>

          {/* Installment Calculator Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Installment Calculator{" "}
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={calculateInstallment}
          >
            <Grid container spacing={2}>
              {/* Text Field Product Price */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel> Product Price </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-ProductPrice"
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    label="Product Price"
                    onChange={(e) => {
                      setProductPrice(e.target.value);
                    }}
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 13);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Text Field Down Payment */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel> Down Payment </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-DownPayment"
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    label="DownPayment"
                    onChange={(e) => {
                      setDownPayment(e.target.value);
                    }}
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 13);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Text Field Installment Duration */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="outlined-adornment-installmentDuration">
                    Duration
                  </InputLabel>
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="start">(Months)</InputAdornment>
                    }
                    label="Duration"
                    type="number"
                    onChange={(e) => {
                      setInstallmentDuration(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 13);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Text Field Interest Rate */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="outlined-adornment-InterestRate">
                    Interest Rate
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-InterestRate"
                    endAdornment={
                      <InputAdornment position="start">%</InputAdornment>
                    }
                    label="InterestRate"
                    type="number"
                    onChange={(e) => {
                      setInterestRate(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 13);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Monthly Installment Result Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel> Monthly Installment </InputLabel>
                  <OutlinedInput
                    disabled
                    id="outlined-adornment-MonthlyInstallment"
                    value={monthlyInstallment}
                    // onChange={handleChange('MonthlyInstallment')}
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    label="MonthlyInstallment"
                  />
                </FormControl>
              </Grid>

              {/* Total Amount Result Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel> Total Amount </InputLabel>
                  <OutlinedInput
                    disabled
                    id="outlined-adornment-TotalAmount"
                    value={totalAmount}
                    // onChange={handleChange('TotalAmount')}
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    label="TotalAmount"
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* Calculate Button */}
            <Button
              size="small"
              type="submit"
              fullWidth
              disabled={isDisabled}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Calculate
            </Button>
            {errorMessage}

          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
