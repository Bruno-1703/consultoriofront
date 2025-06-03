import gql from "graphql-tag";

const AumentarStock = gql`
  mutation AumentarStock($medicamentoId: String!, $cantidad: Int!) {
    aumentarStock(medicamentoId: $medicamentoId, cantidad: $cantidad)
  }
`;
