import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography, Box, Paper, Grid, Link as MuiLink } from "@mui/material";
import SignInForm from "./form/SignInForm";
import { signInFetchData } from "./core/api";

function SignIn() {
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = ({ email, password }) => {
    setIsFetching(true);

    signInFetchData({ email, password })
      .then((body) => {
        if (body.token) {
          setIsFetching(false);
          localStorage.setItem("token", JSON.stringify(body));
          navigate("/");
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
        marginTop:"40px"
        // height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 400 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Grid>
        </Grid>
        <SignInForm handleSubmit={handleSignIn} isFetching={isFetching} />
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body2">
              Need an account?{" "}
              <MuiLink component={Link} to="/signup">
                Sign up
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default SignIn;
