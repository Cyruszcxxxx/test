import React from 'react';
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useState } from "react";
import { updateUser } from "../slices/authSlice";
import { AppDispatch } from "../store";
import { Box, Avatar, Button, TextField, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from "@mui/material";
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { JSX } from "react/jsx-runtime";


const Profile: React.FC = () => {
    const dispatch : AppDispatch = useDispatch();
    const userBasicInfo = useAppSelector((state) => state.auth.basicUserInfo)
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
    const [name, setName] = useState(userBasicInfo?.name || '');
    const [email, setEmail] = useState(userBasicInfo?.email || '');
    const [phone, setPhone] = useState(userProfileInfo?.phone || '');
    const [birthday, setBirthday] = useState<Date | null>(null);
    
    const defaultAvatarUrl = "https://cdn.meiker.io/assets/10048/2021/10/icon_20211018195629616dd16dbcd5d.png"
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const updateData = { name, email, phone, birthday, defaultAvatarUrl};
      if(userBasicInfo){
        dispatch(updateUser({ userId: userBasicInfo.id, updateData }));
      }
    };


   
    //const defaultAvatarUrl = "https://example.com/default-avatar.jpg"; 

    
    const avatarUrl = userProfileInfo?.profilePicture || defaultAvatarUrl;
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="25vh">
            <Avatar alt="Profile Avatar" src={avatarUrl} sx={{ width: 100, height: 100 }} />

            {/* 用户信息 */}
            <Typography variant="h6" mt={2}>{name}</Typography>
            <Typography variant="body1">{email}</Typography>
            <Typography variant="body1">{phone}</Typography>
            <Typography variant="body1">{birthday ? birthday.toLocaleString() : ''}</Typography>


            {/* 更新表单 */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
                <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} margin="normal" />
                <DatePicker
                    label="Birthday"
                    value={birthday}
                    onChange={(newValue) => {
                        setBirthday(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} />}
                />

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>Update</Button>
            </form>
        </Box>
        </LocalizationProvider>
    );
  };
  
  export default Profile;
  