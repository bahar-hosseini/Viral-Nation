import { gql, useQuery } from "@apollo/client";

const useGetAllProfiles = () => {
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

  const { loading, error, data } = useQuery(COLLECTIONS, {
    variables: {
      orderBy: { key: "is_verified", sort: "desc" },
      rows: 100000,
      // page: 0,
      searchString: "",
    },
  });

  return { loading, error, data };
};

export default useGetAllProfiles;
