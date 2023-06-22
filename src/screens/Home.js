import { Avatar, Box, Typography, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";

import useGetAllProfiles from "../hooks/useGetAllProfiles";

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

function Home() {
  const { loading, error, data } = useGetAllProfiles();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box sx={{ p: 6, mx: 6 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataGrid
            columns={columns}
            rows={data?.getAllProfiles?.profiles || []}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            ColumnWidth="*"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
