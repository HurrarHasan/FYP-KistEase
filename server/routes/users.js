const express = require("express");
//multer library for file storage
const multer = require("multer");
const router = express.Router();
const authSellerSignup = require("../models/validation/sellersignupdetails.validation");
//sellers controller
const sellerSignup = require("../controller/sellersignup.controller");
//seller login controller
const sellerLogin = require("../controller/login.controller");
//customer details controller
const customerController = require("../controller/customerdetail.controller");
//guarantorDetails controller
const guarantordetails = require("../controller/guarantordetail.controller");
//controller for sellers products
const sellersproducts = require("../controller/productsdetails.controller");
const installments = require("../controller/installment.controller");
const { productsdetails, installmentdetails } = require("../models");
//storage is a component of the multer library for storing file on input
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}_${Date.now()}.jpeg`);
  },
});
//this stores the file according to the fields
const upload = multer({ storage: storage });
const customerUploads = upload.fields([
  0,
  { name: "customerPicture", maxCount: 2 },
  { name: "customerCNIC", maxCount: 2 },
  { name: "customerUtilityBill", maxCount: 2 },
  { name: "guarantorPicture", maxCount: 2 },
  { name: "guarantorCNIC", maxCount: 2 },
  // { name: "gurantorUtilityBill", maxCount: 2 },
]);
//this stores the file according to the fields
const guarantorUploads = upload.fields([
  { name: "CNIC", maxCount: 1 },
  { name: "utilityBill", maxCount: 1 },
]);
/* GET users listing. */
router.get("/", sellerLogin.auth, function (req, res) {
  res.status(200).json({ rootUser: req.userID });
});
/* POST seller signup route */
router.post("/signup", upload.single("shopLogo"), sellerSignup.register);
// router.post("/auth", sellerLogin.auth);
// POST request for seller Login.
router.post("/login", sellerLogin.check_login);
//route to register customer
router.post(
  "/registerCustomer",
  customerUploads,
  customerController.register_Customer_Gurantor
);
router.post(
  "/updateExistingCustomer",
  customerUploads,
  customerController.update_existing_Customer
);

router.post(
  "/registerGuarantor",
  guarantorUploads,
  guarantordetails.register_Guarantor
);
//POST request for the adding new product to the database.
router.post(
  "/addproducts",
  upload.single("productImage"),
  sellersproducts.register_Product
);
//route for checking email of the seller for the purpose of password recovery.
router.post("/getemail", sellerSignup.email);
//route for fetching the sellers details for the dashboard.
router.post("/getUser", sellerSignup.get_seller);
// route for updating update time in seller and customer
router.post("/setDefaulterDuration", sellerSignup.setDefaulterDuration);
// route for setting Customer Default Automatically.
router.post("/setCustomerDefault", customerController.setCustomerDefaulter);
//route for getting No. of sales and customers of the Seller.
router.post("/getcustomersales", sellerSignup.get_seller_sales_customer);
//route for getting Product.
router.post("/getProduct", sellersproducts.get_Product);
//route to get installment details and customer purchase details
router.post(
  "/getInstallmentProductCustomerDetails",
  sellersproducts.get_installment_Customer_Product
);
// route for getting Product Detals eg Model, MakeYear, Brand.
router.post("/viewProduct", sellersproducts.view_Product);
router.post("/viewProductCategory", sellersproducts.view_Product_Category);
// route for updating the product Details eg the Product Price and Quantity.
router.post("/updateProducts", sellersproducts.update_Product);
// route for deleting the Product From seller's account.
router.post("/removeProduct", sellersproducts.delete_Product);
// route for setting Installment for the customer seller registers and starts the purchase.
router.post("/setInstallment", installments.insert_installment);
router.post("/upgradeInstallment", installments.set_installment);
router.post("/getInstallmentProduct", installments.get_installmentProduct);
router.post("/getInstallmentDetails", installments.get_installmentInformation);
//route for getting the customers monthly installment
router.post(
  "/getUserMonthlyInstallment",
  installments.getUserMonthlyInstallment
);
router.post("/customerOTP", customerController.customerOTP);
// settting customer as black listed.
router.post("/makeDefaulter", customerController.makeDefaulter);
router.post(
  "/viewBlacklistedCustomers",
  customerController.viewBlacklistedCustomers
);
//get customers for notification table
router.post(
  "/customerForNotification",
  customerController.getCustomerForNotification
);
//get customer Status
router.post("/customerStatus", customerController.getCustomerStatus);
//updating Installment payments of the user.
router.post("/updateInstallmentPayment", installments.updatePayment);
// route for updating customer.
router.post("/updatecustomer", customerController.updateCustomer);
// route for updating shop details.
router.post(
  "/updateShopDetails",
  upload.single("shopLogo"),
  sellerSignup.updateDetails
);
// route for the recovey of Password and resetting the password.
router.post("/recoveryPassword", sellerSignup.updatePassword);
// route for getting the Brand of the relative Product selected.
router.post("/getBrand", sellersproducts.callBrand);
// route for gettign makeYear relative to the Model selected.
router.post("/getMakeYear", sellersproducts.callMakeYear);
// route for gettign makeYear relative to the Brand selected.
router.post("/getModel", sellersproducts.callModel);
// route for getting the customers belonging to the seller.
router.post("/getCustomers", customerController.getCustomers);
// route for getting single customer Information and details.
router.post("/getCustomer", customerController.getCustomer);
// route for getting customer installment for the single.jsx route on the frontend
router.post("/getFinance",installments.get_monthly_income_Details)
// route to trigger controller to send notification to the customer
router.post("/sendCustomerNotification",installments.Send_Customer_Notification)
// route to controller to send email to the customer.
router.post("/sendLegder",installments.Send_Customer_Ledger_Details)
router.post(
  "/getCustomerInstallment",
  installments.get_installment_for_Customer
);
module.exports = router;
