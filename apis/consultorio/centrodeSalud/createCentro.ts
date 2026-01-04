import gql from "graphql-tag";

export default gql`
mutation CreateCentro($data: CentroSaludInput!) {
  createCentro(data: $data) {
    id
    nombre
    tipo
    direccion
  }
}  `;

