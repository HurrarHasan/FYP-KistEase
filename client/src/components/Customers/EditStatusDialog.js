import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useCookies } from "react-cookie";
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { IconButton } from "@mui/material";
export default function AlertDialog({ customerDetails }) {
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
  const banCustomer = () => {
    console.log("We are in Ban Customer", { customerDetails })
    api
      .post("makeDefaulter", {
        customerDetails: customerDetails,
        product_id: customerDetails.product_id,
        seller_id: seller_id, isDefaulter: true
      })
      .then((result) => {
        console.log({ result });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const unBanCustomer = () => {
    console.log("We are at UnBan Customer", { customerDetails })
    api
      .post("makeDefaulter", {
        customerDetails: customerDetails,
        product_id: customerDetails.product_id,
        seller_id: seller_id, isDefaulter: false
      })
      .then((result) => {
        console.log({ result });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log({ customerDetails })

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <PauseCircleFilledIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Change Customer Status
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => { banCustomer(); handleClose(); }}>Ban</Button>
          <Button onClick={() => { unBanCustomer(); handleClose() }} autoFocus>
            {" "}
            UnBan{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
