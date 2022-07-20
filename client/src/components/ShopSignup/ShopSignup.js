import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import validator from "validator";
import axios from "axios";

// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// Mui Components
import {
  Avatar, Button, CssBaseline, TextField, Grid, Box, Alert, Typography,
  Container, createTheme, ThemeProvider, IconButton, Input, OutlinedInput,
  InputLabel, InputAdornment, FormControl
} from "@mui/material";

const theme = createTheme();

export default function SignUp() {
  const [shopName, setShopName] = useState("");
  const [shopNTN, setShopNTN] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [shopLogo, setShopLogo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useCookies(["KistEase_seller_Token"]);
  const [shopLogoPreview, setShopLogoPreview] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [ImagePreview, setImagePreview] = useState("");

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
          console.log({ result });
          if (result) {
            console.log("we are at redirect");
            navigate("/dashboard");
            // window.alert("Go to DashBoard");
          } else {
            window.alert(result.error);
          }
        })
        .catch((err) => {
          console.log({ err });
          <Alert severity="error">Invalid Credentials</Alert>;
          // window.alert("Cant go back to dashboard");
        });
    }
  }, []);
  useEffect(() => {
    console.table({
      shopName,
      shopAddress,
      shopNTN,
      emailAddress,
      cellNumber,
      shopLogo,
      password,
      confirmPassword,
      shopLogoPreview,
    });
    if (
      shopName !== "" &&
      shopAddress !== "" &&
      shopNTN !== "" &&
      emailAddress !== "" &&
      cellNumber !== "" &&
      shopLogo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      shopLogoPreview !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    shopName,
    shopAddress,
    shopNTN,
    emailAddress,
    cellNumber,
    shopLogo,
    password,
    confirmPassword,
    shopLogoPreview,
  ]);
  const onChangeFile = (e) => {
    if (e.target.files[0]) {
      console.log("pictures:", e.target.files);
      setShopLogo(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setShopLogoPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        console.log(reader.result)
        const filetype = reader.result.split("/").at(0)
        console.log({ filetype })
        if (filetype === "data:image") {
          setImagePreview(reader.result);
        } else {
          window.alert("Not An Image");
        }
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      shopName,
      shopNTN,
      shopAddress,
      emailAddress,
      cellNumber,
      shopLogo,
      password,
      confirmPassword,
    });
    // console.warn("shoplogo:", shopLogo)
    if (
      shopName !== "" ||
      shopNTN !== "" ||
      shopAddress !== "" ||
      emailAddress !== "" ||
      cellNumber !== "" ||
      shopLogo !== "" ||
      password !== "" ||
      confirmPassword !== ""
    ) {
      console.log(confirmPassword, "confirmPassword===password", password);
      const formData = new FormData();
      formData.append("shopName", shopName);
      formData.append("shopNTN", shopNTN);
      formData.append("shopAddress", shopAddress);
      formData.append("emailAddress", emailAddress);
      formData.append("cellNumber", cellNumber);
      formData.append("shopLogo", shopLogo);
      formData.append("password", password);
      for (var value of formData.values()) {
        console.log(value);
      }
      if (password === confirmPassword) {
        let config = {
          headers: { "content-type": "multipart/form-data" },
        };
        api
          .post("signup", formData, config)
          .then((result) => {
            console.log("result=>", result);
            navigate("/ShopLogin");
          })
          .catch((err) => {
            console.log("err=>", err);
            alert("The Seller Already Exists");
          });
      } else {
        window.alert("Passwords Do Not Match");
      }
    } else {
      window.alert("Some Fields Are Empty");
    }
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [valuesConfirmPassword, setValuesConfirmPassword] = useState({
    confirmpassword: "",
    showConfirmPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setValuesConfirmPassword({
      ...valuesConfirmPassword,
      showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
    });
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
      setEmailAddress(e.target.value);
    } else {
      setEmailError(<Alert severity="warning">Enter valid Email!</Alert>);
    }
  };

  //
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
          {/* Shop SignUp Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <LockOutlinedIcon />{" "}
          </Avatar>

          {/* Shop Registration Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Shop Registration{" "}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            htmlFor="formFile"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* Text Field Shop Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  name="ShopName"
                  required
                  fullWidth
                  id="ShopName"
                  label="Shop Name"
                  autoFocus
                  onChange={(e) => setShopName(e.target.value)}
                  // onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <AccountCircle />{" "}
                      </InputAdornment>
                    ),
                  }}
                  onInput={toInputUppercase} // apply on input which do you want to be capitalize
                />
              </Grid>

              {/* Text Field Shop NTN */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  name="Shop_NTN"
                  required
                  fullWidth
                  pattern="[0-9]*"
                  id="Shop_NTN"
                  label="Shop NTN"
                  // type="text"
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 13);
                  }}
                  onChange={(e) => setShopNTN(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <ContactMailIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Text Filed Shop Address */}
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="Shop_Address"
                  required
                  fullWidth
                  id="Shop_Address"
                  label="Shop Address"
                  autoFocus
                  onChange={(e) => {
                    setShopAddress(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <LocationOnIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                  onInput={toInputUppercase} // apply on input which do you want to be capitalize
                />
              </Grid>

              {/* Text Field Email Address */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // onChange={(e) => setEmailAddress(e.target.value)}
                  onChange={(e) => validateEmail(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <AlternateEmailIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                  onInput={toInputUppercase} // apply on input which do you want to be capitalize
                />
                <span
                  style={{ fontWeight: "bold", fontSize: "18px", color: "red" }}
                >
                  {emailError}
                </span>
              </Grid>

              {/* Text Field Contact Number */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel> Phone Number </InputLabel>
                  <OutlinedInput
                    size="small"
                    id="PhoneNumber"
                    label="Phone Number"
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">+92</InputAdornment>
                    }
                    onChange={(e) => {
                      setCellNumber("+92" + e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Upload Button */}
              <Grid item xs={12} sm={9}>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    filename="shopLogo"
                    onChange={onChangeFile}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    align="center"
                  >
                    {" "}
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={12} sm={3}>
                <center>
                  <Avatar
                    src={
                      shopLogoPreview
                        ? shopLogoPreview
                        : "/static/images/avatar/1.jpg"
                    }
                    sx={{ width: 40, height: 40 }}
                    style={{ border: '3px solid lightgray' }}
                  />
                </center>
              </Grid>

              {/* Text Field Password */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>

              {/* Text Field Confirm Password */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={
                      valuesConfirmPassword.showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {valuesConfirmPassword.showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* SignUp Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isDisabled}
              sx={{ mt: 3, mb: 2 }}
              endIcon={<PersonAddAltIcon />}
            >
              {" "}
              Sign Up{" "}
            </Button>

            {/* Redirection Link To SignIn */}
            <Grid item>
              <Link to="/ShopLogin" variant="body2">
                {" "}
                Already Have An Account? <br></br> Click Here To Login{" "}
              </Link>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
