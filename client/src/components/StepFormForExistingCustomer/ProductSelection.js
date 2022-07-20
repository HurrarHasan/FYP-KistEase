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
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import {
  storeProduct, getProduct, storeProductQuantity, getProductQuantity, storeProductName,
  getProductName, storeBrand, storeModel, storeProductBrand, storeProductModel
} from "./StoreVariables"
// Icons
import CategoryIcon from "@mui/icons-material/Category";

const theme = createTheme();
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1515777315835-281b94c9589f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=912&q=80",
    title: "Bike",
    rows: 2,
    cols: 2,
    featured: true,
  },
];

export const ProductSelection = ({ formData, setForm, navigation }) => {
  const {
    ProductName,
    ProductYear,
    ProductBrand,
    ProductModel,
    ProductPrice,
    ProductQty,
  } = formData;

  const handleChangeMakeYear = (event) => {
    setMakeYear(event.target.value);
  };
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [getModel, setGetModel] = useState("");
  const [getMakeYear, setGetMakeYear] = useState("");
  const [getQuantity, setGetQuantity] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [getPrice, setGetPrice] = useState("");
  const [makeYear, setMakeYear] = useState([]);
  const [product, setProduct] = useState(" ");
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [productStore, setProductStore] = useState("");
  const [productName, setProductName] = useState("");
  const [storeBrand, setStoreBrand] = useState("");
  const [storeModel, setStoreModel] = useState("");
  const [storeMakeYear, setStoreMakeYear] = useState("");
  const [rootUser, setRootUser] = useState("");
  const [getBrand, setGetBrand] = useState("");
  const [isDisabled, setIsDisabled] = useState(true)
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 3000,
    withCredentials: false,
  });

  useEffect(() => {
    console.table({ productName, storeBrand, storeModel, storeMakeYear });
    if (
      productName !== "" &&
      storeBrand !== "" &&
      storeModel !== "" &&
      storeMakeYear !== ""
    ) {
      localStorage.setItem("productName", JSON.stringify(productName));
      localStorage.setItem("Brand", JSON.stringify(storeBrand));
      localStorage.setItem("Model", JSON.stringify(storeModel));
      localStorage.setItem("MakeYear", JSON.stringify(storeMakeYear));
    }
  }, [productName, storeBrand, storeModel, storeMakeYear]);

  useEffect(() => {
    console.log({ token });
    if (token != null) {
      console.log("we are in if");
      api
        .get("/", { headers: { auth_TOKEN: token.KistEase_seller_Token } })
        .then((result) => {
          console.log({ result });
          if (result) {
            console.log("remain here");
            console.log("rootUser:", result.data.rootUser);
            setRootUser(result.data.rootUser);
            api
              .post("getProduct", { seller_id: result.data.rootUser })
              .then((result) => {
                console.log("getProduct:", result.data.result);
                setProductList(result.data.result);
                console.log("Product:", productList);
              })
              .catch((err) => {
                console.log({ err });
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
  // useEffect(() => {
  //     console.log({productStore});

  // }, [productStore])
  useEffect(() => {
    console.log({ productStore });
    setProductName(productStore.productName);
    if (productStore) {
      api
        .post("getBrand", { seller_id: rootUser, product_id: productStore._id })
        .then((result) => {
          console.log(result);
          setBrand(result.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productStore]);
  useEffect(() => {
    if (getBrand !== "") {
      console.table({ brand, getBrand });
      setStoreBrand(getBrand);
      let getBrand_id = brand.find((brand) => brand.brandName === getBrand);
      console.log({ getBrand_id });
      if (brand && getBrand_id) {
        api
          .post("getModel", {
            seller_id: rootUser,
            product_id: productStore._id,
            brand_id: getBrand_id._id,
          })
          .then((result) => {
            console.log(result.data.result);
            setModel(result.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [getBrand]);
  useEffect(() => {
    if (getModel !== "") {
      console.table({ getModel, brand, getBrand });
      setStoreModel(getModel);
      let getBrand_id = brand.find((brand) => brand.brandName === getBrand);
      let getModel_id = model.find((model) => model.modelName === getModel);
      console.table({ getBrand_id, getModel_id });
      if (brand && getBrand_id && getModel_id) {
        api
          .post("getMakeYear", {
            seller_id: rootUser,
            product_id: productStore._id,
            brand_id: getBrand_id._id,
            model_id: getModel_id._id,
          })
          .then((result) => {
            console.log(result.data.result);
            setMakeYear(result.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [getModel]);
  useEffect(() => {
    if (getMakeYear) {
      console.warn("we are at last useEffect", getMakeYear);
      let makeyear = makeYear.find(
        (makeyear) => makeyear.makeYear === getMakeYear
      );
      console.log(makeyear);
      storeProduct(makeYear[0])
      setGetQuantity(makeyear.productQuantity);
      setGetPrice(makeyear.productPrice);
    }
  }, [getMakeYear]);
  useEffect(() => {
    console.table({ productQuantity, getQuantity })
    if (parseInt(productQuantity) > getQuantity) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [productQuantity])

  const handleChange = (event) => {
    console.log(event.target.value);
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].productName === event.target.value) {
        setProductStore(productList[i]);
        storeProductName(productList[i].productName);
      }
    }
    console.log({ productList });
  };
  useEffect(() => {
    if (productStore !== "" && getBrand !== "" && getMakeYear !== "" && getModel !== "" && productQuantity !== "") {
      console.table({ productQuantity, getQuantity })
      if (parseInt(productQuantity) > getQuantity) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
      // setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [productStore, getBrand, getMakeYear, getModel, productQuantity])

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
          {/* Product Selection Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <CategoryIcon />{" "}
          </Avatar>

          {/* Enter Purchased Product Details Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Enter Purchased Product Details{" "}
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid item xs={12}>
              {/* Product Name Selector Dropdown */}
              <TextField
                size="small"
                id="select-product"
                select
                label="Select"
                required
                style={{ "margin-bottom": "20px" }}
                onChange={handleChange}
                helperText="Please select your product"
              >

                {productList.map((option) => (
                  <MenuItem key={option._id} value={option.productName}>
                    {" "}
                    {option.productName}{" "}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid container spacing={2}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel htmlFor="grouped-select">Brand</InputLabel>
                <Select
                  onChange={(e) => {
                    setGetBrand(e.target.value);
                    storeProductBrand(e.target.value)
                    // localStorage.setItem("brandName", e.target.value);
                  }}
                  id="grouped-select"
                  label="Grouping"
                >
                  {brand.map((option) => (
                    <MenuItem key={option._id} value={option.brandName}>
                      {" "}
                      {option.brandName}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel htmlFor="grouped-select">Model</InputLabel>
                <Select
                  onChange={(e) => {
                    setGetModel(e.target.value);
                    storeProductModel(e.target.value);
                    // localStorage.setItem("modelName", e.target.value);
                  }}
                  id="grouped-select"
                  label="Grouping"
                >
                  {model.map((option) => (
                    <MenuItem key={option._id} value={option.modelName}>
                      {" "}
                      {option.modelName}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel htmlFor="grouped-select">Year</InputLabel>
                <Select
                  onChange={(e) => {
                    setGetMakeYear(e.target.value);
                    // storeProduct(e.target.value)
                    // localStorage.setItem(setGetMakeYear)
                    // localStorage.setItem("makeYear", e.target.value);
                  }}
                  id="grouped-select"
                  label="Grouping"
                >
                  {makeYear.map((option) => (
                    <MenuItem key={option._id} value={option.makeYear}>
                      {" "}
                      {option.makeYear}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/*  */}

              {/* Text Field Price */}
              <Grid item xs={12} sm={4}>
                {/* <TextField required fullWidth id="Price" label="Price" name="Price" type="number"
onChange={(e) => { (e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)); } } /> */}
                <TextField
                  size="small"
                  disabled
                  name="ProductPrice"
                  value={getPrice}
                  label="Price"
                  type="number"
                  id="Price"
                  startAdornment={
                    <InputAdornment position="start">Rs</InputAdornment>
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                />
              </Grid>

              {/* Text Field Available Stock */}
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  disabled
                  id="Stock"
                  label="Stock"
                  value={getQuantity}
                  name="Stock"
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                />
              </Grid>

              {/* Text Field Product Qty */}
              <Grid item xs={12} sm={4}>
                {/* <TextField disabled fullWidth id="Add Stock (Qty)" label="Available Stock / Stock Finished" name="Add Stock (Qty)" type="number"
onChange={(e) => { (e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)); } } /> */}
                <FormControl
                  required
                  value={ProductQty}
                  onChange={setForm}
                  size="small"
                >
                  <InputLabel>Enter Quantity</InputLabel>
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    id="AddQuantiy"
                    name="ProductQty"
                    label="Add Quantity"
                    type="number"
                    onChange={(e) => {
                      setProductQuantity(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                  />
                </FormControl>
              </Grid>
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
                disabled={isDisabled}
                fullWidth
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={() => { storeProductQuantity(productQuantity); navigation.next() }}
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
