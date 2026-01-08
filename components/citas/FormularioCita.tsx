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

  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());

  const [paciente, setPaciente] = useState<any | null>(null);
  const [profesional, setProfesional] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ===================== DATA ===================== */

  const { data: pacientesData, loading: loadingPacientes } =
    useGetPacientesQuery({
      variables: { limit: 50, skip: 0, where: {} },
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
    setError(null);

    if (!motivoConsulta.trim()) {
      return setError("Ingresá el motivo de consulta");
    }

    if (!fecha || !fecha.isValid()) {
      return setError("Seleccioná una fecha válida");
    }

    if (!paciente?.id_paciente) {
      return setError("Seleccioná un paciente");
    }

    if (!profesional?.id_Usuario) {
      return setError("Seleccioná un profesional");
    }

    setLoading(true);

    const citaInput: CitaInput = {
      motivoConsulta,
      observaciones,
      fechaProgramada: fecha.toISOString(),     
      registradoPorId: session?.user?.id || "",
      doctor: {
        id_Usuario: profesional.id_Usuario,
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
      setError("Error al crear la cita");
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
          onChange={(v) => setFecha(v && v.isValid() ? v : null)}
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
        clearOnBlur={false}
        options={pacientesData?.getPacientes.edges.map(e => e.node) ?? []}
        value={paciente}
        onChange={(_, v) => setPaciente(v)}
        loading={loadingPacientes}
        getOptionLabel={(o) =>
          `${o.nombre_paciente} ${o.apellido_paciente}`
        }
        isOptionEqualToValue={(o, v) =>
          o.id_paciente === v.id_paciente
        }
        renderInput={(params) => (
          <TextField {...params} label="Paciente" required sx={{ mb: 2 }} />
        )}
      />

      {/* PROFESIONAL */}
      <Autocomplete
        clearOnBlur={false}
        options={profesionalesData?.getUsuarios.edges.map(e => e.node) ?? []}
        value={profesional}
        onChange={(_, v) => setProfesional(v)}
        getOptionLabel={(o) =>
          `${o.nombre_completo} (${o.especialidad || "General"})`
        }
        isOptionEqualToValue={(o, v) =>
          o.id_Usuario === v.id_Usuario
        }
        renderInput={(params) => (
          <TextField {...params} label="Profesional" required sx={{ mb: 2 }} />
        )}
      />

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          Guardar cita
        </Button>
      </Box>

      {loading && <CircularProgress size={22} sx={{ mt: 2 }} />}

      <Snackbar open={!!error} autoHideDuration={3000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success">Cita creada correctamente</Alert>
      </Snackbar>
    </>
  );
};