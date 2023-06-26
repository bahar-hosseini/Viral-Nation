import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  LinearProgress,
  Alert,
  Paper,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import useGetAllProfiles from "../../hooks/useGetAllProfiles";
import CreateProfile from "../../components/CreateProfile";

import { useDebounce } from "../../hooks/useDebounce";
import HomeMobileItem from "./HomeMobileItem";

function HomeMobile() {
  const [search, setSearch] = useState("");
  const { loading, error, data } = useGetAllProfiles(search);
  const [profiles, setProfiles] = useState([]);
  const [openCreatePro, setOpenCreatePro] = useState(false);

  useEffect(() => {
    if (data && data.getAllProfiles) {
      setProfiles(data.getAllProfiles.profiles);
    }
  }, [data]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      setSearch(debouncedSearch);
    } else {
      setProfiles(
        data && data.getAllProfiles ? data.getAllProfiles.profiles : []
      );
    }
  }, [debouncedSearch]);

  return (
    <Paper sx={{ p: 2, margin: "auto", flexGrow: 1 }}>
      <Box>
        {error && <Alert severity="error">{error.message}</Alert>}
        {loading && <LinearProgress color="secondary" />}

        <Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              color="secondary"
              label="Search"
              fullWidth
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            ></TextField>

            <Button
              sx={{
                display: "flex",
                alignSelf: "end",
                textTransform: "none",
                mt: 2,
                width: "128",
                py: 1,
                px: 2,
              }}
              color="secondary"
              variant="outlined"
              aria-label="create profile"
              onClick={() => setOpenCreatePro(true)}
            >
              <PersonAddIcon sx={{ m: 0 }} />
              Create Profile
            </Button>
          </Box>
          <Box>
            <CreateProfile open={openCreatePro} setOpen={setOpenCreatePro} />
            {profiles?.map((item) => (
              <HomeMobileItem key={item.id} item={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default HomeMobile;
