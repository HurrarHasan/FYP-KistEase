import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { styled } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Avatar,
  Container,
  TextField,
  Grid,
  Box,
  InputAdornment,
  OutlinedInput,
  Button,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
// Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const Input = styled("input")({ display: "none" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [shopDetails, setshopDetails] = useState("");
  const [ImagePreview, setImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopNTN, setShopNTN] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [shop_id, setShop_id] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  const onChangeFileShopLogo = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePreview(reader.result);
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
      console.log("Shop Logo Uploaded");
    }
  };
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
            console.log(" Dashboard remain here ");
            console.log(result.data.rootUser);
            api
              .post("getUser", { seller_id: result.data.rootUser })
              .then((result) => {
                console.log("ShopLogo", result.data.result.shopLogo);
                setshopDetails(result.data.result);
                setShopName(result.data.result.shopName);
                setShopNTN(result.data.result.shopNTN);
                setShopAddress(result.data.result.shopAddress);
                setEmailAddress(result.data.result.emailAddress);
                setCellNumber(result.data.result.cellNumber.slice(3));
                setEmailAddress(result.data.result.emailAddress);
                setImage(result.data.result.shopLogo);
                setShop_id(result.data.result._id);
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
          navigate("/ShopLogin");
        });
    }
  }, []);

  useEffect(() => {
    console.table({ shopDetails });
  }, [shopDetails]);
  useEffect(() => {
    console.table({
      ImagePreview,
      Image,
      shopName,
      shopNTN,
      shopAddress,
      emailAddress,
      cellNumber,
      shop_id,
      isDisabled,
    });
    if (
      Image !== "" &&
      shopName !== "" &&
      shopNTN !== "" &&
      shopAddress !== "" &&
      emailAddress !== "" &&
      cellNumber !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    ImagePreview,
    Image,
    shopName,
    shopNTN,
    shopAddress,
    emailAddress,
    cellNumber,
    isDisabled,
  ]);
  const updateDetails = () => {
    if (
      // ImagePreview !== "" &&
      Image !== "" &&
      shopName !== "" &&
      shopNTN !== "" &&
      shopAddress !== "" &&
      emailAddress !== "" &&
      cellNumber !== ""
    ) {
      const formData = new FormData();
      formData.append("shopName", shopName);
      formData.append("shopNTN", shopNTN);
      formData.append("shopAddress", shopAddress);
      formData.append("emailAddress", emailAddress);
      formData.append("cellNumber", "+92" + cellNumber);
      formData.append("shopLogo", Image);
      formData.append("seller_id", shopDetails._id);
      for (var value of formData.values()) {
        console.log(value);
      }
      let config = {
        headers: { "content-type": "multipart/form-data" },
      };

      api
        .post("updateShopDetails", formData, config)
        .then((result) => {
          console.log("result=>", result);
          console.log("go to the dashboard");
          navigate("/Dashboard");
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("Some Fields Are Empty");
    }
  };
  // All Caps
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Update Shop Profile Icon */}
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                {" "}
                <LockOutlinedIcon />{" "}
              </Avatar>

              {/* Update Shop Profile Tittle */}
              <Typography component="h1" variant="h5">
                {" "}
                Update Shop Profile{" "}
              </Typography>

              <Box
                component="form"
                noValidate
                encType="multipart/form-data"
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  {/* Upload Shop Logo */}
                  <Grid item xs={12}>
                    {/* Upload Shop Logo Button */}
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e) => {
                          onChangeFileShopLogo(e);
                        }}
                        name="ShopLogo"
                      />
                      <Button
                        style={{ "margin-bottom": "20px" }}
                        size="small"
                        variant="contained"
                        component="span"
                        align="center"
                      >
                        {" "}
                        Upload Shop Logo{" "}
                      </Button>
                    </label>
                    {/* UUpload Shop Logo Via Camera */}
                    <label htmlFor="icon-button-file">
                      <Input accept="image/*" id="icon-button-file" type="file" />
                    </label>
                    {/* Shop Logo Preview */}
                    <center>
                      <Avatar
                        src={
                          ImagePreview
                            ? ImagePreview
                            : `http://localhost:5000/images/${Image}`
                        }
                        sx={{ width: 100, height: 100 }}
                      />
                    </center>
                  </Grid>

                  {/* Text Field Shop Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="ShopName"
                      size="small"
                      value={shopName}
                      required
                      fullWidth
                      id="ShopName"
                      label="Shop Name"
                      onChange={(e) => {
                        setShopName(e.target.value);
                      }}
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
                    />
                  </Grid>

                  {/* Text Field Shop NTN */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small"
                      name="Shop_NTN"
                      value={shopNTN}
                      required
                      fullWidth
                      id="Shop_NTN"
                      label="Shop NTN"
                      type="number"
                      onChange={(e) => {
                        setShopNTN(e.target.value);
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 13);
                      }}
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
                      value={shopAddress}
                      required
                      fullWidth
                      id="Shop_Address"
                      label="Shop Address"
                      onChange={(e) => {
                        setShopAddress(e.target.value);
                      }}
                      autoFocus
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
                      value={emailAddress}
                      name="email"
                      onChange={(e) => {
                        setEmailAddress(e.target.value);
                      }}
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

                  {/* Text Field Contact Number */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel> Phone Number </InputLabel>
                      <OutlinedInput
                        size="small"
                        id="PhoneNumber"
                        label="Phone Number"
                        type="number"
                        onChange={(e) => {
                          setCellNumber(e.target.value);
                        }}
                        startAdornment={
                          <InputAdornment position="start">+92</InputAdornment>
                        }
                        value={parseInt(cellNumber)}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10);
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button
                      size="small"
                      fullWidth
                      variant="contained"
                      disabled={isDisabled}
                      component={Link}
                      to=""
                      onClick={updateDetails}
                    >
                      Update
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button
                      size="small"
                      fullWidth
                      variant="contained"
                      component={Link}
                      to={`/ResetPassword/${shop_id}`}
                    >
                      Reset Shop Password
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                  {" "}
                </Grid>
              </Box>
            </Box>

            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Container>
        </DialogContent>

      </Dialog>
    </div>
  );
}
