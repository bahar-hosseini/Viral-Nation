import React from "react";
import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  Divider,
  Switch,
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";

const CreateProfile = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box sx={{ p: 4 }}>
        <DialogTitle>Create Profile</DialogTitle>
        <Divider />
        <TextField
          sx={{ my: 2 }}
          type="text"
          defaultValue="https://link.to.an.image"
          fullWidth
          label="image link"
          size="small"
        />
        <Box my={2} direction="row" justifyContent="space-around">
          <TextField
            type="text"
            label="First Name"
            defaultValue="Dariene"
            size="small"
          />
          <TextField
            size="small"
            type="text"
            label="Last Name"
            defaultValue="Robben"
            sx={{
              ml: 1,
            }}
          />
        </Box>
        <TextField
          size="small"
          sx={{ my: 2 }}
          type="text"
          defaultValue="DarieneRobben@gmail.com"
          fullWidth
          label="Email"
        />
        <TextField
          size="small"
          sx={{ my: 2 }}
          type="text"
          defaultValue="Description"
          fullWidth
          multiline
          rows={5}
          label="Description"
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: "primary.dark", borderRadius: "5px", py: 1 }}
        >
          <Typography sx={{ mx: 2 }}>Verification</Typography>
          <Switch color="secondary" />
        </Stack>
        <Divider sx={{ mt: 6 }} />
        <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
          <Button
            color="secondary"
            variant="contained"
            aria-label="create profile"
          >
            Create Profile
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateProfile;
