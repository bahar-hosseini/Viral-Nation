import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const DeleteProfile = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Remove profile</DialogTitle>
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
        >
          Cancel
        </Button>
        <Button
          color="deleteBtn"
          variant="contained"
          aria-label="Delete"
          sx={{ px: 6 }}
        >
          Delete
        </Button>
      </Stack>
    </Dialog>
  );
};

export default DeleteProfile;
