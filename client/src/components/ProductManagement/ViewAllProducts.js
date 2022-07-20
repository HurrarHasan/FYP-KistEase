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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";

import EditProductDialog from "../ProductManagement/EditProductDialog";

const theme = createTheme();

export default function ViewAllProducts() {
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [rootUser, setRootUser] = useState();
  const [productList, setProductList] = useState([]);
  const [productUpdate, setProductUpdate] = useState("");
  const [isdeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  // const [productName,setProductName]=useState('');
  // const [makeYear,setMakeYear]=useState('');
  // const [brandName,setBrandName]= useState('');
  // const [modelName,setModelName]= useState('');

  //for update
  const [productForUpdate, setProductForUpdate] = useState("");
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  // const setProducts=async (items)=>{

  // }
  useEffect(() => {
    console.log({ deleteId });
  }, [deleteId]);

  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 3000,
    withCredentials: false,
  });
  useEffect(() => {
    console.log({ token });
    if (token != null) {
      console.log("we are in if");
      // console.log("token.KistEase_seller_Token:", token.KistEase_seller_Token);
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
            console.log("rootUser:", result.data.rootUser);
            api
              .post("viewProduct", { seller_id: result.data.rootUser })
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
          // <Alert severity="error">Invalid Credentials</Alert>;
          // navigate("/ShopLogin");
        });
    }
  }, [isdeleted]);

  // const removeProduct = () => {
  //   // const deleteId = Id;
  //   // console.log({ deleteId });
  //   // console.log({ isdeleted });
  //   setOpen1(false);
  //   setIsDeleted(true);
  //   console.log({ deleteId });
  //   // setOpen2(false);
  //   api
  //     .post("removeProduct", { makeYearId: deleteId })
  //     .then((result) => {
  //       console.log("result:", result);
  //       setIsDeleted(false);
  //       setOpen2(false);
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // };
  useEffect(() => {
    console.warn({ productUpdate });
  }, [productUpdate]);
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        // style={{background: 'blue'}}
        maxWidth="xl"
      >
        <CssBaseline />
        <center>
          {/* Inventory Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <InventoryIcon />{" "}
          </Avatar>
        </center>
        {/* View All Products Tittle */}
        <Typography component="h1" variant="h5">
          {" "}
          View All Products{" "}
        </Typography>

        <Box component="form" noValidate maxWidth="xl">
          <center>
            <ImageList sx={{ width: "100%" }} cols={4}>
              {/* <ImageListItem key="Subheader" cols={6}> */}
              {/* <ListSubheader component="div"></ListSubheader> */}
              {/* </ImageListItem> */}

              {productList.map((item, key) => (
                <ImageListItem >
                  <center>
                    <img
                      src={`http://localhost:5000/images/${item.productImage}`}
                      srcSet={`http://localhost:5000/images/${item.productImage}`}
                      alt={item.title}
                      style={{ height: "150px", width: "150px" }}
                      loading="lazy"
                    />
                  </center>
                  <ImageListItemBar
                    // title={item.Brand.brandName}
                    subtitle={`

                    ${item.productPrice}Rs,
                    ${item.productQuantity}`}
                    // subtitle={`${item.Brand.brandName},${item.Model.modelName},${item.makeYear},${item.productPrice}Rs,${item.productQuantity}`}
                    //item.productImage==> this is product Image
                    //item.Model.modelName==>this is the productModelName
                    //item.makeYear==>this is the productMakeYear
                    //item.productPrice==>this is the ProductPrice
                    actionIcon={
                      <div key={key}>
                        <EditProductDialog productDetails={item} />
                      </div>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </center>

          <Grid container spacing={2}>
            {/* Next Button */}
            <Grid container justify="center">
              <Button
                component={Link}
                to="/AddProducts"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {" "}
                Add New Product{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
