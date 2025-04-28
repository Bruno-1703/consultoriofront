import gql from "graphql-tag";

export default gql`
  mutation CreateCitaMedicamento($citaId: String!, $medicamentos: [MedicamentoInput!]!) {
    createCitaMedicamento(citaId: $citaId, medicamentos: $medicamentos)
  }
`;
