import React, { useState } from "react";
import {
  Button,
  Collapse,
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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useSession } from "next-auth/react";

interface FormularioCitaProps {
  onClose: () => void;
}

export const FormularioCita = ({ onClose }: FormularioCitaProps) => {
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState<string | null>(null);
  const [selectedPaciente, setSelectedPaciente] =
    useState<PacienteCitaInput | null>(null);
  const [selectedProfesional, setSelectedProfesional] = useState<any | null>(
    null
  );

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  /* ===================== QUERIES ===================== */

  const { data: pacientesData, loading: pacientesLoading } =
    useGetPacientesQuery({
      variables: { limit: 50, skip: 0, where: {} },
    });

  const { data: profesionalesData, loading: profesionalesLoading } =
    useGetUsuariosQuery({
      variables: {
        limit: 50,
        skip: 0,
        where: { rol_usuario: "doctor" },
      },
    });

  const [createCitaMutation] = useCreateCitaMutation();

  /* ===================== SUBMIT ===================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !motivoConsulta.trim() ||
      !fechaSolicitud ||
      !selectedPaciente ||
      !selectedProfesional
    ) {
      setShowErrorAlert(true);
      return;
    }

    setLoading(true);

    try {
      const citaForm: CitaInput = {
        motivoConsulta,
        observaciones,
        fechaProgramada: fechaSolicitud,
        registradoPorId: session?.user?.id ?? "",
        doctor: {
          id: selectedProfesional.id_Usuario,
          nombre_completo: selectedProfesional.nombre_completo,
          email: selectedProfesional.email,
          especialidad: selectedProfesional.especialidad,
          matricula: selectedProfesional.matricula,
          nombre_usuario: selectedProfesional.nombre_usuario,
          dni: selectedProfesional.dni,
          telefono: selectedProfesional.telefono,
          rol_usuario: selectedProfesional.rol_usuario,
        },
      };


      const pacienteForm: PacienteCitaInput = {
        id_paciente: selectedPaciente.id_paciente,
        dni: selectedPaciente.dni,
        nombre_paciente: selectedPaciente.nombre_paciente,
        apellido_paciente: selectedPaciente.apellido_paciente,
      };

      await createCitaMutation({
        variables: {
          data: citaForm,
          paciente: pacienteForm,
        },
      });

      setShowSuccessAlert(true);
      onClose();
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== RENDER ===================== */

  return (
    <Collapse in>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Registrar nueva cita
        </Typography>

        <TextField
          label="Motivo de Consulta"
          fullWidth
          required
          value={motivoConsulta}
          onChange={(e) => setMotivoConsulta(e.target.value)}
          sx={{ mb: 2 }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Fecha y Hora"
            value={fechaSolicitud ? dayjs(fechaSolicitud) : null}
            onChange={(value) =>
              setFechaSolicitud(value ? value.toISOString() : null)
            }
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                sx: { mb: 2 },
              },
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
          getOptionLabel={(o) =>
            `${o.nombre_paciente} ${o.apellido_paciente}`
          }
          isOptionEqualToValue={(option, value) =>
            option.id_paciente === value.id_paciente
          }
          value={selectedPaciente}
          onChange={(_, v) => setSelectedPaciente(v)}
          loading={pacientesLoading}
          renderInput={(params) => (
            <TextField {...params} label="Paciente" required sx={{ mb: 2 }} />
          )}
        />

        {/* PROFESIONAL */}
        <Autocomplete
          options={profesionalesData?.getUsuarios.edges.map(e => e.node) ?? []}
          getOptionLabel={(o) =>
            `${o.nombre_completo} (${o.especialidad || "General"})`
          }
          isOptionEqualToValue={(option, value) =>
            option.id_Usuario === value.id_Usuario
          }
          value={selectedProfesional}
          onChange={(_, v) => setSelectedProfesional(v)}
          loading={profesionalesLoading}
          renderInput={(params) => (
            <TextField {...params} label="Profesional" required sx={{ mb: 2 }} />
          )}
        />

        {loading && <CircularProgress size={24} sx={{ mb: 2 }} />}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cita"}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={4000}
        onClose={() => setShowSuccessAlert(false)}
      >
        <Alert severity="success">¡Cita creada con éxito!</Alert>
      </Snackbar>

      <Snackbar
        open={showErrorAlert}
        autoHideDuration={4000}
        onClose={() => setShowErrorAlert(false)}
      >
        <Alert severity="error">
          Completá todos los campos obligatorios
        </Alert>
      </Snackbar>
    </Collapse>
  );
};
