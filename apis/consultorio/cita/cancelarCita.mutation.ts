import gql from "graphql-tag";

export default gql`
  mutation CancelarCita($id: String!) {
    cancelarCita(id: $id)
  }
`;
