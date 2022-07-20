var
  customer_id,
  customerName,
  customerEmail,
  customerPhoneNo,
  customerAddress,
  customerCNICNO,
  guarantorName,
  guarantorEmail,
  guarantorPhoneNo,
  guarantorCNICNO,
  customerPicture,
  CNICcustomer,
  customerBill,
  guarantorPicture,
  CNICguarantor,
  guarantorBill,
  productDetails,
  productQuantity,
  productName,
  totalAmount,
  DownPayment,
  MonthlyPayment,
  DateList,
  finalProductPrice,
  productBrand,
  productModel,
  interestRate;

const storeCustomerid = (data) => {
  console.log({ data });
  customer_id = data;
};
const storeCustomerName = (data) => {
  console.log({ data });
  customerName = data;
};
const storeCustomerEmail = (data) => {
  console.log({ data });
  customerEmail = data;
};
const storeCustomerPhoneNo = (data) => {
  console.log({ data });
  customerPhoneNo = data;
};
const storeCustomerAddress = (data) => {
  console.log({ data });
  customerAddress = data;
};
const storeCustomerCNICNO = (data) => {
  console.log({ data });
  customerCNICNO = data;
};
const storeGuarantorName = (data) => {
  console.log({ data });
  guarantorName = data;
};
const storeGuarantorEmail = (data) => {
  console.log({ data });
  guarantorEmail = data;
};
const storeGuarantorPhoneNo = (data) => {
  console.log({ data });
  guarantorPhoneNo = data;
};
const storeGuarantorCNICNO = (data) => {
  console.log({ data });
  guarantorCNICNO = data;
};
const storeCustomerPicture = (data) => {
  console.log({ data });
  customerPicture = data;
};
const storeCNICCustomer = (data) => {
  console.log({ data });
  CNICcustomer = data;
};
const storeCustomerBill = (data) => {
  console.log({ data });
  customerBill = data;
};
const storeguarantorPicture = (data) => {
  console.log({ data });
  guarantorPicture = data;
};
const storeCNICguarantor = (data) => {
  console.log({ data });
  CNICguarantor = data;
};
const storeGuarantorBill = (data) => {
  console.log({ data });
  guarantorBill = data;
};
//will also give the product Id
const storeProduct = (data) => {
  console.log("productDetails:", { data });
  productDetails = data;
};
const storeInterestRate = (data) => {
  console.log("interest Rate:", { data });
  interestRate = data;
};
const storeProductQuantity = (data) => {
  console.log({ data });
  productQuantity = data;
};
const storeProductName = (data) => {
  console.log({ data });
  productName = data;
};
const storeProductBrand = (data) => {
  console.log({ data });
  productBrand = data;
};
const storeProductModel = (data) => {
  console.log({ data });
  productModel = data;
};
const storeFinalProductPrice = (data) => {
  console.log({ data });
  finalProductPrice = data;
};
const getCustomerid = () => {
  console.log({ customer_id });
  return customer_id;
};
const getCustomerPicture = () => {
  console.log({ customerPicture });
  return customerPicture;
};
const getProductModel = () => {
  console.log({ productModel });
  return productModel;
};
const getInterestRate = () => {
  console.log({ interestRate });
  return interestRate;
};
const getProductBrand = () => {
  console.log({ productBrand });
  return productBrand;
};
const getCNICCustomer = () => {
  console.log({ CNICcustomer });
  return CNICcustomer;
};
const getCustomerBill = () => {
  console.log({ customerBill });
  return customerBill;
};
const getGuarantorPicture = () => {
  console.log({ guarantorPicture });
  return guarantorPicture;
};
const getCNICGuarantor = () => {
  console.log({ CNICguarantor });
  return CNICguarantor;
};
const getGuarantorBill = () => {
  console.log({ guarantorBill });
  return guarantorBill;
};
const getProduct = () => {
  return productDetails;
};
const getProductQuantity = () => {
  return productQuantity;
};
const getProductName = () => {
  return productName;
};
const getFinalProductPrice = () => {
  return finalProductPrice;
};
const storeDateList = (data) => {
  console.log({ data });
  DateList = data;
};
const getDateList = () => {
  return DateList;
};
const storeDownPayment = (data) => {
  console.log({ data });
  DownPayment = data;
};
const getDownPayment = () => {
  return DownPayment;
};
const storeTotalAmount = (data) => {
  console.log({ data });
  totalAmount = data;
};
const getTotalAmount = () => {
  return totalAmount;
};
const storeMonthlyPayment = (data) => {
  console.log({ data });
  MonthlyPayment = data;
};
const getMonthlyPayment = () => {
  return MonthlyPayment;
};
const getCustomerName = () => {
  return customerName;
};
const getCustomerEmail = () => {
  return customerEmail;
};
const getCustomerPhoneNo = () => {
  return customerPhoneNo;
};
const getCustomerAddress = () => {
  return customerAddress;
};
const getCustomerCNICNO = () => {
  return customerCNICNO;
};
const getGuarantorName = () => {
  return guarantorName;
};
const getGuarantorEmail = () => {
  return guarantorEmail;
};
const getGuarantorPhoneNo = () => {
  return guarantorPhoneNo;
};
const getGuarantorCNICNO = () => {
  return guarantorCNICNO;
};


export {
  getCustomerid,
  getCustomerPicture,
  getCNICCustomer,
  getCustomerBill,
  getGuarantorPicture,
  getCNICGuarantor,
  getGuarantorBill,
  getProductQuantity,
  getProduct,
  getProductName,
  getDownPayment,
  getDateList,
  getMonthlyPayment,
  getTotalAmount,
  getProductBrand,
  getProductModel,
  getFinalProductPrice,
  getInterestRate,
  getCustomerName,
  getCustomerEmail,
  getCustomerPhoneNo,
  getCustomerCNICNO,
  getCustomerAddress,
  getGuarantorName,
  getGuarantorEmail,
  getGuarantorPhoneNo,
  getGuarantorCNICNO,
  storeCustomerid,
  storeCNICCustomer,
  storeCustomerPicture,
  storeCustomerBill,
  storeguarantorPicture,
  storeCNICguarantor,
  storeGuarantorBill,
  storeProduct,
  storeProductQuantity,
  storeProductName,
  storeDateList,
  storeDownPayment,
  storeMonthlyPayment,
  storeTotalAmount,
  storeFinalProductPrice,
  storeProductBrand,
  storeProductModel,
  storeCustomerName,
  storeCustomerEmail,
  storeCustomerPhoneNo,
  storeCustomerAddress,
  storeCustomerCNICNO,
  storeGuarantorName,
  storeGuarantorEmail,
  storeGuarantorPhoneNo,
  storeGuarantorCNICNO,
  storeInterestRate,
};
