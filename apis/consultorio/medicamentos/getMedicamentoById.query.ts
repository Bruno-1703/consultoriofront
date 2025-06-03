import gql from "graphql-tag";

export const GetMedicamento = gql`
  query GetMedicamento($id: String!) {
    getMedicamento(id: $id) {
      id_medicamento
      nombre_med
      marca
      fecha_vencimiento
      dosis_hs
      agente_principal
      efectos_secundarios
      lista_negra
      categoria
      contraindicaciones
      prescripcion_requerida
    }
  }
`;
