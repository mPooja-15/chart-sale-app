import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { CircularProgress, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SignUpForm = ({ handleSubmit, isFetching, email: initialEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isEmailUnique", (value) => {
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("isEmailUnique");
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    handleSubmit({ ...formData }, () => {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    });
  };

  const { name, email, password } = formData;

  return (
    <ValidatorForm onSubmit={handleFormSubmit}>
      <TextValidator
        fullWidth
        label="Name"
        onChange={handleChange}
        name="name"
        value={name}
        validators={["required"]}
        errorMessages={["This field is required"]}
        margin="normal"
      />
      <TextValidator
        fullWidth
        label="Email"
        onChange={handleChange}
        name="email"
        value={email}
        validators={["required", "isEmail", "isEmailUnique"]}
        errorMessages={[
          "This field is required",
          "Email is not valid",
          "Email is not unique",
        ]}
        margin="normal"
      />
      <TextValidator
        fullWidth
        label="Password"
        type="password"
        onChange={handleChange}
        name="password"
        value={password}
        validators={["required"]}
        errorMessages={["This field is required"]}
        margin="normal"
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        type="submit"
        disabled={isFetching}
        margin="normal"
      >
        {isFetching ? <CircularProgress size={20} /> : "Save"}
      </Button>
      <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
        {"Already have an account?"}
        <RouterLink
          to={"/login"}
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            marginLeft: "4px",
          }}
        >
          Login
        </RouterLink>
      </Typography>
    </ValidatorForm>
  );
};

export default SignUpForm;
