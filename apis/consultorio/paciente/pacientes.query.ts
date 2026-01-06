import gql from "graphql-tag";

const pacientesQuery = gql`
  query getPacientes($limit: Int, $skip: Int, $where: PacienteWhereInput) {
    getPacientes(limit: $limit, skip: $skip, where: $where) {
      edges {
        node {
          id_paciente
          nombre_paciente
          apellido_paciente
          dni
          telefono
          edad
          altura
          telefono
          fecha_nacimiento
          sexo
          grupo_sanguineo
          alergias
          obra_social
          email
          direccion
          nacionalidad
          eliminadoLog
        }
      }
      aggregate {
        count
      }
    }
  }
`;

export default pacientesQuery;