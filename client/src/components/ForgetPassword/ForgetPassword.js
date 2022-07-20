import * as React from "react";
import { useState, useEffect } from "react";
import { } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
// Mui Components
import {
  Avatar, Button, CssBaseline, TextField, Grid, Box, InputAdornment,
  Typography, Container, createTheme, ThemeProvider, Toolbar, Alert
} from "@mui/material";

const theme = createTheme();

export default function StatusChecker() {
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [foundEmailStatus, setFoundEmailStatus] = useState('');
  const getEmail = () => {
    api
      .post("getemail", { email: email })
      .then((result) => {
        console.log(result);
        setFoundEmailStatus(<Alert variant="outlined" severity="success">
          Email Is Sent
        </Alert>)
        // window.alert("Email is sent please check");
      })
      .catch((err) => {
        console.log(err);
        setFoundEmailStatus(<Alert variant="outlined" severity="error">
          Email Does Not Exist
        </Alert>)
        // window.alert("Email does not exist in Database");
      });
  };

  useEffect(() => {
    console.table({ email, isDisabled });
    if (email !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container component="main" maxWidth="xs">
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}> */}
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* Forget Password Icon */}
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    {" "}
                    <LockOutlinedIcon />{" "}
                  </Avatar>

                  {/* Forget Password Tittle */}
                  <Typography component="h1" variant="h5">
                    {" "}
                    Forget Password
                  </Typography>

                  <Box
                    component="form"
                    noValidate
                    encType="multipart/form-data"
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={2}>
                      {/* Text Filed Email Address */}
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="EnterYourEmail"
                          label="Enter Your Email"
                          name="EnterYourEmail"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {" "}
                                <AlternateEmailIcon />{" "}
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          onInput={toInputUppercase} // apply on input which do you want to be capitalize
                        />
                        <span
                          style={{ fontWeight: "bold", fontSize: "18px", color: "red" }}
                        >
                          {foundEmailStatus}
                        </span>
                        {" "}
                      </Grid>
                    </Grid>

                    {/* Validate Button */}
                    <Grid>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isDisabled}
                        onClick={getEmail}
                      >
                        {" "}
                        Send Link To Your Email{" "}
                      </Button>
                    </Grid>

                    {/* Redirection To Login */}
                    <Grid item>
                      <Link to="/ShopLogin" variant="body2">
                        {" "}
                        Back To Login{" "}
                      </Link>
                    </Grid>

                    <Grid container justifyContent="flex-end">
                      {" "}
                    </Grid>
                  </Box>
                </Box>
                {/* </Paper> */}
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
