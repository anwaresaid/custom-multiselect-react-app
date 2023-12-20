import { gql } from "@apollo/client";

export const GET_DATA_QUERY = gql`
  query GetCharactersByPartialName($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        species
        image
        episode {
          id
        }
      }
    }
  }
`;
