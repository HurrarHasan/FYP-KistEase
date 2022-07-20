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
import { } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
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
  const [customerCNIC, setCustomerCNIC] = useState("")
  const [alert, setAlert] = useState("")
  const [status, setStatus] = useState("");
  const getcustomerStatus = (e) => {
    setStatus('')
    e.preventDefault();
    api.post("customerStatus", { customerCNIC: customerCNIC })
      .then(result => {
        setStatus(result.data.result ? "Banned" : "Clear")
        setAlert(<Alert variant="outlined" severity="success">
          Customer Found
        </Alert>)
      })
      .catch(result => {
        setAlert(<Alert variant="outlined" severity="error">
          Customer Not Found
        </Alert>)
      })
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
            Eligibility Checker{" "}
          </Typography>

          <Box
            component="form"
            noValidate
            encType="multipart/form-data"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* Text Filed CNIC Number */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="CNIC_Number"
                  label="CNIC Number"
                  name="CNIC_Number"
                  type="number"
                  keyboardType="number-pad"
                  onChange={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 13);
                    setCustomerCNIC(e.target.value);
                  }}
                  InputProps={{ readOnly: true }}
                />
                <span
                  style={{ fontWeight: "bold", fontSize: "18px", color: "red" }}
                >
                  {alert}
                </span>
              </Grid>

              {/* Current Status Button */}
              <Grid item xs={12} sm={6}>
                <Button size="small" fullWidth variant="contained" onClick={getcustomerStatus}>
                  {" "}
                  Current Status{" "}
                </Button>
              </Grid>

              {/* Status Result */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  disabled
                  fullWidth
                  name="Current Status"
                  id="filled-read-only-input"
                  value={status}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>

            {/* Next Button */}
            {/* <Grid>
              <Button
                size="small"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
              >
                {" "}
                Next{" "}
              </Button>
            </Grid> */}

            <Grid container justifyContent="flex-end">
              {" "}
            </Grid>
          </Box>
        </Box>
        <pre>
          {/* {JSON.stringify(customerCNIC, null, 2)}
{JSON.stringify(customerUtilityBill, null, 2)} */}
        </pre>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
