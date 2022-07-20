const db = require("../models/index");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const paidAmount = (productMonthlyInstallment) => {
  console.log("we in paidAmount", productMonthlyInstallment);
  let paidAmount = 0;
  for (let index = 0; index < productMonthlyInstallment.length; index++) {
    if (productMonthlyInstallment[index].status === "Paid") {
      console.log("productMonthly", productMonthlyInstallment[index].status);
      paidAmount += productMonthlyInstallment[index].payedAmount;
    }
  }
  return paidAmount;
};
const amountRemaining = (amount, productMonthlyInstallment) => {
  console.log({ amount });
  let remainingamount = amount;
  console.log({ remainingamount });
  if (productMonthlyInstallment.length > 0) {
    console.log({ productMonthlyInstallment });
    for (let index = 0; index < productMonthlyInstallment.length; index++) {
      // console.log("remainingamount",remainingamount,"productMonthlyInstallment",productMonthlyInstallment[index].payedAmount)
      remainingamount =
        remainingamount -
        (productMonthlyInstallment[index].payedAmount
          ? productMonthlyInstallment[index].payedAmount
          : 0);
    }
    console.log({ remainingamount });
    return remainingamount < 0 ? "Completed" : remainingamount;
  }
};

function getCurrentTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + "" + ampm;
  return strTime;
}

const emailforNotification =(installmentDetails,customerDetails)=>{
  let installmentAmount;
  for (let index = 0; index < installmentDetails.productMonthlyInstallment.length-1; index++) {
    if(installmentDetails.productMonthlyInstallment[index].status==="Pending"){
      console.log()
      installmentAmount=installmentDetails.productMonthlyInstallment[index].montlyInstallment
      break;
    }
  }
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
    subject: "Your Installment Due ",
     html:`<!DOCTYPE html
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
                                     Due Date Notification</br>
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
   
                                                 You have your due date
                                                 today.
                                                 <br /><br />
                                                 Kindly Pay Your Monthly
                                                 Installment Of Rupees
                                                 ${installmentAmount}
   
                                                 <br /><br />
                                                 Your
                                                 Total Remaining
                                                 Amount
                                                 Is
                                                 ${amountRemaining(installmentDetails.installmentAmount,
                                                  installmentDetails.productMonthlyInstallment)}
                                                 .
   
   
   
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
   
   </html>`}
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const emailforLedger = (
  customerDetails,
  installmentDetails,
  productDetails
) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kistt.ease@gmail.com",
      pass: process.env.authpassword,
    },
  });
  const container = installmentDetails.productMonthlyInstallment.map(
    (item) => {
      return`<tr> 
      <td>${item.date}</td>
      <td>${
        item?.payDate
          ? item.payDate
          : "Not Paid"
      }</td>
      <td>${
        item?.payedAmount
          ? "Rs"+item.payedAmount
          : "Pending"
      }</td>
      <td>${item?.status}</td>
      </tr>
      `;
    }
  )
  var mailOptions = {
    from: "kistt.ease@gmail.com",
    to: customerDetails.customerEmail,
    subject: "Invoice of Installment",
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
  
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
  
      th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
  
      }
  
      tr:nth-child(even) {
        background-color: #dddddd;
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
                                    Thank You</br>
                                    <em>For Your Purchase</em>
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
                                                ${customerDetails.customerName}
                                                <br /><br />
  
                                                <strong>CNIC /
                                                  NTN</strong>
                                                <br />
                                                ${customerDetails.CNICNO}
                                                <br /><br />
  
                                                <strong>Phone
                                                  Number</strong>
                                                <br />
                                                ${
                                                  customerDetails.customerPhoneNo
                                                }
                                                Number
                                                <br /><br />
  
                                                <strong>Address</strong>
                                                <br />
                                                ${
                                                  customerDetails.customerAddress
                                                }
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
  
  
  
                                            </td>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                          </tr>
                                        </table>
  
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          bgcolor="#f4f4f4">
                                          <tr>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                            <td>
  
  
                                              <div class="text-1"
                                                style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                <strong>Guarantor
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
                                                ${customerDetails.guarantorName}
                                                <br /><br />
  
                                                <strong>CNIC</strong>
                                                <br />
                                                ${
                                                  customerDetails.guarantorCNICNO
                                                }
                                                <br /><br />
  
                                                <strong>Phone</strong>
                                                <br />
                                                ${
                                                  customerDetails.guarantorPhoneNo
                                                }
                                                <br /><br />
  
                                                <strong>Email</strong>
                                                <br />
                                                ${
                                                  customerDetails.guarantorEmail
                                                }
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
                                                <strong>Product
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
                                                ${
                                                  productDetails.Product
                                                    .productName
                                                }
                                                <br /><br />
  
                                                <strong>Make Year</strong>
                                                <br />
                                                ${productDetails.makeYear}
                                                <br /><br />
  
                                                <strong>Model Name</strong>
                                                <br />
                                                ${
                                                  productDetails.Model.modelName
                                                }
                                                <br /><br />
  
                                                <strong>Quantity</strong>
                                                <br />
                                                ${
                                                  installmentDetails.productQuantity
                                                }
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
  
  
  
                                            </td>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                          </tr>
                                        </table>
                                        <!--  -->
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          bgcolor="#f4f4f4">
                                          <tr>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                            <td>
  
  
                                              <div class="text-1"
                                                style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                <strong>Finances</strong>
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
                                                <strong>Price</strong>
                                                <br />
                                                Product Price X QTY = Price
                                                <br /> ${
                                                  installmentDetails.productPrice
                                                }X${
      installmentDetails.productQuantity
    }=${
      installmentDetails.productPrice * installmentDetails.productQuantity
    }<br />
  
                                                <strong>Interest
                                                  Rate</strong>
                                                <br />
                                                ${
                                                  installmentDetails.interestRate
                                                }%
                                                <br /><br />
  
                                                <strong>Down
                                                  Payment</strong>
                                                <br />
                                                ${
                                                  installmentDetails.downPayment
                                                }
                                                <br /><br />
  
                                                <strong>Total</strong>
                                                <br />
                                                ${
                                                  installmentDetails.installmentAmount
                                                }
                                                <br />
                                                <br />
  
                                                <strong>Duration</strong>
                                                <br />
                                                ${
                                                  installmentDetails
                                                    .productMonthlyInstallment
                                                    .length
                                                }<br /><br />
  
                                                <strong>Monthly
                                                  Installment</strong>
                                                <br />
                                                ${
                                                  installmentDetails
                                                    .productMonthlyInstallment[0]
                                                    .montlyInstallment
                                                }
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
                              </tr>
                            </table>
                            <!--  -->
                            <!--  -->
                    
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              bgcolor="#f4f4f4">
                              <tr>
                                <td class="content-spacing"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="20"></td>
  
                                  
                                <td>
  
  
                                  <div class="text-1"
                                    style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                    <strong>Previous History</strong>
                                  </div>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="10" class="spacer"
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
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              bgcolor="#fafafa">
                              <tr>
                                <td class="content-spacing"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="20"></td>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="10" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
                                  <div class="text"
                                    style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                    <table>
                                      <tr>
                                        <th>Due Date</th>
                                        <th>Payment Date</th>
                                        <th>Received Ammount</th>
                                        <th>Status</th>
                                      </tr>
                                      ${container}
                                    </table>
  
                                  </div>
  
  
  
                                  <!--  -->
  
  
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td style="border-bottom: 1px solid #f4f4f4;"
                                        class="content-spacing"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        width="20"></td>
                                      <td style="border-bottom: 1px solid #f4f4f4;"
                                        width="225">
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          class="spacer"
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
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="10" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
  
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td class="img"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        height="1" bgcolor="#d2973b">&nbsp;</td>
                                    </tr>
                                  </table>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0" class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="15" class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
  
  
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td align="right">
                                        <table border="0" cellspacing="0"
                                          cellpadding="0">
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
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="20">
                                </td>
                              </tr>
                            </table>
                            <!-- END Body -->
  
                            <!-- Foot -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              bgcolor="#d2973b">
                              <tr>
                                <td>
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td class="img"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        width="3" bgcolor="#e6ae57"></td>
                                      <td>
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          class="spacer"
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
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          class="spacer"
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
                                  <table width="100%" border="0" cellspacing="0"
                                    cellpadding="0">
                                    <tr>
                                      <td class="img"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        width="27"><img
                                          src="https://d1pgqke3goo8l6.cloudfront.net/nK8bYazcQWGAQt8sAH2g_bot_left.jpg"
                                          border="0" width="27" height="27"
                                          alt="" /></td>
                                      <td>
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          class="spacer"
                                          style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                          <tr>
                                            <td height="24" class="spacer"
                                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                              &nbsp;</td>
                                          </tr>
                                        </table>
  
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td class="img"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              height="3" bgcolor="#e6ae57">
                                              &nbsp;</td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td class="img"
                                        style="font-size:0pt; line-height:0pt; text-align:left"
                                        width="27"><img
                                          src="https://d1pgqke3goo8l6.cloudfront.net/v9RanaDRM2FzjQNT9PwV_bot_right.jpg"
                                          border="0" width="27" height="27"
                                          alt="" /></td>
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
                          <td class="content-spacing"
                            style="font-size:0pt; line-height:0pt; text-align:left" width="20">
                          </td>
                          <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              class="spacer"
                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                              <tr>
                                <td height="30" class="spacer"
                                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                  &nbsp;</td>
                              </tr>
                            </table>
  
  
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                              class="spacer"
                              style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                              <tr>
                                <td height="30" class="spacer"
                                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                  &nbsp;</td>
                              </tr>
                            </table>
  
                          </td>
                          <td class="content-spacing"
                            style="font-size:0pt; line-height:0pt; text-align:left" width="20">
                          </td>
                        </tr>
                      </table>
                      <!-- END Footer -->
                    </td>
                  </tr>
                </table>
                <div class="wgmail" style="font-size:0pt; line-height:0pt; text-align:center"><img
                    src="https://d1pgqke3goo8l6.cloudfront.net/oD2XPM6QQiajFKLdePkw_gmail_fix.gif"
                    width="600" height="1" style="min-width:600px" alt="" border="0" /></div>
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
const mailInstallmentDetails = (
  installmentDetails,
  customerDetails,
  productDetails
) => {
  console.log({ installmentDetails, customerDetails, productDetails });
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
    subject: "Recipet For Installment",
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
                                    Thank You</br>
                                    <em>For Your Purchase</em>
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
                                  // <div class="h3-2-center"
                                  //   style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">
                                  //   ${customerDetails.customerName}
                                  // </div>
                                  
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
                                                ${customerDetails.customerName}
                                                  <br /><br />
  
                                                  <strong>CNIC /
                                                    NTN</strong>
                                                  <br />
                                                  ${customerDetails.CNICNO}
                                                    <br /><br />
  
                                                    <strong>Phone
                                                      Number</strong>
                                                    <br />
                                                    ${
                                                      customerDetails.customerPhoneNo
                                                    }
                                                      Number
                                                      <br /><br />
  
                                                      <strong>Address</strong>
                                                      <br />
                                                      ${
                                                        customerDetails.customerAddress
                                                      }
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
  
  
  
                                            </td>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                          </tr>
                                        </table>
  
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          bgcolor="#f4f4f4">
                                          <tr>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                            <td>
  
  
                                              <div class="text-1"
                                                style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                <strong>Guarantor
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
                                                ${customerDetails.guarantorName}
                                                <br /><br />
  
                                                <strong>CNIC</strong>
                                                <br />
                                                ${
                                                  customerDetails.guarantorCNICNO
                                                }
                                                <br /><br />
  
                                                <strong>Phone</strong>
                                                <br />
                                                ${
                                                  customerDetails.guarantorPhoneNo
                                                }
                                                <br /><br />
  
                                                <strong>Email</strong>
                                                <br />
                                                ${
                                                  customerDetails.guarantorEmail
                                                }
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
                                                <strong>Product
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
                                                ${
                                                  productDetails.Product
                                                    .productName
                                                }
                                                  <br /><br />
  
                                                  <strong>Make Year</strong>
                                                  <br />
                                                  ${productDetails.makeYear}
                                                    <br /><br />
  
                                                    <strong>Model Name</strong>
                                                    <br />
                                                    ${
                                                      productDetails.Model
                                                        .modelName
                                                    }
                                                      <br /><br />
  
                                                      <strong>Quantity</strong>
                                                      <br />
                                                      ${
                                                        installmentDetails.productQuantity
                                                      }
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
  
  
  
                                            </td>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                          </tr>
                                        </table>
  
                                        <table width="100%" border="0"
                                          cellspacing="0" cellpadding="0"
                                          bgcolor="#f4f4f4">
                                          <tr>
                                            <td class="content-spacing"
                                              style="font-size:0pt; line-height:0pt; text-align:left"
                                              width="20"></td>
                                            <td>
  
  
                                              <div class="text-1"
                                                style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                <strong>Finances</strong>
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
                                                <strong>Price</strong>
                                                <br />
                                                Product Price X QTY = Price
                                                <br />
                                                ${
                                                  installmentDetails.productPrice
                                                }X${
      installmentDetails.productQuantity
    }=${installmentDetails.productPrice * installmentDetails.productQuantity}
                                                <br />
  
                                                <strong>Interest Rate</strong>
                                                <br />
                                                ${
                                                  installmentDetails.interestRate
                                                }%
                                                <br /><br />
  
                                                <strong>Down Payment</strong>
                                                <br />
                                                ${
                                                  installmentDetails.downPayment
                                                }
                                                <br /><br />
  
                                                <strong>Total</strong>
                                                <br />
                                                ${
                                                  installmentDetails.installmentAmount
                                                }
                                                <br /><br />
  
                                                <strong>Duration</strong>
                                                <br />
                                                ${
                                                  installmentDetails
                                                    .productMonthlyInstallment
                                                    .length
                                                }
                                                <br /><br />
  
                                                <strong>Monthly Installment</strong>
                                                <br />
                                                ${
                                                  installmentDetails
                                                    .productMonthlyInstallment[0]
                                                    .montlyInstallment
                                                }
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
const mailInstallmentUpdate = (
  installmentDetails,
  customerDetails,
  productDetails,
  amountPayed,
  today
) => {
  console.log("In MailInstallmentUpdate", {
    installmentDetails,
    customerDetails,
    productDetails,
  });
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
    subject: "Recipet For Installment",
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
                                    Installment Updation</br>
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
                                                
                                                You had purchased ${
                                                  productDetails.Product
                                                    .productName
                                                }, ${
      productDetails.Model.modelName
    }, ${productDetails.Brand.brandName} on ${
      installmentDetails.installmentStartDate
    } at ${installmentDetails.interestRate}% with the total of ${
      installmentDetails.installmentAmount
    } .
                                                                                              <br/><br/>
                                                                                              We have received the ammount of ${amountPayed} On ${today} at ${getCurrentTime()}
                                                                                              <br/><br/>
                                                                                              You Have Paid Ammount Of ${paidAmount(
                                                                                                installmentDetails.productMonthlyInstallment
                                                                                              )} Till Now.
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
async function findInstallment(seller_id, customer_id) {
  console.log("We in Find Customer ", { customer_id, seller_id });
  // const getcustomer = await db.customerdetails.find({ _id: customer_id });
  // console.log("customer_id:", getcustomer[0]._id);
  const installmentDetails = await db.installmentdetails.find({
    seller_id: mongoose.Types.ObjectId(seller_id),
    customer_id: customer_id,
    installmentStatus: "NotComplete",
  });
  console.log("installmentId in findCustomer:", { installmentDetails });
  if (installmentDetails) {
    return installmentDetails[0];
  } else {
    return null;
  }
}
exports.getUserMonthlyInstallment = async (req, res) => {
  let { customer_id, seller_id } = req.body;
  console.log(req.body);
  if (customer_id !== "" && seller_id !== "") {
    const installmentId = await findInstallment(seller_id, customer_id);
    if (installmentId !== null && installmentId !== undefined) {
      console.log(installmentId._id);
      const result = await db.installmentdetails.aggregate([
        { $match: { _id: installmentId._id } },
        { $unwind: "$productMonthlyInstallment" },
        { $match: { "productMonthlyInstallment.status": { $eq: "Pending" } } },
        {
          $group: {
            _id: { id: "$_id" },
            productMonthlyInstallment: {
              $first: "$productMonthlyInstallment",
            },
          },
        },
      ]);
      if (result) {
        console.log("getUserMonthly Installment", result[0]);
        console.log("Status of Installment", installmentId.installmentStatus);
        res.status(200).json({
          message: "Request was Successful",
          result: result[0].productMonthlyInstallment.montlyInstallment,
          status: installmentId.installmentStatus,
        });
      } else {
        console.log("Unsuccessful");
        res.status(500).json({ message: "Unsuccessful", result: result });
      }
    } else {
      console.log("Customer Was Not found");
    }
  }
};
//insert customer Installment
exports.insert_installment = async (req, res) => {
  console.log(req.body);
  const today_date = new Date();
  const year = today_date.getFullYear();
  let month = today_date.getMonth() + 1;
  let day = today_date.getDate();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  const today = day + "/" + month + "/" + year;
  let {
    customer_id,
    seller_id,
    product_id,
    makeYear_id,
    productPrice,
    productMonthlyInstallment,
    installmentAmount,
    productQuantity,
    downPayment,
    interestRate,
  } = req.body;

  console.table({
    customer_id,
    seller_id,
    product_id,
    productPrice,
    productMonthlyInstallment,
    interestRate,
  });
  const getcustomer = await db.customerdetails.find({
    _id: mongoose.Types.ObjectId(customer_id),
  });
  console.log({ getcustomer });
  const getProductDetails = await db.makeyeardetails.aggregate([
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
  console.log({ getProductDetails });
  const result = await db.makeyeardetails
    .find({ _id: makeYear_id })
    .select("productQuantity");
  console.log({ result });
  console.log({ productQuantity });
  let newProductQuantity = result[0].productQuantity - productQuantity;
  console.log({ newProductQuantity });
  await db.makeyeardetails
    .findOneAndUpdate(
      { _id: makeYear_id },
      {
        $set: {
          productQuantity: newProductQuantity,
        },
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  let installment = new db.installmentdetails({
    seller_id,
    product_id,
    customer_id,
    productPrice,
    productMonthlyInstallment,
    installmentAmount,
    interestRate,
    installmentStartDate: today,
    downPayment,
    productQuantity: productQuantity,
    installmentStatus: "NotComplete",
  });
  installment
    .save()
    .then(async (result) => {
      console.log("saved to MongoDB Atlas>>", result);
      await mailInstallmentDetails(
        result,
        getcustomer[0],
        getProductDetails[0]
      );
      return res.status(201).json({ message: "User registerd Successfully" });
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json({ message: "Failed to register" });
    });
};
exports.set_installment = async (req, res) => {
  console.log(req.body);
  let { seller_id, array, productPrice } = req.body;
  const getrecent_installment = await db.installmentdetails.find({
    seller_id: mongoose.Types.ObjectId(seller_id),
  });
  const gotrecent_installment = getrecent_installment.reverse();
  db.installmentdetails
    .findByIdAndUpdate(
      { _id: gotrecent_installment[0]._id },
      {
        $push: {
          productMonthlyInstallment: array,
        },
        $set: { productPrice: productPrice },
      }
    )
    .then((result) => {
      console.log("update", { result });
      return res
        .status(204)
        .json({ message: "Updated Installment Successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Update Unsuccessfull" });
    });
};
exports.get_installmentProduct = async (req, res) => {
  console.log(req.body);
  let { seller_id } = req.body;
  let product_id, productResult;
  await db.installmentdetails
    .find({ seller_id: mongoose.Types.ObjectId(seller_id) })
    .then((result) => {
      console.log(result);
      product_id = getProductId = result[result.length - 1].product_id;
      console.log({ product_id });
    })
    .catch((err) => {
      console.log(err);
    });
  await db.productsdetails
    .find({ _id: product_id })
    .then((result) => {
      console.log({ result });
      productResult = result[0];
    })
    .catch((err) => {
      console.log({ err });
    });
  if (productResult) {
    return res.status(200).json({ productResult: productResult });
  } else {
    return res.status(500).json({ message: "Request Unsuccessful" });
  }
};
exports.get_installmentInformation = async (req, res) => {
  console.log(req.body);
  let { seller_id } = req.body;
  let getCustomerId,
    getProductId,
    customerResult,
    guarantorResult,
    productResult,
    installmentResult;
  await db.installmentdetails
    .find({ seller_id: mongoose.Types.ObjectId(seller_id) })
    .then((result) => {
      getCustomerId = result[result.length - 1].customer_id;
      getProductId = result[result.length - 1].product_id;
      installmentResult = result[result.length - 1];
      console.log({ getCustomerId, getProductId, installmentResult });
    })
    .catch((err) => {
      console.log({ err });
    });
  await db.customerdetails
    .find({ _id: mongoose.Types.ObjectId(getCustomerId) })
    .then((result) => {
      customerResult = result;
      console.log({ customerResult });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log({ getCustomerId, seller_id });
  await db.guarantordetails
    .find({
      customer_id: mongoose.Types.ObjectId(getCustomerId),
      seller_id: mongoose.Types.ObjectId(seller_id),
    })
    .then((result) => {
      guarantorResult = result;
      console.log({ guarantorResult });
    })
    .catch((err) => {
      console.log(err);
    });
  await db.productsdetails
    .find({ _id: mongoose.Types.ObjectId(getProductId) })
    .then((result) => {
      productResult = result;
      console.log({ productResult });
    })
    .catch((err) => {
      console.log(err);
    });
  if (
    customerResult !== undefined &&
    guarantorResult !== undefined &&
    productResult !== undefined
  ) {
    console.log({ installmentResult });
    return res.status(200).json({
      message: "Request Successful",
      customerResult: customerResult,
      guarantorResult: guarantorResult,
      productResult: productResult,
      installmentResult: installmentResult,
      productMonthlyInstallment:
        installmentResult.productMonthlyInstallment[0].montlyInstallment,
    });
  } else {
    return res.status(500).json({ message: "There are some errors" });
  }
};
//for update customer Installment
exports.updatePayment = async (req, res) => {
  const today_date = new Date();
  const year = today_date.getFullYear();
  let month = today_date.getMonth() + 1;
  let day = today_date.getDate();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  const today = day + "/" + month + "/" + year;
  let { customer_id, seller_id, amountPayed } = req.body;
  console.log("what is recieved:", req.body);
  const installmentId = await findInstallment(seller_id, customer_id);
  console.log(installmentId._id);
  // const getInstallment = await db.installmentdetails.find({
  //   _id: installmentId._id,
  // });
  if (installmentId !== null && installmentId !== undefined) {
    const result = await db.installmentdetails.aggregate([
      { $match: { _id: installmentId._id } },
      { $unwind: "$productMonthlyInstallment" },
      { $match: { "productMonthlyInstallment.status": { $eq: "Pending" } } },
      {
        $group: {
          _id: { id: "$_id" },
          productMonthlyInstallment: {
            $first: "$productMonthlyInstallment",
          },
        },
      },
    ]);
    console.log("return Result", result[0]);
    const returnResult = result[0].productMonthlyInstallment;
    console.log("return Result", { returnResult });
    const productMonthlyInstallment =
      result[0].productMonthlyInstallment.montlyInstallment;
    console.log({ productMonthlyInstallment });
    console.log("parseFloat(amountPayed):", parseFloat(amountPayed));
    if (productMonthlyInstallment <= parseFloat(amountPayed)) {
      console.log("we are in the if");
      const productMonthlyInstallment_obj_id =
        result[0].productMonthlyInstallment._id;
      const updatedPayment = await db.installmentdetails.findOneAndUpdate(
        { "productMonthlyInstallment._id": productMonthlyInstallment_obj_id },
        {
          $set: {
            "productMonthlyInstallment.$.status": "Paid",
            "productMonthlyInstallment.$.payedAmount": amountPayed,
            "productMonthlyInstallment.$.payDate": today,
          },
        },
        {
          returnDocument: "after",
        }
      );
      console.log({ updatedPayment });
      const getcustomer = await db.customerdetails.find({
        _id: mongoose.Types.ObjectId(updatedPayment.customer_id),
      });
      console.log({ getcustomer });
      const getProductDetails = await db.makeyeardetails.aggregate([
        {
          $match: {
            product_id: mongoose.Types.ObjectId(updatedPayment.product_id),
          },
        },
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
      await mailInstallmentUpdate(
        updatedPayment,
        getcustomer[0],
        getProductDetails[0],
        amountPayed,
        today
      );
      if (parseFloat(amountPayed) >= installmentId.installmentAmount) {
        console.log("we are here at update ");
        await db.installmentdetails
          .findByIdAndUpdate(
            { _id: getInstallment[0]._id },
            { $set: { installmentStatus: "Complete" } }
          )
          .then((result) => {
            console.log("We are at update Payment", { result });
            return res
              .status(200)
              .json({ message: "successful in updating status" });
          })
          .catch((err) => {
            return res
              .status(500)
              .json({ message: "Request Was Unsuccessful" });
          });
      } else {
        return res
          .status(200)
          .json({ preresult: result, result: updatedPayment });
      }
    } else {
      console.log("No result");
      return res.status(500).send("No result");
    }
  }
};
exports.get_installment_for_Customer = async (req, res) => {
  // console.log(req.body);
  const seller_id = mongoose.Types.ObjectId(req.body.seller_id);
  const customer_id = mongoose.Types.ObjectId(req.body.customer_id);
  const product_id = mongoose.Types.ObjectId(req.body.product_id);
  // db.installmentdetails.find({seller_id:seller_id,customer_id:customer_id})
  // .then(result=>{
  //   return res.status(200).json({message:"Successful",result:result})
  // })
  // .catch(err=>{
  //   return res.status(500).json({message:"Unsuccessful"})
  // })
  const result = await db.installmentdetails.aggregate([
    {
      $match: {
        seller_id: seller_id,
        customer_id: customer_id,
      },
    },
    {
      $lookup: {
        from: "productsdetails",
        localField: "product_id",
        foreignField: "_id",
        as: "Products",
      },
    },
    { $unwind: "$Products" },
    {
      $project: {
        "Products.productName": 1,
        _id: 1,
        seller_id: 1,
        product_id: 1,
        customer_id: 1,
        productPrice: 1,
        installmentAmount: 1,
        downPayment: 1,
        installmentStartDate: 1,
        productMonthlyInstallment: 1,
      },
    },
  ]);
  if (result) {
    console.log(result);
    res.status(200).json({ message: "Successful", result: result });
  } else {
    res.status(500).json({ message: "Unsuccessful" });
  }
};
function setTheIncome(installment) {
  // let monthlyIncome = [];
  // for (let i = 0; i < installment.length; i++) {
  //   for (let j = 0; j < installment[i].productMonthlyInstallment.length; j++) {
  //     if (installment[i].productMonthlyInstallment[j].status === "Paid") {
  //       monthlyIncome.push({
  //         date: installment[i].productMonthlyInstallment[j].date,
  //         payment: installment[i].productMonthlyInstallment[j].payedAmount,
  //         installmentAmount:installment[i].installmentAmount
  //       });
  //     }
  //   }
  // }
  // console.log("monthlyIncome,",monthlyIncome)
  // return `MontlyIncome:${monthlyIncome}`
  // let date="10/08/2022"
  // // console.log(typeof(date.split("/")[1]))
  installment_2 = [
    {
      productPrice: 1359998,
      installmentAmount: 1360010,
      installmentStartDate: "08/06/2022",
      downPayment: 59998,
      productQuantity: 2,
      interestRate: "12",
      installmentStatus: "NotComplete",
      productMonthlyInstallment: [
        {
          date: "08/07/2022",
          montlyInstallment: 130001.2,
          status: "Paid",
          payDate: "08/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/08/2022",
          montlyInstallment: 130001.2,
          status: "Paid",
          payDate: "10/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/09/2022",
          montlyInstallment: 130001.2,
          status: "Paid",
          payDate: "16/06/2022",
          payedAmount: 800000,
        },
      ],
      __v: 0,
    },
    {
      productPrice: 679999,
      installmentAmount: 680003,
      installmentStartDate: "10/06/2022",
      downPayment: 1000,
      productQuantity: 1,
      interestRate: "4",
      installmentStatus: "NotComplete",
      productMonthlyInstallment: [
        {
          date: "08/07/2022",
          montlyInstallment: 130001.2,
          status: "Paid",
          payDate: "08/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/08/2022",
          montlyInstallment: 130001.2,
          status: "Paid",

          payDate: "10/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/09/2022",
          montlyInstallment: 130001.2,
          status: "Paid",

          payDate: "16/06/2022",
          payedAmount: 800000,
        },
      ],
      __v: 0,
    },
    {
      productPrice: 1359998,
      installmentAmount: 1360002,
      installmentStartDate: "16/07/2022",
      downPayment: 2000,
      productQuantity: 2,
      interestRate: "4",
      installmentStatus: "NotComplete",
      productMonthlyInstallment: [
        {
          date: "08/07/2022",
          montlyInstallment: 130001.2,
          status: "Paid",

          payDate: "08/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/08/2022",
          montlyInstallment: 130001.2,
          status: "Paid",

          payDate: "10/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/09/2022",
          montlyInstallment: 130001.2,
          status: "Paid",
          payDate: "16/06/2022",
          payedAmount: 800000,
        },
      ],
      __v: 0,
    },
    {
      productPrice: 1359998,
      installmentAmount: 1360002,
      installmentStartDate: "16/08/2022",
      downPayment: 2000,
      productQuantity: 2,
      interestRate: "4",
      installmentStatus: "NotComplete",
      productMonthlyInstallment: [
        {
          date: "08/07/2022",
          montlyInstallment: 130001.2,
          status: "Paid",

          payDate: "08/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/08/2022",
          montlyInstallment: 130001.2,
          status: "Paid",

          payDate: "10/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/09/2022",
          montlyInstallment: 130001.2,
          status: "Paid",
          payDate: "16/06/2022",
          payedAmount: 800000,
        },
      ],
      __v: 0,
    },
    {
      productPrice: 1359998,
      installmentAmount: 1360002,
      installmentStartDate: "16/08/2022",
      downPayment: 2000,
      productQuantity: 2,
      interestRate: "4",
      installmentStatus: "NotComplete",
      productMonthlyInstallment: [
        {
          date: "08/07/2022",
          montlyInstallment: 130001.2,
          status: "Paid",

          payDate: "08/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/08/2022",
          montlyInstallment: 130001.2,
          status: "Paid",

          payDate: "10/06/2022",
          payedAmount: 130002,
        },
        {
          date: "08/09/2022",
          montlyInstallment: 130001.2,
          status: "Paid",
          payDate: "16/06/2022",
          payedAmount: 800000,
        },
      ],
      __v: 0,
    },
  ];
  let trigger = false;
  let reminder = 0;
  let data = [];
  // console.log("installment:",installment[0].productMonthlyInstallment)
  // console.log(data[1-1].date)
  for (let i = 0; i < installment.length; i++) {
    console.log("round:", i);
    if (data.length === 0) {
      data.push({
        date: installment[i].installmentStartDate.split("/")[1],
        montlyInstallment: [],
        installmentAmount: [],
        sales: 0,
      });
      console.log("first if:", data);
      // remainder=i
      trigger = false;
    } else if (
      installment[i - 1].installmentStartDate.split("/")[1] ===
      installment[i].installmentStartDate.split("/")[1]
    ) {
      // data.push({date:installment[i].installmentStartDate.split("/")[1],montlyInstallment:[]});
      console.log("else if:", { data });
      trigger = true;
      // reminder=i-1;
    } else {
      trigger = false;
      data.push({
        date: installment[i].installmentStartDate.split("/")[1],
        montlyInstallment: [],
        installmentAmount: [],
        sales: 0,
      });
      console.log("else:", data);
      reminder += 1;
    }
    console.log(
      "installmentproductMonthlyINstallment",
      installment_2[i].productMonthlyInstallment.length
    );
    for (let j = 0; j < installment[i].productMonthlyInstallment.length; j++) {
      console.log(
        "in second for loop",
        i,
        j,
        "reminder:",
        reminder,
        "trigger:",
        trigger
      );
      if (installment[i].productMonthlyInstallment[j].status === "Paid") {
        if (trigger) {
          data[reminder].montlyInstallment.push(
            installment[i].productMonthlyInstallment[j].payedAmount
          );
        } else {
          data[reminder].montlyInstallment.push(
            installment[i].productMonthlyInstallment[j].payedAmount
          );
        }
      }
    }
    data[reminder].sales += 1;
    data[reminder].installmentAmount.push(installment[i].installmentAmount);
  }
  console.log({ data });
  return data;
}
exports.get_monthly_income_Details = async (req, res) => {
  let { seller_id } = req.body;
  const installment = await db.installmentdetails.find({
    seller_id: seller_id,
  });
  console.log({ installment });
  let result = setTheIncome(installment);
  if (result) {
    res.status(200).json({ message: "Successful", result: result });
  } else {
    res.status(500).json({ message: "Unsuccessful" });
  }
};
exports.Send_Customer_Notification=async(req,res)=>{
  console.log(req.body);
  let { seller_id, customer_id } = req.body;
  const getMonthlyInstallment = await db.installmentdetails.findOne({seller_id:seller_id,customer_id:customer_id,installmentStatus:"NotComplete"})
  const getCustomerDetails = await db.customerdetails.findOne({_id:customer_id})
  console.log({getMonthlyInstallment})
  
  if(getMonthlyInstallment&&getCustomerDetails){
    emailforNotification(getMonthlyInstallment,getCustomerDetails)
    return res.status(200).json({message:"Successful"}) 
  }else{
    return res.status(500).json({message:"Unsuccessful"}) 
  }
}
exports.Send_Customer_Ledger_Details = async (req, res) => {
  console.log(req.body);
  let { seller_id, customer_id } = req.body;
  const customerDetails = await db.customerdetails.find({
    _id: customer_id,
    seller_id: seller_id,
  });
  const sellerDetails = await db.sellerdetails.find({ _id: seller_id });
  const installmentDetails = await db.installmentdetails.find({
    seller_id: seller_id,
    customer_id: customer_id,
  });
  const productDetails = await db.makeyeardetails.aggregate([
    {
      $match: {
        product_id: mongoose.Types.ObjectId(
          installmentDetails[installmentDetails.length - 1].product_id
        ),
      },
    },
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
  if (
    (sellerDetails[0],
    customerDetails[0],
    installmentDetails[installmentDetails.length - 1],
    productDetails[0])
  ) {
    await emailforLedger(
      customerDetails[0],
      installmentDetails[installmentDetails.length - 1],
      productDetails[0]
    );
    return res.status(200).json({ message: "Email sent Successful" });
  } else {
    return res.status(500).json({ message: "Email Is not sent" });
  }
};
/*
TODO LIST:
make a controller for getting every income seller has had from the customers
*/
