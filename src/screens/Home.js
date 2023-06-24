import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  LinearProgress,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import useGetAllProfiles from "../hooks/useGetAllProfiles";
import CreateProfile from "../components/CreateProfile";
import DropDown from "../components/DropDown";

function Home() {
  const { loading, error, data } = useGetAllProfiles();
  const { profiles } = data?.getAllProfiles || {};

  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(profiles);
  const [openCreatePro, setOpenCreatePro] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (profiles) {
      if (search) {
        setRows(
          profiles.filter((row) =>
            (row.first_name + " " + row.last_name)
              .toLowerCase()
              .includes(search)
          )
        );
      } else {
        setRows(profiles);
      }
    }
  }, [search, profiles]);

  const columns = [
    {
      field: "first_name",
      headerName: "Name",
      headerAlign: "center",
      width: 300,
      renderCell: (params) => (
        <>
          <Box sx={{ mx: 2 }}>
            <Avatar src={params.row.image_url} alt="profile image" width={80} />
          </Box>
          <Box>
            <Typography>
              {params.row.first_name} {params.row.last_name}
            </Typography>
          </Box>
          <Box sx={{ mx: 2 }}>
            {params.row.is_verified && <VerifiedIcon color="secondary" />}
          </Box>
        </>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 210,
      headerAlign: "center",
      align: "center",
      // renderCell: (params) => params.row.id.slice(0, 3),
    },
    { field: "email", headerName: "Email", width: 110 },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "",
      headerName: <SettingsIcon />,
      with: 110,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton color="moreBtn" onClick={() => setOpenDropDown(true)}>
          <MoreVertIcon />
        </IconButton>
      ),
      sortable: false,
    },
  ];

  return (
    <Box sx={{ p: 6, mx: 6 }}>
      {error && <Alert severity="error">{error.message}</Alert>}
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              label="Search"
              sx={{ flexGrow: 1 }}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <Button
              color="secondary"
              variant="outlined"
              sx={{ mx: 2, p: 1.25 }}
              aria-label="create profile"
              onClick={() => setOpenCreatePro(true)}
            >
              <PersonAddIcon sx={{ mr: 1 }} />
              Create Profile
            </Button>
          </Box>
          <CreateProfile open={openCreatePro} setOpen={setOpenCreatePro} />

          <DataGrid
            columns={columns}
            rows={rows || []}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            disableMultipleRowSelection={true}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = profiles.filter((row) =>
                selectedIDs.has(row.id)
              );

              setSelectedRows(selectedRows);
            }}
          />
          <DropDown
            selectedRows={selectedRows}
            open={openDropDown}
            setOpen={setOpenDropDown}
          />
        </>
      )}
    </Box>
  );
}

export default Home;
