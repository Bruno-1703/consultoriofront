import { gql } from '@apollo/client';

export const CARGAR_DIAGNOSTICO_CITA = gql`
  mutation CargarDiagnosticoCita($citaId: String!, $diagnostico: String!) {
    cargarDiagnosticoCita(
      citaId: $citaId
      data: { diagnostico: $diagnostico }
    )
  }
`;
