const db = require("../models/index");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const mailforseller = (details, password) => {
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
    html: `	<!DOCTYPE html
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
											<em>Welcome</em>
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

<!-- Seller Name -->
										<div class="h3-2-center"
											style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">
											${details.shopName}
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

							<div class="h3-1-center"
								style="color:#1e1e1e; font-family:Georgia, serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center">
								We Are Glad You Have Joined KISTEASE
							</div>
							<table width="100%" border="0" cellspacing="0" cellpadding="0"
								class="spacer"
								style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
								<tr>
									<td height="20" class="spacer"
										style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
										&nbsp;</td>
								</tr>
							</table>


							<!-- Button -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td align="center">
										<table width="210" border="0" cellspacing="0"
											cellpadding="0">
											<tr>
												<td align="center" bgcolor="#d2973b">
													<table border="0" cellspacing="0"
														cellpadding="0">
														<tr>
															<td class="img"
																style="font-size:0pt; line-height:0pt; text-align:left"
																width="15">
																<table width="100%" border="0"
																	cellspacing="0"
																	cellpadding="0"
																	class="spacer"
																	style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
																	<tr>
																		<td height="50"
																			class="spacer"
																			style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
																			&nbsp;</td>
																	</tr>
																</table>
															</td>
															<td bgcolor="#d2973b">
																<div class="text-btn"
																	style="color:#ffffff; font-family:Arial, sans-serif; min-width:auto !important; font-size:16px; line-height:20px; text-align:center">
																	<a href="http://localhost:3000/" target="_blank"
																		class="link-white"
																		style="color:#ffffff; text-decoration:none"><span
																			class="link-white"
																			style="color:#ffffff; text-decoration:none">MY
																			ACCOUNT</span></a>
																</div>
															</td>
															<td class="img"
																style="font-size:0pt; line-height:0pt; text-align:left"
																width="15"></td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Button -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0"
								class="spacer"
								style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
								<tr>
									<td height="40" class="spacer"
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
																	<strong>Seller
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
																	<strong>Shop Name</strong>
																	<br />
																	${details.shopName}
																		<br /><br />

																		<strong>CNIC /
																			NTN</strong>
																		<br />
																		
                                    ${details.shopNTN}
																			<br /><br />

																			<strong>Phone
																				Number</strong>
																			<br />
																			${details.cellNumber}
																				<br /><br />

																				<strong>Address</strong>
																				<br />
																				${details.shopAddress}

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
																	<strong>Seller
																		Credentials</strong>
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
																	<strong>Email</strong>
																	<br />
                                  ${details.emailAddress}
																		<br /><br />
                                    <strong>Password</strong>
																		<br />
																		${password}
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
const mailforUpdateseller = (details) => {
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
    html: `	<!DOCTYPE html
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
  
  <!-- Seller Name -->
                      <div class="h3-2-center"
                        style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">
                        
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
                                    <strong>Seller
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
                                    ${details.shopName}
                                      <br /><br />
  
                                      <strong>CNIC /
                                        NTN</strong>
                                      <br />
                                      ${details.shopNTN}
                                        <br /><br />
  
                                        <strong>Phone
                                          Number</strong>
                                        <br />
                                        ${details.cellNumber}
                                          <br /><br />
  
                                          <strong>Address</strong>
                                          <br />
                                          ${details.shopAddress}
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
                                    <strong>Seller
                                      Credentials</strong>
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
                                    <strong>Email</strong>
                                    <br />
                                    ${details.emailAddress.toLowerCase()}
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
const passwordRecovery = (seller_details) => {
  console.log({ seller_details });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kistt.ease@gmail.com",
      pass: process.env.authpassword,
    },
  });

  var mailOptions = {
    from: "kistt.ease@gmail.com",
    to: seller_details.emailAddress,
    subject: "Password Recovery",
    html: `	<!DOCTYPE html
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
                        <em>Dont Remember Your Password?</em>
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
  
  <!-- Seller Name -->
                      <div class="h3-2-center"
                        style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">
                        ${seller_details.shopName}
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
  
                <div class="h3-1-center"
                  style="color:#1e1e1e; font-family:Georgia, serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center">
                  No Worries Click On The Link Below To Reset Password
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                  class="spacer"
                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                  <tr>
                    <td height="20" class="spacer"
                      style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                      &nbsp;</td>
                  </tr>
                </table>
  
  
                <!-- Button -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center">
                      <table width="210" border="0" cellspacing="0"
                        cellpadding="0">
                        <tr>
                          <td align="center" bgcolor="#d2973b">
                            <table border="0" cellspacing="0"
                              cellpadding="0">
                              <tr>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="15">
                                  <table width="100%" border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                    class="spacer"
                                    style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                    <tr>
                                      <td height="50"
                                        class="spacer"
                                        style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                        &nbsp;</td>
                                    </tr>
                                  </table>
                                </td>
                                <td bgcolor="#d2973b">
                                  <!-- Click Here Button For Reset Password Page Redirection -->
                                  <div class="text-btn"
                                    style="color:#ffffff; font-family:Arial, sans-serif; min-width:auto !important; font-size:16px; line-height:20px; text-align:center">
                                    <a href="http://localhost:3000/resetpassword/${seller_details._id}" target="_blank"
                                      class="link-white"
                                      style="color:#ffffff; text-decoration:none"><span
                                        class="link-white"
                                        style="color:#ffffff; text-decoration:none">Click Here</span></a>
                                  </div>
                                </td>
                                <td class="img"
                                  style="font-size:0pt; line-height:0pt; text-align:left"
                                  width="15"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- END Button -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                  class="spacer"
                  style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                  <tr>
                    <td height="40" class="spacer"
                      style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                      &nbsp;</td>
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
exports.get_seller_sales_customer = async (req, res) => {
  console.log(req.body);
  let { seller_id } = req.body;
  const customerCount = await db.customerdetails.find({ seller_id: seller_id });
  const sales = await db.installmentdetails.find({ seller_id: seller_id });
  console.log({ customerCount, sales });
  if (customerCount !== "" && sales !== "") {
    return res.status(200).json({
      message: "Successful",
      customerCount: customerCount.length,
      sales: sales.length,
    });
  } else {
    return res
      .status(500)
      .json({ message: "Successful", customerCount: 0, sales: 0 });
  }
};
exports.checkUser = (req, res) => {
  const sellerDetails = req.body.data;
  console.log(username);
  db.patients
    .findOne({ CNIC: username.CNIC })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.get_seller = (req, res) => {
  console.log(req.body);
  db.sellerdetails
    .findOne({ _id: req.body.seller_id })
    .then((result) => {
      return res.status(200).json({ message: "Successful", result: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Unsuccessful" });
    });
};
exports.register = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  // // console.log("SellersProfilePicture filename:",req.files.sellersProfilePicture[0].filename);
  // console.log("Request Made");
  // console.log("Data from Front end");
  // console.log("-------------------");
  // res.json({body:req.body,files:req.files})
  // const obj_id = new mongo.ObjectId("60bbe96585c97928b85b6fa3");
  let { shopName, shopNTN, shopAddress, emailAddress, cellNumber, password } =
    req.body;
  if (
    !shopName ||
    !shopNTN ||
    !shopAddress ||
    !emailAddress ||
    !cellNumber ||
    !password
  ) {
    console.log("Incomplete Data from front end");
    res.status(422).json({ error: "All feilds not filled" });
  } else {
    db.sellerdetails.findOne({ emailAddress: emailAddress }, (err, exists) => {
      if (exists) {
        console.log(exists, "Seller Already Exists");
        return res.status(422).json({ error: "Seller already exists" });
      } else {
        console.log("is acceptable");
        // res.json({ message: req.body })
        let sellerdetails = new db.sellerdetails({
          shopName,
          shopNTN,
          shopAddress,
          emailAddress,
          cellNumber,
          shopLogo: req.file.filename,
          password,
        });
        console.log("we going to save the seller");
        console.log({ sellerdetails });
        sellerdetails
          .save()
          .then((result) => {
            console.log("saved to MongoDB Atlas>>", result);
            mailforseller(result, password);
            return res
              .status(201)
              .json({ message: "User registerd Successfully" });
          })
          .catch((err) => {
            console.log("we have error", err);
            return res.status(500).json({ message: "Failed to register" });
          });
      }
    });
  }
};
exports.email = (req, res) => {
  console.log(req.body);
  db.sellerdetails
    .findOne({ emailAddress: req.body.email })
    .then((result) => {
      console.log({ result });
      passwordRecovery(result);
      return res
        .status(200)
        .json({ result: result, messaage: "Got Email and credentials" });
    })
    .catch((err) => {
      res.status(404).json({ message: "Could Not find Email" });
    });
};
exports.updateDetails = (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request file:", req.file);
  if (req.file) {
    let {
      shopName,
      shopNTN,
      shopAddress,
      emailAddress,
      cellNumber,
      seller_id,
    } = req.body;
    let shopLogo = req.file.filename;
    console.table({
      shopName,
      shopNTN,
      shopAddress,
      emailAddress,
      cellNumber,
      seller_id,
    });
    console.log({ shopLogo });
    db.sellerdetails
      .findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(seller_id) },
        {
          $set: {
            shopName: shopName,
            shopNTN: shopNTN,
            shopAddress: shopAddress,
            emailAddress: emailAddress,
            cellNumber: cellNumber,
            shopLogo: shopLogo,
          },
        },{new:true}
      )
      .then((result) => {
        console.log("Updated Successfully");
        console.log({result})
        mailforUpdateseller(result);
        return res
          .status(200).send(result)
          // .json({ message: "Updated Successfully", updatedResult: result });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    let {
      shopName,
      shopNTN,
      shopAddress,
      emailAddress,
      cellNumber,
      seller_id,
    } = req.body;
    console.table({
      shopName,
      shopNTN,
      shopAddress,
      emailAddress,
      cellNumber,
      seller_id,
    });
    db.sellerdetails
      .findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(seller_id) },
        {
          $set: {
            shopName: shopName,
            shopNTN: shopNTN,
            shopAddress: shopAddress,
            emailAddress: emailAddress,
            cellNumber: cellNumber,
          },
        },{new:true}
      )
      .then((result) => {
        console.log("Updated Successfully");
        console.log("Result",result)
        // mailforUpdateseller(result);
        return res
          .status(200)
          .json({ message: "Updated Successfully", result: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
exports.setDefaulterDuration = (req, res) => {
  let { seller_id, DefaulterDuration } = req.body;
  console.log({seller_id,DefaulterDuration})
  db.sellerdetails
    .findOneAndUpdate(
      { _id: seller_id },
      {
        $set: {
          defaulterDuration: DefaulterDuration,
        },
      }
    )
    .then((result) => {
      console.log({ result });
      return res.status(200).json({ message: "Successful", result: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Unsuccessful" });
    });
};
exports.updatePassword = async (req, res) => {
  console.log("we are at Update Password");
  let { seller_id, password } = req.body;
  console.log({ seller_id, password });
  // db.sellerdetails
  //   .findByIdAndUpdate(
  //     { _id: mongoose.Types.ObjectId(seller_id) },
  //     { $set: { password: password } }
  //   )
  //   .then((result) => {
  //     console.log("Updated Successfully");
  //     return res
  //       .status(204)
  //       .json({ message: "Updated Successfully", result: result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  let user = await db.sellerdetails.find({ _id: seller_id });
  console.log("user array:", user[0]);
  console.log("user password:", user[0].password);
  user[0].password = password;
  console.log(user[0].password);
  user[0]
    .save()
    .then((result) => {
      console.log("Updated Successfully");
      return res
        .status(204)
        .json({ message: "Updated Successfully", result: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.seller_finances=(req,res)=>{
  
}