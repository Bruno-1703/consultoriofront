import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import {
  CitaInput,
  PacienteCitaInput,
  useCreateCitaMutation,
  useGetPacientesQuery,
} from "../../graphql/types";
import { useSession } from "next-auth/react";

interface FormularioCitaProps {
  onClose: () => void;
}

export const FormularioCita = ({ onClose }: FormularioCitaProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.email;

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState<string>("");
  const [selectedPaciente, setSelectedPaciente] = useState<PacienteCitaInput | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: pacientesData, loading: pacientesLoading, error: pacientesError, fetchMore } = useGetPacientesQuery({
    variables: {
      limit,
      skip,
      where: {},
    },
  });

  const [createCitaMutation] = useCreateCitaMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!motivoConsulta || !fechaSolicitud || !selectedPaciente) {
      setShowErrorAlert(true);
      return;
    }
    setLoading(true);
    try {
      const citaForm: CitaInput = {
        motivoConsulta,
        observaciones,
        fechaSolicitud: fechaSolicitud,
      };
      const pacienteForm: PacienteCitaInput = {
        id_paciente: selectedPaciente?.id_paciente || "",
        dni: selectedPaciente?.dni || "",
        nombre_paciente: selectedPaciente?.nombre_paciente || "",
        apellido_paciente: selectedPaciente?.apellido_paciente || "",
      };

      await createCitaMutation({
        variables: { data: citaForm, paciente: pacienteForm },
      });

      setShowSuccessAlert(true);
      resetForm();
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
  };

  const loadMorePacientes = async () => {
    await fetchMore({
      variables: {
        limit,
        skip: skip + limit,
      },
    });
    setSkip(skip + limit);
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom && !pacientesLoading) {
      loadMorePacientes();
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Collapse in={isFormOpen}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Formulario de Cita
          </Typography>

          <TextField
            label="Motivo de Consulta"
            fullWidth
            margin="normal"
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
            error={!motivoConsulta}
            helperText={!motivoConsulta && "Este campo es obligatorio"}
          />

          <TextField
            label="Fecha y Hora"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={fechaSolicitud}
            onChange={(e) => setFechaSolicitud(e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!fechaSolicitud}
            helperText={!fechaSolicitud && "Este campo es obligatorio"}
          />

          <TextField
            label="Observaciones"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />

          {/* Autocomplete para seleccionar paciente */}
          <Autocomplete
            id="paciente-autocomplete"
            options={pacientesData?.getPacientes.edges.map(({ node }: any) => node) || []}
            getOptionLabel={(option: PacienteCitaInput) => `${option.nombre_paciente} ${option.apellido_paciente}`}
            onChange={(event, value) => setSelectedPaciente(value)}
            value={selectedPaciente}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccionar Paciente"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!selectedPaciente}
                helperText={!selectedPaciente && "Este campo es obligatorio"}
              />
            )}
            loading={pacientesLoading}
            onScroll={handleScroll}
            noOptionsText="No hay pacientes disponibles"
          />

          {pacientesLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={pacientesLoading || loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </Box>
      </Collapse>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={4000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccessAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cita creada con éxito!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorAlert}
        autoHideDuration={4000}
        onClose={() => setShowErrorAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowErrorAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error al crear la cita. Por favor, intente de nuevo.
        </Alert>
      </Snackbar>
    </Box>
  );
};
