import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  Box,
  FormControl,
  DialogTitle,
  Divider,
  Stack,
  Switch,
  Typography,
  IconButton,
  Alert,
  LinearProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import useEditProfile from "../hooks/useEditProfile";

const EditProfile = ({ profileId, initialData, open, setOpen }) => {
  const [error, setError] = useState(null);
  const { editProfile, loading } = useEditProfile();

  const [formData, setFormData] = useState({
    firstName: initialData.first_name,
    lastName: initialData.last_name,
    email: initialData.email,
    description: initialData.description,
    image_url: initialData.image_url,
    is_verified: initialData.is_verified,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditProfile = () => {
    const { firstName, lastName, email, is_verified, image_url, description } =
      formData;

    editProfile(
      profileId,
      firstName,
      lastName,
      email,
      is_verified,
      image_url,
      description
    )
      .then((response) => {
        setOpen(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box sx={{ p: 4 }}>
        <FormControl>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <DialogTitle>Edit Profile</DialogTitle>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon sx={{ mx: 2 }} />
            </IconButton>
          </Stack>
          <Divider />
          <Stack>
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <LinearProgress />}
          </Stack>
          <TextField
            sx={{ my: 2 }}
            type="text"
            label="Image URL"
            value={formData.image_url}
            name="image_url"
            onChange={handleChange}
          />
          <Stack my={2} direction="row" justifyContent="space-around">
            <TextField
              sx={{ mr: 1 }}
              type="text"
              label="First Name"
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
            />
            <TextField
              sx={{ ml: 1 }}
              type="text"
              label="Last Name"
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </Stack>
          <TextField
            sx={{ my: 2 }}
            type="text"
            label="Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder={formData.email}
            autoComplete
          />
          <TextField
            sx={{ my: 2 }}
            type="text"
            fullWidth
            multiline
            rows={5}
            label="Description"
            value={formData.description}
            name="description"
            onChange={handleChange}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: "primary.dark", borderRadius: "5px", py: 1 }}
          >
            <Typography sx={{ mx: 2 }}>Talent is verified</Typography>
            <Switch
              color="secondary"
              label="Is Verified"
              name="is_verified"
              checked={formData.is_verified}
              onChange={(e) =>
                setFormData({ ...formData, is_verified: e.target.checked })
              }
            />
          </Stack>
          <Divider sx={{ mt: 6 }} />
          <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
            <Button
              color="secondary"
              variant="contained"
              aria-label="Update Profile"
              type="submit"
              onClick={handleEditProfile}
            >
              Update Profile
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default EditProfile;
