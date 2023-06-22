import { gql, useQuery } from "@apollo/client";
import { Avatar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const COLLECTIONS = gql`
  query GetAllProfiles(
    $orderBy: globalOrderBy
    $searchString: String
    $rows: Int
    $page: Int
  ) {
    getAllProfiles(
      orderBy: $orderBy
      searchString: $searchString
      rows: $rows
      page: $page
    ) {
      size
      profiles {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }
  }
`;

const columns = [
  {
    field: "first_name",
    headerName: "Name",
    width: 250,
    renderCell: (params) => (
      <>
        <Avatar src={params.row.image_url} alt="profile image" width={70} />

        <Typography>
          {params.row.first_name} {params.row.last_name}
        </Typography>
      </>
    ),
  },
  {
    field: "id",
    headerName: "ID",
  },
  { field: "email", headerName: "Email" },
  { field: "description", headerName: "Description", width: 400 },
];

function Home() {
  const [tableData, setTableData] = useState([]);
  const { loading, error, data } = useQuery(COLLECTIONS, {
    variables: {
      orderBy: { key: "is_verified", sort: "desc" },
      rows: 1000,
      // page: ,
      searchString: "",
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log("test app", data["getAllProfiles"]["profiles"]);
  return (
    <div>
      <h1>All Profiles</h1>
      {/* <ul>
        {data.getAllProfiles.profiles.map((profile) => (
          <li key={profile.id}>
            {profile.id}: {profile.first_name} {profile.last_name} -{" "}
            {profile.email} -{profile.description}
          </li>
        ))}
      </ul> */}
      <DataGrid
        columns={columns}
        rows={data.getAllProfiles.profiles}
        pageSize={10}
      />
    </div>
  );
}

export default Home;
