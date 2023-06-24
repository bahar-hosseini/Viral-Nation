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
import useCreateProfile from "../hooks/useCreateProfile";

const CreateProfile = ({ open, setOpen }) => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    isVerified,
    setIsVerified,
    imageUrl,
    setImageUrl,
    description,
    setDescription,
    handleCreateProfile,
  } = useCreateProfile(() => setOpen(false));

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
