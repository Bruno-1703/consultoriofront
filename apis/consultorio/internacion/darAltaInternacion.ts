import gql from "graphql-tag";

export const DAR_ALTA_INTERNACION = gql`
  mutation darAltaInternacion($data: AltaInternacionInput!) {
    darAltaInternacion(data: $data)
  }
`;
