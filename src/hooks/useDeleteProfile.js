import { useMutation, gql } from "@apollo/client";

const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfile($deleteProfileId: String!) {
    deleteProfile(id: $deleteProfileId)
  }
`;

const useDeleteProfile = (onDelete) => {
  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION);

  const handleDeleteProfile = (profileId) => {
    deleteProfile({ variables: { deleteProfileId: profileId } })
      .then(() => {
        console.log("Profile deleted");
        onDelete();
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
      });
  };

  return handleDeleteProfile;
};

export default useDeleteProfile;
