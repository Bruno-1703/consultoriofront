import gql from "graphql-tag";

export default gql`
  query GetPacientePorDNI($dni: String!) {
    getPacientePorDNI(dni: $dni) {
      id_paciente
      dni
      nombre_paciente
      apellido_paciente
      telefono
      email
     edad
      altura
      sexo
      grupo_sanguineo
      alergias
      obra_social
     direccion
      nacionalidad
    }
  }
`;