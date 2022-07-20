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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Card from "@mui/material/Card";

// Icons
import InventoryIcon from "@mui/icons-material/Inventory";

const theme = createTheme();

export default function ViewAllProducts() {
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [seller_id, setSeller_id] = useState("");
  const [productList, setProductList] = useState([]);
  const [productUpdate, setProductUpdate] = useState("");
  const [isdeleted, setIsDeleted] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  //for update
  const [productForUpdate, setProductForUpdate] = useState("");
  const navigate = useNavigate();

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
            setSeller_id(result.data.rootUser);
            api
              .post("viewProductCategory", { seller_id: result.data.rootUser })
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
  const redirect = (product_id) => {
    console.warn({ product_id });
    navigate(`/ViewAllProductsNew/${product_id}`);
  };

  useEffect(() => {
    console.warn({ productList });
  }, [productList]);
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
        {/* Products Category Tittle */}
        <Typography component="h1" variant="h5">
          {" "}
          Products Category{" "}
        </Typography>

        <Box component="form" noValidate maxWidth="xl">
          <center>
            <Card sx={{ minWidth: 275 }}>
              <ImageList sx={{ width: "100%" }} cols={4}>
                {productList.map((item, key) => (
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      backgroundColor: "primary.dark",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                    onClick={() => {
                      redirect(item._id);
                    }}
                  >
                    <h3 style={{ "padding-top": "60px" }}>
                      {item.productName}
                    </h3>
                  </Box>
                ))}
              </ImageList>
            </Card>
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
