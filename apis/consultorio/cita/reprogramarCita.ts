
import gql from "graphql-tag";

export default gql`
mutation ReprogramarCita($citaId: String!, $fechaProgramada: DateTime!) {
  reprogramarCita(
    citaId: $citaId
    fechaProgramada: $fechaProgramada
  )
}

  `;
