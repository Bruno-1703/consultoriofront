import gql from "graphql-tag";
const PacientesQuery = gql`
  query getEnfermedadById($id: String!) {
    getEnfermedadById(id: $id) {
      ...Enfermedad
    }
  }
`;
