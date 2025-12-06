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
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState<PacienteCitaInput | null>(null);
  const [selectedProfesional, setSelectedProfesional] = useState<any | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession(); // <--- Aquí obtienes la sesión

  const { data: pacientesData, loading: pacientesLoading, fetchMore: fetchMorePacientes } = useGetPacientesQuery({
    variables: { limit, skip, where: {} },
  });

  const { data: profesionalesData, loading: profesionalesLoading } = useGetUsuariosQuery({
    variables: {
      limit,
      skip: 0,
      where: {
        rol_usuario:"doctor"
      },
    },
  });

  const [createCitaMutation] = useCreateCitaMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!motivoConsulta || !fechaSolicitud || !selectedPaciente || !selectedProfesional) {
      setShowErrorAlert(true);
      return;
    }

    setLoading(true);
    try {
      const citaForm: CitaInput = {
        motivoConsulta,
        observaciones,
        fechaProgramada: fechaSolicitud,
        doctor: {
          id: selectedProfesional.id_Usuario,
          nombre_completo: selectedProfesional.nombre_completo || "",
          email: selectedProfesional.email || "",
          especialidad: selectedProfesional.especialidad || "",
          matricula: selectedProfesional.matricula || "",
          nombre_usuario: selectedProfesional.nombre_usuario || "",
          dni: selectedProfesional.dni || "",
          telefono: selectedProfesional.telefono || "",
          rol_usuario: selectedProfesional.rol_usuario || "",
          
        },
      };
      const pacienteForm: PacienteCitaInput = {
        id_paciente: selectedPaciente.id_paciente,
        dni: selectedPaciente.dni,
        nombre_paciente: selectedPaciente.nombre_paciente,
        apellido_paciente: selectedPaciente.apellido_paciente,
      };

      await createCitaMutation({
        variables: { data: citaForm, paciente: pacienteForm },
      });

      setShowSuccessAlert(true);
      resetForm();
      onClose(); // ← esta línea cierra el formulario

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setMotivoConsulta("");
    setObservaciones("");
    setFechaSolicitud("");
    setSelectedPaciente(null);
    setSelectedProfesional(null);
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom && !pacientesLoading) {
      fetchMorePacientes({ variables: { limit, skip: skip + limit } });
      setSkip(skip + limit);
    }
  };

  return (
    <Collapse in={true}>
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
            onChange={(newValue) => {
              if (newValue) setFechaSolicitud(newValue.toISOString());
            }}
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

        <Autocomplete
          options={pacientesData?.getPacientes.edges.map(({ node }) => node) || []}
          getOptionLabel={(option) => `${option.nombre_paciente} ${option.apellido_paciente}`}
          value={selectedPaciente}
          onChange={(_, value) => setSelectedPaciente(value)}
          onScroll={handleScroll}
          loading={pacientesLoading}
          renderInput={(params) => (
            <TextField {...params} label="Seleccionar Paciente" required sx={{ mb: 2 }} />
          )}
        />

        <Autocomplete
          options={profesionalesData?.getUsuarios.edges.map(({ node }) => node) || []}
          getOptionLabel={(option) =>
            `${option.nombre_completo} (${option.especialidad || "General"})`
          }
          value={selectedProfesional}
          onChange={(_, value) => setSelectedProfesional(value)}
          loading={profesionalesLoading}
          renderInput={(params) => (
            <TextField {...params} label="Seleccionar Profesional" required sx={{ mb: 2 }} />
          )}
        />

        {loading && <CircularProgress size={24} sx={{ mb: 2 }} />}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {/* <Button
            variant="contained"
            color="error"
            onClick={onClose}
            sx={{ mr: 2, borderRadius: 2, boxShadow: 2 }}
          >
            Cancelar
          </Button> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cita"}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={6500}
        onClose={() => setShowSuccessAlert(false)}
      >
        <Alert onClose={() => setShowSuccessAlert(false)} severity="success">
          ¡Cita creada con éxito!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorAlert}
        autoHideDuration={4000}
        onClose={() => setShowErrorAlert(false)}
      >
        <Alert onClose={() => setShowErrorAlert(false)} severity="error">
          Por favor, completá todos los campos requeridos.
        </Alert>
      </Snackbar>
    </Collapse>
  );
};
