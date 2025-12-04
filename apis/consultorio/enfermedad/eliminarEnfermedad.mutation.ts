import gql from "graphql-tag";
export default gql`
  mutation deleteEnfermedad($id: String!) {
    deleteEnfermedad(id: $id)
  }
`;