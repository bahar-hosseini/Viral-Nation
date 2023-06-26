import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $isVerified: Boolean!
    $imageUrl: String!
    $description: String!
  ) {
    createProfile(
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

const useCreateProfile = (onSuccess) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [createProfile, { loading }] = useMutation(CREATE_PROFILE_MUTATION);
  const handleCreateProfile = () => {
    setError(null);
    createProfile({
      variables: {
        firstName,
        lastName,
        email,
        isVerified,
        imageUrl,
        description,
      },
    })
      .then((response) => {
        onSuccess();
        setSuccess(
          `Profile of ${response.data.createProfile.firstName} has been created.`
        );
        window.location.reload();
      })
      .catch((error) => {
        setError(
          `An error occurred during creating the profile. the error is ${error}`
        );
      });
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    isVerified,
    setIsVerified,
    imageUrl,
    setImageUrl,
    description,
    setDescription,
    handleCreateProfile,
    error,
    success,
    loading,
  };
};

export default useCreateProfile;
