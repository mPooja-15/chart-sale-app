import React, { useState, useEffect } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Box, Paper, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signUp } from "./core/api";
import SignUpForm from "./form/SignUpForm";

const SignUp = () => {
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    ValidatorForm.addValidationRule("isEmailUnique", (value) => {
      return true; // Replace with your validation logic
    });

    return () => {
      ValidatorForm.removeValidationRule("isEmailUnique");
    };
  }, []);

  const handleSignUp = ({ name, email, password }) => {
    setIsFetching(true);

    signUp({ name: name, email: email, password: password })
      .then((body) => {
        if (body) {
          setIsFetching(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        setIsFetching(false);
        console.error("Sign in error:", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: "80%", maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Sign Up
        </Typography>
        <SignUpForm handleSubmit={handleSignUp} isFetching={isFetching} />
      </Paper>
    </Box>
  );
};

export default SignUp;
