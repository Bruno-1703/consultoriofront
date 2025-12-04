import gql from "graphql-tag";

const citasQuery = gql`
query getUsuarios($limit: Int!, $skip: Int!, $where: UsuarioWhereInput) {
  getUsuarios(limit: $limit, skip: $skip,  where: $where) {
    edges {
        node {
        id_Usuario
        nombre_usuario
        email
        rol_usuario
        nombre_completo
        dni
        telefono
        especialidad
        matricula
      }
    }
    aggregate {
      count
   
    }
  }
}
`;
export default citasQuery;
