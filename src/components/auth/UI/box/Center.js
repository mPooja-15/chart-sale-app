import React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing(3),
    // marginRight: theme.spacing(3),
    // [theme.breakpoints.up(400 + theme.spacing(6))]: {
    //   width: 400,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  text: {
    textAlign: 'center'
  }
}));

const BoxCenter = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          {children}
        </Paper>
      </main>
    </div>
  );
};

export default BoxCenter;
