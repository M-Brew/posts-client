import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirstNameError(false);
    setLastNameError(false);

    if (!firstName || firstName === "") {
      setFirstNameError(true);
    }

    if (!lastName || lastName === "") {
      setLastNameError(true);
    }

    if (firstName !== "" && lastName !== "") {
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);

      navigate("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: { xs: "80%", sm: "60%", md: "50%" } }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h4">Blog</Typography>
        </Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            sx={{ my: 1 }}
            required
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
            error={firstNameError}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            sx={{ my: 1 }}
            required
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
            error={lastNameError}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            endIcon={<KeyboardArrowRightIcon />}
            sx={{ mt: 2 }}
          >
            Go To Dashboard
          </Button>
        </form>
      </Box>
    </Box>
  );
}
