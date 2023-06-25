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
import styled from "@emotion/styled";

import useGetAllProfiles from "../hooks/useGetAllProfiles";
import CreateProfile from "../components/CreateProfile";
import DropDown from "../components/DropDown";
import { useDebounce } from "../hooks/useDebounce";

function Home() {
  const [search, setSearch] = useState("");
  const { loading, error, data } = useGetAllProfiles(search);
  const { profiles } = data?.getAllProfiles || {};

  const [rows, setRows] = useState(profiles);

  const [openCreatePro, setOpenCreatePro] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);

  const pageSize = 10;

  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: pageSize,
    page: 0,
  });

  useEffect(() => {
    if (data && data.getAllProfiles) {
      setRows(data.getAllProfiles.profiles);
    }
  }, [data]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      setSearch(debouncedSearch);
    } else {
      setRows(data && data.getAllProfiles ? data.getAllProfiles.profiles : []);
    }
  }, [debouncedSearch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const columns = [
    {
      field: "first_name",
      headerName: "Name",
      headerAlign: "center",
      width: 300,
      cellClassName: "super-app-theme--cell",
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
      field: "none",
      headerName: <SettingsIcon color="morebtn" />,
      with: 50,
      align: "center",
      headerAlign: "center",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => (
        <IconButton color="moreBtn" onClick={() => setOpenDropDown(true)}>
          <MoreVertIcon />
        </IconButton>
      ),
      sortable: false,
    },
  ];

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,

    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${
        theme.palette.mode === "light" ? "#f7f7f7" : "#363636"
      }`,
    },
  }));

  return (
    <Box sx={{ p: 6, mx: 6 }}>
      {error && <Alert severity="error">{error.message}</Alert>}
      {loading && <LinearProgress color="secondary" />}

      <>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            color="secondary"
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
        <Box
          sx={{
            "& .super-app-theme--cell": {
              backgroundColor: "primary.light",
              fontWeight: "400",
              border: "none",
              boxShadow: 1,
            },
            "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
              borderBottom: "0px solid primary",
            },
          }}
        >
          <StyledDataGrid
            columns={columns}
            rows={rows || []}
            disableMultipleRowSelection={true}
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = profiles.filter((row) =>
                selectedIDs.has(row.id)
              );

              setSelectedRows(selectedRows);
            }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, pageSize]}
            autoHeight
          />
        </Box>
        <DropDown
          selectedRows={selectedRows}
          open={openDropDown}
          setOpen={setOpenDropDown}
        />
      </>
    </Box>
  );
}

export default Home;
