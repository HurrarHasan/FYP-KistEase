import * as React from "react";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Container,
  TextField,
  Grid,
  Box, 
  InputAdornment,
  OutlinedInput,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";
// Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// Mui Components
import {
  styled,
  createTheme,
  ThemeProvider,
  Typography,
  Divider,
  IconButton,
  Paper,
  CssBaseline,
  Toolbar,
  Menu,
  Tooltip,
  MenuItem,
  Dialog,
  Select,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState, useLayoutEffect, useEffect } from "react";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
// Designed Components
import DefaulterTable from "../Customers/DefaulterTable";
import { mainListItems } from "../Dashboard/ListItems";

const drawerWidth = 280;
const settings = ["Update Profile", "Leniency Duration", "Logout"];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();
function DashboardContent() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  const Input = styled("input")({ display: "none" });
  const theme = useTheme();
  const [duration, setDuration] = useState('');
  const handleChange = (event) => { setDuration(event.target.value); };
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClose = () => { setDialogOpen(false); };
  const [sellerDetails, setSellerDetails] = useState("");
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  useLayoutEffect(() => {
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
            console.log(" Dashboard remain here ");
            console.log(result.data.rootUser);
            api
              .post("getUser", { seller_id: result.data.rootUser })
              .then((result) => {
                console.log(result.data.result.shopLogo);
                setSellerDetails(result.data.result);
                setShopName(result.data.result.shopName);
                setShopNTN(result.data.result.shopNTN);
                setShopAddress(result.data.result.shopAddress);
                setEmailAddress(result.data.result.emailAddress);
                setCellNumber(result.data.result.cellNumber.slice(3));
                setEmailAddress(result.data.result.emailAddress);
                setImage(result.data.result.shopLogo);
                setShop_id(result.data.result._id);
                setDuration(result.data.result?.defaulterDuration)
                //   api.post("viewProductCategory",{seller_id:result.data.rootUser})
                //   .then(result=>{
                //     console.log({result});
                //     if(result.data.result.isEmpty()){
                //       setStatusPurchase(true);
                //     }else{
                //       setStatusPurchase(false);
                //     }
                //   })
                //   .catch(err=>{console.log({err})})
              })
              .catch((err) => {
                console.log(err);
              });
            api.post("setCustomerDefault", { seller_id: result.data.rootUser })
              .then(result => console.warning("Automatic Blacklist", { result }))
              .catch(err => console.log({ err }))
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
  const updateDuration = () => {
    console.log("seller_id", sellerDetails._id)
    api.post("setDefaulterDuration", { seller_id: sellerDetails._id, DefaulterDuration: duration })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const logout = () => {
    removeCookie("KistEase_seller_Token", { path: "/", maxAge: 0 });
    navigate("/ShopLogin");
  };
  const UpdateShopProfile = () => {
    setUpdateDialog(true);
  };
  const LeniencyAfterDueDate = () => {
    setDialogOpen(true);
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false)
  const [shopDetails, setshopDetails] = useState("");
  const [ImagePreview, setImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopNTN, setShopNTN] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [shop_id, setShop_id] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUpdateDialog = (event) => {
    setUpdateDialog(false);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const updateDetails = () => {
    if (
      // ImagePreview !== "" &&
      Image !== "" &&
      shopName !== "" &&
      shopNTN !== "" &&
      shopAddress !== "" &&
      emailAddress !== "" &&
      cellNumber !== ""
    ) {
      const formData = new FormData();
      formData.append("shopName", shopName);
      formData.append("shopNTN", shopNTN);
      formData.append("shopAddress", shopAddress);
      formData.append("emailAddress", emailAddress);
      formData.append("cellNumber", "+92" + cellNumber);
      formData.append("shopLogo", Image);
      formData.append("seller_id", sellerDetails._id);
      for (var value of formData.values()) {
        console.log(value);
      }
      let config = {
        headers: { "content-type": "multipart/form-data" },
      };

      api
        .post("updateShopDetails", formData, config)
        .then((result) => {
          console.log("result=>", result);
          console.table("Table for Result", result.data.result)
          setShopAddress(result.data.shopAddress);
          setShopNTN(result.data.shopNTN);
          setCellNumber(result.data.cellNumber.slice(3));
          setImage(result.data.shopLogo);
          setEmailAddress(result.data.emailAddress);
          setShopName(result.data.shopName);
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("Some Fields Are Empty");
    }
  };
  useEffect(() => {
    console.log("checking Table", { shopAddress, shopNTN, cellNumber, Image, emailAddress, shopName })
  }, [shopAddress, shopNTN, cellNumber, Image, emailAddress, shopName])

  useEffect(() => {
    console.table({ shopDetails });
  }, [shopDetails]);
  useEffect(() => {
    console.table({
      ImagePreview,
      Image,
      shopName,
      shopNTN,
      shopAddress,
      emailAddress,
      cellNumber,
      shop_id,
      isDisabled,
    });
    if (
      Image !== "" &&
      shopName !== "" &&
      shopNTN !== "" &&
      shopAddress !== "" &&
      emailAddress !== "" &&
      cellNumber !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    ImagePreview,
    Image,
    shopName,
    shopNTN,
    shopAddress,
    emailAddress,
    cellNumber,
    isDisabled,
  ]);

  const onChangeFileShopLogo = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        console.log(reader.result)
        const filetype = reader.result.split("/").at(0)
        console.log({ filetype })
        if (filetype === "data:image") {
          setImagePreview(reader.result);
        } else {
          window.alert("Not An Image");
        }
      });
      console.log("Shop Logo Uploaded");
    }
  };
  function setDurationForMonth(data){
    console.log("in this duration",data)
    switch(data){
      case 30:
        return "One Month";
      case 60:
        return "Two Month";
      case 90:
        return "Three Month"
      default:
        return "";
    }
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <Divider />
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              KistEase
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Shop Logo Avatar">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={
                      sellerDetails.shopLogo
                        ? "http://localhost:5000/images/" +
                        sellerDetails.shopLogo
                        : "/static/images/avatar/2.jpg"
                    }
                    style={{ border: '3px solid lightgray' }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={(e) => {
                    switch (setting) {
                      case "Logout":
                        logout();
                        break;
                      case "Update Profile":
                        UpdateShopProfile();
                        break;
                      case "Leniency Duration":
                        LeniencyAfterDueDate();
                        break;

                    }
                  }}>
                    <Typography textAlign="center" >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Dialog
           
          open={updateDialog}
          onClose={handleCloseUpdateDialog}
          aria-labelledby="responsive-dialog-title"
        >

          <DialogContent>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Update Shop Profile Icon */}
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  {" "}
                  <LockOutlinedIcon />{" "}
                </Avatar>

                {/* Update Shop Profile Tittle */}
                <Typography component="h1" variant="h5">
                  {" "}
                  Update Shop Profile{" "}
                </Typography>

                <Box
                  component="form"
                  noValidate
                  encType="multipart/form-data"
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    {/* Upload Shop Logo */}
                    <Grid item xs={12}>
                      {/* Upload Shop Logo Button */}
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(e) => {
                            onChangeFileShopLogo(e);
                          }}
                          name="ShopLogo"
                        />
<center>  <Button
                          style={{ "margin-bottom": "20px" }}
                          size="small"
                          variant="contained"
                          component="span"
                          align="center"
                        >
                          {" "}
                          Upload Shop Logo{" "}
                        </Button></center>
                      </label>
                      {/* UUpload Shop Logo Via Camera */}
                      <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                      </label>
                      {/* Shop Logo Preview */}
                      <center>
                        <Avatar
                          src={
                            ImagePreview
                              ? ImagePreview
                              : `http://localhost:5000/images/${Image}`
                          }
                          sx={{ width: 100, height: 100 }}
                        />
                      </center>
                    </Grid>

                    {/* Text Field Shop Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="ShopName"
                        size="small"
                        value={shopName}
                        required
                        fullWidth
                        id="ShopName"
                        label="Shop Name"
                        onChange={(e) => {
                          setShopName(e.target.value);
                        }}
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {" "}
                              <AccountCircle />{" "}
                            </InputAdornment>
                          ),
                        }}
                        onInput={toInputUppercase} // apply on input which do you want to be capitalize
                      />
                    </Grid>

                    {/* Text Field Shop NTN */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        size="small"
                        name="Shop_NTN"
                        value={shopNTN}
                        required
                        fullWidth
                        id="Shop_NTN"
                        label="Shop NTN"
                        type="number"
                        onChange={(e) => {
                          setShopNTN(e.target.value);
                        }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 13);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {" "}
                              <ContactMailIcon />{" "}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    {/* Text Filed Shop Address */}
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        name="Shop_Address"
                        value={shopAddress}
                        required
                        fullWidth
                        id="Shop_Address"
                        label="Shop Address"
                        onChange={(e) => {
                          setShopAddress(e.target.value);
                        }}
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {" "}
                              <LocationOnIcon />{" "}
                            </InputAdornment>
                          ),
                        }}
                        onInput={toInputUppercase} // apply on input which do you want to be capitalize
                      />
                    </Grid>

                    {/* Text Field Email Address */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        size="small"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={emailAddress}
                        name="email"
                        onChange={(e) => {
                          setEmailAddress(e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {" "}
                              <AlternateEmailIcon />{" "}
                            </InputAdornment>
                          ),
                        }}
                        onInput={toInputUppercase} // apply on input which do you want to be capitalize
                      />
                    </Grid>

                    {/* Text Field Contact Number */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel> Phone Number </InputLabel>
                        <OutlinedInput
                          size="small"
                          id="PhoneNumber"
                          label="Phone Number"
                          type="number"
                          onChange={(e) => {
                            setCellNumber(e.target.value);
                          }}
                          startAdornment={
                            <InputAdornment position="start">+92</InputAdornment>
                          }
                          value={parseInt(cellNumber)}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 10);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Button
                        size="small"
                        fullWidth
                        variant="contained"
                        disabled={isDisabled}
                        component={Link}
                        to=""
                        onClick={updateDetails}
                      >
                        Update
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Button
                        size="small"
                        fullWidth
                        variant="contained"
                        component={Link}
                        to={`/ResetPassword/${shop_id}`}
                      >
                        Reset Shop Password
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent="flex-end">
                    {" "}
                  </Grid>
                </Box>
              </Box>

              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
          </DialogContent>

        </Dialog>
        <Dialog
           
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title"
            marginDown="80">
            <center>
              {`Leniency Duration For Blacklisting Automation`}
            </center>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={duration}
                    label="Duration"
                    onChange={handleChange}
                  >
                    <MenuItem value={30}>One Month</MenuItem>
                    <MenuItem value={60}>Two Month</MenuItem>
                    <MenuItem value={90}>Three Month</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Reset
            </Button>
            <Button onClick={() => { updateDuration(); handleClose(); }} autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <h1
              style={{
                marginTop: "10px",
                padding: "0px 0%",
                marginBottom: "-10px",
              }}
            >
              <img
                src="https://www.szabist.edu.pk/wp-content/uploads/2022/03/Logos-for-web-01-800x260.png"
                width="100%"
              />{" "}
            </h1>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          {mainListItems}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
                  <DefaulterTable />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
// export {statusPurchase};
export default function Dashboard() {
  return <DashboardContent />;
}
