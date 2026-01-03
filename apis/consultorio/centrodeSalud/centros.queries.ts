import gql from "graphql-tag";

export const GET_CENTROS = gql`
query getCentros($skip: Int, $limit: Int, $where: CentroSaludWhereInput) {
  getCentros(skip: $skip, limit: $limit, where: $where) {
    aggregate {
      count
    }
    edges {
      node {
        id
        nombre
        tipo
        direccion
      }
    }
  }
}
`;