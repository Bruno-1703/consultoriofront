import gql from "graphql-tag";

export const CENTRO_FIELDS = gql`
    fragment CentroFields on CentroSalud {
    id
    nombre
    tipo
    direccion
  }
`;
