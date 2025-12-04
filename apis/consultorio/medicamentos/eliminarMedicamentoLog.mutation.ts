import gql from "graphql-tag";

const EliminarMedicamentoLog = gql`
mutation DeleteMedicamentoLog($id: String!) {
  deleteMedicamentoLog(id: $id)
}

`;
