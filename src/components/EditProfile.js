import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
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
} from "@mui/material";

const EDIT_PROFILE_MUTATION = gql`
  mutation UpdateProfile(
    $updateProfileId: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $isVerified: Boolean!
    $imageUrl: String!
    $description: String!
  ) {
    updateProfile(
      id: $updateProfileId
      first_name: $firstName
      last_name: $lastName
      email: $email
      is_verified: $isVerified
      image_url: $imageUrl
      description: $description
    ) {
      id
      first_name
      last_name
      email
      is_verified
      image_url
      description
    }
  }
`;

const EditProfile = ({ profileId, initialData, open, setOpen }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.first_name,
    lastName: initialData.last_name,
    email: initialData.email,
    description: initialData.description,
    image_url: initialData.image_url,
    is_verified: initialData.is_verified,
  });

  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditProfile = () => {
    const { firstName, lastName, email, is_verified, image_url, description } =
      formData;

    editProfile({
      variables: {
        updateProfileId: profileId,
        firstName,
        lastName,
        email,
        isVerified: is_verified,
        imageUrl: image_url,
        description,
      },
    })
      .then((response) => {
        console.log("Profile edited:", response.data.updateProfile);
        setFormData({});
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error editing profile:", error);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box sx={{ p: 4 }}>
        <FormControl>
          <DialogTitle>Edit Profile</DialogTitle>
          <Divider />
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
