import gql from "graphql-tag";

export default gql`
  mutation updateEnfermedad($data: EnfermedadInput!, $enfermedadId: String!) {
    updateEnfermedad(data: $data, enfermedadId: $enfermedadId)
  }
`;
