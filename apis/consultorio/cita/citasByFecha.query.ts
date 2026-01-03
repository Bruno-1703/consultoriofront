import gql from "graphql-tag";
const citasQuery = gql`
query getCitasByFecha($limit: Int!, $skip: Int!, $where: CitaWhereInput) {
  getCitasByFecha(limit: $limit, skip: $skip,  where: $where) {
    edges {
      node {     
      id_cita   
        observaciones
        cancelada    
        finalizada
        fechaProgramada
        motivoConsulta   
        paciente{
          dni
          id_paciente
          nombre_paciente
          apellido_paciente  
        }  
       doctor
        {
        nombre_usuario
        email
        especialidad
        matricula
        dni
        telefono
        nombre_completo
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
