import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Alert,
  Paper,
  Fade,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCreateEstudioMutation } from "../../graphql/types";

export const EstudioForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tipoEstudio, setTipoEstudio] = useState("");
  const [resultado, setResultado] = useState("");
  const [codigoReferencia, setCodigoReferencia] = useState("");
  const [fechaRealizacion, setFechaRealizacion] = useState<Dayjs | null>(null);
  const [medicoSolicitante, setMedicoSolicitante] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [urgente, setUrgente] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [createEstudio, { loading, error }] = useCreateEstudioMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createEstudio({
        variables: {
          idCita: "",
          data: {
            tipo_estudio: tipoEstudio,
            resultado,
            codigo_referencia: codigoReferencia,
            fecha_realizacion: fechaRealizacion
              ? fechaRealizacion.format("YYYY-MM-DD")
              : null,
            medico_solicitante: medicoSolicitante,
            observaciones,
            urgente,
          },
        },
      });
      setSnackbarOpen(true);
      onClose();
    } catch (e) {
      console.error("Error al crear estudio", e);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth scroll="body" TransitionComponent={Fade}>
      <Paper sx={{ borderRadius: 4, backgroundColor: "#e3f2fd" }}>
        <DialogTitle
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.5rem",
            py: 2,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          Registrar Estudio
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent sx={{ backgroundColor: "#fff", py: 3 }}>
            <Container maxWidth="md">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tipo de Estudio"
                    fullWidth
                    required
                    value={tipoEstudio}
                    onChange={(e) => setTipoEstudio(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha de Realización"
                      value={fechaRealizacion}
                      onChange={(newDate) => setFechaRealizacion(newDate)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Resultado"
                    fullWidth
                    value={resultado}
                    onChange={(e) => setResultado(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Código de Referencia"
                    fullWidth
                    required
                    value={codigoReferencia}
                    onChange={(e) => setCodigoReferencia(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Médico Solicitante"
                    fullWidth
                    required
                    value={medicoSolicitante}
                    onChange={(e) => setMedicoSolicitante(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={urgente}
                        onChange={(e) => setUrgente(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Marcar como urgente"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Observaciones"
                    fullWidth
                    multiline
                    rows={3}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </Grid>
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Error al registrar el estudio. Intenta nuevamente.
                </Alert>
              )}
            </Container>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              py: 2,
              backgroundColor: "#f5f5f5",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? "Registrando..." : "Registrar"}
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: "#90caf9",
                color: "#1976d2",
                minWidth: 120,
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Estudio creado exitosamente.
        </Alert>
      </Snackbar>
    </Dialog>
  );
};
