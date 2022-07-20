import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { storeCustomerPicture, getCustomerPicture } from "./StoreVariables"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const theme = createTheme();
const Input = styled("input")({ display: "none" });

export const CustomerSignup = ({ formData, setForm, navigation }) => {
  const {
    CustomerName,
    CustomerPhoneNumber,
    CustomerEmailAddress,
    CustomerAddress,
    CustomerCnic,
    CustomerImage,
    lastName,
    nickName,
  } = formData;
  const [ImagePreview, setImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);


  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNo, setcustomerPhoneNo] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  // const [disable, setDisable] = useState(true);
  const [rootUser, setRootUser] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  useEffect(() => {
    console.table({
      CustomerName,
      CustomerPhoneNumber,
      CustomerEmailAddress,
      CustomerAddress, Image, ImagePreview
    })
    if (CustomerName !== "" &&
      CustomerPhoneNumber !== "" &&
      CustomerEmailAddress !== "" &&
      CustomerAddress !== "" && Image !== "" && ImagePreview !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [CustomerName,
    CustomerPhoneNumber,
    CustomerEmailAddress,
    CustomerAddress, Image, ImagePreview])
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
            console.log("remain here");
            console.log(result.data.rootUser);
            setRootUser(result.data.rootUser);
          } else {
            window.alert(result.error);
          }
        })
        .catch((err) => {
          console.log({ err });
          navigate("/ShopLogin");
        });
    }
    console.log("here we get back ")
    let customerPicture = getCustomerPicture()
    console.log({ customerPicture })
    setImage(customerPicture);
  }, []);
  useEffect(() => {
    if (Image !== undefined && Image !== "") {
      console.log({ Image })
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(Image);
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
      console.log("Customer Image Uploaded");
    }
  }, [Image])

  /* Email Validation */
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const emailRegex = /\S+@\S+\.\S+/;
  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage("");
    } else {
      setIsValid(false);
      setMessage("Please enter a valid email!");
    }
  };
  /*  */
  const handleSubmit = (event) => {
    event.preventDefault();
    console.table({
      customerName,
      customerEmail,
      customerPhoneNo,
      customerAddress,
    });
    if (
      customerName !== "" ||
      customerEmail !== "" ||
      customerPhoneNo !== "" ||
      customerAddress !== ""
    ) { } else {
      window.alert("Some Fields Are Empty");
    }
  };
  const toInputUppercase = e => {
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
          {/* Customer Signup Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <LockOutlinedIcon />{" "}
          </Avatar>

          {/* Customer Signup Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Customer Registration{" "}
          </Typography>

          <Box
            component="form"
            noValidate
            encType="multipart/form-data"
            sx={{ mt: 3 }}
          // style={{ backgroundColor: 'teal' }}
          >
            <Grid container spacing={2}>
              {/* Text Field Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  name="CustomerName"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  value={CustomerName}
                  onChange={setForm}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <AccountCircle />{" "}
                      </InputAdornment>
                    ),
                  }}
                  onInput={toInputUppercase} // apply on input which do you want to be capitalize

                // onChange={(e) => { setCustomerName(e.target.value); }}
                />
              </Grid>

              {/* Text Filed Phone Number */}
              <Grid item xs={12} sm={6}>

                <FormControl
                  fullWidth
                  value={CustomerPhoneNumber}
                  onChange={setForm}
                >
                  <InputLabel> Phone Number </InputLabel>

                  <OutlinedInput
                    id="PhoneNumber"
                    size="small"
                    startAdornment={
                      <InputAdornment position="start">+92</InputAdornment>
                    }
                    name="CustomerPhoneNumber"
                    value={CustomerPhoneNumber}
                    onChange={setForm}
                    label="Phone Number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                  // onChange={(e)=>{setcustomerPhoneNo("+92"+e.target.value)}}
                  />
                </FormControl>
              </Grid>

              {/* Text Field Email Address */}
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="CustomerEmailAddress"
                  value={CustomerEmailAddress}
                  onChange={setForm}
                  // onChange={(e) => { setCustomerEmail(e.target.value); }}
                  // onChange={validateEmail}
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
                <div className={`message ${isValid ? "success" : "error"}`}>
                  {" "}
                  {message}{" "}
                </div>
              </Grid>

              {/* Text Filed Customer Address */}
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="CustomerAddress"
                  required
                  fullWidth
                  id="Customer_Address"
                  label="Customer Address"
                  value={CustomerAddress}
                  onChange={setForm}
                  // onChange={(e) => { setCustomerAddress(e.target.value); }}
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

              <Grid item xs={12} sm={4}>
                {" "}
              </Grid>

              {/* Upload Picture */}
              <Grid item xs={12}>
                {/* Upload Customer Image Button */}
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      // onChangeFile1(e);
                      setImage(e.target.files[0]);
                      storeCustomerPicture(e.target.files[0])
                    }}
                    name="CustomerImage"
                  // value={CustomerImage}
                  />
                  <Button
                    style={{ "margin-bottom": "20px" }}
                    size="small"
                    variant="contained"
                    component="span"
                    align="center"
                  >
                    {" "}
                    Upload Customer Image{" "}
                  </Button>
                </label>
                {/* Upload Image 1 Via Camera */}
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                </label>
                {/* Image 1 Preview */}
                <Button onClick={handleClickOpen}>
                  <center>
                    <Avatar
                      src={
                        ImagePreview
                          ? ImagePreview
                          : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                      }
                      sx={{ width: 100, height: 100 }}
                      style={{ border: '3px solid lightgray' }}
                    />
                  </center>
                </Button>
                <Dialog
                   
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ width: 350, height: 350 }}
                      style={{ border: '3px solid lightgray' }}>
                      <Avatar
                        src={
                          ImagePreview
                            ? ImagePreview
                            : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                        }
                        sx={{ width: 350, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                      />
                    </DialogContentText>
                  </DialogContent>

                </Dialog>
              </Grid>

              <Grid item xs={12} sm={4}></Grid>
            </Grid>
            {/* Next Button */}
            <Button
              size="small"
              variant="contained"
              fullWidth
              disabled={isDisabled}
              color="primary"
              style={{ marginTop: "1rem" }}
              onClick={() => navigation.next()}
            >
              {" "}
              Next{" "}
            </Button>

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
};
