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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

//Icons
import InventoryIcon from "@mui/icons-material/Inventory";

const theme = createTheme();
const Input = styled("input")({ display: "none" });

export default function AddProducts() {
  const handleChangeMakeYear = (event) => {
    setProductMakeYear(event.target.value);
  };

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
  ];

  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [rootUser, setRootUser] = useState("");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productMakeYear, setProductMakeYear] = useState("");
  const [productModelName, setProductModelName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImagePreview, setProductImagePreview] = useState("");
  const [category, setCategory] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 3000,
    withCredentials: false,
  });
  useEffect(() => {
    console.table({
      productName,
      productImage,
      productPrice,
      isDisable,
      productImagePreview,
      productMakeYear,
      productBrand,
      productModelName,
      productQuantity,
    });

    if (
      productName !== "" &&
      productImage !== "" &&
      productPrice !== "" &&
      productMakeYear !== "" &&
      productImagePreview !== "" &&
      productBrand !== "" &&
      productModelName !== "" &&
      productQuantity !== ""
    ) {
      console.log("Im Here");
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [
    productName,
    productPrice,
    productImage,
    isDisable,
    productImagePreview,
    productMakeYear,
    productBrand,
    productModelName,
    productQuantity,
  ]);

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
  }, []);
  const onChangeFile = (e) => {
    if (e.target.files[0]) {
      setProductImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        console.log(reader.result)
        const filetype = reader.result.split("/").at(0)
        console.log({ filetype })
        if (filetype === "data:image") {
          setProductImagePreview(reader.result);
        } else {
          window.alert("Not An Image");
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(productMakeYear)
    let newdate = new Date(productMakeYear);
    let MakeYear = newdate.getFullYear();
    // console.log({MakeYear})
    event.preventDefault();
    if (productName !== "" && productImage !== "") {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productBrand", productBrand);
      formData.append("productMakeYear", MakeYear);
      formData.append("productModelName", productModelName);
      formData.append("productPrice", productPrice);
      formData.append("productQuantity", productQuantity);
      formData.append("productImage", productImage);
      formData.append("seller_id", rootUser);
      for (var value of formData.values()) {
        console.log(value);
      }
      let config = {
        headers: { "content-type": "multipart/form-data" },
      };

      api
        .post("addproducts", formData, config)
        .then((result) => {
          console.log("result=>", result);
          navigate("/ViewProductsCategory");
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("Some Fields Are Empty");
    }
  };
  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  const [ImagePreview, setImagePreview] = useState("");

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
          {/* Inventory Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <InventoryIcon />{" "}
          </Avatar>

          {/* Add Products Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Add New Product{" "}
          </Typography>

          <Box
            component="form"
            encType="multipart/form-data"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* Text Field New Product Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="ProductName"
                  label="Product Name"
                  name="ProductName"
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  type="text"
                  onInput={toInputUppercase} // apply on input which do you want to be capitalize

                />
              </Grid>

              {/* Text Field Make Year */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    views={["year"]}
                    label="Make Year"
                    value={productMakeYear}
                    onChange={(newValue) => {
                      setProductMakeYear(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} helperText={null} />
                    )}
                  />
                </Grid>
              </LocalizationProvider>

              {/* Text Field Brand Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="BrandName"
                  label="Brand Name"
                  name="BrandName"
                  onChange={(e) => {
                    setProductBrand(e.target.value);
                  }}
                  onInput={toInputUppercase} // apply on input which do you want to be capitalize

                />
              </Grid>
              {/* Text Field Model */}
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="ModelName"
                  label="Model Name"
                  name="ModelName"
                  onChange={(e) => {
                    setProductModelName(e.target.value);
                  }}
                  onInput={toInputUppercase} // apply on input which do you want to be capitalize

                />
              </Grid>

              {/* Text Field Price */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    id="Price"
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    label="Price"
                    type="number"
                    onChange={(e) => {
                      setProductPrice(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 13);
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Text Field Stock Available */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Add Stock</InputLabel>
                  <OutlinedInput
                    id="AddStock"
                    startAdornment={
                      <InputAdornment position="start">Qty</InputAdornment>
                    }
                    label="Add Stock"
                    type="number"
                    onChange={(e) => {
                      setProductQuantity(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 13);
                    }}
                  />
                </FormControl>
              </Grid>


              {/* Upload Product Image Button */}
              <Grid item xs={12}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      onChangeFile(e);
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
                    Upload Product Image{" "}
                  </Button>
                </label>
                {/* Upload Product Image Via Camera */}

                <label htmlFor="icon-button-file">
                  {" "}
                  <Input accept="image/*" id="icon-button-file" type="file" />
                </label>
                {/* Product Image Preview */}
                <Button onClick={handleClickOpen}>

                  <center>
                    <Avatar
                      src={
                        productImagePreview
                          ? productImagePreview
                          : "/static/images/avatar/1.jpg"
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
                          productImagePreview
                            ? productImagePreview
                            : "/static/images/avatar/1.jpg"
                        }
                        sx={{ width: 350, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                      />
                    </DialogContentText>
                  </DialogContent>

                </Dialog>
              </Grid>
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
              <Button
                style={{ "margin-top": "20px" }}
                size="small"
                type="submit"
                fullWidth
                variant="contained"
                align="center"
                disabled={isDisable}
              >
                {" "}
                Save{" "}
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
