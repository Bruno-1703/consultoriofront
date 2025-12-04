import gql from "graphql-tag";

export default gql`
  mutation CreateEstudio($data: EstudioInput!, $idCita: String!) {
    createEstudio(data: $data, idCita: $idCita)
  }
`;
