import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {"context":{"clientName":"consultorioLink"}} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AggregateCount = {
  __typename?: 'AggregateCount';
  count: Scalars['Float']['output'];
};

export type AltaInternacionInput = {
  id_internacion: Scalars['String']['input'];
  observaciones_alta?: InputMaybe<Scalars['String']['input']>;
};

export type Cama = {
  __typename?: 'Cama';
  disponible: Scalars['Boolean']['output'];
  id_cama: Scalars['ID']['output'];
  numero: Scalars['String']['output'];
  pabellon?: Maybe<Pabellon>;
};

export type Cita = {
  __typename?: 'Cita';
  cancelada?: Maybe<Scalars['Boolean']['output']>;
  doctor?: Maybe<Usuario>;
  enfermedades?: Maybe<Array<Enfermedad>>;
  estudios?: Maybe<Array<Estudio>>;
  fechaProgramada?: Maybe<Scalars['String']['output']>;
  finalizada?: Maybe<Scalars['Boolean']['output']>;
  id_cita?: Maybe<Scalars['ID']['output']>;
  medicamentos?: Maybe<Array<Medicamento>>;
  modificadoPorId?: Maybe<Scalars['ID']['output']>;
  motivoConsulta: Scalars['String']['output'];
  observaciones?: Maybe<Scalars['String']['output']>;
  paciente?: Maybe<Paciente>;
  registradoPorId?: Maybe<Scalars['ID']['output']>;
};

export type CitaEdge = {
  __typename?: 'CitaEdge';
  cursor: Scalars['String']['output'];
  node: Cita;
};

export type CitaInput = {
  doctor?: InputMaybe<UsuarioCitaInput>;
  fechaProgramada?: InputMaybe<Scalars['DateTime']['input']>;
  finalizada?: InputMaybe<Scalars['Boolean']['input']>;
  id_cita?: InputMaybe<Scalars['ID']['input']>;
  motivoConsulta?: InputMaybe<Scalars['String']['input']>;
  observaciones?: InputMaybe<Scalars['String']['input']>;
  paciente?: InputMaybe<PacienteCitaInput>;
  registradoPorId?: InputMaybe<Scalars['ID']['input']>;
};

export type CitaResultadoBusqueda = {
  __typename?: 'CitaResultadoBusqueda';
  aggregate: AggregateCount;
  edges: Array<CitaEdge>;
};

export type CitaWhereInput = {
  buscar?: InputMaybe<Scalars['String']['input']>;
  cancelada?: InputMaybe<Scalars['Boolean']['input']>;
  doctor?: InputMaybe<UsuarioCitaInput>;
  enfermedades?: InputMaybe<Array<EnfermedadInput>>;
  estudios?: InputMaybe<Array<EstudioInput>>;
  fechaProgramada?: InputMaybe<Scalars['DateTime']['input']>;
  finalizada?: InputMaybe<Scalars['Boolean']['input']>;
  id_cita?: InputMaybe<Scalars['ID']['input']>;
  medicamentos?: InputMaybe<Array<MedicamentoInput>>;
  motivoConsulta?: InputMaybe<Scalars['String']['input']>;
  observaciones?: InputMaybe<Scalars['String']['input']>;
  paciente?: InputMaybe<PacienteCitaInput>;
  registradoPorId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInternacionInput = {
  camaId: Scalars['String']['input'];
  diagnostico?: InputMaybe<Scalars['String']['input']>;
  observaciones?: InputMaybe<Scalars['String']['input']>;
  pacienteId: Scalars['String']['input'];
};

export type Enfermedad = {
  __typename?: 'Enfermedad';
  gravedad?: Maybe<Scalars['String']['output']>;
  id_enfermedad?: Maybe<Scalars['String']['output']>;
  nombre_enf: Scalars['String']['output'];
  sintomas?: Maybe<Scalars['String']['output']>;
};

export type EnfermedadEdge = {
  __typename?: 'EnfermedadEdge';
  cursor: Scalars['String']['output'];
  node: Enfermedad;
};

export type EnfermedadInput = {
  gravedad?: InputMaybe<Scalars['String']['input']>;
  id_enfermedad?: InputMaybe<Scalars['String']['input']>;
  nombre_enf?: InputMaybe<Scalars['String']['input']>;
  sintomas?: InputMaybe<Scalars['String']['input']>;
};

export type EnfermedadResultadoBusqueda = {
  __typename?: 'EnfermedadResultadoBusqueda';
  aggregate: AggregateCount;
  edges: Array<EnfermedadEdge>;
};

export type EnfermedadWhereInput = {
  gravedad?: InputMaybe<Scalars['String']['input']>;
  id_enfermedad?: InputMaybe<Scalars['String']['input']>;
  nombre_enf?: InputMaybe<Scalars['String']['input']>;
  sintomas?: InputMaybe<Scalars['String']['input']>;
};

export type Estudio = {
  __typename?: 'Estudio';
  codigo_referencia?: Maybe<Scalars['String']['output']>;
  fecha_realizacion?: Maybe<Scalars['DateTime']['output']>;
  id_estudio?: Maybe<Scalars['ID']['output']>;
  medico_solicitante: Scalars['String']['output'];
  observaciones?: Maybe<Scalars['String']['output']>;
  resultado?: Maybe<Scalars['String']['output']>;
  tipo_estudio?: Maybe<Scalars['String']['output']>;
  urgente?: Maybe<Scalars['Boolean']['output']>;
};

export type EstudioEdge = {
  __typename?: 'EstudioEdge';
  cursor: Scalars['String']['output'];
  node: Estudio;
};

export type EstudioInput = {
  codigo_referencia?: InputMaybe<Scalars['String']['input']>;
  fecha_realizacion?: InputMaybe<Scalars['DateTime']['input']>;
  id_estudio?: InputMaybe<Scalars['ID']['input']>;
  medico_solicitante?: InputMaybe<Scalars['String']['input']>;
  observaciones?: InputMaybe<Scalars['String']['input']>;
  resultado?: InputMaybe<Scalars['String']['input']>;
  tipo_estudio?: InputMaybe<Scalars['String']['input']>;
  urgente?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EstudioResultadoBusqueda = {
  __typename?: 'EstudioResultadoBusqueda';
  aggregate: AggregateCount;
  edges: Array<EstudioEdge>;
};

export type EstudioWhereInput = {
  codigo_referencia?: InputMaybe<Scalars['String']['input']>;
  fecha_realizacion?: InputMaybe<Scalars['DateTime']['input']>;
  id_estudio?: InputMaybe<Scalars['ID']['input']>;
  resultado?: InputMaybe<Scalars['String']['input']>;
  tipo_estudio?: InputMaybe<Scalars['String']['input']>;
};

export type HistorialInternacion = {
  __typename?: 'HistorialInternacion';
  cama: Cama;
  diagnostico: Scalars['String']['output'];
  fecha_alta?: Maybe<Scalars['DateTime']['output']>;
  fecha_ingreso: Scalars['DateTime']['output'];
  id_internacion: Scalars['ID']['output'];
  observaciones?: Maybe<Scalars['String']['output']>;
};

export type Internacion = {
  __typename?: 'Internacion';
  activa: Scalars['Boolean']['output'];
  cama: Cama;
  diagnostico: Scalars['String']['output'];
  fecha_alta?: Maybe<Scalars['DateTime']['output']>;
  fecha_ingreso: Scalars['DateTime']['output'];
  id_internacion: Scalars['ID']['output'];
  observaciones?: Maybe<Scalars['String']['output']>;
  paciente: Paciente;
};

export type Medicamento = {
  __typename?: 'Medicamento';
  agente_principal?: Maybe<Scalars['String']['output']>;
  categoria?: Maybe<Scalars['String']['output']>;
  contraindicaciones?: Maybe<Scalars['String']['output']>;
  dosis_hs?: Maybe<Scalars['String']['output']>;
  efectos_secundarios?: Maybe<Scalars['String']['output']>;
  eliminadoLog?: Maybe<Scalars['Boolean']['output']>;
  fecha_vencimiento?: Maybe<Scalars['DateTime']['output']>;
  id_medicamento?: Maybe<Scalars['ID']['output']>;
  lista_negra?: Maybe<Scalars['Boolean']['output']>;
  marca?: Maybe<Scalars['String']['output']>;
  nombre_med?: Maybe<Scalars['String']['output']>;
  prescripcion_requerida?: Maybe<Scalars['Boolean']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
};

export type MedicamentoEdge = {
  __typename?: 'MedicamentoEdge';
  cursor: Scalars['String']['output'];
  node: Medicamento;
};

export type MedicamentoInput = {
  agente_principal?: InputMaybe<Scalars['String']['input']>;
  categoria?: InputMaybe<Scalars['String']['input']>;
  contraindicaciones?: InputMaybe<Scalars['String']['input']>;
  dosis_hs?: InputMaybe<Scalars['String']['input']>;
  efectos_secundarios?: InputMaybe<Scalars['String']['input']>;
  fecha_vencimiento?: InputMaybe<Scalars['DateTime']['input']>;
  id_medicamento?: InputMaybe<Scalars['ID']['input']>;
  lista_negra?: InputMaybe<Scalars['Boolean']['input']>;
  marca?: InputMaybe<Scalars['String']['input']>;
  nombre_med?: InputMaybe<Scalars['String']['input']>;
  prescripcion_requerida?: InputMaybe<Scalars['Boolean']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type MedicamentoResultadoBusqueda = {
  __typename?: 'MedicamentoResultadoBusqueda';
  aggregate: AggregateCount;
  edges: Array<MedicamentoEdge>;
};

export type MedicamentoWhereInput = {
  agente_principal?: InputMaybe<Scalars['String']['input']>;
  categoria?: InputMaybe<Scalars['String']['input']>;
  contraindicaciones?: InputMaybe<Scalars['String']['input']>;
  dosis_hs?: InputMaybe<Scalars['String']['input']>;
  efectos_secundarios?: InputMaybe<Scalars['String']['input']>;
  eliminadoLog?: InputMaybe<Scalars['Boolean']['input']>;
  fecha_vencimiento?: InputMaybe<Scalars['DateTime']['input']>;
  id_medicamento?: InputMaybe<Scalars['ID']['input']>;
  lista_negra?: InputMaybe<Scalars['Boolean']['input']>;
  marca?: InputMaybe<Scalars['String']['input']>;
  nombre_med?: InputMaybe<Scalars['String']['input']>;
  prescripcion_requerida?: InputMaybe<Scalars['Boolean']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  ElimiarPacienteLog: Scalars['String']['output'];
  EliminarPaciente: Scalars['String']['output'];
  aumentarStock: Scalars['String']['output'];
  cancelarCita: Scalars['String']['output'];
  createCita: Scalars['String']['output'];
  createCitaEnfermedad: Scalars['String']['output'];
  createCitaEstudio: Scalars['String']['output'];
  createCitaMedicamento: Scalars['String']['output'];
  createEnfermedad: Scalars['String']['output'];
  createEstudio: Scalars['String']['output'];
  createMedicamento: Scalars['String']['output'];
  createPaciente: Scalars['String']['output'];
  createUsuario: Scalars['String']['output'];
  darAltaInternacion: Scalars['String']['output'];
  deleteEnfermedad: Scalars['String']['output'];
  deleteMedicamento: Scalars['String']['output'];
  deleteMedicamentoLog: Scalars['String']['output'];
  deleteUsuario: Scalars['String']['output'];
  finalizarCita: Scalars['String']['output'];
  internarPaciente: Scalars['String']['output'];
  reducirStock: Scalars['String']['output'];
  resetearPassword: Scalars['String']['output'];
  solicitarRecuperacionPassword: Scalars['String']['output'];
  updateCita: Scalars['String']['output'];
  updateEnfermedad: Scalars['String']['output'];
  updateEstudio: Scalars['String']['output'];
  updateInternacion: Scalars['String']['output'];
  updateMedicamento: Scalars['String']['output'];
  updatePaciente: Scalars['String']['output'];
  updateUsuario: Scalars['String']['output'];
};


export type MutationElimiarPacienteLogArgs = {
  pacienteId: Scalars['String']['input'];
};


export type MutationEliminarPacienteArgs = {
  pacienteId: Scalars['String']['input'];
};


export type MutationAumentarStockArgs = {
  cantidad: Scalars['Int']['input'];
  medicamentoId: Scalars['String']['input'];
};


export type MutationCancelarCitaArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateCitaArgs = {
  data: CitaInput;
  paciente: PacienteCitaInput;
};


export type MutationCreateCitaEnfermedadArgs = {
  citaId: Scalars['String']['input'];
  enfermedades: Array<EnfermedadInput>;
};


export type MutationCreateCitaEstudioArgs = {
  citaId: Scalars['String']['input'];
  estudios: Array<EstudioInput>;
};


export type MutationCreateCitaMedicamentoArgs = {
  citaId: Scalars['String']['input'];
  medicamentos: Array<MedicamentoInput>;
};


export type MutationCreateEnfermedadArgs = {
  data: EnfermedadInput;
};


export type MutationCreateEstudioArgs = {
  data: EstudioInput;
  idCita: Scalars['String']['input'];
};


export type MutationCreateMedicamentoArgs = {
  data: MedicamentoInput;
};


export type MutationCreatePacienteArgs = {
  data: PacienteInput;
};


export type MutationCreateUsuarioArgs = {
  data: UsuarioInput;
};


export type MutationDarAltaInternacionArgs = {
  data: AltaInternacionInput;
};


export type MutationDeleteEnfermedadArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMedicamentoArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMedicamentoLogArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUsuarioArgs = {
  id: Scalars['String']['input'];
};


export type MutationFinalizarCitaArgs = {
  id: Scalars['String']['input'];
};


export type MutationInternarPacienteArgs = {
  data: CreateInternacionInput;
};


export type MutationReducirStockArgs = {
  cantidad: Scalars['Int']['input'];
  medicamentoId: Scalars['String']['input'];
};


export type MutationResetearPasswordArgs = {
  nuevaPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSolicitarRecuperacionPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateCitaArgs = {
  citaId: Scalars['String']['input'];
  data: CitaInput;
};


export type MutationUpdateEnfermedadArgs = {
  data: EnfermedadInput;
  enfermedadId: Scalars['String']['input'];
};


export type MutationUpdateEstudioArgs = {
  data: EstudioInput;
  estudioId: Scalars['String']['input'];
};


export type MutationUpdateInternacionArgs = {
  data: UpdateInternacionInput;
};


export type MutationUpdateMedicamentoArgs = {
  data: MedicamentoInput;
  medicamentoId: Scalars['String']['input'];
};


export type MutationUpdatePacienteArgs = {
  data: PacienteInput;
  pacienteId: Scalars['String']['input'];
};


export type MutationUpdateUsuarioArgs = {
  data: UsuarioInput;
  usuarioId: Scalars['String']['input'];
};

export type Pabellon = {
  __typename?: 'Pabellon';
  descripcion?: Maybe<Scalars['String']['output']>;
  id_pabellon: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
};

export type Paciente = {
  __typename?: 'Paciente';
  alergias?: Maybe<Scalars['String']['output']>;
  altura?: Maybe<Scalars['Int']['output']>;
  apellido_paciente?: Maybe<Scalars['String']['output']>;
  direccion?: Maybe<Scalars['String']['output']>;
  dni?: Maybe<Scalars['String']['output']>;
  edad?: Maybe<Scalars['Int']['output']>;
  eliminadoLog?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fecha_nacimiento?: Maybe<Scalars['DateTime']['output']>;
  grupo_sanguineo?: Maybe<Scalars['String']['output']>;
  id_paciente?: Maybe<Scalars['ID']['output']>;
  nacionalidad?: Maybe<Scalars['String']['output']>;
  nombre_paciente?: Maybe<Scalars['String']['output']>;
  obra_social?: Maybe<Scalars['String']['output']>;
  sexo?: Maybe<Scalars['String']['output']>;
  telefono?: Maybe<Scalars['String']['output']>;
};

export type PacienteCitaInput = {
  apellido_paciente?: InputMaybe<Scalars['String']['input']>;
  dni?: InputMaybe<Scalars['String']['input']>;
  id_paciente?: InputMaybe<Scalars['ID']['input']>;
  nombre_paciente?: InputMaybe<Scalars['String']['input']>;
};

export type PacienteEdge = {
  __typename?: 'PacienteEdge';
  cursor: Scalars['String']['output'];
  node: Paciente;
};

export type PacienteInput = {
  alergias?: InputMaybe<Scalars['String']['input']>;
  altura?: InputMaybe<Scalars['Int']['input']>;
  apellido_paciente?: InputMaybe<Scalars['String']['input']>;
  direccion?: InputMaybe<Scalars['String']['input']>;
  dni?: InputMaybe<Scalars['String']['input']>;
  edad?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fecha_nacimiento?: InputMaybe<Scalars['DateTime']['input']>;
  grupo_sanguineo?: InputMaybe<Scalars['String']['input']>;
  nacionalidad?: InputMaybe<Scalars['String']['input']>;
  nombre_paciente?: InputMaybe<Scalars['String']['input']>;
  obra_social?: InputMaybe<Scalars['String']['input']>;
  sexo?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type PacienteWhereInput = {
  alergias?: InputMaybe<Scalars['String']['input']>;
  altura?: InputMaybe<Scalars['Int']['input']>;
  apellido_paciente?: InputMaybe<Scalars['String']['input']>;
  direccion?: InputMaybe<Scalars['String']['input']>;
  dni?: InputMaybe<Scalars['String']['input']>;
  edad?: InputMaybe<Scalars['Int']['input']>;
  eliminadoLog?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fecha_nacimiento?: InputMaybe<Scalars['DateTime']['input']>;
  grupo_sanguineo?: InputMaybe<Scalars['String']['input']>;
  id_paciente?: InputMaybe<Scalars['String']['input']>;
  nacionalidad?: InputMaybe<Scalars['String']['input']>;
  nombre_paciente?: InputMaybe<Scalars['String']['input']>;
  obra_social?: InputMaybe<Scalars['String']['input']>;
  sexo?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type PacientesResultadoBusqueda = {
  __typename?: 'PacientesResultadoBusqueda';
  aggregate: AggregateCount;
  edges: Array<PacienteEdge>;
};

export type Query = {
  __typename?: 'Query';
  camasDisponibles: Array<Cama>;
  getCita?: Maybe<Cita>;
  getCitas: CitaResultadoBusqueda;
  getCitasByFecha: CitaResultadoBusqueda;
  getEnfermedadById?: Maybe<Enfermedad>;
  getEnfermedades: EnfermedadResultadoBusqueda;
  getEstudio?: Maybe<Estudio>;
  getEstudios: EstudioResultadoBusqueda;
  getMedicamento?: Maybe<Medicamento>;
  getMedicamentos: MedicamentoResultadoBusqueda;
  getPaciente?: Maybe<Paciente>;
  getPacientes: PacientesResultadoBusqueda;
  getStock: Scalars['Float']['output'];
  getUsuario?: Maybe<Usuario>;
  getUsuarioById?: Maybe<Usuario>;
  getUsuarios: UsuarioResultadoBusqueda;
  historialInternacionPaciente: Array<HistorialInternacion>;
  internacionesActivas: Array<Internacion>;
  testInternacion: Scalars['String']['output'];
};


export type QueryGetCitaArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCitasArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CitaWhereInput>;
};


export type QueryGetCitasByFechaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CitaWhereInput>;
};


export type QueryGetEnfermedadByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetEnfermedadesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EnfermedadWhereInput>;
};


export type QueryGetEstudioArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetEstudiosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EstudioWhereInput>;
};


export type QueryGetMedicamentoArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetMedicamentosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MedicamentoWhereInput>;
};


export type QueryGetPacienteArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPacientesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PacienteWhereInput>;
};


export type QueryGetStockArgs = {
  medicamentoId: Scalars['String']['input'];
};


export type QueryGetUsuarioArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUsuarioByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUsuariosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UsuarioWhereInput>;
};


export type QueryHistorialInternacionPacienteArgs = {
  pacienteId: Scalars['String']['input'];
};

export type UpdateInternacionInput = {
  diagnostico?: InputMaybe<Scalars['String']['input']>;
  id_internacion: Scalars['String']['input'];
  observaciones?: InputMaybe<Scalars['String']['input']>;
};

export type Usuario = {
  __typename?: 'Usuario';
  deletLogico?: Maybe<Scalars['Boolean']['output']>;
  dni?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  especialidad?: Maybe<Scalars['String']['output']>;
  id_Usuario: Scalars['String']['output'];
  matricula?: Maybe<Scalars['String']['output']>;
  nombre_completo?: Maybe<Scalars['String']['output']>;
  nombre_usuario?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  rol_usuario?: Maybe<Scalars['String']['output']>;
  telefono?: Maybe<Scalars['String']['output']>;
};

export type UsuarioCitaInput = {
  dni?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  especialidad?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  matricula?: InputMaybe<Scalars['String']['input']>;
  nombre_completo?: InputMaybe<Scalars['String']['input']>;
  nombre_usuario?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  rol_usuario?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type UsuarioEdge = {
  __typename?: 'UsuarioEdge';
  cursor: Scalars['String']['output'];
  node: Usuario;
};

export type UsuarioInput = {
  dni: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  especialidad: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  matricula: Scalars['String']['input'];
  nombre_completo: Scalars['String']['input'];
  nombre_usuario: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  rol_usuario?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type UsuarioResultadoBusqueda = {
  __typename?: 'UsuarioResultadoBusqueda';
  aggregate: AggregateCount;
  edges: Array<UsuarioEdge>;
};

export type UsuarioWhereInput = {
  deletLogico?: InputMaybe<Scalars['Boolean']['input']>;
  dni?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  especialidad?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  matricula?: InputMaybe<Scalars['String']['input']>;
  nombre_completo?: InputMaybe<Scalars['String']['input']>;
  nombre_usuario?: InputMaybe<Scalars['String']['input']>;
  rol_usuario?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export const CitaFragmentDoc = gql`
    fragment Cita on Cita {
  id_cita
  motivoConsulta
  fechaProgramada
  observaciones
  cancelada
  medicamentos {
    id_medicamento
    nombre_med
  }
  enfermedades {
    id_enfermedad
    nombre_enf
  }
  paciente {
    id_paciente
    nombre_paciente
    dni
  }
  doctor {
    id_Usuario
    nombre_usuario
    nombre_completo
    email
    especialidad
    matricula
    dni
    telefono
  }
}
    `;
export const EnfermedadFragmentDoc = gql`
    fragment Enfermedad on Enfermedad {
  id_enfermedad
  nombre_enf
  sintomas
  gravedad
}
    `;
export const EstudioFragmentDoc = gql`
    fragment Estudio on Estudio {
  id_estudio
  fecha_realizacion
  tipo_estudio
  resultado
  codigo_referencia
  observaciones
  medico_solicitante
  urgente
}
    `;
export const MedicamentoFragmentDoc = gql`
    fragment Medicamento on Medicamento {
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
  stock
}
    `;
export const PacienteFragmentDoc = gql`
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
export const CancelarCitaDocument = gql`
    mutation CancelarCita($id: String!) {
  cancelarCita(id: $id)
}
    `;
export type CancelarCitaMutationFn = Apollo.MutationFunction<CancelarCitaMutation, CancelarCitaMutationVariables>;

/**
 * __useCancelarCitaMutation__
 *
 * To run a mutation, you first call `useCancelarCitaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelarCitaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelarCitaMutation, { data, loading, error }] = useCancelarCitaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelarCitaMutation(baseOptions?: Apollo.MutationHookOptions<CancelarCitaMutation, CancelarCitaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelarCitaMutation, CancelarCitaMutationVariables>(CancelarCitaDocument, options);
      }
export type CancelarCitaMutationHookResult = ReturnType<typeof useCancelarCitaMutation>;
export type CancelarCitaMutationResult = Apollo.MutationResult<CancelarCitaMutation>;
export type CancelarCitaMutationOptions = Apollo.BaseMutationOptions<CancelarCitaMutation, CancelarCitaMutationVariables>;
export const GetCitaDocument = gql`
    query getCita($id: String!) {
  getCita(id: $id) {
    ...Cita
  }
}
    ${CitaFragmentDoc}`;

/**
 * __useGetCitaQuery__
 *
 * To run a query within a React component, call `useGetCitaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCitaQuery(baseOptions: Apollo.QueryHookOptions<GetCitaQuery, GetCitaQueryVariables> & ({ variables: GetCitaQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitaQuery, GetCitaQueryVariables>(GetCitaDocument, options);
      }
export function useGetCitaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitaQuery, GetCitaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitaQuery, GetCitaQueryVariables>(GetCitaDocument, options);
        }
export function useGetCitaSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCitaQuery, GetCitaQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitaQuery, GetCitaQueryVariables>(GetCitaDocument, options);
        }
export type GetCitaQueryHookResult = ReturnType<typeof useGetCitaQuery>;
export type GetCitaLazyQueryHookResult = ReturnType<typeof useGetCitaLazyQuery>;
export type GetCitaSuspenseQueryHookResult = ReturnType<typeof useGetCitaSuspenseQuery>;
export type GetCitaQueryResult = Apollo.QueryResult<GetCitaQuery, GetCitaQueryVariables>;
export const GetCitasDocument = gql`
    query getCitas($limit: Int!, $skip: Int!, $where: CitaWhereInput) {
  getCitas(limit: $limit, skip: $skip, where: $where) {
    edges {
      node {
        id_cita
        observaciones
        cancelada
        finalizada
        fechaProgramada
        motivoConsulta
        enfermedades {
          nombre_enf
          id_enfermedad
        }
        medicamentos {
          id_medicamento
          nombre_med
        }
        paciente {
          dni
          id_paciente
          nombre_paciente
        }
        estudios {
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

/**
 * __useGetCitasQuery__
 *
 * To run a query within a React component, call `useGetCitasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitasQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCitasQuery(baseOptions: Apollo.QueryHookOptions<GetCitasQuery, GetCitasQueryVariables> & ({ variables: GetCitasQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitasQuery, GetCitasQueryVariables>(GetCitasDocument, options);
      }
export function useGetCitasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitasQuery, GetCitasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitasQuery, GetCitasQueryVariables>(GetCitasDocument, options);
        }
export function useGetCitasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCitasQuery, GetCitasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitasQuery, GetCitasQueryVariables>(GetCitasDocument, options);
        }
export type GetCitasQueryHookResult = ReturnType<typeof useGetCitasQuery>;
export type GetCitasLazyQueryHookResult = ReturnType<typeof useGetCitasLazyQuery>;
export type GetCitasSuspenseQueryHookResult = ReturnType<typeof useGetCitasSuspenseQuery>;
export type GetCitasQueryResult = Apollo.QueryResult<GetCitasQuery, GetCitasQueryVariables>;
export const GetCitasByFechaDocument = gql`
    query getCitasByFecha($limit: Int!, $skip: Int!, $where: CitaWhereInput) {
  getCitasByFecha(limit: $limit, skip: $skip, where: $where) {
    edges {
      node {
        id_cita
        observaciones
        cancelada
        finalizada
        fechaProgramada
        motivoConsulta
        registradoPorId
        paciente {
          dni
          id_paciente
          nombre_paciente
          apellido_paciente
        }
        doctor {
          id_Usuario
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

/**
 * __useGetCitasByFechaQuery__
 *
 * To run a query within a React component, call `useGetCitasByFechaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitasByFechaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitasByFechaQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCitasByFechaQuery(baseOptions: Apollo.QueryHookOptions<GetCitasByFechaQuery, GetCitasByFechaQueryVariables> & ({ variables: GetCitasByFechaQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitasByFechaQuery, GetCitasByFechaQueryVariables>(GetCitasByFechaDocument, options);
      }
export function useGetCitasByFechaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitasByFechaQuery, GetCitasByFechaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitasByFechaQuery, GetCitasByFechaQueryVariables>(GetCitasByFechaDocument, options);
        }
export function useGetCitasByFechaSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCitasByFechaQuery, GetCitasByFechaQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitasByFechaQuery, GetCitasByFechaQueryVariables>(GetCitasByFechaDocument, options);
        }
export type GetCitasByFechaQueryHookResult = ReturnType<typeof useGetCitasByFechaQuery>;
export type GetCitasByFechaLazyQueryHookResult = ReturnType<typeof useGetCitasByFechaLazyQuery>;
export type GetCitasByFechaSuspenseQueryHookResult = ReturnType<typeof useGetCitasByFechaSuspenseQuery>;
export type GetCitasByFechaQueryResult = Apollo.QueryResult<GetCitasByFechaQuery, GetCitasByFechaQueryVariables>;
export const CreateCitaDocument = gql`
    mutation createCita($data: CitaInput!, $paciente: PacienteCitaInput!) {
  createCita(data: $data, paciente: $paciente)
}
    `;
export type CreateCitaMutationFn = Apollo.MutationFunction<CreateCitaMutation, CreateCitaMutationVariables>;

/**
 * __useCreateCitaMutation__
 *
 * To run a mutation, you first call `useCreateCitaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCitaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCitaMutation, { data, loading, error }] = useCreateCitaMutation({
 *   variables: {
 *      data: // value for 'data'
 *      paciente: // value for 'paciente'
 *   },
 * });
 */
export function useCreateCitaMutation(baseOptions?: Apollo.MutationHookOptions<CreateCitaMutation, CreateCitaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCitaMutation, CreateCitaMutationVariables>(CreateCitaDocument, options);
      }
export type CreateCitaMutationHookResult = ReturnType<typeof useCreateCitaMutation>;
export type CreateCitaMutationResult = Apollo.MutationResult<CreateCitaMutation>;
export type CreateCitaMutationOptions = Apollo.BaseMutationOptions<CreateCitaMutation, CreateCitaMutationVariables>;
export const CreateCitaEnfermedadDocument = gql`
    mutation CreateCitaEnfermedad($citaId: String!, $enfermedades: [EnfermedadInput!]!) {
  createCitaEnfermedad(citaId: $citaId, enfermedades: $enfermedades)
}
    `;
export type CreateCitaEnfermedadMutationFn = Apollo.MutationFunction<CreateCitaEnfermedadMutation, CreateCitaEnfermedadMutationVariables>;

/**
 * __useCreateCitaEnfermedadMutation__
 *
 * To run a mutation, you first call `useCreateCitaEnfermedadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCitaEnfermedadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCitaEnfermedadMutation, { data, loading, error }] = useCreateCitaEnfermedadMutation({
 *   variables: {
 *      citaId: // value for 'citaId'
 *      enfermedades: // value for 'enfermedades'
 *   },
 * });
 */
export function useCreateCitaEnfermedadMutation(baseOptions?: Apollo.MutationHookOptions<CreateCitaEnfermedadMutation, CreateCitaEnfermedadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCitaEnfermedadMutation, CreateCitaEnfermedadMutationVariables>(CreateCitaEnfermedadDocument, options);
      }
export type CreateCitaEnfermedadMutationHookResult = ReturnType<typeof useCreateCitaEnfermedadMutation>;
export type CreateCitaEnfermedadMutationResult = Apollo.MutationResult<CreateCitaEnfermedadMutation>;
export type CreateCitaEnfermedadMutationOptions = Apollo.BaseMutationOptions<CreateCitaEnfermedadMutation, CreateCitaEnfermedadMutationVariables>;
export const CreateCitaEstudioDocument = gql`
    mutation createCitaEstudio($citaId: String!, $estudios: [EstudioInput!]!) {
  createCitaEstudio(citaId: $citaId, estudios: $estudios)
}
    `;
export type CreateCitaEstudioMutationFn = Apollo.MutationFunction<CreateCitaEstudioMutation, CreateCitaEstudioMutationVariables>;

/**
 * __useCreateCitaEstudioMutation__
 *
 * To run a mutation, you first call `useCreateCitaEstudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCitaEstudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCitaEstudioMutation, { data, loading, error }] = useCreateCitaEstudioMutation({
 *   variables: {
 *      citaId: // value for 'citaId'
 *      estudios: // value for 'estudios'
 *   },
 * });
 */
export function useCreateCitaEstudioMutation(baseOptions?: Apollo.MutationHookOptions<CreateCitaEstudioMutation, CreateCitaEstudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCitaEstudioMutation, CreateCitaEstudioMutationVariables>(CreateCitaEstudioDocument, options);
      }
export type CreateCitaEstudioMutationHookResult = ReturnType<typeof useCreateCitaEstudioMutation>;
export type CreateCitaEstudioMutationResult = Apollo.MutationResult<CreateCitaEstudioMutation>;
export type CreateCitaEstudioMutationOptions = Apollo.BaseMutationOptions<CreateCitaEstudioMutation, CreateCitaEstudioMutationVariables>;
export const CreateCitaMedicamentoDocument = gql`
    mutation CreateCitaMedicamento($citaId: String!, $medicamentos: [MedicamentoInput!]!) {
  createCitaMedicamento(citaId: $citaId, medicamentos: $medicamentos)
}
    `;
export type CreateCitaMedicamentoMutationFn = Apollo.MutationFunction<CreateCitaMedicamentoMutation, CreateCitaMedicamentoMutationVariables>;

/**
 * __useCreateCitaMedicamentoMutation__
 *
 * To run a mutation, you first call `useCreateCitaMedicamentoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCitaMedicamentoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCitaMedicamentoMutation, { data, loading, error }] = useCreateCitaMedicamentoMutation({
 *   variables: {
 *      citaId: // value for 'citaId'
 *      medicamentos: // value for 'medicamentos'
 *   },
 * });
 */
export function useCreateCitaMedicamentoMutation(baseOptions?: Apollo.MutationHookOptions<CreateCitaMedicamentoMutation, CreateCitaMedicamentoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCitaMedicamentoMutation, CreateCitaMedicamentoMutationVariables>(CreateCitaMedicamentoDocument, options);
      }
export type CreateCitaMedicamentoMutationHookResult = ReturnType<typeof useCreateCitaMedicamentoMutation>;
export type CreateCitaMedicamentoMutationResult = Apollo.MutationResult<CreateCitaMedicamentoMutation>;
export type CreateCitaMedicamentoMutationOptions = Apollo.BaseMutationOptions<CreateCitaMedicamentoMutation, CreateCitaMedicamentoMutationVariables>;
export const FinalizarCitaDocument = gql`
    mutation FinalizarCita($id: String!) {
  finalizarCita(id: $id)
}
    `;
export type FinalizarCitaMutationFn = Apollo.MutationFunction<FinalizarCitaMutation, FinalizarCitaMutationVariables>;

/**
 * __useFinalizarCitaMutation__
 *
 * To run a mutation, you first call `useFinalizarCitaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinalizarCitaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finalizarCitaMutation, { data, loading, error }] = useFinalizarCitaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFinalizarCitaMutation(baseOptions?: Apollo.MutationHookOptions<FinalizarCitaMutation, FinalizarCitaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinalizarCitaMutation, FinalizarCitaMutationVariables>(FinalizarCitaDocument, options);
      }
export type FinalizarCitaMutationHookResult = ReturnType<typeof useFinalizarCitaMutation>;
export type FinalizarCitaMutationResult = Apollo.MutationResult<FinalizarCitaMutation>;
export type FinalizarCitaMutationOptions = Apollo.BaseMutationOptions<FinalizarCitaMutation, FinalizarCitaMutationVariables>;
export const CreateEnfermedadDocument = gql`
    mutation createEnfermedad($data: EnfermedadInput!) {
  createEnfermedad(data: $data)
}
    `;
export type CreateEnfermedadMutationFn = Apollo.MutationFunction<CreateEnfermedadMutation, CreateEnfermedadMutationVariables>;

/**
 * __useCreateEnfermedadMutation__
 *
 * To run a mutation, you first call `useCreateEnfermedadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEnfermedadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEnfermedadMutation, { data, loading, error }] = useCreateEnfermedadMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEnfermedadMutation(baseOptions?: Apollo.MutationHookOptions<CreateEnfermedadMutation, CreateEnfermedadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEnfermedadMutation, CreateEnfermedadMutationVariables>(CreateEnfermedadDocument, options);
      }
export type CreateEnfermedadMutationHookResult = ReturnType<typeof useCreateEnfermedadMutation>;
export type CreateEnfermedadMutationResult = Apollo.MutationResult<CreateEnfermedadMutation>;
export type CreateEnfermedadMutationOptions = Apollo.BaseMutationOptions<CreateEnfermedadMutation, CreateEnfermedadMutationVariables>;
export const DeleteEnfermedadDocument = gql`
    mutation deleteEnfermedad($id: String!) {
  deleteEnfermedad(id: $id)
}
    `;
export type DeleteEnfermedadMutationFn = Apollo.MutationFunction<DeleteEnfermedadMutation, DeleteEnfermedadMutationVariables>;

/**
 * __useDeleteEnfermedadMutation__
 *
 * To run a mutation, you first call `useDeleteEnfermedadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEnfermedadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEnfermedadMutation, { data, loading, error }] = useDeleteEnfermedadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEnfermedadMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEnfermedadMutation, DeleteEnfermedadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEnfermedadMutation, DeleteEnfermedadMutationVariables>(DeleteEnfermedadDocument, options);
      }
export type DeleteEnfermedadMutationHookResult = ReturnType<typeof useDeleteEnfermedadMutation>;
export type DeleteEnfermedadMutationResult = Apollo.MutationResult<DeleteEnfermedadMutation>;
export type DeleteEnfermedadMutationOptions = Apollo.BaseMutationOptions<DeleteEnfermedadMutation, DeleteEnfermedadMutationVariables>;
export const GetEnfermedadesDocument = gql`
    query getEnfermedades($limit: Int!, $skip: Int!, $where: EnfermedadWhereInput) {
  getEnfermedades(limit: $limit, skip: $skip, where: $where) {
    edges {
      node {
        ...Enfermedad
      }
    }
    aggregate {
      count
    }
  }
}
    ${EnfermedadFragmentDoc}`;

/**
 * __useGetEnfermedadesQuery__
 *
 * To run a query within a React component, call `useGetEnfermedadesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnfermedadesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnfermedadesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetEnfermedadesQuery(baseOptions: Apollo.QueryHookOptions<GetEnfermedadesQuery, GetEnfermedadesQueryVariables> & ({ variables: GetEnfermedadesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEnfermedadesQuery, GetEnfermedadesQueryVariables>(GetEnfermedadesDocument, options);
      }
export function useGetEnfermedadesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEnfermedadesQuery, GetEnfermedadesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEnfermedadesQuery, GetEnfermedadesQueryVariables>(GetEnfermedadesDocument, options);
        }
export function useGetEnfermedadesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEnfermedadesQuery, GetEnfermedadesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEnfermedadesQuery, GetEnfermedadesQueryVariables>(GetEnfermedadesDocument, options);
        }
export type GetEnfermedadesQueryHookResult = ReturnType<typeof useGetEnfermedadesQuery>;
export type GetEnfermedadesLazyQueryHookResult = ReturnType<typeof useGetEnfermedadesLazyQuery>;
export type GetEnfermedadesSuspenseQueryHookResult = ReturnType<typeof useGetEnfermedadesSuspenseQuery>;
export type GetEnfermedadesQueryResult = Apollo.QueryResult<GetEnfermedadesQuery, GetEnfermedadesQueryVariables>;
export const GetEnfermedadByIdDocument = gql`
    query getEnfermedadById($id: String!) {
  getEnfermedadById(id: $id) {
    ...Enfermedad
  }
}
    ${EnfermedadFragmentDoc}`;

/**
 * __useGetEnfermedadByIdQuery__
 *
 * To run a query within a React component, call `useGetEnfermedadByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnfermedadByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnfermedadByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEnfermedadByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEnfermedadByIdQuery, GetEnfermedadByIdQueryVariables> & ({ variables: GetEnfermedadByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEnfermedadByIdQuery, GetEnfermedadByIdQueryVariables>(GetEnfermedadByIdDocument, options);
      }
export function useGetEnfermedadByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEnfermedadByIdQuery, GetEnfermedadByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEnfermedadByIdQuery, GetEnfermedadByIdQueryVariables>(GetEnfermedadByIdDocument, options);
        }
export function useGetEnfermedadByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEnfermedadByIdQuery, GetEnfermedadByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEnfermedadByIdQuery, GetEnfermedadByIdQueryVariables>(GetEnfermedadByIdDocument, options);
        }
export type GetEnfermedadByIdQueryHookResult = ReturnType<typeof useGetEnfermedadByIdQuery>;
export type GetEnfermedadByIdLazyQueryHookResult = ReturnType<typeof useGetEnfermedadByIdLazyQuery>;
export type GetEnfermedadByIdSuspenseQueryHookResult = ReturnType<typeof useGetEnfermedadByIdSuspenseQuery>;
export type GetEnfermedadByIdQueryResult = Apollo.QueryResult<GetEnfermedadByIdQuery, GetEnfermedadByIdQueryVariables>;
export const UpdateEnfermedadDocument = gql`
    mutation updateEnfermedad($data: EnfermedadInput!, $enfermedadId: String!) {
  updateEnfermedad(data: $data, enfermedadId: $enfermedadId)
}
    `;
export type UpdateEnfermedadMutationFn = Apollo.MutationFunction<UpdateEnfermedadMutation, UpdateEnfermedadMutationVariables>;

/**
 * __useUpdateEnfermedadMutation__
 *
 * To run a mutation, you first call `useUpdateEnfermedadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEnfermedadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEnfermedadMutation, { data, loading, error }] = useUpdateEnfermedadMutation({
 *   variables: {
 *      data: // value for 'data'
 *      enfermedadId: // value for 'enfermedadId'
 *   },
 * });
 */
export function useUpdateEnfermedadMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEnfermedadMutation, UpdateEnfermedadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEnfermedadMutation, UpdateEnfermedadMutationVariables>(UpdateEnfermedadDocument, options);
      }
export type UpdateEnfermedadMutationHookResult = ReturnType<typeof useUpdateEnfermedadMutation>;
export type UpdateEnfermedadMutationResult = Apollo.MutationResult<UpdateEnfermedadMutation>;
export type UpdateEnfermedadMutationOptions = Apollo.BaseMutationOptions<UpdateEnfermedadMutation, UpdateEnfermedadMutationVariables>;
export const CreateEstudioDocument = gql`
    mutation CreateEstudio($data: EstudioInput!, $idCita: String!) {
  createEstudio(data: $data, idCita: $idCita)
}
    `;
export type CreateEstudioMutationFn = Apollo.MutationFunction<CreateEstudioMutation, CreateEstudioMutationVariables>;

/**
 * __useCreateEstudioMutation__
 *
 * To run a mutation, you first call `useCreateEstudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEstudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEstudioMutation, { data, loading, error }] = useCreateEstudioMutation({
 *   variables: {
 *      data: // value for 'data'
 *      idCita: // value for 'idCita'
 *   },
 * });
 */
export function useCreateEstudioMutation(baseOptions?: Apollo.MutationHookOptions<CreateEstudioMutation, CreateEstudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEstudioMutation, CreateEstudioMutationVariables>(CreateEstudioDocument, options);
      }
export type CreateEstudioMutationHookResult = ReturnType<typeof useCreateEstudioMutation>;
export type CreateEstudioMutationResult = Apollo.MutationResult<CreateEstudioMutation>;
export type CreateEstudioMutationOptions = Apollo.BaseMutationOptions<CreateEstudioMutation, CreateEstudioMutationVariables>;
export const GetEstudiosDocument = gql`
    query getEstudios($limit: Int!, $skip: Int!, $where: EstudioWhereInput) {
  getEstudios(limit: $limit, skip: $skip, where: $where) {
    edges {
      node {
        ...Estudio
      }
    }
    aggregate {
      count
    }
  }
}
    ${EstudioFragmentDoc}`;

/**
 * __useGetEstudiosQuery__
 *
 * To run a query within a React component, call `useGetEstudiosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEstudiosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEstudiosQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetEstudiosQuery(baseOptions: Apollo.QueryHookOptions<GetEstudiosQuery, GetEstudiosQueryVariables> & ({ variables: GetEstudiosQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEstudiosQuery, GetEstudiosQueryVariables>(GetEstudiosDocument, options);
      }
export function useGetEstudiosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEstudiosQuery, GetEstudiosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEstudiosQuery, GetEstudiosQueryVariables>(GetEstudiosDocument, options);
        }
export function useGetEstudiosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEstudiosQuery, GetEstudiosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEstudiosQuery, GetEstudiosQueryVariables>(GetEstudiosDocument, options);
        }
export type GetEstudiosQueryHookResult = ReturnType<typeof useGetEstudiosQuery>;
export type GetEstudiosLazyQueryHookResult = ReturnType<typeof useGetEstudiosLazyQuery>;
export type GetEstudiosSuspenseQueryHookResult = ReturnType<typeof useGetEstudiosSuspenseQuery>;
export type GetEstudiosQueryResult = Apollo.QueryResult<GetEstudiosQuery, GetEstudiosQueryVariables>;
export const UpdateEstudioDocument = gql`
    mutation UpdateEstudio($data: EstudioInput!, $estudioId: String!) {
  updateEstudio(data: $data, estudioId: $estudioId)
}
    `;
export type UpdateEstudioMutationFn = Apollo.MutationFunction<UpdateEstudioMutation, UpdateEstudioMutationVariables>;

/**
 * __useUpdateEstudioMutation__
 *
 * To run a mutation, you first call `useUpdateEstudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEstudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEstudioMutation, { data, loading, error }] = useUpdateEstudioMutation({
 *   variables: {
 *      data: // value for 'data'
 *      estudioId: // value for 'estudioId'
 *   },
 * });
 */
export function useUpdateEstudioMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEstudioMutation, UpdateEstudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEstudioMutation, UpdateEstudioMutationVariables>(UpdateEstudioDocument, options);
      }
export type UpdateEstudioMutationHookResult = ReturnType<typeof useUpdateEstudioMutation>;
export type UpdateEstudioMutationResult = Apollo.MutationResult<UpdateEstudioMutation>;
export type UpdateEstudioMutationOptions = Apollo.BaseMutationOptions<UpdateEstudioMutation, UpdateEstudioMutationVariables>;
export const CamasDisponiblesDocument = gql`
    query camasDisponibles {
  camasDisponibles {
    id_cama
    numero
    disponible
    pabellon {
      nombre
    }
  }
}
    `;

/**
 * __useCamasDisponiblesQuery__
 *
 * To run a query within a React component, call `useCamasDisponiblesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCamasDisponiblesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCamasDisponiblesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCamasDisponiblesQuery(baseOptions?: Apollo.QueryHookOptions<CamasDisponiblesQuery, CamasDisponiblesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CamasDisponiblesQuery, CamasDisponiblesQueryVariables>(CamasDisponiblesDocument, options);
      }
export function useCamasDisponiblesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CamasDisponiblesQuery, CamasDisponiblesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CamasDisponiblesQuery, CamasDisponiblesQueryVariables>(CamasDisponiblesDocument, options);
        }
export function useCamasDisponiblesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CamasDisponiblesQuery, CamasDisponiblesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CamasDisponiblesQuery, CamasDisponiblesQueryVariables>(CamasDisponiblesDocument, options);
        }
export type CamasDisponiblesQueryHookResult = ReturnType<typeof useCamasDisponiblesQuery>;
export type CamasDisponiblesLazyQueryHookResult = ReturnType<typeof useCamasDisponiblesLazyQuery>;
export type CamasDisponiblesSuspenseQueryHookResult = ReturnType<typeof useCamasDisponiblesSuspenseQuery>;
export type CamasDisponiblesQueryResult = Apollo.QueryResult<CamasDisponiblesQuery, CamasDisponiblesQueryVariables>;
export const DarAltaInternacionDocument = gql`
    mutation darAltaInternacion($data: AltaInternacionInput!) {
  darAltaInternacion(data: $data)
}
    `;
export type DarAltaInternacionMutationFn = Apollo.MutationFunction<DarAltaInternacionMutation, DarAltaInternacionMutationVariables>;

/**
 * __useDarAltaInternacionMutation__
 *
 * To run a mutation, you first call `useDarAltaInternacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDarAltaInternacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [darAltaInternacionMutation, { data, loading, error }] = useDarAltaInternacionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDarAltaInternacionMutation(baseOptions?: Apollo.MutationHookOptions<DarAltaInternacionMutation, DarAltaInternacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DarAltaInternacionMutation, DarAltaInternacionMutationVariables>(DarAltaInternacionDocument, options);
      }
export type DarAltaInternacionMutationHookResult = ReturnType<typeof useDarAltaInternacionMutation>;
export type DarAltaInternacionMutationResult = Apollo.MutationResult<DarAltaInternacionMutation>;
export type DarAltaInternacionMutationOptions = Apollo.BaseMutationOptions<DarAltaInternacionMutation, DarAltaInternacionMutationVariables>;
export const InternacionesActivasDocument = gql`
    query internacionesActivas {
  internacionesActivas {
    id_internacion
    fecha_ingreso
    diagnostico
    paciente {
      nombre_paciente
      apellido_paciente
    }
    cama {
      numero
    }
  }
}
    `;

/**
 * __useInternacionesActivasQuery__
 *
 * To run a query within a React component, call `useInternacionesActivasQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternacionesActivasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternacionesActivasQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternacionesActivasQuery(baseOptions?: Apollo.QueryHookOptions<InternacionesActivasQuery, InternacionesActivasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternacionesActivasQuery, InternacionesActivasQueryVariables>(InternacionesActivasDocument, options);
      }
export function useInternacionesActivasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternacionesActivasQuery, InternacionesActivasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternacionesActivasQuery, InternacionesActivasQueryVariables>(InternacionesActivasDocument, options);
        }
export function useInternacionesActivasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InternacionesActivasQuery, InternacionesActivasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InternacionesActivasQuery, InternacionesActivasQueryVariables>(InternacionesActivasDocument, options);
        }
export type InternacionesActivasQueryHookResult = ReturnType<typeof useInternacionesActivasQuery>;
export type InternacionesActivasLazyQueryHookResult = ReturnType<typeof useInternacionesActivasLazyQuery>;
export type InternacionesActivasSuspenseQueryHookResult = ReturnType<typeof useInternacionesActivasSuspenseQuery>;
export type InternacionesActivasQueryResult = Apollo.QueryResult<InternacionesActivasQuery, InternacionesActivasQueryVariables>;
export const InternarPacienteDocument = gql`
    mutation internarPaciente($data: CreateInternacionInput!) {
  internarPaciente(data: $data)
}
    `;
export type InternarPacienteMutationFn = Apollo.MutationFunction<InternarPacienteMutation, InternarPacienteMutationVariables>;

/**
 * __useInternarPacienteMutation__
 *
 * To run a mutation, you first call `useInternarPacienteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternarPacienteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internarPacienteMutation, { data, loading, error }] = useInternarPacienteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInternarPacienteMutation(baseOptions?: Apollo.MutationHookOptions<InternarPacienteMutation, InternarPacienteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternarPacienteMutation, InternarPacienteMutationVariables>(InternarPacienteDocument, options);
      }
export type InternarPacienteMutationHookResult = ReturnType<typeof useInternarPacienteMutation>;
export type InternarPacienteMutationResult = Apollo.MutationResult<InternarPacienteMutation>;
export type InternarPacienteMutationOptions = Apollo.BaseMutationOptions<InternarPacienteMutation, InternarPacienteMutationVariables>;
export const CreateMedicamentoDocument = gql`
    mutation CreateMedicamento($data: MedicamentoInput!) {
  createMedicamento(data: $data)
}
    `;
export type CreateMedicamentoMutationFn = Apollo.MutationFunction<CreateMedicamentoMutation, CreateMedicamentoMutationVariables>;

/**
 * __useCreateMedicamentoMutation__
 *
 * To run a mutation, you first call `useCreateMedicamentoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMedicamentoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMedicamentoMutation, { data, loading, error }] = useCreateMedicamentoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMedicamentoMutation(baseOptions?: Apollo.MutationHookOptions<CreateMedicamentoMutation, CreateMedicamentoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMedicamentoMutation, CreateMedicamentoMutationVariables>(CreateMedicamentoDocument, options);
      }
export type CreateMedicamentoMutationHookResult = ReturnType<typeof useCreateMedicamentoMutation>;
export type CreateMedicamentoMutationResult = Apollo.MutationResult<CreateMedicamentoMutation>;
export type CreateMedicamentoMutationOptions = Apollo.BaseMutationOptions<CreateMedicamentoMutation, CreateMedicamentoMutationVariables>;
export const DeleteMedicamentoDocument = gql`
    mutation DeleteMedicamento($id: String!) {
  deleteMedicamento(id: $id)
}
    `;
export type DeleteMedicamentoMutationFn = Apollo.MutationFunction<DeleteMedicamentoMutation, DeleteMedicamentoMutationVariables>;

/**
 * __useDeleteMedicamentoMutation__
 *
 * To run a mutation, you first call `useDeleteMedicamentoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMedicamentoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMedicamentoMutation, { data, loading, error }] = useDeleteMedicamentoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMedicamentoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMedicamentoMutation, DeleteMedicamentoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMedicamentoMutation, DeleteMedicamentoMutationVariables>(DeleteMedicamentoDocument, options);
      }
export type DeleteMedicamentoMutationHookResult = ReturnType<typeof useDeleteMedicamentoMutation>;
export type DeleteMedicamentoMutationResult = Apollo.MutationResult<DeleteMedicamentoMutation>;
export type DeleteMedicamentoMutationOptions = Apollo.BaseMutationOptions<DeleteMedicamentoMutation, DeleteMedicamentoMutationVariables>;
export const DeleteMedicamentoLogDocument = gql`
    mutation DeleteMedicamentoLog($id: String!) {
  deleteMedicamentoLog(id: $id)
}
    `;
export type DeleteMedicamentoLogMutationFn = Apollo.MutationFunction<DeleteMedicamentoLogMutation, DeleteMedicamentoLogMutationVariables>;

/**
 * __useDeleteMedicamentoLogMutation__
 *
 * To run a mutation, you first call `useDeleteMedicamentoLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMedicamentoLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMedicamentoLogMutation, { data, loading, error }] = useDeleteMedicamentoLogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMedicamentoLogMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMedicamentoLogMutation, DeleteMedicamentoLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMedicamentoLogMutation, DeleteMedicamentoLogMutationVariables>(DeleteMedicamentoLogDocument, options);
      }
export type DeleteMedicamentoLogMutationHookResult = ReturnType<typeof useDeleteMedicamentoLogMutation>;
export type DeleteMedicamentoLogMutationResult = Apollo.MutationResult<DeleteMedicamentoLogMutation>;
export type DeleteMedicamentoLogMutationOptions = Apollo.BaseMutationOptions<DeleteMedicamentoLogMutation, DeleteMedicamentoLogMutationVariables>;
export const GetMedicamentoDocument = gql`
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

/**
 * __useGetMedicamentoQuery__
 *
 * To run a query within a React component, call `useGetMedicamentoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicamentoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicamentoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMedicamentoQuery(baseOptions: Apollo.QueryHookOptions<GetMedicamentoQuery, GetMedicamentoQueryVariables> & ({ variables: GetMedicamentoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicamentoQuery, GetMedicamentoQueryVariables>(GetMedicamentoDocument, options);
      }
export function useGetMedicamentoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicamentoQuery, GetMedicamentoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicamentoQuery, GetMedicamentoQueryVariables>(GetMedicamentoDocument, options);
        }
export function useGetMedicamentoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMedicamentoQuery, GetMedicamentoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMedicamentoQuery, GetMedicamentoQueryVariables>(GetMedicamentoDocument, options);
        }
export type GetMedicamentoQueryHookResult = ReturnType<typeof useGetMedicamentoQuery>;
export type GetMedicamentoLazyQueryHookResult = ReturnType<typeof useGetMedicamentoLazyQuery>;
export type GetMedicamentoSuspenseQueryHookResult = ReturnType<typeof useGetMedicamentoSuspenseQuery>;
export type GetMedicamentoQueryResult = Apollo.QueryResult<GetMedicamentoQuery, GetMedicamentoQueryVariables>;
export const GetMedicamentosDocument = gql`
    query getMedicamentos($limit: Int!, $skip: Int!, $where: MedicamentoWhereInput) {
  getMedicamentos(limit: $limit, skip: $skip, where: $where) {
    edges {
      node {
        ...Medicamento
      }
    }
    aggregate {
      count
    }
  }
}
    ${MedicamentoFragmentDoc}`;

/**
 * __useGetMedicamentosQuery__
 *
 * To run a query within a React component, call `useGetMedicamentosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicamentosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicamentosQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMedicamentosQuery(baseOptions: Apollo.QueryHookOptions<GetMedicamentosQuery, GetMedicamentosQueryVariables> & ({ variables: GetMedicamentosQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicamentosQuery, GetMedicamentosQueryVariables>(GetMedicamentosDocument, options);
      }
export function useGetMedicamentosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicamentosQuery, GetMedicamentosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicamentosQuery, GetMedicamentosQueryVariables>(GetMedicamentosDocument, options);
        }
export function useGetMedicamentosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMedicamentosQuery, GetMedicamentosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMedicamentosQuery, GetMedicamentosQueryVariables>(GetMedicamentosDocument, options);
        }
export type GetMedicamentosQueryHookResult = ReturnType<typeof useGetMedicamentosQuery>;
export type GetMedicamentosLazyQueryHookResult = ReturnType<typeof useGetMedicamentosLazyQuery>;
export type GetMedicamentosSuspenseQueryHookResult = ReturnType<typeof useGetMedicamentosSuspenseQuery>;
export type GetMedicamentosQueryResult = Apollo.QueryResult<GetMedicamentosQuery, GetMedicamentosQueryVariables>;
export const UpdateMedicamentoDocument = gql`
    mutation UpdateMedicamento($medicamentoId: String!, $data: MedicamentoInput!) {
  updateMedicamento(medicamentoId: $medicamentoId, data: $data)
}
    `;
export type UpdateMedicamentoMutationFn = Apollo.MutationFunction<UpdateMedicamentoMutation, UpdateMedicamentoMutationVariables>;

/**
 * __useUpdateMedicamentoMutation__
 *
 * To run a mutation, you first call `useUpdateMedicamentoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMedicamentoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMedicamentoMutation, { data, loading, error }] = useUpdateMedicamentoMutation({
 *   variables: {
 *      medicamentoId: // value for 'medicamentoId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMedicamentoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMedicamentoMutation, UpdateMedicamentoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMedicamentoMutation, UpdateMedicamentoMutationVariables>(UpdateMedicamentoDocument, options);
      }
export type UpdateMedicamentoMutationHookResult = ReturnType<typeof useUpdateMedicamentoMutation>;
export type UpdateMedicamentoMutationResult = Apollo.MutationResult<UpdateMedicamentoMutation>;
export type UpdateMedicamentoMutationOptions = Apollo.BaseMutationOptions<UpdateMedicamentoMutation, UpdateMedicamentoMutationVariables>;
export const CreatePacienteDocument = gql`
    mutation CreatePaciente($data: PacienteInput!) {
  createPaciente(data: $data)
}
    `;
export type CreatePacienteMutationFn = Apollo.MutationFunction<CreatePacienteMutation, CreatePacienteMutationVariables>;

/**
 * __useCreatePacienteMutation__
 *
 * To run a mutation, you first call `useCreatePacienteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePacienteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPacienteMutation, { data, loading, error }] = useCreatePacienteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePacienteMutation(baseOptions?: Apollo.MutationHookOptions<CreatePacienteMutation, CreatePacienteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePacienteMutation, CreatePacienteMutationVariables>(CreatePacienteDocument, options);
      }
export type CreatePacienteMutationHookResult = ReturnType<typeof useCreatePacienteMutation>;
export type CreatePacienteMutationResult = Apollo.MutationResult<CreatePacienteMutation>;
export type CreatePacienteMutationOptions = Apollo.BaseMutationOptions<CreatePacienteMutation, CreatePacienteMutationVariables>;
export const EliminarPacienteDocument = gql`
    mutation EliminarPaciente($pacienteId: String!) {
  EliminarPaciente(pacienteId: $pacienteId)
}
    `;
export type EliminarPacienteMutationFn = Apollo.MutationFunction<EliminarPacienteMutation, EliminarPacienteMutationVariables>;

/**
 * __useEliminarPacienteMutation__
 *
 * To run a mutation, you first call `useEliminarPacienteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEliminarPacienteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eliminarPacienteMutation, { data, loading, error }] = useEliminarPacienteMutation({
 *   variables: {
 *      pacienteId: // value for 'pacienteId'
 *   },
 * });
 */
export function useEliminarPacienteMutation(baseOptions?: Apollo.MutationHookOptions<EliminarPacienteMutation, EliminarPacienteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EliminarPacienteMutation, EliminarPacienteMutationVariables>(EliminarPacienteDocument, options);
      }
export type EliminarPacienteMutationHookResult = ReturnType<typeof useEliminarPacienteMutation>;
export type EliminarPacienteMutationResult = Apollo.MutationResult<EliminarPacienteMutation>;
export type EliminarPacienteMutationOptions = Apollo.BaseMutationOptions<EliminarPacienteMutation, EliminarPacienteMutationVariables>;
export const ElimiarPacienteLogDocument = gql`
    mutation ElimiarPacienteLog($pacienteId: String!) {
  ElimiarPacienteLog(pacienteId: $pacienteId)
}
    `;
export type ElimiarPacienteLogMutationFn = Apollo.MutationFunction<ElimiarPacienteLogMutation, ElimiarPacienteLogMutationVariables>;

/**
 * __useElimiarPacienteLogMutation__
 *
 * To run a mutation, you first call `useElimiarPacienteLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useElimiarPacienteLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [elimiarPacienteLogMutation, { data, loading, error }] = useElimiarPacienteLogMutation({
 *   variables: {
 *      pacienteId: // value for 'pacienteId'
 *   },
 * });
 */
export function useElimiarPacienteLogMutation(baseOptions?: Apollo.MutationHookOptions<ElimiarPacienteLogMutation, ElimiarPacienteLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ElimiarPacienteLogMutation, ElimiarPacienteLogMutationVariables>(ElimiarPacienteLogDocument, options);
      }
export type ElimiarPacienteLogMutationHookResult = ReturnType<typeof useElimiarPacienteLogMutation>;
export type ElimiarPacienteLogMutationResult = Apollo.MutationResult<ElimiarPacienteLogMutation>;
export type ElimiarPacienteLogMutationOptions = Apollo.BaseMutationOptions<ElimiarPacienteLogMutation, ElimiarPacienteLogMutationVariables>;
export const GetPacienteDocument = gql`
    query getPaciente($id: String!) {
  getPaciente(id: $id) {
    ...Paciente
  }
}
    ${PacienteFragmentDoc}`;

/**
 * __useGetPacienteQuery__
 *
 * To run a query within a React component, call `useGetPacienteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPacienteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPacienteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPacienteQuery(baseOptions: Apollo.QueryHookOptions<GetPacienteQuery, GetPacienteQueryVariables> & ({ variables: GetPacienteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPacienteQuery, GetPacienteQueryVariables>(GetPacienteDocument, options);
      }
export function useGetPacienteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPacienteQuery, GetPacienteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPacienteQuery, GetPacienteQueryVariables>(GetPacienteDocument, options);
        }
export function useGetPacienteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPacienteQuery, GetPacienteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPacienteQuery, GetPacienteQueryVariables>(GetPacienteDocument, options);
        }
export type GetPacienteQueryHookResult = ReturnType<typeof useGetPacienteQuery>;
export type GetPacienteLazyQueryHookResult = ReturnType<typeof useGetPacienteLazyQuery>;
export type GetPacienteSuspenseQueryHookResult = ReturnType<typeof useGetPacienteSuspenseQuery>;
export type GetPacienteQueryResult = Apollo.QueryResult<GetPacienteQuery, GetPacienteQueryVariables>;
export const GetPacientesDocument = gql`
    query getPacientes($limit: Int, $skip: Int, $where: PacienteWhereInput) {
  getPacientes(limit: $limit, skip: $skip, where: $where) {
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
    ${PacienteFragmentDoc}`;

/**
 * __useGetPacientesQuery__
 *
 * To run a query within a React component, call `useGetPacientesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPacientesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPacientesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPacientesQuery(baseOptions?: Apollo.QueryHookOptions<GetPacientesQuery, GetPacientesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPacientesQuery, GetPacientesQueryVariables>(GetPacientesDocument, options);
      }
export function useGetPacientesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPacientesQuery, GetPacientesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPacientesQuery, GetPacientesQueryVariables>(GetPacientesDocument, options);
        }
export function useGetPacientesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPacientesQuery, GetPacientesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPacientesQuery, GetPacientesQueryVariables>(GetPacientesDocument, options);
        }
export type GetPacientesQueryHookResult = ReturnType<typeof useGetPacientesQuery>;
export type GetPacientesLazyQueryHookResult = ReturnType<typeof useGetPacientesLazyQuery>;
export type GetPacientesSuspenseQueryHookResult = ReturnType<typeof useGetPacientesSuspenseQuery>;
export type GetPacientesQueryResult = Apollo.QueryResult<GetPacientesQuery, GetPacientesQueryVariables>;
export const UpdatePacienteDocument = gql`
    mutation UpdatePaciente($data: PacienteInput!, $pacienteId: String!) {
  updatePaciente(data: $data, pacienteId: $pacienteId)
}
    `;
export type UpdatePacienteMutationFn = Apollo.MutationFunction<UpdatePacienteMutation, UpdatePacienteMutationVariables>;

/**
 * __useUpdatePacienteMutation__
 *
 * To run a mutation, you first call `useUpdatePacienteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePacienteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePacienteMutation, { data, loading, error }] = useUpdatePacienteMutation({
 *   variables: {
 *      data: // value for 'data'
 *      pacienteId: // value for 'pacienteId'
 *   },
 * });
 */
export function useUpdatePacienteMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePacienteMutation, UpdatePacienteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePacienteMutation, UpdatePacienteMutationVariables>(UpdatePacienteDocument, options);
      }
export type UpdatePacienteMutationHookResult = ReturnType<typeof useUpdatePacienteMutation>;
export type UpdatePacienteMutationResult = Apollo.MutationResult<UpdatePacienteMutation>;
export type UpdatePacienteMutationOptions = Apollo.BaseMutationOptions<UpdatePacienteMutation, UpdatePacienteMutationVariables>;
export const CreateUsuarioDocument = gql`
    mutation CreateUsuario($data: UsuarioInput!) {
  createUsuario(data: $data)
}
    `;
export type CreateUsuarioMutationFn = Apollo.MutationFunction<CreateUsuarioMutation, CreateUsuarioMutationVariables>;

/**
 * __useCreateUsuarioMutation__
 *
 * To run a mutation, you first call `useCreateUsuarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUsuarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUsuarioMutation, { data, loading, error }] = useCreateUsuarioMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUsuarioMutation(baseOptions?: Apollo.MutationHookOptions<CreateUsuarioMutation, CreateUsuarioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUsuarioMutation, CreateUsuarioMutationVariables>(CreateUsuarioDocument, options);
      }
export type CreateUsuarioMutationHookResult = ReturnType<typeof useCreateUsuarioMutation>;
export type CreateUsuarioMutationResult = Apollo.MutationResult<CreateUsuarioMutation>;
export type CreateUsuarioMutationOptions = Apollo.BaseMutationOptions<CreateUsuarioMutation, CreateUsuarioMutationVariables>;
export const GetUsuarioByIdDocument = gql`
    query getUsuarioById($id: String!) {
  getUsuarioById(id: $id) {
    id_Usuario
    nombre_usuario
    email
    nombre_completo
    especialidad
    matricula
    telefono
    dni
    rol_usuario
  }
}
    `;

/**
 * __useGetUsuarioByIdQuery__
 *
 * To run a query within a React component, call `useGetUsuarioByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsuarioByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsuarioByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsuarioByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUsuarioByIdQuery, GetUsuarioByIdQueryVariables> & ({ variables: GetUsuarioByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsuarioByIdQuery, GetUsuarioByIdQueryVariables>(GetUsuarioByIdDocument, options);
      }
export function useGetUsuarioByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsuarioByIdQuery, GetUsuarioByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsuarioByIdQuery, GetUsuarioByIdQueryVariables>(GetUsuarioByIdDocument, options);
        }
export function useGetUsuarioByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsuarioByIdQuery, GetUsuarioByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsuarioByIdQuery, GetUsuarioByIdQueryVariables>(GetUsuarioByIdDocument, options);
        }
export type GetUsuarioByIdQueryHookResult = ReturnType<typeof useGetUsuarioByIdQuery>;
export type GetUsuarioByIdLazyQueryHookResult = ReturnType<typeof useGetUsuarioByIdLazyQuery>;
export type GetUsuarioByIdSuspenseQueryHookResult = ReturnType<typeof useGetUsuarioByIdSuspenseQuery>;
export type GetUsuarioByIdQueryResult = Apollo.QueryResult<GetUsuarioByIdQuery, GetUsuarioByIdQueryVariables>;
export const UpdateUsuarioDocument = gql`
    mutation updateUsuario($usuarioId: String!, $data: UsuarioInput!) {
  updateUsuario(usuarioId: $usuarioId, data: $data)
}
    `;
export type UpdateUsuarioMutationFn = Apollo.MutationFunction<UpdateUsuarioMutation, UpdateUsuarioMutationVariables>;

/**
 * __useUpdateUsuarioMutation__
 *
 * To run a mutation, you first call `useUpdateUsuarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsuarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsuarioMutation, { data, loading, error }] = useUpdateUsuarioMutation({
 *   variables: {
 *      usuarioId: // value for 'usuarioId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUsuarioMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsuarioMutation, UpdateUsuarioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsuarioMutation, UpdateUsuarioMutationVariables>(UpdateUsuarioDocument, options);
      }
export type UpdateUsuarioMutationHookResult = ReturnType<typeof useUpdateUsuarioMutation>;
export type UpdateUsuarioMutationResult = Apollo.MutationResult<UpdateUsuarioMutation>;
export type UpdateUsuarioMutationOptions = Apollo.BaseMutationOptions<UpdateUsuarioMutation, UpdateUsuarioMutationVariables>;
export const GetUsuariosDocument = gql`
    query getUsuarios($limit: Int!, $skip: Int!, $where: UsuarioWhereInput) {
  getUsuarios(limit: $limit, skip: $skip, where: $where) {
    edges {
      node {
        id_Usuario
        nombre_usuario
        email
        rol_usuario
        nombre_completo
        dni
        telefono
        especialidad
        matricula
      }
    }
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetUsuariosQuery__
 *
 * To run a query within a React component, call `useGetUsuariosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsuariosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsuariosQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUsuariosQuery(baseOptions: Apollo.QueryHookOptions<GetUsuariosQuery, GetUsuariosQueryVariables> & ({ variables: GetUsuariosQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsuariosQuery, GetUsuariosQueryVariables>(GetUsuariosDocument, options);
      }
export function useGetUsuariosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsuariosQuery, GetUsuariosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsuariosQuery, GetUsuariosQueryVariables>(GetUsuariosDocument, options);
        }
export function useGetUsuariosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsuariosQuery, GetUsuariosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsuariosQuery, GetUsuariosQueryVariables>(GetUsuariosDocument, options);
        }
export type GetUsuariosQueryHookResult = ReturnType<typeof useGetUsuariosQuery>;
export type GetUsuariosLazyQueryHookResult = ReturnType<typeof useGetUsuariosLazyQuery>;
export type GetUsuariosSuspenseQueryHookResult = ReturnType<typeof useGetUsuariosSuspenseQuery>;
export type GetUsuariosQueryResult = Apollo.QueryResult<GetUsuariosQuery, GetUsuariosQueryVariables>;
export type CancelarCitaMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CancelarCitaMutation = { __typename?: 'Mutation', cancelarCita: string };

export type CitaFragment = { __typename?: 'Cita', id_cita?: string | null, motivoConsulta: string, fechaProgramada?: string | null, observaciones?: string | null, cancelada?: boolean | null, medicamentos?: Array<{ __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null }> | null, enfermedades?: Array<{ __typename?: 'Enfermedad', id_enfermedad?: string | null, nombre_enf: string }> | null, paciente?: { __typename?: 'Paciente', id_paciente?: string | null, nombre_paciente?: string | null, dni?: string | null } | null, doctor?: { __typename?: 'Usuario', id_Usuario: string, nombre_usuario?: string | null, nombre_completo?: string | null, email?: string | null, especialidad?: string | null, matricula?: string | null, dni?: string | null, telefono?: string | null } | null };

export type GetCitaQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCitaQuery = { __typename?: 'Query', getCita?: { __typename?: 'Cita', id_cita?: string | null, motivoConsulta: string, fechaProgramada?: string | null, observaciones?: string | null, cancelada?: boolean | null, medicamentos?: Array<{ __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null }> | null, enfermedades?: Array<{ __typename?: 'Enfermedad', id_enfermedad?: string | null, nombre_enf: string }> | null, paciente?: { __typename?: 'Paciente', id_paciente?: string | null, nombre_paciente?: string | null, dni?: string | null } | null, doctor?: { __typename?: 'Usuario', id_Usuario: string, nombre_usuario?: string | null, nombre_completo?: string | null, email?: string | null, especialidad?: string | null, matricula?: string | null, dni?: string | null, telefono?: string | null } | null } | null };

export type GetCitasQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<CitaWhereInput>;
}>;


export type GetCitasQuery = { __typename?: 'Query', getCitas: { __typename?: 'CitaResultadoBusqueda', edges: Array<{ __typename?: 'CitaEdge', node: { __typename?: 'Cita', id_cita?: string | null, observaciones?: string | null, cancelada?: boolean | null, finalizada?: boolean | null, fechaProgramada?: string | null, motivoConsulta: string, enfermedades?: Array<{ __typename?: 'Enfermedad', nombre_enf: string, id_enfermedad?: string | null }> | null, medicamentos?: Array<{ __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null }> | null, paciente?: { __typename?: 'Paciente', dni?: string | null, id_paciente?: string | null, nombre_paciente?: string | null } | null, estudios?: Array<{ __typename?: 'Estudio', fecha_realizacion?: any | null, codigo_referencia?: string | null, medico_solicitante: string, tipo_estudio?: string | null, resultado?: string | null }> | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };

export type GetCitasByFechaQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<CitaWhereInput>;
}>;


export type GetCitasByFechaQuery = { __typename?: 'Query', getCitasByFecha: { __typename?: 'CitaResultadoBusqueda', edges: Array<{ __typename?: 'CitaEdge', node: { __typename?: 'Cita', id_cita?: string | null, observaciones?: string | null, cancelada?: boolean | null, finalizada?: boolean | null, fechaProgramada?: string | null, motivoConsulta: string, registradoPorId?: string | null, paciente?: { __typename?: 'Paciente', dni?: string | null, id_paciente?: string | null, nombre_paciente?: string | null, apellido_paciente?: string | null } | null, doctor?: { __typename?: 'Usuario', id_Usuario: string, nombre_usuario?: string | null, email?: string | null, especialidad?: string | null, matricula?: string | null, dni?: string | null, telefono?: string | null, nombre_completo?: string | null } | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };

export type CreateCitaMutationVariables = Exact<{
  data: CitaInput;
  paciente: PacienteCitaInput;
}>;


export type CreateCitaMutation = { __typename?: 'Mutation', createCita: string };

export type CreateCitaEnfermedadMutationVariables = Exact<{
  citaId: Scalars['String']['input'];
  enfermedades: Array<EnfermedadInput> | EnfermedadInput;
}>;


export type CreateCitaEnfermedadMutation = { __typename?: 'Mutation', createCitaEnfermedad: string };

export type CreateCitaEstudioMutationVariables = Exact<{
  citaId: Scalars['String']['input'];
  estudios: Array<EstudioInput> | EstudioInput;
}>;


export type CreateCitaEstudioMutation = { __typename?: 'Mutation', createCitaEstudio: string };

export type CreateCitaMedicamentoMutationVariables = Exact<{
  citaId: Scalars['String']['input'];
  medicamentos: Array<MedicamentoInput> | MedicamentoInput;
}>;


export type CreateCitaMedicamentoMutation = { __typename?: 'Mutation', createCitaMedicamento: string };

export type FinalizarCitaMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FinalizarCitaMutation = { __typename?: 'Mutation', finalizarCita: string };

export type CreateEnfermedadMutationVariables = Exact<{
  data: EnfermedadInput;
}>;


export type CreateEnfermedadMutation = { __typename?: 'Mutation', createEnfermedad: string };

export type DeleteEnfermedadMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteEnfermedadMutation = { __typename?: 'Mutation', deleteEnfermedad: string };

export type EnfermedadFragment = { __typename?: 'Enfermedad', id_enfermedad?: string | null, nombre_enf: string, sintomas?: string | null, gravedad?: string | null };

export type GetEnfermedadesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<EnfermedadWhereInput>;
}>;


export type GetEnfermedadesQuery = { __typename?: 'Query', getEnfermedades: { __typename?: 'EnfermedadResultadoBusqueda', edges: Array<{ __typename?: 'EnfermedadEdge', node: { __typename?: 'Enfermedad', id_enfermedad?: string | null, nombre_enf: string, sintomas?: string | null, gravedad?: string | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };

export type GetEnfermedadByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEnfermedadByIdQuery = { __typename?: 'Query', getEnfermedadById?: { __typename?: 'Enfermedad', id_enfermedad?: string | null, nombre_enf: string, sintomas?: string | null, gravedad?: string | null } | null };

export type UpdateEnfermedadMutationVariables = Exact<{
  data: EnfermedadInput;
  enfermedadId: Scalars['String']['input'];
}>;


export type UpdateEnfermedadMutation = { __typename?: 'Mutation', updateEnfermedad: string };

export type CreateEstudioMutationVariables = Exact<{
  data: EstudioInput;
  idCita: Scalars['String']['input'];
}>;


export type CreateEstudioMutation = { __typename?: 'Mutation', createEstudio: string };

export type EstudioFragment = { __typename?: 'Estudio', id_estudio?: string | null, fecha_realizacion?: any | null, tipo_estudio?: string | null, resultado?: string | null, codigo_referencia?: string | null, observaciones?: string | null, medico_solicitante: string, urgente?: boolean | null };

export type GetEstudiosQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<EstudioWhereInput>;
}>;


export type GetEstudiosQuery = { __typename?: 'Query', getEstudios: { __typename?: 'EstudioResultadoBusqueda', edges: Array<{ __typename?: 'EstudioEdge', node: { __typename?: 'Estudio', id_estudio?: string | null, fecha_realizacion?: any | null, tipo_estudio?: string | null, resultado?: string | null, codigo_referencia?: string | null, observaciones?: string | null, medico_solicitante: string, urgente?: boolean | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };

export type UpdateEstudioMutationVariables = Exact<{
  data: EstudioInput;
  estudioId: Scalars['String']['input'];
}>;


export type UpdateEstudioMutation = { __typename?: 'Mutation', updateEstudio: string };

export type CamasDisponiblesQueryVariables = Exact<{ [key: string]: never; }>;


export type CamasDisponiblesQuery = { __typename?: 'Query', camasDisponibles: Array<{ __typename?: 'Cama', id_cama: string, numero: string, disponible: boolean, pabellon?: { __typename?: 'Pabellon', nombre: string } | null }> };

export type DarAltaInternacionMutationVariables = Exact<{
  data: AltaInternacionInput;
}>;


export type DarAltaInternacionMutation = { __typename?: 'Mutation', darAltaInternacion: string };

export type InternacionesActivasQueryVariables = Exact<{ [key: string]: never; }>;


export type InternacionesActivasQuery = { __typename?: 'Query', internacionesActivas: Array<{ __typename?: 'Internacion', id_internacion: string, fecha_ingreso: any, diagnostico: string, paciente: { __typename?: 'Paciente', nombre_paciente?: string | null, apellido_paciente?: string | null }, cama: { __typename?: 'Cama', numero: string } }> };

export type InternarPacienteMutationVariables = Exact<{
  data: CreateInternacionInput;
}>;


export type InternarPacienteMutation = { __typename?: 'Mutation', internarPaciente: string };

export type CreateMedicamentoMutationVariables = Exact<{
  data: MedicamentoInput;
}>;


export type CreateMedicamentoMutation = { __typename?: 'Mutation', createMedicamento: string };

export type DeleteMedicamentoMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteMedicamentoMutation = { __typename?: 'Mutation', deleteMedicamento: string };

export type DeleteMedicamentoLogMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteMedicamentoLogMutation = { __typename?: 'Mutation', deleteMedicamentoLog: string };

export type GetMedicamentoQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMedicamentoQuery = { __typename?: 'Query', getMedicamento?: { __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null, marca?: string | null, fecha_vencimiento?: any | null, dosis_hs?: string | null, agente_principal?: string | null, efectos_secundarios?: string | null, lista_negra?: boolean | null, categoria?: string | null, contraindicaciones?: string | null, prescripcion_requerida?: boolean | null } | null };

export type MedicamentoFragment = { __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null, marca?: string | null, fecha_vencimiento?: any | null, dosis_hs?: string | null, agente_principal?: string | null, efectos_secundarios?: string | null, lista_negra?: boolean | null, categoria?: string | null, contraindicaciones?: string | null, prescripcion_requerida?: boolean | null, stock?: number | null };

export type GetMedicamentosQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<MedicamentoWhereInput>;
}>;


export type GetMedicamentosQuery = { __typename?: 'Query', getMedicamentos: { __typename?: 'MedicamentoResultadoBusqueda', edges: Array<{ __typename?: 'MedicamentoEdge', node: { __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null, marca?: string | null, fecha_vencimiento?: any | null, dosis_hs?: string | null, agente_principal?: string | null, efectos_secundarios?: string | null, lista_negra?: boolean | null, categoria?: string | null, contraindicaciones?: string | null, prescripcion_requerida?: boolean | null, stock?: number | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };

export type UpdateMedicamentoMutationVariables = Exact<{
  medicamentoId: Scalars['String']['input'];
  data: MedicamentoInput;
}>;


export type UpdateMedicamentoMutation = { __typename?: 'Mutation', updateMedicamento: string };

export type CreatePacienteMutationVariables = Exact<{
  data: PacienteInput;
}>;


export type CreatePacienteMutation = { __typename?: 'Mutation', createPaciente: string };

export type EliminarPacienteMutationVariables = Exact<{
  pacienteId: Scalars['String']['input'];
}>;


export type EliminarPacienteMutation = { __typename?: 'Mutation', EliminarPaciente: string };

export type ElimiarPacienteLogMutationVariables = Exact<{
  pacienteId: Scalars['String']['input'];
}>;


export type ElimiarPacienteLogMutation = { __typename?: 'Mutation', ElimiarPacienteLog: string };

export type PacienteFragment = { __typename?: 'Paciente', id_paciente?: string | null, dni?: string | null, nombre_paciente?: string | null, apellido_paciente?: string | null, edad?: number | null, altura?: number | null, telefono?: string | null, fecha_nacimiento?: any | null, sexo?: string | null, grupo_sanguineo?: string | null, alergias?: string | null, obra_social?: string | null, email?: string | null, direccion?: string | null, nacionalidad?: string | null, eliminadoLog?: boolean | null };

export type GetPacienteQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPacienteQuery = { __typename?: 'Query', getPaciente?: { __typename?: 'Paciente', id_paciente?: string | null, dni?: string | null, nombre_paciente?: string | null, apellido_paciente?: string | null, edad?: number | null, altura?: number | null, telefono?: string | null, fecha_nacimiento?: any | null, sexo?: string | null, grupo_sanguineo?: string | null, alergias?: string | null, obra_social?: string | null, email?: string | null, direccion?: string | null, nacionalidad?: string | null, eliminadoLog?: boolean | null } | null };

export type GetPacientesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PacienteWhereInput>;
}>;


export type GetPacientesQuery = { __typename?: 'Query', getPacientes: { __typename?: 'PacientesResultadoBusqueda', edges: Array<{ __typename?: 'PacienteEdge', node: { __typename?: 'Paciente', id_paciente?: string | null, dni?: string | null, nombre_paciente?: string | null, apellido_paciente?: string | null, edad?: number | null, altura?: number | null, telefono?: string | null, fecha_nacimiento?: any | null, sexo?: string | null, grupo_sanguineo?: string | null, alergias?: string | null, obra_social?: string | null, email?: string | null, direccion?: string | null, nacionalidad?: string | null, eliminadoLog?: boolean | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };

export type UpdatePacienteMutationVariables = Exact<{
  data: PacienteInput;
  pacienteId: Scalars['String']['input'];
}>;


export type UpdatePacienteMutation = { __typename?: 'Mutation', updatePaciente: string };

export type CreateUsuarioMutationVariables = Exact<{
  data: UsuarioInput;
}>;


export type CreateUsuarioMutation = { __typename?: 'Mutation', createUsuario: string };

export type GetUsuarioByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUsuarioByIdQuery = { __typename?: 'Query', getUsuarioById?: { __typename?: 'Usuario', id_Usuario: string, nombre_usuario?: string | null, email?: string | null, nombre_completo?: string | null, especialidad?: string | null, matricula?: string | null, telefono?: string | null, dni?: string | null, rol_usuario?: string | null } | null };

export type UpdateUsuarioMutationVariables = Exact<{
  usuarioId: Scalars['String']['input'];
  data: UsuarioInput;
}>;


export type UpdateUsuarioMutation = { __typename?: 'Mutation', updateUsuario: string };

export type GetUsuariosQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<UsuarioWhereInput>;
}>;


export type GetUsuariosQuery = { __typename?: 'Query', getUsuarios: { __typename?: 'UsuarioResultadoBusqueda', edges: Array<{ __typename?: 'UsuarioEdge', node: { __typename?: 'Usuario', id_Usuario: string, nombre_usuario?: string | null, email?: string | null, rol_usuario?: string | null, nombre_completo?: string | null, dni?: string | null, telefono?: string | null, especialidad?: string | null, matricula?: string | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };
