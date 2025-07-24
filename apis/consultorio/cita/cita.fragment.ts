import gql from "graphql-tag";

export default gql`
    fragment Cita on Cita {
      id_cita
    motivoConsulta 
    fechaProgramada
    observaciones
    cancelada,    
    medicamentos{
      id_medicamento
      nombre_med
      }
      enfermedades{
        id_enfermedad
        nombre_enf
      }  
      paciente {
          id_paciente
          nombre_paciente
          dni          
        }
           doctor{
        id_Usuario
        nombre_usuario
        email
        especialidad
        matricula
        dni}
  
  }
`;
