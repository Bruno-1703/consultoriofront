import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
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
      // await createEstudio({
      //   variables: {
      //     data: {
      //       tipo_estudio: tipoEstudio,
      //       resultado,
      //       codigo_referencia: codigoReferencia,
      //       fecha_realizacion: fechaRealizacion ? fechaRealizacion.format("YYYY-MM-DD") : null,
      //       medico_solicitante: medicoSolicitante,
      //       observaciones,
      //       urgente,
      //     },
      //   },
      // });
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
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ borderRadius: '8px' }}>
      <DialogTitle sx={{ backgroundColor: '#1976d2', color: '#fff', borderRadius: '8px 8px 0 0' }}>
        Registrar Estudio
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
        <DialogContent dividers sx={{ backgroundColor: '#f5f5f5' }}>
          <TextField
            label="Tipo de Estudio"
            variant="outlined"
            fullWidth
            required
            value={tipoEstudio}
            onChange={(e) => setTipoEstudio(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Realización"
              value={fechaRealizacion}
              onChange={(newDate) => setFechaRealizacion(newDate)}
            
            />
          </LocalizationProvider>
          <TextField
            label="Resultado"
            variant="outlined"
            fullWidth
            value={resultado}
            onChange={(e) => setResultado(e.target.value)}
            sx={{ marginBottom: 3 }} // Aumenta el margen inferior
          />
          <TextField
            label="Código de Referencia"
            variant="outlined"
            fullWidth
            required
            value={codigoReferencia}
            onChange={(e) => setCodigoReferencia(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Médico Solicitante"
            variant="outlined"
            fullWidth
            required
            value={medicoSolicitante}
            onChange={(e) => setMedicoSolicitante(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Observaciones"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={urgente}
                onChange={(e) => setUrgente(e.target.checked)}
              />
            }
            label="Urgente"
            sx={{ marginBottom: 2 }}
          />
          {error && <p style={{ color: "red" }}>Error al registrar el estudio. Intenta nuevamente.</p>}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#f5f5f5' }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Box>

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
