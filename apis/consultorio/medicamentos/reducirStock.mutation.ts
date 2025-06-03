import gql from "graphql-tag";

const ReducirStock = gql`
  mutation ReducirStock($medicamentoId: String!, $cantidad: Int!) {
    reducirStock(medicamentoId: $medicamentoId, cantidad: $cantidad)
  }
`;
