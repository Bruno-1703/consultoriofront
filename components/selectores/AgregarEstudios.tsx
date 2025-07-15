import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Box,
  Alert as MuiAlert,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AlertProps } from "@mui/material/Alert";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {
  useCreateEstudioMutation,
} from "../../graphql/types";

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CitaProp {
  id_cita: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  cita: CitaProp;
}

const AgregarEstudio: React.FC<Props> = ({ open, onClose, cita }) => {
  const [tipoEstudio, setTipoEstudio] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");
  const [codigoReferencia, setCodigoReferencia] = useState<string>("");
  const [fechaRealizacion, setFechaRealizacion] = useState<Dayjs | null>(null);
  const [medicoSolicitante, setMedicoSolicitante] = useState<string>("");
  const [observaciones, setObservaciones] = useState<string>("");
  const [urgente, setUrgente] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");

  const [createEstudio, { loading }] = useCreateEstudioMutation();

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setTipoEstudio("");
    setResultado("");
    setCodigoReferencia("");
    setFechaRealizacion(null);
    setMedicoSolicitante("");
    setObservaciones("");
    setUrgente(false);
    setSelectedFile(null);
    setImagePreviewUrl(null);
  };

  const handleClose = () => {
    onClose();
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!tipoEstudio || !codigoReferencia || !medicoSolicitante || !cita?.id_cita) {
      setSnackbarMessage("Por favor, completa todos los campos requeridos.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    let uploadedImageUrl: string | null = null;

    if (selectedFile) {
      // Aquí va la lógica de subida real si tienes backend
      uploadedImageUrl = `https://ejemplo.com/imagenes/${selectedFile.name}`;
    }

    try {
      await createEstudio({
        variables: {
          idCita: cita.id_cita,
          data: {
            tipo_estudio: tipoEstudio,
            resultado: resultado || null,
            codigo_referencia: codigoReferencia,
            fecha_realizacion: fechaRealizacion ? fechaRealizacion.toISOString() : null,
            medico_solicitante: medicoSolicitante,
            observaciones: observaciones || null,
            urgente,
            // imagen_url: uploadedImageUrl,
          },
        },
      });

      setSnackbarMessage("Estudio registrado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleClose();
    } catch (err) {
      setSnackbarMessage(`Error al registrar estudio: ${(err as Error).message || "Error desconocido"}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            pb: 2,
          }}
        >
          Registrar Nuevo Estudio
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent sx={{ backgroundColor: "#f5f5f5", pt: 2, pb: 2 }}>
            <Grid container spacing={2}>
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
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      }
                    }}
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
              <Grid item xs={12} sm={6} display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={urgente}
                      onChange={(e) => setUrgente(e.target.checked)}
                    />
                  }
                  label="Urgente"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <TextField
                    label="Archivo seleccionado"
                    value={selectedFile.name}
                    sx={{ mt: 1 }}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
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

              <Grid item xs={12}>
                <label htmlFor="raised-button-file" style={{ flexGrow: 1 }}>
                  <Button
                    variant="outlined"
                    component="span"
                    endIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{ px: 2, py: 3 }}
                  >
                    Subir Imagen (Opcional)
                  </Button>
                </label>
              </Grid>

              {imagePreviewUrl && (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center' }}>
                    <img
                      src={imagePreviewUrl}
                      alt="Previsualización de la imagen"
                      style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogContent>

          <DialogActions
            sx={{
              backgroundColor: "#f5f5f5",
              p: 3,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              sx={{ px: 3, py: 1.2, color: "#fff" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !tipoEstudio || !codigoReferencia || !medicoSolicitante}
              sx={{ px: 3, py: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Registrar Estudio"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};

export default AgregarEstudio;
