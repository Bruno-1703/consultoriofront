import gql from "graphql-tag";

export default gql`
mutation EditarFechaCita(
  $citaId: String!
  $fechaProgramada: DateTime!
) {
  reprogramarCita(
    citaId: $citaId
    fechaProgramada: $fechaProgramada
  )
}
`;
