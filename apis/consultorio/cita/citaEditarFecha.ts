import gql from "graphql-tag";

export default gql`
  # Mutación para actualizar solo la fecha programada de una cita.
  # El tipo 'DateTime' debe ser el mismo que usaste en tu Input de NestJS/GraphQL.
  mutation ReprogramarCita(
    $citaId: String!, 
    $fechaProgramada: DateTime!
    $registradoPorId: String
  ) {
    reprogramarCita(
      citaId: $citaId,
      data: {
        fechaProgramada: $fechaProgramada
        registradoPorId: $registradoPorId # Opcional: si quieres registrar el usuario en la auditoría
      }
    )
  }
`;