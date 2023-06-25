import { useState, useEffect } from "react";
import { Box, TextField, Button, LinearProgress, Alert } from "@mui/material";

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
  }, [debouncedSearch, data]);

  return (
    <Box sx={{ p: 3, mx: 1 }}>
      {error && <Alert severity="error">{error.message}</Alert>}
      {loading && <LinearProgress color="secondary" />}

      <>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            color="secondary"
            label="Search"
            fullWidth
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <Button
            sx={{
              mt: 2,
              width: "25%",
              textTransform: "none",
              py: 1,
              px: 2,
              alignSelf: "end",
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
        <CreateProfile open={openCreatePro} setOpen={setOpenCreatePro} />
        {profiles?.map((item) => (
          <HomeMobileItem key={item.id} item={item} />
        ))}
      </>
    </Box>
  );
}

export default HomeMobile;
