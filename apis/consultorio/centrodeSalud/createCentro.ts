import gql from "graphql-tag";

export const CREATE_CENTRO = gql`
  mutation CreateCentro($data: CentroSaludInput!) {
    createCentro(data: $data) {
  id
  nombre
  tipo
  direccion
}

  }
`;
