import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import axios from "axios";
// Icons
import EditIcon from "@mui/icons-material/Edit";

export default function AlertDialog({ productDetails, productName }) {
  console.log({ productDetails, productName })
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const [productPrice, setProductPrice] = useState("");
  const [productQuanitity, setProductQuantity] = useState("");
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 3000,
    withCredentials: false,
  });
  console.log({ productDetails })

  //for update
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    setProductPrice(productDetails.productPrice)
    setProductQuantity(productDetails.productQuantity)
  }, [])
  const updateProduct = () => {
    console.log("IN product Update", { productDetails })
    api.post("updateProducts",
      {
        product_id: productDetails.product_id, brand_id:
          productDetails.Brand._id, model_id: productDetails.Model._id, makeYear_id: productDetails._id,
        productPrice: productPrice, productQuantity: parseInt(productQuanitity)
      })
      .then(result => {
        console.log({ result })
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div>
      <IconButton
        aria-label="edit"
        fullwidth
        variant="outlined"
        onClick={async () => {
          // await setProductForUpdate(item);
          handleClickOpen1();
        }}
      >
        {" "}
        <EditIcon />{" "}
      </IconButton>
      <Dialog open={open1} onClose={handleClose1}>
        <center>
          {" "}
          <DialogTitle fontWeight="bold">Product Details</DialogTitle>{" "}
        </center>
        <DialogContent>
          <DialogContentText style={{ "margin-top": "-20px" }}>
            <center> Edit Your Product Details Then Press Save. </center>
          </DialogContentText>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                style={{ "margin-top": "20px" }}
                size="small"
                disabled
                required
                id="ProductName"
                label="Product Name"
                name="ProductName"
                value={productName}
              // value={item.Product.productName}
              />
            </Grid>

            <Grid item xs={4} style={{ "margin-top": "20px" }}>
              {/* Text Field Make Year */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  fullWidth
                  size="small"
                  disabled
                  views={["year"]}
                  label="Year only"
                  // value={productMakeYear}
                  onChange={(newValue) => {
                    // setProductMakeYear(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} helperText={null} />
                  )}
                  value={productDetails?.makeYear}
                />
              </LocalizationProvider>
            </Grid>
            {/* Text Field Brand Name */}
            <Grid item xs={4}>
              <TextField
                style={{ "margin-top": "20px" }}
                disabled
                size="small"
                required
                id="BrandName"
                label="Brand Name"
                name="BrandName"
                value={productDetails?.Brand?.brandName}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                style={{ "margin-top": "20px" }}
                disabled
                size="small"
                required
                id="ModelName"
                label="Model Name"
                name="ModelName"
                value={productDetails?.Model?.modelName}
              />
            </Grid>
            {/* Text Field Price */}
            <Grid item xs={4}>
              <FormControl
                required
                size="small"
                style={{ "margin-top": "20px" }}
              >
                <InputLabel>Price</InputLabel>
                <OutlinedInput
                  id="Price"
                  startAdornment={
                    <InputAdornment position="start">Rs</InputAdornment>
                  }
                  label="Price"
                  type="number"
                  value={productPrice}
                  onChange={(e) => { setProductPrice(e.target.value) }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl
                required
                size="small"
                style={{ "margin-top": "20px" }}
              >
                <InputLabel>Add Stock</InputLabel>
                <OutlinedInput
                  id="AddStock"
                  startAdornment={
                    <InputAdornment position="start">Qty</InputAdornment>
                  }
                  label="Add Stock"
                  type="number"
                  onChange={(e) => { setProductQuantity(e.target.value) }}
                  value={productQuanitity}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose1() }}>Cancel</Button>
          <Button onClick={() => { updateProduct(); handleClose1(); }}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
