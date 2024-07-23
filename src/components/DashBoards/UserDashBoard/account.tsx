import React, { useState, useEffect } from 'react';
import { usersApi } from './Slices/usersapi';
import { Users } from './Slices/types';
import axios from 'axios';
import { cloudinaryConfig } from '../../cloudinaryconfig';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  InputAdornment, 
  IconButton, 
  Card, 
  CardContent, 
  Avatar, 
  Snackbar, 
  Alert 
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AccountSettings: React.FC = () => {
    const [user, setUser] = useState<Users | null>(null);
    const [updateUser] = usersApi.useUpdateUserMutation();

    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState(''); // Added password state
    const [loading, setLoading] = useState(false); // Loading state
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser) as Users;
            setUser(userData);
            setEmail(userData.email || '');
            setFullName(userData.full_name || '');
            setContactPhone(userData.contact_phone || '');
            setAddress(userData.address || '');
            setProfilePicPreview(userData.profile_image || '');
        }
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        let profileImageUrl = profilePicPreview || '';

        if (profilePic) {
            const formData = new FormData();
            formData.append('file', profilePic);
            formData.append('upload_preset', cloudinaryConfig.uploadPreset);

            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudname}/image/upload`, formData);
                profileImageUrl = response.data.secure_url;
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                setErrorMessage('Failed to upload profile image');
                setLoading(false); // Set loading state to false
                return;
            }
        }

        const updatedUser: Partial<Users> = {
            email,
            full_name: fullName,
            contact_phone: contactPhone,
            address,
            profile_image: profileImageUrl,
            password // Include password in the update if required
        };

        console.log('Updated user data:', updatedUser);

        try {
            if (user) {
                await updateUser({ user_id: user.user_id, ...updatedUser }).unwrap();
                setSuccessMessage('User updated successfully!');
                localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
            } else {
                setErrorMessage('User data is missing.');
            }
        } catch (error) {
            console.error('Failed to update user:', error);
            setErrorMessage('Failed to update user.');
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setProfilePic(file);
            setProfilePicPreview(URL.createObjectURL(file));
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    if (!user) return <Typography color="error">User data not found</Typography>;

    return (
        <Box p={4} position="relative">
            {/* Snackbar for success messages */}
            <Snackbar 
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '300px' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

            {/* Snackbar for error messages */}
            <Snackbar 
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '300px' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>

            <Typography variant="h4" component="h2" gutterBottom>Account Settings</Typography>
            <Card>
                <CardContent>
                    <form onSubmit={handleSave}>
                        <Box mb={2}>
                            <Typography variant="h6" component="div" mb={1}>Profile Picture</Typography>
                            <label htmlFor="profilePic">
                                <InputAdornment position="start">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </InputAdornment>
                                <input
                                    type="file"
                                    id="profilePic"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            {profilePicPreview && (
                                <Avatar src={profilePicPreview} sx={{ width: 100, height: 100, mt: 2 }} />
                            )}
                        </Box>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Contact Phone"
                            variant="outlined"
                            fullWidth
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                        />
                        <Box textAlign="right" mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AccountSettings;
