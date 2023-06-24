import React, { useState } from "react";
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

  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);
  const handleCreateProfile = () => {
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
        console.log("Profile created:", response.data.createProfile);
        onSuccess();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
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
  };
};

export default useCreateProfile;
