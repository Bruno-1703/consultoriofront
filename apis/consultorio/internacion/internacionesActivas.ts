import gql from "graphql-tag";

export const INTERNACIONES_ACTIVAS = gql`
  query internacionesActivas {
    internacionesActivas {
      id_internacion
      fecha_ingreso
      diagnostico
      paciente {
        nombre_paciente
        apellido_paciente
      }
      cama {
        numero
      }
    }
  }
`;
