import gql from "graphql-tag";

const citasQuery = gql`
query getCitas($limit: Int!, $skip: Int!, $where: CitaWhereInput) {
  getCitas(limit: $limit, skip: $skip,  where: $where) {
    edges {
      node {     
      id_cita   
        observaciones
        cancelada    
        finalizada
        fechaProgramada
        motivoConsulta 
        enfermedades{
          nombre_enf
          id_enfermedad
        }
       medicamentos{
        id_medicamento
        nombre_med
      }
        paciente{
          dni
          id_paciente
          nombre_paciente
        }
        estudios{
        fecha_realizacion
        codigo_referencia
        medico_solicitante
        tipo_estudio
        resultado
        }      
  
      }      
    }
    aggregate {
      count
   
    }
  }
}
`;
export default citasQuery;
