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
        fechaSolicitud        
        motivoConsulta  
        paciente{
          dni
          id_paciente
          nombre_paciente
          apellido_paciente  
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
