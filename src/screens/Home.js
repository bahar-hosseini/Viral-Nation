import { gql, useQuery } from "@apollo/client";

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

function Home() {
  const { loading, error, data } = useQuery(COLLECTIONS, {
    variables: {
      orderBy: { key: "is_verified", sort: "desc" },
      rows: 90,
      page: 0,
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
      <ul>
        {data.getAllProfiles.profiles.map((profile) => (
          <li key={profile.id}>
            {profile.id}: {profile.first_name} {profile.last_name} -{" "}
            {profile.email} -{profile.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
