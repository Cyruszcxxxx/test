import React from 'react';
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login } from "../slices/authSlice";
import {
  showNotification,
  NotificationType,
} from "../slices/notificationSlice";
import { ReactComponent as MyIcon } from "../public/img/et-illustration.svg";

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      dispatch(
        login({
          email,
          password,
        })
      );
    } else {
      dispatch(
        showNotification({
          message: "Please provide email and password",
          type: NotificationType.Error,
        })
      );
    }
  };

  return (
    <>
      <Container maxWidth={false} disableGutters={true} sx={{
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        background: 'linear-gradient(to right bottom, #00FFFF, #82ffa1)',
        padding: 0, // Remove padding if any
        margin: 0, // Remove margin if any
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          boxShadow: 3,
          borderRadius: '40px',
          backgroundColor: 'white',
          height: 500,
          width: 1000,
        }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderTopLeftRadius: '40px',
              borderBottomLeftRadius: '40px',
              background: 'linear-gradient(to left top, #00FFFF, #82ffa1)',
              height: 500,
              width: 600,
              justifyContent: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Login</Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Link to="/register">Don't have an account? Register</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <MyIcon />
            <h2>Focused Money Management</h2>
            <p><strong>Keep more money in your wallet!</strong> ExpenseTracker simplifies
              budgeting by focusing solely on expenses.</p>
          </Box>
        </Box>
      </Container >
    </>
  );
};

export default Login;
