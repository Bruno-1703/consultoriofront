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
        id_Usuario
        nombre_usuario
        email
        especialidad
        matricula
        dni} 
  
      }      
    }
    aggregate {
      count
   
    }
  }
}
`;
export default citasQuery;
