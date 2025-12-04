import gql from "graphql-tag";

const EliminarMedicamento = gql`
mutation DeleteMedicamento($id: String!) {
  deleteMedicamento(id: $id)
}

`;
