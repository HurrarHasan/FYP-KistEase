import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate, Link as Li } from "react-router-dom";
import { useCookies } from "react-cookie";
import validator from "validator";
// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LoginIcon from "@mui/icons-material/Login";
// Mui Components
import {
  Avatar, Button, CssBaseline, TextField, Grid, Box,
  FormControl, Typography, Container, createTheme, ThemeProvider,
  Alert, Stack, IconButton, OutlinedInput, InputLabel, InputAdornment
} from "@mui/material";

const theme = createTheme();

export default function SignIn(props) {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [token, setToken] = useCookies(["KistEase_seller_Token"]);
  const [loginStatus, setLoginStatus] = useState('');
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
      console.log("token.KistEase_seller_Token:", token.KistEase_seller_Token);
      api
        .get("/", { headers: { auth_TOKEN: token.KistEase_seller_Token } })
        .then((result) => {
          console.log({ result });
          if (result) {
            console.log("we are at redirect");
            navigate("/dashboard");
          } else {
            window.alert(result.error);
          }
        })
        .catch((err) => {
          console.log({ err });
          // window.alert("Invalid Credentials");
          // <Alert severity="error"> Invalid Credentials </Alert>;
        });
    }
  }, []);
  useEffect(() => {
    console.table({ email, password, isDisabled });
    if (email !== "" && password !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log({ email, password });
    if (email !== "" && password !== "") {
      api
        .post("login", { emailAddress: email, password: password })
        .then((result) => {
          console.log({ result });
          console.log(`Result:${{ result }}`);
          console.log(`Token:${result.data.token}`);
          console.log(`Status:${result.status}`);
          setLoginSuccess(true);
          if (result.status === 200) {
            // cookies.set("JWTtoken", result.data, {
            //   path: "/",
            //   expires: new Date(Date.now() + 1800000),
            // });
            setToken("KistEase_seller_Token", result.data.token, { path: "/" });
            console.log({ token });
            {
              /* <Alert severity="success">Login Successful</Alert> */
            }
            console.log("We are at go to ");
            // window.alert("Login Successful");
            // window.alert("Login Successful");
            setLoginStatus(<Alert variant="outlined" severity="success">
              Login Successful
            </Alert>)
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
            // <Navigate to="/"/>
            // window.alert("Login Successful");
          } else {
            window.alert("Invalid Credentials");
            window.alert(result.error);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoginSuccess(false);
          setLoginStatus(<Alert variant="outlined" severity="error">
            Credentials Are Not Valid
          </Alert>)
          // <Stack sx={{ width: "100%" }} spacing={2}>
          //   <Alert severity="error">Invalid Credentials</Alert>
          // </Stack>;
          // window.alert("Invalid Credentials")
        });
    }
  };
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Email Validation
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("");
      setEmail(e.target.value);
    } else {
      // setEmailError("Enter valid Email!");
      setEmailError(<Alert severity="warning">Enter valid Email!</Alert>);
    }
  };
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
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
          {/* Shop Login Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <LockOutlinedIcon />{" "}
          </Avatar>

          {/* Shop Login Title */}
          <Typography component="h1" variant="h5">
            {" "}
            Shop Login{" "}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Text Field Email Address */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => validateEmail(e)}
              onInput={toInputUppercase} // apply on input which do you want to be capitalize
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <AlternateEmailIcon />{" "}
                  </InputAdornment>
                ),
              }}
            />
            <span
              style={{ fontWeight: "bold", fontSize: "18px", color: "red" }}
            >
              {emailError}
            </span>

            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                // value={values.password}
                // onChange={handleChange('password')}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <span
                style={{ fontWeight: "bold", fontSize: "18px", color: "red" }}
              >
                {loginStatus}
              </span>
            </FormControl>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isDisabled}
              endIcon={<LoginIcon />}
              onClick={handleSubmit}
            >
              {" "}
              Login{" "}
            </Button>

            {/* Redirection Link Forget Password */}
            <Grid item>
              {" "}
              <Li to="/ForgetPassword" variant="body2">
                {" "}
                Forget Password{" "}
              </Li>{" "}
            </Grid>
            {/* Redirection Link To SignIn */}
            <Grid item>
              {" "}
              <Li to="/ShopSignup" variant="body2">
                {" "}
                Don't have an account? Sign Up{" "}
              </Li>{" "}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        {/* {logged_IN} */}
      </Container>
    </ThemeProvider>
  );
}
