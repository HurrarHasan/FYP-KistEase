import * as React from "react";
import Avatar from "@mui/material/Avatar";
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
import Stack from "@mui/material/Stack";
import {
  getGuarantorPicture, storeguarantorPicture, getGuarantorEmail,
  getGuarantorPhoneNo, getGuarantorName, storeGuarantorEmail, storeGuarantorName
  , storeGuarantorPhoneNo
} from "./StoreVariables"
import Button from '@mui/material/Button';
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

const theme = createTheme();
const Input = styled("input")({ display: "none" });

export const GuarantorSignup = ({ formData, setForm, navigation }) => {

  const {
    GuarantorName,
    GuarantorPhoneNumber,
    GuarantorEmailAddress,
    GuarantorImage,
  } = formData;
  const [ImagePreview, setImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [isDisabled, setIsDisabled] = useState("");
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [rootUser, setRootUser] = useState("");
  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorPhoneNo, setGuarantorPhoneNo] = useState("");
  const [guarantorEmail, setGuarantorEmail] = useState("");
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
        .get("/", { headers: { auth_TOKEN: token.KistEase_seller_Token } })
        .then((result) => {
          console.log({ result });
          if (result) {
            console.log("remain here");
            console.log(result.data.rootUser);
            setRootUser(result.data.rootUser);
            console.log(getGuarantorPicture());
            setGuarantorName(getGuarantorName());
            setGuarantorEmail(getGuarantorEmail());
            setGuarantorPhoneNo(getGuarantorPhoneNo());
          } else {
            window.alert(result.error);
          }
        })
        .catch((err) => {
          console.log({ err });
          navigate("/ShopLogin");
        });
    }

  }, []);
  const isObject = (val) => {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'))
  }
  useEffect(() => {
    if (Image !== undefined && Image !== "") {
      if (isObject(Image)) {
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
        console.log("Guarantor Picture Uploaded");
      } else {
        setImagePreview(`http://localhost:5000/images/${Image}`)
        console.log("Customer Image Uploaded");
      }
    }
  }, [Image]);
  useEffect(() => {
    console.table({
      guarantorName,
      guarantorPhoneNo,
      guarantorEmail, Image, ImagePreview
    })
    if (guarantorName !== "" &&
      guarantorPhoneNo !== "" &&
      guarantorEmail !== "" && Image !== "" && ImagePreview !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [GuarantorName,
    GuarantorPhoneNumber,
    GuarantorEmailAddress, Image, ImagePreview])

  const Input = styled("input")({ display: "none" });
  const nextPage = () => {
    storeGuarantorName(guarantorName)
    storeGuarantorPhoneNo(guarantorPhoneNo)
    storeGuarantorEmail(guarantorEmail)
    storeguarantorPicture(Image)
    navigation.next()
  }
  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };


  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          {/* Guarantor Signup Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* Guarantor Signup Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Guarantor Registration{" "}
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Text Field Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  name="GuarantorName"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  value={guarantorName}
                  onChange={(e) => {
                    setGuarantorName(e.target.value);
                  }}
                  // onChange={(e) => { setGuarantorName(e.target.value); }}
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

              {/* Text Filed Phone Number */}
              <Grid item xs={12} sm={6}>

                <FormControl
                  fullWidth
                  value={guarantorPhoneNo}
                >
                  <InputLabel> Phone Number </InputLabel>
                  <OutlinedInput
                    id="PhoneNumber"
                    size="small"
                    startAdornment={
                      <InputAdornment position="start">+92</InputAdornment>
                    }
                    name="GuarantorPhoneNumber"
                    value={guarantorPhoneNo}
                    onChange={(e) => {
                      setGuarantorPhoneNo(e.target.value)
                    }}
                    label="Phone Number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Text Field Email Address */}
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="GuarantorEmailAddress"
                  required
                  value={guarantorEmail}
                  onChange={(e) => {
                    setGuarantorEmail(e.target.value);
                  }}
                  // onChange={(e) => { setGuarantorEmail(e.target.value); }}
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
              </Grid>

              <Grid item xs={12} sm={4}></Grid>

              {/* Upload Picture */}
              <Grid item xs={12}>
                {/* Upload Customer Image Button */}
                <label
                  htmlFor="contained-button-file"
                  value={Image}
                >
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      // onChangeFile1(e);
                      setImage(e.target.files[0]);
                      storeguarantorPicture(e.target.files[0])
                    }}
                  />
                  <Button
                    style={{ "margin-bottom": "20px" }}
                    size="small"
                    variant="contained"
                    component="span"
                    align="center"
                  >
                    {" "}
                    Upload Guarantor Image{" "}
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
                disabled={isDisabled}
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={() => { nextPage() }}
              >
                {" "}
                Next{" "}
              </Button>
            </Stack>

            <Grid container justifyContent="flex-end">
              {" "}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
