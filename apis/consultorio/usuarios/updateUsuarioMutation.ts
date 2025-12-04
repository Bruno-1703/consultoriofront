import gql from "graphql-tag";

const updateUsuarioMutation = gql`
  mutation updateUsuario($usuarioId: String!, $data: UsuarioInput!) {
    updateUsuario(usuarioId: $usuarioId, data: $data)
  }
`;

export default updateUsuarioMutation;
