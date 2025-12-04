import gql from "graphql-tag";

export default gql`
  mutation FinalizarCita($id: String!) {
    finalizarCita(id: $id)
  }
`;
