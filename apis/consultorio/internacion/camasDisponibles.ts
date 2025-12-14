import gql from "graphql-tag";

export const CAMAS_DISPONIBLES = gql`
  query camasDisponibles {
    camasDisponibles {
      id_cama
      numero
      disponible
      pabellon {
        nombre
      }
    }
  }
`;
