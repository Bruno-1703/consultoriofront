import gql from "graphql-tag";

export default gql`
  fragment Paciente on Paciente {
    id_paciente
    dni
    nombre_paciente
    apellido_paciente
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
`;

