import gql from "graphql-tag";

export const INTERNAR_PACIENTE = gql`
  mutation internarPaciente($data: CreateInternacionInput!) {
    internarPaciente(data: $data)
  }
`;
