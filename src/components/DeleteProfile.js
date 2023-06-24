import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";

const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfile($deleteProfileId: String!) {
    deleteProfile(id: $deleteProfileId)
  }
`;

const DeleteProfile = ({ open, setOpen, profileId }) => {
  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION);

  const handleDeleteProfile = () => {
    deleteProfile({ variables: { deleteProfileId: profileId } })
      .then((response) => {
        console.log("Profile deleted");
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle>Remove Profile</DialogTitle>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon sx={{ mx: 2 }} />
        </IconButton>
      </Stack>

      <Divider />
      <Typography sx={{ px: 2, py: 6 }}>
        Removed profile will be deleted permenantly and won't be available
        anymore.
      </Typography>
      <Divider />
      <Stack
        display="flex"
        direction="row"
        justifyContent="space-between"
        sx={{ m: 2 }}
      >
        <Button
          color="cancelBtn"
          variant="contained"
          aria-label="Cancel"
          sx={{ px: 6 }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          color="deleteBtn"
          variant="contained"
          aria-label="Delete"
          sx={{ px: 6 }}
          onClick={handleDeleteProfile}
        >
          Delete
        </Button>
      </Stack>
    </Dialog>
  );
};

export default DeleteProfile;
