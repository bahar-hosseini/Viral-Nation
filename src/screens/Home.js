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

  const PAGE_SIZE = 10;

  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

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
          <Box
            sx={{
              "& .super-app-theme--cell": {
                backgroundColor: "primary.light",
                fontWeight: "400",
                boxShadow: 2,
              },
              "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
                borderBottom: "1px solid primary",
                boarderTop: "0",
              },
            }}
          >
            <DataGrid
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
              pageSizeOptions={[5, PAGE_SIZE]}
            />
          </Box>
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
