import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import {
  getProduct, getProductQuantity, getInterestRate, getProductName, storeDateList, storeMonthlyPayment,
  storeTotalAmount, storeDownPayment, storeInterestRate, storeProduct, storeFinalProductPrice
} from "./StoreVariables"
// Icons
import CalculateIcon from "@mui/icons-material/Calculate";

export const InstallmentCalculator = ({ formData, setForm, navigation }) => {
  const { firstName, lastName, nickName, productName } = formData;

  //productName Usestate
  // const [productName, setProductName] = useState("");
  //productPrice Usestate
  const [productPrice, setProductPrice] = useState("");
  //installmentDuration Usestate
  const [installmentDuration, setInstallmentDuration] = useState("");
  //insterestRate Usestate
  const [interestRate, setInterestRate] = useState();
  //downPayment Usestate
  const [downPayment, setDownPayment] = useState();
  //monthlyInstallment Usestate
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  //totalAmount Usestate
  const [totalAmount, setTotalAmount] = useState("");
  //isDisabled Usestate
  const [isDisabled, setisDisabled] = useState(false);
  //errorMessage Usestate
  const [errorMessage, setErrorMessage] = useState("");
  const [productsName, setProductsName] = useState("");
  // We use this useeffect hook for the conditional disabling of the calculate button
  const [arrayStore, setArrayStore] = useState([]);
  const [enableTable, setEnableTable] = useState(false);
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [rootUser, setRootUser] = useState();
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 10000,
    withCredentials: false,
  });
  useEffect(() => {
    console.log({ token });
    if (token != null) {
      console.log("we are in if");
      // console.log("token.KistEase_seller_Token:", token.KistEase_seller_Token);
      api
        .get("/", {
          headers: {
            auth_TOKEN: token.KistEase_seller_Token,
          },
        })
        .then((result) => {
          console.log({ result });
          if (result) {
            console.log("remain here");
            console.log("rootUser:", result.data.rootUser);
            setRootUser(result.data.rootUser);
            api
              .post("getInstallmentProduct", {
                seller_id: result.data.rootUser,
              })
              .then((result) => {
                console.log({ result });
                setProductsName(result.data.productResult.productName);
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
          // <Alert severity="error">Invalid Credentials</Alert>;
          navigate("/ShopLogin");
        });
    }
    let productData = getProduct()
    let productQuantity = getProductQuantity()
    let productName = getProductName()
    console.error({ productData, productQuantity, productName })
    setProductPrice((productData.productPrice) * (parseInt(productQuantity)))
    storeFinalProductPrice((productData.productPrice) * (parseInt(productQuantity)))
    setProductsName(productName)
  }, []);
  useEffect(() => {
    console.log({
      productsName,
      productPrice,
      installmentDuration,
      interestRate,
      downPayment,
      isDisabled,
      arrayStore,
      enableTable,
    });
    if (arrayStore.length !== 0) {
      setEnableTable(true);
    }
    if (
      // productName !== undefined &&
      // productName !== "" &&
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
    productsName,
    productPrice,
    installmentDuration,
    interestRate,
    downPayment,
    isDisabled,
    arrayStore,
    enableTable,
  ]);
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.primary"
        align="center"
        {...props}
      >
        <Link color="inherit" href="">
          {/* Go Back To Dashboard */}
        </Link>{" "}
      </Typography>
    );
  }
  const dateList = (Installments) => {
    // let installmentDuration = parseInt(installmentMonths);
    console.log("in Datelist", { Installments });
    if (arrayStore.length === 0) {
      let d = new Date();
      let date;
      let month = d.getMonth();
      let day = d.getDate();
      for (let index = 2; index <= parseInt(installmentDuration); index++) {
        // console.log({ index });
        if ((month + index) > 12) {
          date =
            (day < 10 ? "0" + day : day) +
            "/" +
            ((month + (index - 12) < 10) ? ("0" + (month + (index - 12))) : (month + (index - 12))) +
            "/" +
            (d.getFullYear() + 1);
          setArrayStore((arrayStore) => [
            ...arrayStore,
            {
              date: date,
              montlyInstallment: Installments,
              status: "Pending",
            },
          ]);
          // console.log("In date:", { arrayStore });
        } else {
          date =
            (day < 10 ? "0" + day : day) +
            "/" +
            ((month + index < 10) ? ("0" + (month + index)) : (month + index)) +
            "/" +
            d.getFullYear();
          // console.log({date})
          setArrayStore((arrayStore) => [
            ...arrayStore,
            {
              date: date,
              montlyInstallment: Installments,
              status: "Pending",
            },
          ]);
          // console.log("In date:", { arrayStore });
        }
      }
    } else {
      setArrayStore([]);
      let d = new Date();
      let date;
      let month = d.getMonth();
      let day = d.getDate();
      for (let index = 2; index <= parseInt(installmentDuration); index++) {
        // console.log({ index });
        if ((month + index) >= 12) {
          date =
            (day < 10 ? "0" + day : day) +
            "/" +
            ((month + (index - 12) < 10) ? ("0" + (month + (index - 12))) : (month + (index - 12))) +
            "/" +
            (d.getFullYear() + 1);
          setArrayStore((arrayStore) => [
            ...arrayStore,
            {
              date: date,
              montlyInstallment: Installments,
              status: "Pending",
            },
          ]);
          // console.log("In date:", { arrayStore });
        } else {
          date =
            (day < 10 ? "0" + day : day) +
            "/" +
            ((month + index < 10) ? ("0" + (month + index)) : (month + index)) +
            "/" +
            d.getFullYear();
          // console.log({date})
          setArrayStore((arrayStore) => [
            ...arrayStore,
            {
              date: date,
              montlyInstallment: Installments,
              status: "Pending",
            },
          ]);
          // console.log("In date:", { arrayStore });
        }
      }
    }
  };
  const theme = createTheme();
  // const ariaLabel = { 'aria-label': 'description' };

  const calculateInstallment = async (e) => {
    e.preventDefault();
    // let step0_calculation = productPrice - parseInt(downPayment);
    // console.log({ step0_calculation }, "Typeof", typeof step0_calculation);
    // let step1_calculation = step0_calculation * (parseInt(interestRate) / 100);
    // console.log({ step1_calculation }, "Typeof", typeof step1_calculation);
    // let step2_calculation = step0_calculation + step1_calculation;
    // console.log({ step2_calculation }, "Typeof", typeof step2_calculation);
    // let step3_calculation = step2_calculation / installmentDuration;
    // console.log({ step3_calculation }, "Typeof", typeof step3_calculation);
    // let totalAmount = step2_calculation;
    // setTotalAmount(totalAmount);
    // let monthlyInstallment = step3_calculation;
    // let step0_calculation = parseInt(productPrice) + parseInt(interestRate);
    // setTotalAmount(step0_calculation);
    // let step1_calculation = (step0_calculation - parseInt(downPayment)) / parseInt(installmentDuration)
    // await setMonthlyInstallment(step1_calculation.toFixed(3))
    // await setMonthlyInstallment(step3_calculation.toFixed(3));
    let pPrice = parseInt(productPrice);
let pintRate = parseInt(interestRate);
let pdownpayment = parseInt(downPayment);
let pinsduration = parseInt(installmentDuration);
let percentageAmount= pPrice * (pintRate/100);
let totalAmount= (percentageAmount + pPrice);
setTotalAmount(totalAmount);
let monthlyAmount = (totalAmount - pdownpayment) /pinsduration
setMonthlyInstallment(monthlyAmount)
    console.log({
      interestRate,
      installmentDuration,
      monthlyInstallment,
      totalAmount,
    });
    storeInterestRate(interestRate)
    dateList(monthlyAmount.toFixed(3));
    // for (let index = 1; index <= installmentDuration; index++) {
    //   // console.log({ index });
    //   let d = new Date();
    //   let date;
    //   if (index >= 12) {
    //     date =
    //       d.getDate() +
    //       "/" +
    //       (d.getMonth() + (index - 12)) +
    //       "/" +
    //       (d.getFullYear() + 1);
    //     setArrayStore((arrayStore) => [
    //       ...arrayStore,
    //       {
    //         date: date,
    //         montlyInstallment: monthlyInstallment,
    //         status: "Pending",
    //       },
    //     ]);
    //     console.log("In date:", { arrayStore });
    //   } else {
    //     date =
    //       d.getDate() + "/" + (d.getMonth() + index) + "/" + d.getFullYear();
    //     // console.log({date})
    //     setArrayStore((arrayStore) => [
    //       ...arrayStore,
    //       {
    //         date: date,
    //         montlyInstallment: monthlyInstallment,
    //         status: "Pending",
    //       },
    //     ]);
    //     console.log("In date:", { arrayStore });
    //   }
    // }
  };
  useEffect(() => {
    console.log({ arrayStore })
  }, [arrayStore])
  const submitInstallmentCalculation = () => {
    storeDateList(arrayStore);
    storeMonthlyPayment(monthlyInstallment)
    storeDownPayment(downPayment)
    storeTotalAmount(totalAmount)
  }
  const movetoNext = () => {
    console.log({ arrayStore });
    console.log({ arrayStore, rootUser, totalAmount });
    if (arrayStore && rootUser && totalAmount) {
      api
        .post("upgradeInstallment", {
          seller_id: rootUser,
          array: arrayStore,
          productPrice: totalAmount,
        })
        .then((result) => {
          console.warn({ result });
          navigate("/PurchaseConfirmation");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Something Went Wrong");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        // style={{ backgroundColor: 'teal' }}
        >
          {/* Tittle Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <CalculateIcon />
          </Avatar>

          {/* Installment Calculator Tittle */}
          <Typography component="h1" variant="h5">
            Installment Calculator
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={calculateInstallment}
          >
            <Grid container spacing={2}>
              {/* Text Field Product Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  disabled
                  label="Product Name"
                  fullWidth
                  id="Product_Name"
                  value={productsName}
                />
              </Grid>

              {/* Text Field Product Price */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Product Price</InputLabel>
                  <OutlinedInput
                    size="small"
                    disabled
                    id="ProductPrice"
                    label="Product Price"
                    type="number"
                    value={productPrice}
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    onChange={(e) => {
                      setProductPrice(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
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
                    id="installmentDuration"
                    size="small"
                    endAdornment={
                      <InputAdornment position="start">(Months)</InputAdornment>
                    }
                    label="Duration"
                    onChange={(e) => {
                      setInstallmentDuration(e.target.value);
                    }}
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 3);
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
                    onChange={(e) => {
                      setInterestRate(e.target.value);
                    }}
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 2);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Text Field Down Payment */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel> Down Payment </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-DownPayment"
                    size="small"
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
                        .slice(0, 10);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Monthly Installment Result Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel> Monthly Installment </InputLabel>
                  <OutlinedInput
                    size="small"
                    disabled
                    id="outlined-adornment-MonthlyInstallment"
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    label="MonthlyInstallment"
                    value={monthlyInstallment}
                  />
                </FormControl>
              </Grid>

              {/* Total Amount Result Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel> Total Amount </InputLabel>
                  <OutlinedInput
                    disabled
                    size="small"
                    id="outlined-adornment-TotalAmount"
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    label="Total Amount"
                    value={totalAmount}
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
              {" "}
              Calculate{" "}
            </Button>

            {/* Redirection Link */}
            <Stack spacing={2} direction="row">
              <Button
                size="small"
                variant="contained"
                fullWidth
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={() => navigation.previous()}
              >
                {" "}
                Back{" "}
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={() => { submitInstallmentCalculation(); navigation.next() }}
              >
                {" "}
                Next{" "}
              </Button>
            </Stack>

            <Grid container justifyContent="flex-end">
              {" "}
            </Grid>

            {errorMessage}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* {enableTable ? (
<TableInstallment
arrayStore={arrayStore}
monthlyInstallment={monthlyInstallment}
/>
) : (
""
)} */}
    </ThemeProvider>
  );
};
