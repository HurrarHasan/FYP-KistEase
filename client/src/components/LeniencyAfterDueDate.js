import { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ResponsiveDialog() {
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [seller_id, setSeller_id] = useState('');
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); };

  const [duration, setDuration] = useState('');

  const handleChange = (event) => { setDuration(event.target.value); };
  const updateDuration = () => {
    api.post("setDefaulterDuration", { seller_id: seller_id, DefaulterDuration: duration })
      .then(result => {
        setDuration(result.data.defaulterDuration)
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
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
          setSeller_id(result.data.rootUser)
          api
              .post("getUser", { seller_id: result.data.rootUser })
              .then((result) => {
                setDuration(result.data.defaulterDuration)
              })
              .catch((err) => {
                console.log(err);
        });
        })
        .catch((err) => {
          console.log({ err });
          // navigate("/ShopLogin");
        });
    }
  }, []);
  function setDurationForMonth(data){
    console.log("in this duration",data)
    switch(data){
      case 30:
        return "One Month";
      case 60:
        return "Two Month";
      case 90:
        return "Three Month"
    }
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Leniency Duration
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"
          marginDown="80">
          <center>
            {"Leniency Duration For Blacklisting Automation"}
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
                  value={setDurationForMonth(duration)}
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
            Close
          </Button>
          <Button onClick={() => { updateDuration(); handleClose(); }} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
