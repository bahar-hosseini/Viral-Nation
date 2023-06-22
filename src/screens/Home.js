import { Avatar, Box, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";

import useGetAllProfiles from "../hooks/useGetAllProfiles";
import { useState, useEffect } from "react";

function Home() {
  const { loading, error, data } = useGetAllProfiles();
  const { profiles } = data?.getAllProfiles || {};

  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(profiles);

  useEffect(() => {
    if (profiles) {
      if (search) {
        setRows(
          profiles.filter((row) =>
            row.first_name.toLowerCase().includes(search)
          )
        );
      } else {
        setRows(profiles);
      }
    }
  }, [search, profiles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const columns = [
    {
      field: "first_name",
      headerName: "Name",
      width: 400,
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
      width: 110,
      renderCell: (params) => params.row.id.slice(0, 3),
    },
    { field: "email", headerName: "Email", width: 110 },
    { field: "description", headerName: "Description", width: 300 },
    {
      headerName: <SettingsIcon />,
      renderCell: (params) => <MoreVertIcon />,
      sortable: false,
    },
  ];

  return (
    <Box sx={{ p: 6, mx: 6 }}>
      <TextField
        label="Search"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <DataGrid
        columns={columns}
        rows={rows || []}
        pageSizeOptions={[10, 25, 50]}
        pageSize={10}
      />
    </Box>
  );
}

export default Home;
