 import gql from "graphql-tag";
 
 export default gql`
query GetCentros($skip: Int, $limit: Int, $where: CentroSaludWhereInput) {
  getCentros(skip: $skip, limit: $limit, where: $where) {
    edges {
      cursor
      node {
        id
        nombre
        tipo
        direccion
      }
    }
    aggregate {
      count
    }
  }
}

  `;
