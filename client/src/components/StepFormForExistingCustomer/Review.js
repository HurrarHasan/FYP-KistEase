import { React, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetail from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import {
  getProduct,
  getDownPayment,
  getProductName,
  getDateList,
  getMonthlyPayment,
  getTotalAmount,
  getCustomerAddress,
  getCustomerCNICNO,
  getCustomerEmail,
  getCustomerName,
  getCustomerPhoneNo,
  getCustomerid,
  getGuarantorCNICNO,
  getGuarantorEmail,
  getGuarantorName,
  getGuarantorPhoneNo,
  getCNICCustomer,
  getCustomerBill,
  getCustomerPicture,
  getCNICGuarantor,
  getGuarantorPicture,
  getFinalProductPrice,
  getProductQuantity,
  getProductModel,
  getProductBrand,
  getInterestRate
} from "./StoreVariables";
export const Review = ({ formData, navigation }) => {
  const { go } = navigation;
  const {
    CustomerName,
    CustomerPhoneNumber,
    CustomerEmailAddress,
    CustomerAddress,
    CustomerCnic,
    GuarantorName,
    GuarantorCnic,
    GuarantorPhoneNumber,
    GuarantorEmailAddress,
    // ProductName,
    ProductYear,
    ProductBrand,
    ProductModel,
    ProductPrice,
    ProductQty,
    TotalAmount,
    DownPayment,
    MonthlyPayment,
  } = formData;
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [rootUser, setRootUser] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorCNIC, setGuarantorCNIC] = useState("");
  const [guarantorPhoneNo, setGuarantorPhoneNo] = useState("");
  const [guarantorEmail, setGuarantorEmail] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerCNIC, setCustomerCNIC] = useState("");
  const [customerPhoneNo, setCustomerPhoneNo] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productModel, setProductModel] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 3000,
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
  useEffect(() => {
    if (getProduct()) {
      setCustomerId(getCustomerid())
      setCustomerName(getCustomerName());
      setCustomerPhoneNo(getCustomerPhoneNo());
      setCustomerEmail(getCustomerEmail());
      setCustomerAddress(getCustomerAddress());
      setCustomerCNIC(getCustomerCNICNO());
      setGuarantorCNIC(getGuarantorCNICNO());
      setGuarantorEmail(getGuarantorEmail());
      setGuarantorName(getGuarantorName());
      setGuarantorPhoneNo(getGuarantorPhoneNo());
      let ProductPrice = getProduct();
      setProductPrice(ProductPrice.productPrice);
      let totalAmount = getTotalAmount();
      setTotalAmount(totalAmount);
      let downPayment = getDownPayment();
      setDownPayment(downPayment);
      let monthlyPayment = getMonthlyPayment();
      setMonthlyPayment(monthlyPayment);
      let productDetails = getProduct();
      setProductDetails(productDetails);
      let productName = getProductName();
      setProductName(productName);
      let ProductQuantity = getProductQuantity();
      setProductQuantity(ProductQuantity);
      let ProductBrand = getProductBrand();
      setProductBrand(ProductBrand);
      let ProductModel = getProductModel();
      setProductModel(ProductModel);

      console.log("review Table");
      console.table({
        ProductPrice,
        totalAmount,
        downPayment,
        monthlyPayment,
        productDetails,
        productName,
        ProductQuantity,
      });
    }
  }, []);
  const submitData = async () => {
    let customerPicture,
      CNICcustomer,
      customerBill,
      guarantorPicture,
      CNICguarantor,
      DateList,
      customer_id,
      productPrice, interestRate;
    customerPicture = getCustomerPicture();
    CNICcustomer = getCNICCustomer();
    customerBill = getCustomerBill();
    guarantorPicture = getGuarantorPicture();
    CNICguarantor = getCNICGuarantor();
    DateList = getDateList();
    productPrice = getFinalProductPrice();
    interestRate = getInterestRate();
    console.table({
      ProductPrice,
      totalAmount,
      downPayment,
      monthlyPayment,
      productDetails,
      CustomerName,
      CustomerPhoneNumber,
      CustomerEmailAddress,
      CustomerAddress,
      CustomerCnic,
      GuarantorName,
      GuarantorCnic,
      GuarantorPhoneNumber,
      GuarantorEmailAddress,
      customerPicture,
      CNICcustomer,
      customerBill,
      guarantorPicture,
      CNICguarantor,
      DateList,
      productPrice,
      productQuantity,
    });
    const formData = new FormData();
    formData.append("customer_id", customerId)
    formData.append("customerName", customerName);
    formData.append("customerEmail", customerEmail);
    formData.append("customerPhoneNo", `+92${customerPhoneNo}`);
    formData.append("customerAddress", customerAddress);
    formData.append("CNICNO", customerCNIC);
    formData.append("guarantorName", guarantorName);
    formData.append("guarantorEmail", guarantorEmail);
    formData.append("guarantorPhoneNo", `+92${guarantorPhoneNo}`);
    formData.append("guarantorCNICNO", guarantorCNIC);
    formData.append("customerPicture", customerPicture);
    formData.append("customerCNIC", CNICcustomer);
    formData.append("customerUtilityBill", customerBill);
    formData.append("guarantorPicture", guarantorPicture);
    formData.append("guarantorCNIC", CNICguarantor);
    formData.append("seller_id", rootUser);
    formData.append("product_id", productDetails.product_id);
    formData.append("makeYear_id", productDetails._id);
    formData.append("productPrice", productPrice);
    formData.append("installmentAmount", totalAmount);

    for (var value of formData.values()) {
      console.log(value);
    }
    let config = {
      headers: { "content-type": "multipart/form-data" },
    };
    await api
      .post("updateExistingCustomer", formData, config)
      .then((result) => {
        console.log({ result });
        customer_id = result.data.result._id;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log({ customer_id });
    // formData.append("productMonltyInstallment",DateList );
    // formData.append("customer_id", customer_id);
    for (var value of formData.values()) {
      console.log(value);
    }
    await api
      .post("setInstallment", {
        productMonthlyInstallment: DateList,
        productPrice: productPrice,
        seller_id: rootUser,
        customer_id: customer_id,
        product_id: productDetails.product_id,
        makeYear_id: productDetails._id,
        installmentAmount: totalAmount,
        downPayment: downPayment,
        interestRate: interestRate,
        productQuantity: parseInt(productQuantity),
      })
      .then((result) => {
        console.log({ result });
        navigate('/CustomersTable')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container maxWidth="sm">
      <h3>Review Your Details</h3>
      <RenderAccordion
        summary="Customer"
        go={go}
        details={[
          { Name: customerName },
          { "Phone Number": "+92" + customerPhoneNo },
          { Email: customerEmail },
          { Address: customerAddress },
          { CNIC: customerCNIC },
        ]}
      />

      <RenderAccordion
        summary="Guarantor"
        go={go}
        details={[
          { Name: guarantorName },
          { "Phone Number": "+92" + guarantorPhoneNo },
          { Email: guarantorEmail },
          { CNIC: guarantorCNIC },
        ]}
      />

      <RenderAccordion
        summary="Product"
        go={go}
        details={[
          { Name: productName },
          // { Year: ProductYear },
          {
            Year: productDetails.makeYear,
            // localStorage.getItem("makeYear")
          },
          { Brand: productBrand },
          { Model: productModel },
          {
            Price: productPrice,
            // localStorage.getItem("price")
          },
          { Qty: ProductQty },
        ]}
      />

      <RenderAccordion
        summary="Financing"
        go={go}
        details={[
          { "Total Amount": totalAmount },
          { "Down Payment": downPayment },
          { "Monthly Payment": monthlyPayment },
        ]}
      />

      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "1.5rem" }}
        onClick={() => {
          submitData();
        }}
      >
        {" "}
        Submit{" "}
      </Button>
    </Container>
  );
};

export const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      {summary}
    </AccordionSummary>
    <AccordionDetail>
      <div>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return (
            <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>
          );
        })}
        {/* <IconButton
          color="primary"
          component="span"
          onClick={() => go(`${summary}`)}
        >
          <EditIcon />
        </IconButton> */}
      </div>
    </AccordionDetail>
  </Accordion>
);
