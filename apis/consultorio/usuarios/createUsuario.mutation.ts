import { gql } from "@apollo/client";

export const CREATE_USUARIO_MUTATION = gql`
  mutation CreateUsuario($data: UsuarioInput!) {
    createUsuario(data: $data)
  }
`;
