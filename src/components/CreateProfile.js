import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  Divider,
  Box,
  Switch,
  FormControl,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $isVerified: Boolean!
    $imageUrl: String!
    $description: String!
  ) {
    createProfile(
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

const CreateProfile = ({ open, setOpen }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);

  const handleCreateProfile = () => {
    createProfile({
      variables: {
        firstName,
        lastName,
        email,
        isVerified,
        imageUrl,
        description,
      },
    })
      .then((response) => {
        console.log("Profile created:", response.data.createProfile);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
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
            <DialogTitle>Create Profile</DialogTitle>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon sx={{ mx: 2 }} />
            </IconButton>
          </Stack>
          <Divider />
          <TextField
            sx={{ my: 2 }}
            type="text"
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Stack my={2} direction="row" justifyContent="space-around">
            <TextField
              sx={{ mr: 1 }}
              type="text"
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              sx={{ ml: 1 }}
              type="text"
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Stack>
          <TextField
            sx={{ my: 2 }}
            type="email"
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            sx={{ my: 2 }}
            type="text"
            fullWidth
            multiline
            rows={5}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              onChange={() => setIsVerified(!isVerified)}
            />
          </Stack>
          <Divider sx={{ mt: 6 }} />
          <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
            <Button
              color="secondary"
              variant="contained"
              aria-label="create profile"
              type="submit"
              onClick={handleCreateProfile}
            >
              Create Profile
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default CreateProfile;
