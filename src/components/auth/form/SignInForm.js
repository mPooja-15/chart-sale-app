import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { CircularProgress, Typography, Grid, Box } from '@mui/material';

const SignInForm = ({ handleSubmit, isFetching, email: initialUsername }) => {
  const [formData, setFormData] = useState({
    email: initialUsername || '',
    password: '',
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isUsernameValid', (value) => {
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule('isUsernameValid');
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
        email: '',
        password: '',
      });
    });
  };

  const { email, password } = formData;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Box maxWidth="400px" width="100%" padding="20px">
        <ValidatorForm onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                fullWidth
                label="Email"
                onChange={handleChange}
                name="email"
                value={email}
                validators={['required', 'isUsernameValid']}
                errorMessages={['This field is required', 'Invalid email']}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                fullWidth
                label="Password"
                type="password"
                onChange={handleChange}
                name="password"
                value={password}
                validators={['required']}
                errorMessages={['This field is required']}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? <CircularProgress size={20} /> : 'Sign In'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {isFetching && (
                <Typography variant="caption" color="textSecondary">
                  Signing in...
                </Typography>
              )}
            </Grid>
          </Grid>
        </ValidatorForm>
      </Box>
    </Box>
  );
};

export default SignInForm;
