import gql from "graphql-tag";

export const UpdateMedicamento = gql`
  mutation UpdateMedicamento($medicamentoId: String!, $data: MedicamentoInput!) {
    updateMedicamento(medicamentoId: $medicamentoId, data: $data)
  }
`;
