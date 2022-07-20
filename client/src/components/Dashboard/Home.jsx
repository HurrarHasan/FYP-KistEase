import "./home.scss";
import Widget from "../Widget";
import { useState, useEffect, useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Container,
  TextField,
  CardHeader,
  Grid,
  Box,
  InputAdornment,
  OutlinedInput,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";

const Home = () => {
  const [customerCount, setCustomerCount] = useState("");
  const [salesCount, setSalesCount] = useState("");
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
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
          console.log(" Dashboard remain here ");
          console.log(result.data.rootUser);
          api.post("getcustomersales", { seller_id: result.data.rootUser })
            .then(result => {
              console.error(result)
              setCustomerCount(result.data.customerCount)
              setSalesCount(result.data.sales)
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch((err) => {
          console.log({ err });
          // navigate("/ShopLogin");
        });
    }
  }, []);
  useEffect(() => {
    console.log({ salesCount, customerCount })
  }, [salesCount, customerCount])
  return (
<Grid item xs={12} sx={6}>
      <center> <Widget type="user" sellerData={customerCount} /> </center>
      <center> <Widget type="order" sellerData={salesCount} /> </center>
</Grid>
);
};

export default Home;
