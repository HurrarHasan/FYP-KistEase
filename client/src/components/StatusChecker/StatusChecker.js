import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  DialogActions,
} from "@mui/material";
import DialogForEligibilityChecking from "../DialogForEligibilityChecking";

// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();
const Input = styled("input")({ display: "none" });

export default function StatusChecker() {
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  const navigate = useNavigate();
  const [customerCNIC, setCustomerCNIC] = useState("")
  const [alert, setAlert] = useState("")
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [customer_id, setCustomer_id] = useState("");
  const NavigateToDashboard = () => {
    navigate("/Dashboard");
}
  const NavigateToStartPurchaseForNewUser = () => {
    navigate("/MultiStepForm");
}
  const getcustomerStatus = (e) => {
    setStatus('')
    e.preventDefault();
    api.post("customerStatus", { customerCNIC: customerCNIC })
      .then(result => {
        setStatus(result.data.Status ? "Banned" : "Clear");
        setCustomer_id(result.data.customer_id)
        setPaymentStatus((result.data.installment === "NotComplete") ? "Not Clear" : "Clear")
        setAlert(<Alert variant="outlined" severity="success">
          Customer Found
        </Alert>)
      })
      .catch(err => {
        console.log({ err })
        setPaymentStatus("Not Clear")
        setAlert(<Alert variant="outlined" severity="error">
          Customer Not Found
        </Alert>)
      })
  }
  useEffect(() => {
    if(paymentStatus==="Not Clear"&&status==="Banned"){
      setEnableButton(false);
    }else if(paymentStatus==="Not Clear"&&status==="Clear"){
      setEnableButton(false);
    }else if(paymentStatus==="Clear"&&status==="Clear"){
      setEnableButton(true);
    }
  }, [status,paymentStatus])
  
  const [CNIC, setCNIC] = useState("");
  const [error, setError] = useState(false);
  const [enableButton,setEnableButton]= useState(false);
  const [helpTextcnic, setHelpTextcnic] = useState("");
  const [disabled, setDisabled] = useState(true)
  const validateEmail = (e) => {
    var cnic = e.target.value;
    if (cnic.length == 13) {
      setError(false);
      setDisabled(false);
      setHelpTextcnic("");
      setCNIC(e.target.value);
    } else {
      setDisabled(true);
      setHelpTextcnic("CNIC is not of proper Length");
      setError(true);
    }

    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, 13);
    setCustomerCNIC(e.target.value);
  };
  const NavigateToStartNewPurchase = () => {
    navigate("/MultiStepForm");
}
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
          {/* Status Checker Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <LockOutlinedIcon />{" "}
          </Avatar>

          {/* Status Checker Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Status Checker{" "}
          </Typography>

          <Box
            component="form"
            noValidate
            encType="multipart/form-data"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* Text Filed CNIC Number */}
              <Grid item xs={12} sm={9}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="CNIC_Number"
                  label="Customer CNIC Number"
                  name="CNIC_Number"
                  type="number"
                  keyboardType="number-pad"
                  error={error}
                  helperText={helpTextcnic}
                  onChange={(e) => validateEmail(e)}
                />
                <span
                  style={{ fontWeight: "bold", fontSize: "18px", color: "red" }}
                >
                  {alert}
                </span>
              </Grid>

              {/* Text Filed CNIC Number */}
              <Grid item xs={12} sm={3}>
                <Button size="small" disabled={disabled}
                  fullWidth
                  variant="contained" onClick={getcustomerStatus}>Check</Button>
              </Grid>

              {/* Current Status Button */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel> Status </InputLabel>
                  <OutlinedInput
                    disabled
                    id="outlined-adornment-Status"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    label="CustomerStatus"
                  />
                </FormControl>
              </Grid>

              {/* Customer Status Result */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel> Customer Status </InputLabel>
                  <OutlinedInput
                    disabled
                    id="outlined-adornment-Status"
                    value={status}
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    label="CustomerStatus"
                  />
                </FormControl>
              </Grid>

              {/* Payment Status Result */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel> Payment Status </InputLabel>
                  <OutlinedInput
                    disabled
                    id="outlined-adornment-Status"
                    value={paymentStatus}
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    label="CustomerStatus"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {(paymentStatus==="Clear"&&status==="Clear")&& 
                  <DialogForEligibilityChecking status={status} paymentStatus={paymentStatus} customer_id={customer_id} />
                } 
                {(paymentStatus==="Not Clear"&&status==="")&& 
                  <Button size="small" fullWidth variant="contained" onClick={NavigateToStartPurchaseForNewUser}>
                  {" "}
                  Process New Purchase{" "}
              </Button>
                  // <DialogForEligibilityChecking status={status} paymentStatus={paymentStatus} customer_id={customer_id} />
                } 
                {/* {(paymentStatus==="Not Clear")&&
                <DialogActions>
                <Button onClick={NavigateToStartNewPurchase}>Start New Purchase</Button>
                </DialogActions>
                }
                {/* <DialogActions>
                  Start New Purchase
                </DialogActions>
                {
                  (enableButton)&&
                  <DialogActions>
                  Start Existing Customer
                </DialogActions>
                } */}
              </Grid>
            </Grid>

          </Box>
        </Box>
        <pre> </pre>
      </Container>
    </ThemeProvider>
  );
}
