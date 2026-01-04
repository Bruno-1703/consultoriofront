import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Autocomplete,
  Box,
} from "@mui/material";
import {
  CitaInput,
  PacienteCitaInput,
  useCreateCitaMutation,
  useGetPacientesQuery,
  useGetUsuariosQuery,
} from "../../graphql/types";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useSession } from "next-auth/react";

interface Props {
  onClose: () => void;
}

export const FormularioCitaV2 = ({ onClose }: Props) => {
  const { data: session } = useSession();

  const [pacienteSearch, setPacienteSearch] = useState("");

  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [fecha, setFecha] = useState<Dayjs | null>(null);

  const [paciente, setPaciente] = useState<any | null>(null);
  const [profesional, setProfesional] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const pacienteWhere = React.useMemo(() => {
    const where: any = {};

    if (pacienteSearch.trim()) {
      where.OR = [
        {
          nombre_paciente: {
            contains: pacienteSearch,
            mode: "insensitive",
          },
        },
        {
          apellido_paciente: {
            contains: pacienteSearch,
            mode: "insensitive",
          },
        },
        {
          dni: {
            contains: pacienteSearch,
          },
        },
      ];
    }

    return where;
  }, [pacienteSearch]);

  /* ===================== QUERIES ===================== */

  const { data: pacientesData, loading: loadingPacientes } =
    useGetPacientesQuery({
      variables: {
        limit: 50,
        skip: 0,
        where: pacienteWhere,
      },
    });


  const { data: profesionalesData } = useGetUsuariosQuery({
    variables: {
      limit: 50,
      skip: 0,
      where: { rol_usuario: "doctor" },
    },
  });

  const [createCita] = useCreateCitaMutation();

  /* ===================== SUBMIT ===================== */

  const handleSubmit = async () => {
    if (!motivoConsulta || !fecha || !paciente || !profesional) {
      setError(true);
      return;
    }

    setLoading(true);

    const citaInput: CitaInput = {
      motivoConsulta,
      observaciones,
      fechaProgramada: fecha.toDate().toISOString(),
      registradoPorId: session?.user?.id ?? "",
      doctor: {
        id_Usuario: profesional.id,
        nombre_completo: profesional.nombre_completo,
        email: profesional.email,
        especialidad: profesional.especialidad,
        matricula: profesional.matricula,
        nombre_usuario: profesional.nombre_usuario,
        dni: profesional.dni,
        telefono: profesional.telefono,
      },
    };

    const pacienteInput: PacienteCitaInput = {
      id_paciente: paciente.id_paciente,
      dni: paciente.dni,
      nombre_paciente: paciente.nombre_paciente,
      apellido_paciente: paciente.apellido_paciente,
    };

    try {
      await createCita({
        variables: {
          data: citaInput,
          paciente: pacienteInput,
        },
      });

      setSuccess(true);
      onClose();
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== RENDER ===================== */

  return (
    <>

      <TextField
        label="Motivo de consulta"
        fullWidth
        required
        value={motivoConsulta}
        onChange={(e) => setMotivoConsulta(e.target.value)}
        sx={{ mb: 2 }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Fecha y hora"
          value={fecha}
          onChange={setFecha}
          slotProps={{
            textField: { fullWidth: true, required: true, sx: { mb: 2 } },
          }}
        />
      </LocalizationProvider>

      <TextField
        label="Observaciones"
        multiline
        rows={3}
        fullWidth
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* PACIENTE */}
      <Autocomplete
        options={pacientesData?.getPacientes.edges.map(e => e.node) ?? []}
        value={paciente}
        onChange={(_, v) => setPaciente(v)}
        onInputChange={(_, value) => setPacienteSearch(value)}
        loading={loadingPacientes}
        filterOptions={(x) => x} // 🔑 el backend filtra
        getOptionLabel={(o) =>
          `${o.nombre_paciente} ${o.apellido_paciente}`
        }
        isOptionEqualToValue={(o, v) => o.id_paciente === v.id_paciente}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Paciente"
            required
            sx={{ mb: 2 }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingPacientes && (
                    <CircularProgress size={18} />
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />


      {/* PROFESIONAL */}
      <Autocomplete
        options={profesionalesData?.getUsuarios.edges.map(e => e.node) ?? []}
        value={profesional}
        onChange={(_, v) => setProfesional(v)}
        getOptionLabel={(o) =>
          `${o.nombre_completo} (${o.especialidad || "General"})`
        }
        isOptionEqualToValue={(o, v) => o.id === v.id}
        renderInput={(params) => (
          <TextField {...params} label="Profesional" required sx={{ mb: 2 }} />
        )}
      />

      {loading && <CircularProgress size={22} sx={{ mb: 2 }} />}

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Guardar cita
        </Button>
      </Box>

      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success">Cita creada correctamente</Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={3000}>
        <Alert severity="error">
          Completá todos los campos obligatorios
        </Alert>
      </Snackbar>
    </>
  );
};
