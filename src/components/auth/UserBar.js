import React, { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";



const AuthMenu = ({ auth = {}, anchorEl = null, handleMenu }) => {
  const open = Boolean(anchorEl);
  if (auth?._id) {
    return (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar className={"classes.orangeAvatar"}>
            {auth.name.substring(0, 2)}
          </Avatar>
        </IconButton>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/login">
          login
        </Link>
        <Link to="/signup">
          sign up
        </Link>
      </div>
    );
  }
};

const UserBar = ({ auth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    console.log(event, "eventevent");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };
  return (
    <div className={""}>
      <AppBar position="static">
        <Toolbar className="main-dashboard">
          <AuthMenu
            auth={auth}
            anchorEl={anchorEl}
            handleMenu={handleMenu}
            handleClose={handleClose}
          />
          <Button style={{ backgroundColor: "white" }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default UserBar;
