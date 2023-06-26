import { useMutation, gql } from "@apollo/client";

const useEditProfile = () => {
  const EDIT_PROFILE_MUTATION = gql`
    mutation UpdateProfile(
      $updateProfileId: String!
      $firstName: String!
      $lastName: String!
      $email: String!
      $isVerified: Boolean!
      $imageUrl: String!
      $description: String!
    ) {
      updateProfile(
        id: $updateProfileId
        first_name: $firstName
        last_name: $lastName
        email: $email
        is_verified: $isVerified
        image_url: $imageUrl
        description: $description
      ) {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }
  `;

  const [editProfileMutation, { loading }] = useMutation(EDIT_PROFILE_MUTATION);

  const editProfile = (
    profileId,
    firstName,
    lastName,
    email,
    isVerified,
    imageUrl,
    description
  ) => {
    return editProfileMutation({
      variables: {
        updateProfileId: profileId,
        firstName,
        lastName,
        email,
        isVerified,
        imageUrl,
        description,
      },
    });
  };

  return { editProfile, loading };
};

export default useEditProfile;
