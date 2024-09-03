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

export type Cita = {
  __typename?: 'Cita';
  cancelada?: Maybe<Scalars['Boolean']['output']>;
  enfermedades?: Maybe<Array<Enfermedad>>;
  estudios?: Maybe<Array<Estudio>>;
  fechaSolicitud: Scalars['DateTime']['output'];
  id_cita?: Maybe<Scalars['String']['output']>;
  medicamentos?: Maybe<Array<Medicamento>>;
  motivoConsulta: Scalars['String']['output'];
  observaciones?: Maybe<Scalars['String']['output']>;
  paciente?: Maybe<Paciente>;
  pacienteId?: Maybe<Scalars['String']['output']>;
};

export type CitaEdge = {
  __typename?: 'CitaEdge';
  cursor: Scalars['String']['output'];
  node: Cita;
};

export type CitaInput = {
  motivoConsulta?: InputMaybe<Scalars['String']['input']>;
  observaciones?: InputMaybe<Scalars['String']['input']>;
};

export type CitaResultadoBusqueda = {
  __typename?: 'CitaResultadoBusqueda';
  aggregate: AggregateCount;
  edges: Array<CitaEdge>;
};

export type CitaWhereInput = {
  buscar?: InputMaybe<Scalars['String']['input']>;
  cancelada?: InputMaybe<Scalars['Boolean']['input']>;
  enfermedades?: InputMaybe<Array<EnfermedadInput>>;
  estudios?: InputMaybe<Array<EstudioInput>>;
  fechaSolicitud?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  medicamentos?: InputMaybe<Array<MedicamentoInput>>;
  motivoConsulta?: InputMaybe<Scalars['String']['input']>;
  observaciones?: InputMaybe<Scalars['String']['input']>;
  paciente?: InputMaybe<PacienteInput>;
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
  gravedad: Scalars['String']['input'];
  id_enfermedad?: InputMaybe<Scalars['String']['input']>;
  nombre_enf: Scalars['String']['input'];
  sintomas?: InputMaybe<Scalars['String']['input']>;
};

export type Estudio = {
  __typename?: 'Estudio';
  codigo_referencia: Scalars['String']['output'];
  fecha_realizacion: Scalars['DateTime']['output'];
  id_estudio: Scalars['String']['output'];
  medico_solicitante: Scalars['String']['output'];
  observaciones?: Maybe<Scalars['String']['output']>;
  resultado?: Maybe<Scalars['String']['output']>;
  tipo_estudio: Scalars['String']['output'];
  urgente?: Maybe<Scalars['Boolean']['output']>;
};

export type EstudioEdge = {
  __typename?: 'EstudioEdge';
  cursor: Scalars['String']['output'];
  node: Estudio;
};

export type EstudioInput = {
  codigo_referencia: Scalars['String']['input'];
  fecha_realizacion: Scalars['DateTime']['input'];
  id_estudio?: InputMaybe<Scalars['String']['input']>;
  medico_solicitante: Scalars['String']['input'];
  observaciones?: InputMaybe<Scalars['String']['input']>;
  resultado?: InputMaybe<Scalars['String']['input']>;
  tipo_estudio: Scalars['String']['input'];
  urgente?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EstudioResultadoBusqueda = {
  __typename?: 'EstudioResultadoBusqueda';
  aggregate: AggregateCount;
  edges: Array<EstudioEdge>;
};

export type EstudioWhereInput = {
  codigo_referencia: Scalars['String']['input'];
  fecha_realizacion: Scalars['DateTime']['input'];
  id_estudio?: InputMaybe<Scalars['String']['input']>;
  resultado?: InputMaybe<Scalars['String']['input']>;
  tipo_estudio: Scalars['String']['input'];
};

export type Medicamento = {
  __typename?: 'Medicamento';
  agente_principal?: Maybe<Scalars['String']['output']>;
  categoria?: Maybe<Scalars['String']['output']>;
  contraindicaciones?: Maybe<Scalars['String']['output']>;
  dosis_hs?: Maybe<Scalars['String']['output']>;
  efectos_secundarios?: Maybe<Scalars['String']['output']>;
  fecha_vencimiento?: Maybe<Scalars['DateTime']['output']>;
  id_medicamento?: Maybe<Scalars['String']['output']>;
  lista_negra?: Maybe<Scalars['Boolean']['output']>;
  marca?: Maybe<Scalars['String']['output']>;
  nombre_med?: Maybe<Scalars['String']['output']>;
  prescripcion_requerida?: Maybe<Scalars['Boolean']['output']>;
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
  id_medicamento?: InputMaybe<Scalars['String']['input']>;
  lista_negra?: InputMaybe<Scalars['Boolean']['input']>;
  marca?: InputMaybe<Scalars['String']['input']>;
  nombre_med?: InputMaybe<Scalars['String']['input']>;
  prescripcion_requerida?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MedicamentoResultadoBusqueda = {
  __typename?: 'MedicamentoResultadoBusqueda';
  aggregate: AggregateCount;
  edges: MedicamentoEdge;
};

export type MedicamentoWhereInput = {
  agente_principal?: InputMaybe<Scalars['String']['input']>;
  categoria?: InputMaybe<Scalars['String']['input']>;
  contraindicaciones?: InputMaybe<Scalars['String']['input']>;
  dosis_hs?: InputMaybe<Scalars['String']['input']>;
  efectos_secundarios?: InputMaybe<Scalars['String']['input']>;
  fecha_vencimiento?: InputMaybe<Scalars['DateTime']['input']>;
  lista_negra?: InputMaybe<Scalars['Boolean']['input']>;
  marca?: InputMaybe<Scalars['String']['input']>;
  nombre_med?: InputMaybe<Scalars['String']['input']>;
  prescripcion_requerida?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCita: Scalars['String']['output'];
  createCitaEnfermedad: Scalars['String']['output'];
  createCitaEstudio: Scalars['String']['output'];
  createCitaMedicamento: Scalars['String']['output'];
  createEnfermedad: Scalars['String']['output'];
  createEstudio: Scalars['String']['output'];
  createMedicamento: Scalars['String']['output'];
  createPaciente: Scalars['String']['output'];
  createUsuario: Scalars['String']['output'];
  deleteUsuario: Scalars['String']['output'];
  updateCita: Scalars['String']['output'];
  updateEnfermedad: Scalars['String']['output'];
  updateEstudio: Scalars['String']['output'];
  updateMedicamento: Scalars['String']['output'];
  updatePaciente: Scalars['String']['output'];
  updateUsuario: Scalars['String']['output'];
};


export type MutationCreateCitaArgs = {
  data: CitaInput;
  paciente: PacienteInput;
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


export type MutationDeleteUsuarioArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCitaArgs = {
  citaId: Scalars['String']['input'];
  data: CitaInput;
};


export type MutationUpdateEnfermedadArgs = {
  citaId: Scalars['String']['input'];
  data: EnfermedadInput;
};


export type MutationUpdateEstudioArgs = {
  data: EstudioInput;
  estudioId: Scalars['String']['input'];
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

export type Paciente = {
  __typename?: 'Paciente';
  alergias?: Maybe<Scalars['String']['output']>;
  altura?: Maybe<Scalars['Int']['output']>;
  apellido_paciente?: Maybe<Scalars['String']['output']>;
  dni: Scalars['String']['output'];
  edad?: Maybe<Scalars['Int']['output']>;
  fecha_nacimiento?: Maybe<Scalars['DateTime']['output']>;
  grupo_sanguineo?: Maybe<Scalars['String']['output']>;
  id_paciente: Scalars['String']['output'];
  nombre_paciente?: Maybe<Scalars['String']['output']>;
  sexo?: Maybe<Scalars['String']['output']>;
  telefono?: Maybe<Scalars['String']['output']>;
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
  dni?: InputMaybe<Scalars['String']['input']>;
  edad?: InputMaybe<Scalars['Int']['input']>;
  fecha_nacimiento?: InputMaybe<Scalars['DateTime']['input']>;
  grupo_sanguineo?: InputMaybe<Scalars['String']['input']>;
  id_paciente?: InputMaybe<Scalars['String']['input']>;
  nombre_paciente?: InputMaybe<Scalars['String']['input']>;
  sexo?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type PacienteWhereInput = {
  alergias?: InputMaybe<Scalars['String']['input']>;
  altura?: InputMaybe<Scalars['Int']['input']>;
  apellido_paciente?: InputMaybe<Scalars['String']['input']>;
  dni?: InputMaybe<Scalars['String']['input']>;
  edad?: InputMaybe<Scalars['Int']['input']>;
  fecha_nacimiento?: InputMaybe<Scalars['DateTime']['input']>;
  grupo_sanguineo?: InputMaybe<Scalars['String']['input']>;
  nombre_paciente?: InputMaybe<Scalars['String']['input']>;
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
  buscarPacientesPorNombreODNI: Array<Paciente>;
  getCita?: Maybe<Cita>;
  getCitas: CitaResultadoBusqueda;
  getEnfermedad?: Maybe<Enfermedad>;
  getEnfermedades: EnfermedadResultadoBusqueda;
  getEstudio?: Maybe<Estudio>;
  getEstudios: EstudioResultadoBusqueda;
  getMedicamento?: Maybe<Medicamento>;
  getMedicamentos: MedicamentoResultadoBusqueda;
  getPaciente?: Maybe<Paciente>;
  getPacientes: PacientesResultadoBusqueda;
  getUsuario?: Maybe<Usuario>;
};


export type QueryBuscarPacientesPorNombreOdniArgs = {
  dni: Scalars['String']['input'];
  nombre: Scalars['String']['input'];
};


export type QueryGetCitaArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCitasArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CitaWhereInput>;
};


export type QueryGetEnfermedadArgs = {
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
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PacienteWhereInput>;
};


export type QueryGetUsuarioArgs = {
  email: Scalars['String']['input'];
};

export type Usuario = {
  __typename?: 'Usuario';
  deletLogico?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id_Usuario: Scalars['String']['output'];
  nombre_usuario?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  rol_usuario?: Maybe<Scalars['String']['output']>;
};

export type UsuarioEdge = {
  __typename?: 'UsuarioEdge';
  cursor: Scalars['String']['output'];
  node: Usuario;
};

export type UsuarioInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  nombre_usuario: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rol_usuario?: InputMaybe<Scalars['String']['input']>;
};

export const CitaFragmentDoc = gql`
    fragment Cita on Cita {
  motivoConsulta
  fechaSolicitud
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
}
    `;
export const PacienteFragmentDoc = gql`
    fragment Paciente on Paciente {
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
}
    `;
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
export function useGetCitaSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCitaQuery, GetCitaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
        observaciones
        cancelada
        fechaSolicitud
        motivoConsulta
        pacienteId
        medicamentos {
          id_medicamento
          nombre_med
        }
        enfermedades {
          id_enfermedad
          nombre_enf
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
export function useGetCitasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCitasQuery, GetCitasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitasQuery, GetCitasQueryVariables>(GetCitasDocument, options);
        }
export type GetCitasQueryHookResult = ReturnType<typeof useGetCitasQuery>;
export type GetCitasLazyQueryHookResult = ReturnType<typeof useGetCitasLazyQuery>;
export type GetCitasSuspenseQueryHookResult = ReturnType<typeof useGetCitasSuspenseQuery>;
export type GetCitasQueryResult = Apollo.QueryResult<GetCitasQuery, GetCitasQueryVariables>;
export const CreateCitaDocument = gql`
    mutation createCita($data: CitaInput!, $paciente: PacienteInput!) {
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
export const CreateEstudioDocument = gql`
    mutation CreateEstudio($data: EstudioInput!) {
  createEstudio(data: $data)
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
export function useGetPacienteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPacienteQuery, GetPacienteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPacienteQuery, GetPacienteQueryVariables>(GetPacienteDocument, options);
        }
export type GetPacienteQueryHookResult = ReturnType<typeof useGetPacienteQuery>;
export type GetPacienteLazyQueryHookResult = ReturnType<typeof useGetPacienteLazyQuery>;
export type GetPacienteSuspenseQueryHookResult = ReturnType<typeof useGetPacienteSuspenseQuery>;
export type GetPacienteQueryResult = Apollo.QueryResult<GetPacienteQuery, GetPacienteQueryVariables>;
export const GetPacientesDocument = gql`
    query getPacientes($take: Int!, $skip: Int!, $where: PacienteWhereInput) {
  getPacientes(take: $take, skip: $skip, where: $where) {
    edges {
      node {
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
      }
    }
    aggregate {
      count
    }
  }
}
    `;

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
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPacientesQuery(baseOptions: Apollo.QueryHookOptions<GetPacientesQuery, GetPacientesQueryVariables> & ({ variables: GetPacientesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPacientesQuery, GetPacientesQueryVariables>(GetPacientesDocument, options);
      }
export function useGetPacientesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPacientesQuery, GetPacientesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPacientesQuery, GetPacientesQueryVariables>(GetPacientesDocument, options);
        }
export function useGetPacientesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPacientesQuery, GetPacientesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPacientesQuery, GetPacientesQueryVariables>(GetPacientesDocument, options);
        }
export type GetPacientesQueryHookResult = ReturnType<typeof useGetPacientesQuery>;
export type GetPacientesLazyQueryHookResult = ReturnType<typeof useGetPacientesLazyQuery>;
export type GetPacientesSuspenseQueryHookResult = ReturnType<typeof useGetPacientesSuspenseQuery>;
export type GetPacientesQueryResult = Apollo.QueryResult<GetPacientesQuery, GetPacientesQueryVariables>;
export type CitaFragment = { __typename?: 'Cita', motivoConsulta: string, fechaSolicitud: any, observaciones?: string | null, cancelada?: boolean | null, medicamentos?: Array<{ __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null }> | null, enfermedades?: Array<{ __typename?: 'Enfermedad', id_enfermedad?: string | null, nombre_enf: string }> | null };

export type GetCitaQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCitaQuery = { __typename?: 'Query', getCita?: { __typename?: 'Cita', motivoConsulta: string, fechaSolicitud: any, observaciones?: string | null, cancelada?: boolean | null, medicamentos?: Array<{ __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null }> | null, enfermedades?: Array<{ __typename?: 'Enfermedad', id_enfermedad?: string | null, nombre_enf: string }> | null } | null };

export type GetCitasQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<CitaWhereInput>;
}>;


export type GetCitasQuery = { __typename?: 'Query', getCitas: { __typename?: 'CitaResultadoBusqueda', edges: Array<{ __typename?: 'CitaEdge', node: { __typename?: 'Cita', observaciones?: string | null, cancelada?: boolean | null, fechaSolicitud: any, motivoConsulta: string, pacienteId?: string | null, medicamentos?: Array<{ __typename?: 'Medicamento', id_medicamento?: string | null, nombre_med?: string | null }> | null, enfermedades?: Array<{ __typename?: 'Enfermedad', id_enfermedad?: string | null, nombre_enf: string }> | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };

export type CreateCitaMutationVariables = Exact<{
  data: CitaInput;
  paciente: PacienteInput;
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

export type CreateEnfermedadMutationVariables = Exact<{
  data: EnfermedadInput;
}>;


export type CreateEnfermedadMutation = { __typename?: 'Mutation', createEnfermedad: string };

export type CreateEstudioMutationVariables = Exact<{
  data: EstudioInput;
}>;


export type CreateEstudioMutation = { __typename?: 'Mutation', createEstudio: string };

export type UpdateEstudioMutationVariables = Exact<{
  data: EstudioInput;
  estudioId: Scalars['String']['input'];
}>;


export type UpdateEstudioMutation = { __typename?: 'Mutation', updateEstudio: string };

export type CreatePacienteMutationVariables = Exact<{
  data: PacienteInput;
}>;


export type CreatePacienteMutation = { __typename?: 'Mutation', createPaciente: string };

export type PacienteFragment = { __typename?: 'Paciente', dni: string, nombre_paciente?: string | null, apellido_paciente?: string | null, edad?: number | null, altura?: number | null, telefono?: string | null, fecha_nacimiento?: any | null, sexo?: string | null, grupo_sanguineo?: string | null, alergias?: string | null };

export type GetPacienteQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPacienteQuery = { __typename?: 'Query', getPaciente?: { __typename?: 'Paciente', dni: string, nombre_paciente?: string | null, apellido_paciente?: string | null, edad?: number | null, altura?: number | null, telefono?: string | null, fecha_nacimiento?: any | null, sexo?: string | null, grupo_sanguineo?: string | null, alergias?: string | null } | null };

export type GetPacientesQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<PacienteWhereInput>;
}>;


export type GetPacientesQuery = { __typename?: 'Query', getPacientes: { __typename?: 'PacientesResultadoBusqueda', edges: Array<{ __typename?: 'PacienteEdge', node: { __typename?: 'Paciente', id_paciente: string, dni: string, nombre_paciente?: string | null, apellido_paciente?: string | null, edad?: number | null, altura?: number | null, telefono?: string | null, fecha_nacimiento?: any | null, sexo?: string | null, grupo_sanguineo?: string | null, alergias?: string | null } }>, aggregate: { __typename?: 'AggregateCount', count: number } } };