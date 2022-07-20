const db = require("../models/index");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { expression } = require("joi");
const paidAmount = (productMonthlyInstallment) => {
  console.log("we in paidAmount", productMonthlyInstallment);
  let paidAmount = 0;
  for (let index = 0; index < productMonthlyInstallment.length; index++) {
    if (productMonthlyInstallment[index].status === "Paid") {
      // console.log("productMonthly",productMonthlyInstallment[index].status);
      paidAmount += productMonthlyInstallment[index].payedAmount;
    }
  }
  return paidAmount;
};
const amountRemaining = (amount, productMonthlyInstallment) => {
  // console.log({amount})
  let remainingamount = amount;
  // console.log({remainingamount})
  if (productMonthlyInstallment.length > 0) {
    // console.log({productMonthlyInstallment})
    for (let index = 0; index < productMonthlyInstallment.length; index++) {
      // console.log("remainingamount",remainingamount,"productMonthlyInstallment",productMonthlyInstallment[index].payedAmount)
      remainingamount =
        remainingamount -
        (productMonthlyInstallment[index].payedAmount
          ? productMonthlyInstallment[index].payedAmount
          : 0);
    }
    // console.log({remainingamount})
    return remainingamount < 0 ? "Completed" : remainingamount;
  }
};
const mailCustomer = (details, password) => {
  console.log(details);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kistt.ease@gmail.com",
      pass: process.env.authpassword,
    },
  });

  var mailOptions = {
    from: "kistt.ease@gmail.com",
    to: details.emailAddress,
    subject: "New User Invitation",
    html: "",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const mailBanCustomer = (
  customerDetails,
  getSeller,
  getProduct,
  isDefaulter,
  installmentDetails
) => {
  console.log({
    customerDetails,
    getSeller,
    getProduct,
    isDefaulter,
    installmentDetails,
  });
  console.log(
    "installmentDetails Date Last",
    installmentDetails.productMonthlyInstallment[
      installmentDetails.productMonthlyInstallment.length - 1
    ].date
  );
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kistt.ease@gmail.com",
      pass: process.env.authpassword,
    },
  });

  var mailOptions = {
    from: "kistt.ease@gmail.com",
    to: customerDetails.customerEmail,
    subject: `Your Account Has Been ${isDefaulter ? "Banned" : "UnBanned"}`,
    html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
  
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  
    <style type="text/css" media="screen">
      /* Linked Styles */
      body {
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
        background: #1e1e1e;
        -webkit-text-size-adjust: none
      }
  
      a {
        color: #a88123;
        text-decoration: none
      }
  
      p {
        padding: 0 !important;
        margin: 0 !important
      }
  
      /* Mobile styles */
    </style>
    <style media="only screen and (max-device-width: 480px), only screen and (max-width: 480px)" type="text/css">
      @media only screen and (max-device-width: 480px),
      only screen and (max-width: 480px) {
        div[class='mobile-br-5'] {
          height: 5px !important;
        }
  
        div[class='mobile-br-10'] {
          height: 10px !important;
        }
  
        div[class='mobile-br-15'] {
          height: 15px !important;
        }
  
        div[class='mobile-br-20'] {
          height: 20px !important;
        }
  
        div[class='mobile-br-25'] {
          height: 25px !important;
        }
  
        div[class='mobile-br-30'] {
          height: 30px !important;
        }
  
        th[class='m-td'],
        td[class='m-td'],
        div[class='hide-for-mobile'],
        span[class='hide-for-mobile'] {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          font-size: 0 !important;
          line-height: 0 !important;
          min-height: 0 !important;
        }
  
        span[class='mobile-block'] {
          display: block !important;
        }
  
        div[class='wgmail'] img {
          min-width: 320px !important;
          width: 320px !important;
        }
  
        div[class='img-m-center'] {
          text-align: center !important;
        }
  
        div[class='fluid-img'] img,
        td[class='fluid-img'] img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
        }
  
        table[class='mobile-shell'] {
          width: 100% !important;
          min-width: 100% !important;
        }
  
        td[class='td'] {
          width: 100% !important;
          min-width: 100% !important;
        }
  
        table[class='center'] {
          margin: 0 auto;
        }
  
        td[class='column-top'],
        th[class='column-top'],
        td[class='column'],
        th[class='column'] {
          float: left !important;
          width: 100% !important;
          display: block !important;
        }
  
        td[class='content-spacing'] {
          width: 15px !important;
        }
  
        div[class='h2'] {
          font-size: 44px !important;
          line-height: 48px !important;
        }
      }
    </style>
  </head>
  
  <body class="body"
    style="padding:0 !important; margin:0 !important; display:block !important; background:#1e1e1e; -webkit-text-size-adjust:none">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#1e1e1e">
      <tr>
        <td align="center" valign="top">
  
  
          <table width="600" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
            <tr>
              <td class="td"
                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; width:600px; min-width:600px; Margin:0"
                width="600">
  
                <!-- Header -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left"
                      width="20"></td>
                    <td>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="30" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
                      <div class="img-center"
                        style="font-size:0pt; line-height:0pt; text-align:center"><a href="#"
                          target="_blank">
                          <!-- <img
              src="https://d1pgqke3goo8l6.cloudfront.net/3Bvp1prkTtGdFMgsCg6p_logo.jpg"
              border="0" width="203" height="27" alt="" /> -->
                        </a></div>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="30" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
  
  
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="20" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
                      </div>
                    </td>
                    <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left"
                      width="20"></td>
                  </tr>
                </table>
                <!-- END Header -->
  
                <!-- Main -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <!-- Head -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                        bgcolor="#d2973b">
                        <tr>
                          <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="27"><img
                                    src="https://d1pgqke3goo8l6.cloudfront.net/JJxrFRyVRr20CJD3pOx9_top_left.jpg"
                                    border="0" width="27" height="27" alt="" /></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td class="img"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        height="3" bgcolor="#e6ae57">&nbsp;</td>
                                    </tr>
                                  </table>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="24" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="27"><img
                                    src="https://d1pgqke3goo8l6.cloudfront.net/SNcoUN5kSfCDagqSBEZ4_top_right.jpg"
                                    border="0" width="27" height="27" alt="" /></td>
                              </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="3" bgcolor="#e6ae57"></td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="10"></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="15" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <div class="h2"
                                    style="color:#ffffff; font-family:Georgia, serif; min-width:auto !important; font-size:60px; line-height:64px; text-align:center">
                                    Customer Status Updation</br>
                                  </div>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="15" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <!-- Customer Name -->
                                  <div class="h3-2-center"
                                    style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">
                                    ${customerDetails.customerName}
                                  </div>
                                  
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="35" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
  
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="10"></td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="3" bgcolor="#e6ae57"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- END Head -->
  
                      <!-- Body -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                        bgcolor="#ffffff">
                        <tr>
                          <td class="content-spacing"
                            style="font-size:0pt; line-height:0pt; text-align:left" width="20">
                          </td>
                          <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              class="spacer"
                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                              <tr>
                                <td height="35" class="spacer"
                                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                  &nbsp;</td>
                              </tr>
                            </table>
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <th class="column-top"
                                  style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; Margin:0"
                                  valign="top" width="270">
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td>
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          bgcolor="#f4f4f4">
                                          <tr>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                            <td>
                                              <table width="100%" border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                                class="spacer"
                                                style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                <tr>
                                                  <td height="10"
                                                    class="spacer"
                                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                    &nbsp;</td>
                                                </tr>
                                              </table>
  
                                              <div class="text-1"
                                                style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                <strong>Customer
                                                  Details</strong>
                                              </div>
                                              <table width="100%" border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                                class="spacer"
                                                style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                <tr>
                                                  <td height="10"
                                                    class="spacer"
                                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                    &nbsp;</td>
                                                </tr>
                                              </table>
  
                                            </td>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                          </tr>
                                        </table>
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          bgcolor="#fafafa">
                                          <tr>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                            <td>
                                              <table width="100%" border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                                class="spacer"
                                                style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                <tr>
                                                  <td height="10"
                                                    class="spacer"
                                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                    &nbsp;</td>
                                                </tr>
                                              </table>
  
                                              <div class="text"
                                                style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                
                                                You are ${
                                                  isDefaulter
                                                    ? "Banned"
                                                    : "UnBanned"
                                                } by ${getSeller.shopName}.
                                                                                              <br/><br/>
                                                You had purchased ${
                                                  getProduct.Brand.brandName
                                                },${
      getProduct.Product.productName
    }, ${getProduct.Model.modelName}, ${getProduct.makeYear} on ${
      installmentDetails.installmentStartDate
    } at ${installmentDetails.interestRate}% Interest Rate with the total of ${
      installmentDetails.installmentAmount
    } .
                                                                                              <br/><br/>
                                                                                              We have not paid the dues of ${amountRemaining(
                                                                                                installmentDetails.installmentAmount,
                                                                                                installmentDetails.productMonthlyInstallment
                                                                                              )}
                                                                                              <br/><br/>
                                                                                              Kindly Pay Your Dues Othervise you wont be able to purchase next time.
                                                                                              <br /><br/>
                                                                                              Your Remaining Amount Is ${amountRemaining(
                                                                                                installmentDetails.installmentAmount,
                                                                                                installmentDetails.productMonthlyInstallment
                                                                                              )} & Expected Clearing Date is ${
      installmentDetails.productMonthlyInstallment[
        installmentDetails.productMonthlyInstallment.length - 1
      ].date
    }.
  
  
                                                  
                                              </div>
                                              <table width="100%" border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                                class="spacer"
                                                style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                <tr>
                                                  <td height="15"
                                                    class="spacer"
                                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                    &nbsp;</td>
                                                </tr>
                                              </table>
  
                                            </td>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </th>
                                <th class="column-top"
                                  style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; Margin:0"
                                  valign="top" width="20">
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td>
                                        <div style="font-size:0pt; line-height:0pt;"
                                          class="mobile-br-15"></div>
                                      </td>
                                    </tr>
                                  </table>
                                </th>
                                
                              </tr>
                            </table>
  
                            
  
  
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="border-bottom: 1px solid #f4f4f4;"
                                  class="content-spacing"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="20"></td>
                                <td style="border-bottom: 1px solid #f4f4f4;" width="225">
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="8" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
  
  
                                </td>
                                <td>&nbsp;</td>
                              </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              class="spacer"
                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                              <tr>
                                <td height="10" class="spacer"
                                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                  &nbsp;</td>
                              </tr>
                            </table>
  
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  height="1" bgcolor="#d2973b">&nbsp;</td>
                              </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              class="spacer"
                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                              <tr>
                                <td height="15" class="spacer"
                                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                  &nbsp;</td>
                              </tr>
                            </table>
  
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td align="right">
                                  <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td class="content-spacing"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        width="20"></td>
  
                                      <td>&nbsp;</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td class="content-spacing"
                            style="font-size:0pt; line-height:0pt; text-align:left" width="20">
                          </td>
                        </tr>
                      </table>
                      <!-- END Body -->
  
                      <!-- Foot -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                        bgcolor="#d2973b">
                        <tr>
                          <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="3" bgcolor="#e6ae57"></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="30" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <div class="h3-1-center"
                                    style="color:#1e1e1e; font-family:Georgia, serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center">
                                    <strong>Visit Our Website</strong>
                                    </br>
                                    <em>www.KistEase.com</em>
                                  </div>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="15" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="3" bgcolor="#e6ae57"></td>
                              </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="27"><img
                                    src="https://d1pgqke3goo8l6.cloudfront.net/nK8bYazcQWGAQt8sAH2g_bot_left.jpg"
                                    border="0" width="27" height="27" alt="" /></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="24" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td class="img"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        height="3" bgcolor="#e6ae57">&nbsp;</td>
                                    </tr>
                                  </table>
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="27"><img
                                    src="https://d1pgqke3goo8l6.cloudfront.net/v9RanaDRM2FzjQNT9PwV_bot_right.jpg"
                                    border="0" width="27" height="27" alt="" /></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- END Foot -->
                    </td>
                  </tr>
                </table>
                <!-- END Main -->
  
                <!-- Footer -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left"
                      width="20"></td>
                    <td>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="30" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
  
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="30" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
                    </td>
                    <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left"
                      width="20"></td>
                  </tr>
                </table>
                <!-- END Footer -->
              </td>
            </tr>
          </table>
          <div class="wgmail" style="font-size:0pt; line-height:0pt; text-align:center"><img
              src="https://d1pgqke3goo8l6.cloudfront.net/oD2XPM6QQiajFKLdePkw_gmail_fix.gif" width="600"
              height="1" style="min-width:600px" alt="" border="0" /></div>
        </td>
      </tr>
    </table>
  </body>
  
  </html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const mailUpdateCustomerDetails = (details) => {
  console.log("in mailjs", details);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kistt.ease@gmail.com",
      pass: process.env.authpassword,
    },
  });

  var mailOptions = {
    from: "kistt.ease@gmail.com",
    to: details.customerEmail,
    subject: "Customer Details Updated",
    html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
  
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  
    <style type="text/css" media="screen">
      /* Linked Styles */
      body {
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
        background: #1e1e1e;
        -webkit-text-size-adjust: none
      }
  
      a {
        color: #a88123;
        text-decoration: none
      }
  
      p {
        padding: 0 !important;
        margin: 0 !important
      }
  
      /* Mobile styles */
    </style>
    <style media="only screen and (max-device-width: 480px), only screen and (max-width: 480px)" type="text/css">
      @media only screen and (max-device-width: 480px),
      only screen and (max-width: 480px) {
        div[class='mobile-br-5'] {
          height: 5px !important;
        }
  
        div[class='mobile-br-10'] {
          height: 10px !important;
        }
  
        div[class='mobile-br-15'] {
          height: 15px !important;
        }
  
        div[class='mobile-br-20'] {
          height: 20px !important;
        }
  
        div[class='mobile-br-25'] {
          height: 25px !important;
        }
  
        div[class='mobile-br-30'] {
          height: 30px !important;
        }
  
        th[class='m-td'],
        td[class='m-td'],
        div[class='hide-for-mobile'],
        span[class='hide-for-mobile'] {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          font-size: 0 !important;
          line-height: 0 !important;
          min-height: 0 !important;
        }
  
        span[class='mobile-block'] {
          display: block !important;
        }
  
        div[class='wgmail'] img {
          min-width: 320px !important;
          width: 320px !important;
        }
  
        div[class='img-m-center'] {
          text-align: center !important;
        }
  
        div[class='fluid-img'] img,
        td[class='fluid-img'] img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
        }
  
        table[class='mobile-shell'] {
          width: 100% !important;
          min-width: 100% !important;
        }
  
        td[class='td'] {
          width: 100% !important;
          min-width: 100% !important;
        }
  
        table[class='center'] {
          margin: 0 auto;
        }
  
        td[class='column-top'],
        th[class='column-top'],
        td[class='column'],
        th[class='column'] {
          float: left !important;
          width: 100% !important;
          display: block !important;
        }
  
        td[class='content-spacing'] {
          width: 15px !important;
        }
  
        div[class='h2'] {
          font-size: 44px !important;
          line-height: 48px !important;
        }
      }
    </style>
  </head>
  
  <body class="body"
    style="padding:0 !important; margin:0 !important; display:block !important; background:#1e1e1e; -webkit-text-size-adjust:none">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#1e1e1e">
      <tr>
        <td align="center" valign="top">
  
  
          <table width="600" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
            <tr>
              <td class="td"
                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; width:600px; min-width:600px; Margin:0"
                width="600">
  
                <!-- Header -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left"
                      width="20"></td>
                    <td>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="30" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
                      <div class="img-center"
                        style="font-size:0pt; line-height:0pt; text-align:center"><a href="#"
                          target="_blank">
                          <!-- <img
                src="https://d1pgqke3goo8l6.cloudfront.net/3Bvp1prkTtGdFMgsCg6p_logo.jpg"
                border="0" width="203" height="27" alt="" /> -->
                        </a></div>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="30" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
  
  
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="20" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
                      </div>
                    </td>
                    <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left"
                      width="20"></td>
                  </tr>
                </table>
                <!-- END Header -->
  
                <!-- Main -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <!-- Head -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                        bgcolor="#d2973b">
                        <tr>
                          <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="27"><img
                                    src="https://d1pgqke3goo8l6.cloudfront.net/JJxrFRyVRr20CJD3pOx9_top_left.jpg"
                                    border="0" width="27" height="27" alt="" /></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td class="img"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        height="3" bgcolor="#e6ae57">&nbsp;</td>
                                    </tr>
                                  </table>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="24" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="27"><img
                                    src="https://d1pgqke3goo8l6.cloudfront.net/SNcoUN5kSfCDagqSBEZ4_top_right.jpg"
                                    border="0" width="27" height="27" alt="" /></td>
                              </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="3" bgcolor="#e6ae57"></td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="10"></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="15" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <div class="h2"
                                    style="color:#ffffff; font-family:Georgia, serif; min-width:auto !important; font-size:60px; line-height:64px; text-align:center">
                                    <em>Details Updated</em>
                                  </div>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="15" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <!-- Customer Name -->
                                  <div class="h3-2-center"
                                    style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">
                                    ${details.customerName}
                                  </div>
                                  
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="35" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
  
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="10"></td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="3" bgcolor="#e6ae57"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- END Head -->
  
                      <!-- Body -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                        bgcolor="#ffffff">
                        <tr>
                          <td class="content-spacing"
                            style="font-size:0pt; line-height:0pt; text-align:left" width="20">
                          </td>
                          <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              class="spacer"
                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                              <tr>
                                <td height="35" class="spacer"
                                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                  &nbsp;</td>
                              </tr>
                            </table>
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <th class="column-top"
                                  style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; Margin:0"
                                  valign="top" width="270">
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td>
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          bgcolor="#f4f4f4">
                                          <tr>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                            <td>
                                              <table width="100%" border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                                class="spacer"
                                                style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                <tr>
                                                  <td height="10"
                                                    class="spacer"
                                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                    &nbsp;</td>
                                                </tr>
                                              </table>
  
                                              <div class="text-1"
                                                style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                <strong>Customer
                                                  Details</strong>
                                              </div>
                                              <table width="100%" border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                                class="spacer"
                                                style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                <tr>
                                                  <td height="10"
                                                    class="spacer"
                                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                    &nbsp;</td>
                                                </tr>
                                              </table>
  
                                            </td>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                          </tr>
                                        </table>
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          bgcolor="#fafafa">
                                          <tr>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                            <td>
                                              <table width="100%" border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                                class="spacer"
                                                style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                <tr>
                                                  <td height="10"
                                                    class="spacer"
                                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                    &nbsp;</td>
                                                </tr>
                                              </table>
  
                                              <div class="text"
                                                style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                <strong>Name</strong>
                                                <br />
                                                ${details.customerName}
                                                  <br /><br />
  
                                                  <strong>CNIC</strong>
                                                  <br />
                                                  ${details.CNICNO}
                                                    <br /><br />
  
                                                    <strong>Phone
                                                      Number</strong>
                                                    <br />
                                                    ${details.customerPhoneNo}
                                                      <br /><br />
  
                                                      <strong>Email
                                                        Address</strong>
                                                      <br />
                                                      ${details.customerEmail}
                                                        <br /><br />
  
                                                        <strong>Address</strong>
                                                        <br />
                                                        ${details.customerAddress}
                                                          <br /><br />
                                              </div>
                                              <table width="100%" border="0"
                                                cellspacing="0"
                                                cellpadding="0"
                                                class="spacer"
                                                style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                <tr>
                                                  <td height="15"
                                                    class="spacer"
                                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                    &nbsp;</td>
                                                </tr>
                                              </table>
  
                                            </td>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </th>
                                <th class="column-top"
                                  style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; Margin:0"
                                  valign="top" width="20">
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td>
                                        <div style="font-size:0pt; line-height:0pt;"
                                          class="mobile-br-15"></div>
                                      </td>
                                    </tr>
                                  </table>
                                </th>
  
                              </tr>
                            </table>
  
  
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="border-bottom: 1px solid #f4f4f4;"
                                  class="content-spacing"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="20"></td>
                                <td style="border-bottom: 1px solid #f4f4f4;" width="225">
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="8" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
  
  
                                </td>
                                <td>&nbsp;</td>
                              </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              class="spacer"
                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                              <tr>
                                <td height="10" class="spacer"
                                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                  &nbsp;</td>
                              </tr>
                            </table>
  
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  height="1" bgcolor="#d2973b">&nbsp;</td>
                              </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              class="spacer"
                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                              <tr>
                                <td height="15" class="spacer"
                                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                  &nbsp;</td>
                              </tr>
                            </table>
  
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td align="right">
                                  <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td class="content-spacing"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        width="20"></td>
  
                                      <td>&nbsp;</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td class="content-spacing"
                            style="font-size:0pt; line-height:0pt; text-align:left" width="20">
                          </td>
                        </tr>
                      </table>
                      <!-- END Body -->
  
                      <!-- Foot -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                        bgcolor="#d2973b">
                        <tr>
                          <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="3" bgcolor="#e6ae57"></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="30" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <div class="h3-1-center"
                                    style="color:#1e1e1e; font-family:Georgia, serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center">
                                    <strong>Visit Our Website</strong>
                                    </br>
                                    <em>www.KistEase.com</em>
                                  </div>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="15" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="3" bgcolor="#e6ae57"></td>
                              </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="27"><img
                                    src="https://d1pgqke3goo8l6.cloudfront.net/nK8bYazcQWGAQt8sAH2g_bot_left.jpg"
                                    border="0" width="27" height="27" alt="" /></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="24" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td class="img"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        height="3" bgcolor="#e6ae57">&nbsp;</td>
                                    </tr>
                                  </table>
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="27"><img
                                    src="https://d1pgqke3goo8l6.cloudfront.net/v9RanaDRM2FzjQNT9PwV_bot_right.jpg"
                                    border="0" width="27" height="27" alt="" /></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- END Foot -->
                    </td>
                  </tr>
                </table>
                <!-- END Main -->
  
                <!-- Footer -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left"
                      width="20"></td>
                    <td>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="30" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
  
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer"
                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                        <tr>
                          <td height="30" class="spacer"
                            style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                            &nbsp;</td>
                        </tr>
                      </table>
  
                    </td>
                    <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left"
                      width="20"></td>
                  </tr>
                </table>
                <!-- END Footer -->
              </td>
            </tr>
          </table>
          <div class="wgmail" style="font-size:0pt; line-height:0pt; text-align:center"><img
              src="https://d1pgqke3goo8l6.cloudfront.net/oD2XPM6QQiajFKLdePkw_gmail_fix.gif" width="600"
              height="1" style="min-width:600px" alt="" border="0" /></div>
        </td>
      </tr>
    </table>
  </body>
  
  </html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
async function checkDefaulter(email) {
  const isDefaulter = await db.customerdetails
    .find({ customerEmail: email, isDefaulter: true })
    .select("isDefaulter");
  if (isDefaulter.length > 0) {
    if (isDefaulter[0].isDefaulter === true) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
exports.update_existing_Customer = async (req, res) => {
  let {
    seller_id,
    customer_id,
    customerName,
    customerEmail,
    customerPhoneNo,
    customerAddress,
    CNICNO,
    guarantorName,
    guarantorPhoneNo,
    guarantorCNICNO,
    guarantorEmail,
  } = req.body;
  console.log(seller_id,customer_id)
  await db.customerdetails
    .findOneAndUpdate(
      { seller_id: seller_id, _id: customer_id },
      {
        $set: {
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhoneNo: customerPhoneNo,
          customerAddress: customerAddress,
          CNICNO: CNICNO,
          guarantorName: guarantorName,
          guarantorPhoneNo: guarantorPhoneNo,
          guarantorCNICNO: guarantorCNICNO,
          guarantorEmail: guarantorEmail,
          customerPicture: req.files.customerPicture[0].filename,
          customerCNIC: req.files.customerCNIC[0].filename,
          customerUtilityBill: req.files.customerUtilityBill[0].filename,
          guarantorPicture: req.files.guarantorPicture[0].filename,
          guarantorCNIC: req.files.guarantorCNIC[0].filename,
        },
      }
    )
    .then((result) => {
      console.log({result})
      return res.status(200).json({ message: "Successful", result: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Successful", err: err });
    });
};
exports.register_Customer_Gurantor = async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  let {
    customerName,
    customerEmail,
    customerPhoneNo,
    customerAddress,
    CNICNO,
    guarantorName,
    guarantorPhoneNo,
    guarantorCNICNO,
    guarantorEmail,
    seller_id,
    product_id,
  } = req.body;
  console.log({ customerEmail });
  const isDefaulter = await checkDefaulter(customerEmail);
  if (isDefaulter === false) {
    let customerDetails = new db.customerdetails({
      customerName,
      customerEmail,
      customerPhoneNo,
      customerAddress,
      CNICNO,
      guarantorName,
      guarantorPhoneNo,
      guarantorCNICNO,
      guarantorEmail,
      customerPicture: req.files.customerPicture[0].filename,
      customerCNIC: req.files.customerCNIC[0].filename,
      customerUtilityBill: req.files.customerUtilityBill[0].filename,
      guarantorPicture: req.files.guarantorPicture[0].filename,
      guarantorCNIC: req.files.guarantorCNIC[0].filename,
      seller_id,
      isDefaulter: false,
    });
    customerDetails
      .save()
      .then((result) => {
        console.log("saved to MongoDB Atlas>>", result);
        return res
          .status(201)
          .json({ message: "User registerd Successfully", result: result });
      })
      .catch((err) => {
        console.log("we have error", err);
        return res.status(500).json({ message: "Failed to register" });
      });
  } else {
    res.status(500).send("Customer Is A Defaulter");
  }
};
exports.customerOTP = (req, res) => {
  console.log(req.body);
  let { email } = req.body;
  db.customerDetails
    .findOne({ customerEmail: email })
    .then((result) => {
      console.log(result);
      return res.status(200).json({ message: "Please Check Your Email ID" });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Email Does Not Exits" });
    });
  res.status(200).json({ message: "Ok" });
};
exports.makeDefaulter = async (req, res) => {
  let { customerDetails, isDefaulter, seller_id, product_id } = req.body;
  console.log("In the start", {
    customerDetails,
    isDefaulter,
    seller_id,
    product_id,
  });
  const installmentDetails = await db.installmentdetails.find({
    customer_id: customerDetails._id,
  });
  const getProduct = await db.makeyeardetails.aggregate([
    { $match: { product_id: mongoose.Types.ObjectId(product_id) } },
    {
      $lookup: {
        from: "modeldetails",
        localField: "model_id",
        foreignField: "_id",
        as: "Model",
      },
    },
    { $unwind: "$Model" },
    {
      $lookup: {
        from: "branddetails",
        localField: "Model.brand_id",
        foreignField: "_id",
        as: "Brand",
      },
    },
    { $unwind: "$Brand" },
    {
      $lookup: {
        from: "productsdetails",
        localField: "Brand.product_id",
        foreignField: "_id",
        as: "Product",
      },
    },
    { $unwind: "$Product" },
    {
      $project: {
        "Brand._id": 1,
        "Brand.brandName": 1,
        "Model._id": 1,
        "Model.modelName": 1,
        "Product.productName": 1,
        "Product._id": 1,
        _id: 1,
        brand_id: 1,
        model_id: 1,
        makeYear: 1,
        productQuantity: 1,
        productPrice: 1,
        productImage: 1,
      },
    },
  ]);
  const getSeller = await db.sellerdetails.find({ _id: seller_id });
  console.log({
    customerDetails,
    getSeller,
    getProduct,
    isDefaulter,
    installmentDetails,
  });
  db.customerdetails
    .findByIdAndUpdate(
      { _id: customerDetails._id },
      {
        $set: {
          isDefaulter: isDefaulter,
        },
      }
    )
    .then(async (result) => {
      await mailBanCustomer(
        customerDetails,
        getSeller[0],
        getProduct[0],
        isDefaulter,
        installmentDetails[0]
      );
      return res
        .status(200)
        .json({ message: "Action was successful", result: result });
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json({ error: err });
    });
};
exports.viewBlacklistedCustomers = (req, res) => {
  let { seller_id } = req.body;
  // db.customerdetails
  //   .find({ seller_id:seller_id,isDefaulter: isDefaulter })
  //   .then((result) => {
  //     return res
  //       .status(200)
  //       .json({ message: "Action was successful", result: result });
  //   })
  //   .catch((err) => {
  //     return res.status(500).json({ error: err });
  //   });

  db.customerdetails
    .aggregate([
      {
        $match: {
          seller_id: mongoose.Types.ObjectId(seller_id),
          isDefaulter: true,
        },
      },
      {
        $lookup: {
          from: "installmentdetails",
          localField: "_id",
          foreignField: "customer_id",
          as: "Installment",
        },
      },
      {
        $unwind: "$Installment",
      },
      {
        $lookup: {
          from: "productsdetails",
          localField: "Installment.product_id",
          foreignField: "_id",
          as: "Productsdetails",
        },
      },
    ])
    .then((result) => {
      console.log(result);
      return res.status(200).json({ message: "successful", result: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "failure" });
    });
};
exports.updateCustomer = (req, res) => {
  let {
    customer_id,
    customerName,
    customerCNICNO,
    customerEmail,
    customerPhoneNo,
    customerAddress,
  } = req.body;
  console.log(req.body);
  db.customerdetails
    .findOneAndUpdate(
      { _id: customer_id },
      {
        $set: {
          CNICNO: customerCNICNO,
          customerName: customerName,
          customerEmail: customerEmail,
          customerAddress: customerAddress,
          customerPhoneNo: customerPhoneNo,
        },
      },
      { returnDocument: "after" }
    )
    .then(async (result) => {
      console.log("Mongo Update>>>", { result });
      await mailUpdateCustomerDetails(result);
      return res
        .status(200)
        .json({ message: "Updated Successfully", result: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Error Has Occured" });
    });
};
exports.getCustomers = async (req, res) => {
  let { seller_id } = req.body;
  console.log("In get Customer", { seller_id });
  // const customer=await db.customerdetails
  //   .find({ seller_id: seller_id });
  //   // .then((result) => {
  //   //   console.log({ result });
  //   //   return res.status(200).json({ message: "Successful", result: result });
  //   // })
  //   // .catch((err) => {
  //   //   return res.status(500).json({ message: "Error Has Occured" });
  //   // });
  // const installment = await db.installmentdetails.find({customer_id:customer[0]._id})
  // if(customer&& installment){
  //     return res.status(200).json({ message: "Successful", customerResult: customer[0],installmentResult:installment[0] });
  // }else{
  //     return res.status(500).json({ message: "Error Has Occured" });
  // }
  await db.customerdetails
    .aggregate([
      { $match: { seller_id: mongoose.Types.ObjectId(seller_id) } },
      {
        $lookup: {
          from: "installmentdetails",
          localField: "_id",
          foreignField: "customer_id",
          as: "Installment",
        },
      },
    ])
    .then((result) => {
      console.log("result", { result });
      return res.status(200).json({ message: "Successful", result: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error Has Occured" });
    });
};
const makeCustomerADefaulter = async (customerDetails) => {
  console.log("We are at makeCustomerADefaulter");
  await db.customerdetails
    .updateOne({ _id: customerDetails._id }, { $set: { isDefaulter: true } })
    .then((result) => {
      console.log(result);
      return;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};
const filterCustomer = (array, duration) => {
  console.log({ array, duration });
  const today_date = new Date();
  const year = today_date.getFullYear();
  let month = today_date.getMonth() + 1;
  let day = today_date.getDate();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  const today = day + "/" + month + "/" + year;
  for (let i = 0; i < array.length; i++) {
    for (
      let j = 0;
      j < array[i].Installment.productMonthlyInstallment.length;
      j++
    ) {
      if (
        array[i].Installment.productMonthlyInstallment[j].status === "Pending"
      ) {
        // console.log("today", { today });
        // console.log(
        //   "array1",
        //   array[i].Installment.productMonthlyInstallment[j].date
        // );
        let dateString_today = today;
        let dateString_today_parts = dateString_today.split("/");
        let date1 = new Date(
          +dateString_today_parts[2],
          dateString_today_parts[1] - 1,
          +dateString_today_parts[0]
        );
        let dateString_DBdate =
          array[i].Installment.productMonthlyInstallment[j].date;
        let dateString_DBdate_parts = dateString_DBdate.split("/");
        let date2 = new Date(
          +dateString_DBdate_parts[2],
          dateString_DBdate_parts[1] - 1,
          +dateString_DBdate_parts[0]
        );
        console.log({ date1, date2 });
        let Difference_In_Time = date2.getTime() - date1.getTime();
        let Difference_In_Day = Difference_In_Time / (1000 * 3600 * 24);
        console.log({ Difference_In_Day });
        if (Difference_In_Day <= -duration && Difference_In_Day <= 0) {
          console.log("we are in the inner if");
          makeCustomerADefaulter(array[i]);
          break;
        }
      }
    }
  }
  return;
};
exports.setCustomerDefaulter = async (req, res) => {
  console.log(req.body);
  let { seller_id } = req.body;
  console.log({ seller_id });
  const getSeller = await db.sellerdetails.find({ _id: seller_id });
  console.log({ getSeller });
  if (getSeller[0].defaulterDuration) {
    const result = await db.customerdetails.aggregate([
      {
        $match: {
          seller_id: mongoose.Types.ObjectId(seller_id),
          isDefaulter: false,
        },
      },
      {
        $lookup: {
          from: "installmentdetails",
          localField: "_id",
          foreignField: "customer_id",
          as: "Installment",
        },
      },
      {
        $unwind: "$Installment",
      },
      {
        $lookup: {
          from: "productsdetails",
          localField: "Installment.product_id",
          foreignField: "_id",
          as: "Productsdetails",
        },
      },
    ]);
    // console.log({ result });
    await filterCustomer(result, getSeller[0].defaulterDuration);
    return res.status(200).json({ message: "Successful" });
  } else {
    return res.status(304).json({ message: "No Updates" });
  }
};
exports.getCustomerForNotification = (req, res) => {
  let { seller_id } = req.body;
  db.customerdetails
    .aggregate([
      {
        $match: {
          seller_id: mongoose.Types.ObjectId(seller_id),
          isDefaulter: false,
        },
      },
      {
        $lookup: {
          from: "installmentdetails",
          localField: "_id",
          foreignField: "customer_id",
          as: "Installment",
        },
      },
      {
        $unwind: "$Installment",
      },
      {
        $lookup: {
          from: "productsdetails",
          localField: "Installment.product_id",
          foreignField: "_id",
          as: "Productsdetails",
        },
      },
    ])
    .then((result) => {
      console.log(result);
      return res.status(200).json({ message: "successful", result: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "failure" });
    });
};
exports.getCustomer = async (req, res) => {
  console.log("customer:", req.body);
  let { customer_id } = req.body;
  console.log("Customer_Id", { customer_id });
  console.log("type of Customer", typeof customer_id);
  await db.customerdetails
    .find({ _id: mongoose.Types.ObjectId(customer_id) })
    .then((result) => {
      console.log({ result });
      return res.status(200).json({ message: "Successful", result: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Unsuccessful" });
    });
};
exports.getCustomerStatus = (req, res) => {
  let { customerCNIC } = req.body;
  console.log({ customerCNIC });
  db.customerdetails
    .aggregate([
      {
        $match: {
          CNICNO: customerCNIC,
        },
      },
      {
        $lookup: {
          from: "installmentdetails",
          localField: "_id",
          foreignField: "customer_id",
          as: "Installment",
        },
      },
    ])
    // .find({ CNICNO: customerCNIC })
    .then((result) => {
      console.log({ result });
      console.log(result[0].Installment[0]);
      return res
        .status(200)
        .json({
          message: "Successful",
          customer_id: result[0]._id,
          Status: result[0].isDefaulter,
          installment:
            result[0].Installment[result[0].Installment.length - 1]
              .installmentStatus,
        });
      // .json({ message: "Successful", Status: result[0]})
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Unsuccessful" });
    });
};
