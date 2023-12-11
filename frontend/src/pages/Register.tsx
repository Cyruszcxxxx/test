import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Height, LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { register } from "../slices/authSlice";
import {
  showNotification,
  NotificationType,
} from "../slices/notificationSlice";
import { ReactComponent as MyIcon } from "../public/img/et-illustration-2.svg";

const Register = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (name && email && password) {
      dispatch(
        register({
          name,
          email,
          password,
        })
      );
    } else {
      dispatch(
        showNotification({
          message: "Please fill out all the required fields",
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <MyIcon style={{height: 300}}/>
            <h2>Focused Money Management</h2>
            <p><strong>Keep more money in your wallet!</strong> ExpenseTracker simplifies
              budgeting by focusing solely on expenses.</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderTopRightRadius: '40px',
              borderBottomRightRadius: '40px',
              background: 'linear-gradient(to left top, #00FFFF, #82ffa1)',
              height: 500,
              width: 600,
              justifyContent: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Register</Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Login</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
