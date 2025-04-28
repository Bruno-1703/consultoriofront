import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  useCreateCitaEstudioMutation,
  useCreateEstudioMutation,
} from "../../graphql/types";

type EstudioInput = {
  id_estudio?: string;
  codigo_referencia?: string;
  fecha_realizacion?: string;
  medico_solicitante?: string;
  observaciones?: string;
  resultado?: string;
  tipo_estudio?: string;
  urgente?: boolean;
};

interface Props {
  open: boolean;
  onClose: () => void;
  cita: { id_cita: string };
}

const AgregarEstudio: React.FC<Props> = ({ open, onClose, cita }) => {
  const [tipoEstudio, setTipoEstudio] = useState("");
  const [resultado, setResultado] = useState("");
  const [codigoReferencia, setCodigoReferencia] = useState("");
  const [fechaRealizacion, setFechaRealizacion] = useState<Dayjs | null>(null);
  const [medicoSolicitante, setMedicoSolicitante] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [urgente, setUrgente] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [createEstudio, { loading, error }] = useCreateEstudioMutation();
  const [createCitaEstudio] = useCreateCitaEstudioMutation();

  const resetForm = () => {
    setTipoEstudio("");
    setResultado("");
    setCodigoReferencia("");
    setFechaRealizacion(null);
    setMedicoSolicitante("");
    setObservaciones("");
    setUrgente(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const estudioResponse = await createEstudio({
        variables: {
          idCita: cita.id_cita,
          data: {
            tipo_estudio: tipoEstudio,
            resultado,
            codigo_referencia: codigoReferencia,
            fecha_realizacion: fechaRealizacion?.toISOString() || null,
            medico_solicitante: medicoSolicitante,
            observaciones,
            urgente,
          },
        },
      });

      const estudioToCita: EstudioInput = {
        // id_estudio: estudioResponse.data?.createEstudio.,
        codigo_referencia: codigoReferencia,
        fecha_realizacion: fechaRealizacion?.toISOString(),
      };

 
      setSnackbarOpen(true);
      handleClose();
    } catch (err) {
      console.error("Error al registrar estudio o asociarlo a la cita:", err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ backgroundColor: "#1976d2", color: "#fff", borderRadius: "8px 8px 0 0" }}
        >
          Registrar Estudio
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
          <DialogContent dividers sx={{ backgroundColor: "#f5f5f5" }}>
            <TextField
              label="Tipo de Estudio"
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
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
              />
            </LocalizationProvider>
            <TextField
              label="Resultado"
              fullWidth
              value={resultado}
              onChange={(e) => setResultado(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Código de Referencia"
              fullWidth
              required
              value={codigoReferencia}
              onChange={(e) => setCodigoReferencia(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Médico Solicitante"
              fullWidth
              required
              value={medicoSolicitante}
              onChange={(e) => setMedicoSolicitante(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Observaciones"
              fullWidth
              multiline
              rows={3}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <FormControlLabel
              control={<Checkbox checked={urgente} onChange={(e) => setUrgente(e.target.checked)} />}
              label="Urgente"
              sx={{ marginBottom: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Ocurrió un error al registrar el estudio.
              </Alert>
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#f5f5f5" }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Registrando..." : "Registrar"}
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Estudio creado exitosamente.
        </Alert>
      </Snackbar>
    </>
  );
};

export default AgregarEstudio;
