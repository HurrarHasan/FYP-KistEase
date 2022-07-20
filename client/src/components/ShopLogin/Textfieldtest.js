import React from "react";
import { useState, useEffect } from "react";
// Icons
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
// Mui Components
import { TextField, Container, InputAdornment } from "@mui/material";

function Textfieldtest() {
  const [CNIC, setCNIC] = useState("");
  const [phone, setphone] = useState("");
  const [error, setError] = useState(false);
  const [helpTextcnic, setHelpTextcnic] = useState("");
  const [helpTextphone, setHelpTextphone] = useState("");

  const validateEmail = (e) => {
    var cnic = e.target.value;
    if (cnic.length <= 13 && cnic.length >= 13) {
      setError(false);
      setHelpTextcnic("");
      setCNIC(e.target.value);
    } else {
      setHelpTextcnic("CNIC is not of proper Length");
      setError(true);
    }
  };

  const validatephone = (e) => {
    var phone = e.target.value;
    if (phone.length == 10) {
      setError(false);
      setHelpTextphone("");
      setphone(e.target.value);
    } else {
      setHelpTextphone("Enter Valid Contact Number");
      setError(true);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <TextField
          margin="normal"
          error={error}
          helperText={helpTextcnic}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          // onChange={(e) => setEmail(e.target.value)}
          onChange={(e) => validateEmail(e)}
          // apply on input which do you want to be capitalize
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {" "}
                <AlternateEmailIcon />{" "}
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          error={error}
          helperText={helpTextphone}
          required
          fullWidth
          type="number"
          id="phone"
          label="phone"
          name="phone"
          autoFocus
          // onChange={(e) => setEmail(e.target.value)}
          onChange={(e) => validatephone(e)}
          // apply on input which do you want to be capitalize
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 10);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {" "}
                <AlternateEmailIcon />{" "}
              </InputAdornment>
            ),
          }}
        />
        {/* <span style={{ fontWeight: "bold", fontSize: "18px", color: "red" }}>
          {emailError}
        </span> */}
      </Container>
    </>
  );
}

export default Textfieldtest;
