import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
// Icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function AlertDialog({ customerDetails,sendInvoice }) {
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [seller_id, setSeller_id] = useState("")

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
          console.log("remain here");
          console.log("rootUser:", result.data.rootUser);
          setSeller_id(result.data.rootUser)
        }).catch(err => { console.log(err); window.alert("error") })
    }
  }, []);
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log({ customerDetails })
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AlternateEmailIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        align="center"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Do You Want To Send The Ledger To <br /> Customer Email Address
        </DialogTitle>

        <DialogActions >
          <Button onClick={handleClose}align="center"> Don't Send </Button>
          <Button onClick={()=>{sendInvoice();handleClose()}} align="center"> Yes Send </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
