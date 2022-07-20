import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [status, setStatus] = useState('');
  const [token, setToken, removeCookie] = useCookies(["KistEase_seller_Token"]);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [valuesConfirmPassword, setValuesConfirmPassword] = useState({
    confirmpassword: "",
    showConfirmPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setValuesConfirmPassword({
      ...valuesConfirmPassword,
      showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const api = axios.create({
    baseURL: "http://localhost:5000/users/",
    timeout: 2000,
    withCredentials: false,
  });
  useEffect(() => {
    if (password.length !== 0 && confirmPassword.length !== 0) {
      if ((password !== "" && confirmPassword !== "") && (password === confirmPassword)) {
        setIsDisabled(false);
        setStatus(<Alert variant="outlined" severity="success">
          Password Is A Match
        </Alert>)
      } else {
        setIsDisabled(true);
        setStatus(<Alert variant="outlined" severity="error">
          Password Is Not A Match
        </Alert>)
      }
    } else {
      setIsDisabled(true);
      setStatus("")
    }
  }, [password, confirmPassword]);

  const changePassword = () => {
    console.log({ id });
    if (password === confirmPassword) {
      api
        .post("recoveryPassword", { seller_id: id, password: password })
        .then((result) => {
          console.log(result.message);
          if (token.KistEase_seller_Token !== null) {
            navigate("/")
          } else {
            navigate("/ShopLogin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Passwords are not equal");
    }
  };
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
          {/* Reset Password Icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {" "}
            <LockOutlinedIcon />{" "}
          </Avatar>

          {/* Reset Password Tittle */}
          <Typography component="h1" variant="h5">
            {" "}
            Reset Password{" "}
          </Typography>

          <Box component="form" noValidate htmlFor="formFile" sx={{ mt: 3 }}>
            {/* Text Field New Password */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"
                />
              </FormControl>
            </Grid>
            <br></br>

            {/* Text Field Confirm Password */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={
                    valuesConfirmPassword.showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {valuesConfirmPassword.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                <span
                  style={{ fontWeight: "bold", fontSize: "18px", color: "red" }}
                >
                  {status}
                </span>
              </FormControl>
            </Grid>

            {/* Update Button */}
            <Button
              onClick={changePassword}
              disabled={isDisabled}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {" "}
              Update{" "}
            </Button>

            {/* Redirection Link To SignIn */}
            <Grid item>
              <Link to="/ShopLogin" variant="body2">
                {" "}
                Already Have An Account? <br></br> Click Here To Login{" "}
              </Link>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
