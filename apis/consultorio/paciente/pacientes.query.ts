import gql from "graphql-tag";

const pacientesQuery = gql`
query getPacientes($limit: Int, $skip: Int, $where: PacienteWhereInput) {
  getPacientes(limit: $limit, skip: $skip,  where: $where) {
    edges {
      node { 
      ...Paciente 
      }
    }
    aggregate {
      count
   
    }
  }
}
`;
export default pacientesQuery;
