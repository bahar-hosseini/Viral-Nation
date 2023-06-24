import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Stack,
  Typography,
  IconButton,
  Alert,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import useDeleteProfile from "../hooks/useDeleteProfile";

const DeleteProfile = ({ open, setOpen, profileId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { handleDeleteProfile, loading, error } = useDeleteProfile(() => {
    setIsDeleting(false);
    setOpen(false);
    window.location.reload();
  });

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    handleDeleteProfile(profileId);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle>Remove Profile</DialogTitle>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon sx={{ mx: 2 }} />
        </IconButton>
      </Stack>
      <Stack>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <LinearProgress />}
      </Stack>
      <Divider />
      <Typography sx={{ px: 2, py: 6 }}>
        Removed profile will be deleted permanently and won't be available
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
          disabled={isDeleting}
          onClick={handleConfirmDelete}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default DeleteProfile;
