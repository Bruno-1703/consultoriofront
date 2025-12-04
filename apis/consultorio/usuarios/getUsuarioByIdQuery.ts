import gql from "graphql-tag";

const getUsuarioByIdQuery = gql`
  query getUsuarioById($id: String!) {
    getUsuarioById(id: $id) {
      id_Usuario
      nombre_usuario
      email
      nombre_completo
      especialidad
      matricula
      telefono
      dni
      rol_usuario
      # agrega más campos si querés
    }
  }
`;

export default getUsuarioByIdQuery;
