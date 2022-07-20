import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { storeCNICguarantor, getCNICGuarantor, storeGuarantorCNICNO, getGuarantorCNICNO } from "./StoreVariables";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const theme = createTheme();
const Input = styled("input")({ display: "none" });

export const GuarantorCnicImage = ({ formData, setForm, navigation }) => {
  const { GuarantorCnic } = formData;
  const [ImagePreview, setImagePreview] = useState("");
  const [guarantorCNIC, setGuarantorCNIC] = useState("");
  const [Image, setImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const onChangeFile1 = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      console.log("Guarantor Cnic Uploaded");
    }
  };
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [disable, setDisable] = useState(true);
  const [files, setfiles] = useState([]);
  const [rootUser, setRootUser] = useState("");
  const inputCustomerCNIC = useRef();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        .get("/", { headers: { auth_TOKEN: token.KistEase_seller_Token } })
        .then((result) => {
          console.log({ result });
          if (result) {
            console.log("remain here");
            console.log(result.data.rootUser);
            setRootUser(result.data.rootUser);
            console.log(getCNICGuarantor());
            setGuarantorCNIC(getGuarantorCNICNO())
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
    console.table({ GuarantorCnic, Image, ImagePreview })
    if (GuarantorCnic !== "" && Image !== "" && ImagePreview !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [Image, ImagePreview])
  const isObject = (val) => {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'))
  }
  useEffect(() => {
    if (Image !== undefined && Image !== "") {
      if (isObject(Image)) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImagePreview(reader.result);
        });
        reader.readAsDataURL(Image);
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
        console.log("Guarantor Uploaded");
      } else {
        setImagePreview(`http://localhost:5000/images/${Image}`)
        console.log("Customer Image Uploaded");
      }
    }
  }, [Image]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Guarantor Signup Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <LockOutlinedIcon />{" "}
          </Avatar>

          {/* Guarantor Signup Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Upload Guarantor Cnic{" "}
          </Typography>

          <Box
            component="form"
            noValidate
            encType="multipart/form-data"
            sx={{ mt: 3 }}
          // style={{ backgroundColor: 'teal' }}
          >
            <Grid container spacing={2}>
              {/* Text Filed Guarantor Cnic */}
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="GuarantorCnic"
                  required
                  fullWidth
                  id="Guarantor_Cnic"
                  label="Guarantor Cnic"
                  type="number"
                  value={guarantorCNIC}
                  onChange={(e) => {
                    setGuarantorCNIC(e.target.value)
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <ContactMailIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 13);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}></Grid>

              <Grid item xs={12} sm={4}>
                {/* Upload Image 1 Button */}
                <label
                  htmlFor="contained-button-file"
                  value={GuarantorCnicImage}
                  onChange={setForm}
                >
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      // onChangeFile1(e);
                      setImage(e.target.files[0]);
                      storeCNICguarantor(e.target.files[0]);
                    }}
                  />
                  <Button
                    style={{ "margin-bottom": "20px" }}
                    size="small"
                    variant="contained"
                    component="span"
                    align="center"
                  >
                    {" "}
                    Upload Cnic{" "}
                  </Button>
                </label>
                {/* Upload Image 1 Via Camera */}
                <label htmlFor="icon-button-file">
                  {" "}
                  <Input accept="image/*" id="icon-button-file" type="file" />
                </label>
                {/* Image 1 Preview */}
                <Button onClick={handleClickOpen}>
                  <center>
                    <Avatar
                      src={
                        ImagePreview
                          ? ImagePreview
                          : "https://media.istockphoto.com/vectors/card-tag-icon-vector-male-user-person-profile-avatar-symbol-for-vector-id958737428?k=20&m=958737428&s=170667a&w=0&h=vtgwVEpMAckX-2DnfYLT7O20SfJCWAoRLVYG_4GZFxI="
                      }
                      sx={{ width: 100, height: 100 }}
                      style={{ border: '3px solid lightgray' }}
                    />
                  </center>
                </Button>
                <Dialog
                   
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ width: 350, height: 350 }}
                      style={{ border: '3px solid lightgray' }}>
                      <Avatar
                        src={
                          ImagePreview
                            ? ImagePreview
                            : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                        }
                        sx={{ width: 350, height: 350 }}
                        style={{ border: '3px solid lightgray' }}
                      />
                    </DialogContentText>
                  </DialogContent>

                </Dialog>
              </Grid>

              <Grid item xs={12} sm={4}></Grid>
            </Grid>

            <Stack spacing={2} direction="row">
              <Button
                size="small"
                variant="contained"
                fullWidth
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={() => navigation.previous()}
              >
                {" "}
                Back{" "}
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                disabled={isDisabled}
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={() => navigation.next()}
              >
                {" "}
                Next{" "}
              </Button>
            </Stack>
            <Grid container justifyContent="flex-end">
              {" "}
            </Grid>
          </Box>
        </Box>
        <pre>
          {/* {JSON.stringify(customerCNIC, null, 2)}
{JSON.stringify(customerUtilityBill, null, 2)} */}
        </pre>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
