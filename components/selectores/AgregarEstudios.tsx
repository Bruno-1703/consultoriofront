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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AlertProps } from "@mui/material/Alert";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Icono para el botón de subir

import {
  useCreateEstudioMutation,
  // Deja comentada esta línea si 'createEstudio' ya asocia la cita
  // useCreateCitaEstudioMutation,
} from "../../graphql/types";

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Nuevo estado para el archivo
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // Para mostrar una vista previa

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");

  const [createEstudio, { loading, error: mutationError }] = useCreateEstudioMutation();

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
    setSelectedFile(null); // Reiniciar archivo seleccionado
    setImagePreviewUrl(null); // Limpiar vista previa
  };

  const handleClose = () => {
    onClose();
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Nuevo handler para la selección de archivo
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

    // --- Lógica de subida de imagen REAL (Placeholder) ---
    // Aquí es donde integrarías tu lógica para subir el 'selectedFile' a un servicio
    // y obtener una URL. Esto es un ejemplo conceptual.
    if (selectedFile) {
      // Ejemplo: Enviar a un endpoint REST o un servicio de almacenamiento.
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // const response = await fetch('/api/upload-image', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // uploadedImageUrl = data.imageUrl; // Asume que tu API devuelve la URL
      
      // Para este ejemplo, si no hay un backend real de subida de imagen,
      // podríamos usar un placeholder o el base64 directamente si tu GraphQL lo soporta.
      // Si tu backend de GraphQL espera Base64:
      // uploadedImageUrl = imagePreviewUrl; // Esto sería la cadena Base64 si se cargó como tal.
      
      // **IMPORTANTE:** Para que esto funcione, tu mutación GraphQL
      // `createEstudio` o una mutación separada para subir la imagen,
      // DEBE estar configurada para recibir y guardar esta imagen/URL.
      console.log("Archivo seleccionado para subir:", selectedFile.name);
      // Simulación de URL después de una subida exitosa (para probar el flujo)
      uploadedImageUrl = `https://ejemplo.com/imagenes/${selectedFile.name}`; 
    }
    // --------------------------------------------------------

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
            // imagen_url: uploadedImageUrl, // Pasa la URL de la imagen si se subió
          },
        },
      });

      setSnackbarMessage("Estudio registrado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleClose();
    } catch (err) {
      console.error("Error al registrar estudio:", err);
      setSnackbarMessage(`Error al registrar estudio: ${(err as Error).message || "Error desconocido"}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
          <DialogContent sx={{
            backgroundColor: "#f5f5f5",
            pt: 2,
            pb: 2,
          }}>
            <TextField
              label="Tipo de Estudio"
              fullWidth
              required
              value={tipoEstudio}
              onChange={(e) => setTipoEstudio(e.target.value)}
              sx={{ mb: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Realización"
                value={fechaRealizacion}
                onChange={(newDate) => setFechaRealizacion(newDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 2 }
                  }
                }}
              />
            </LocalizationProvider>
            <TextField
              label="Resultado"
              fullWidth
              value={resultado}
              onChange={(e) => setResultado(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Código de Referencia"
              fullWidth
              required
              value={codigoReferencia}
              onChange={(e) => setCodigoReferencia(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Médico Solicitante"
              fullWidth
              required
              value={medicoSolicitante}
              onChange={(e) => setMedicoSolicitante(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Observaciones"
              fullWidth
              multiline
              rows={3}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={urgente}
                  onChange={(e) => setUrgente(e.target.checked)}
                />
              }
              label="Urgente"
              sx={{ mb: 2 }}
            />

            {/* --- Nuevo Campo para Subir Imagen --- */}
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <input
                accept="image/*" // Solo acepta imágenes
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file" style={{ flexGrow: 1 }}>
                <Button 
                  variant="outlined" 
                  component="span" 
                  startIcon={<CloudUploadIcon />}
                  fullWidth // Hace que el botón ocupe todo el ancho disponible
                >
                  Subir Imagen (Opcional)
                </Button>
              </label>
              {selectedFile && (
                <TextField
                  label="Archivo seleccionado"
                  value={selectedFile.name}
                  sx={{ ml: 2, flexGrow: 2 }} // Espacio a la izquierda y crece más
                  InputProps={{
                    readOnly: true, // Solo lectura
                  }}
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
            {imagePreviewUrl && (
                <Box sx={{ mt: 1, mb: 2, textAlign: 'center' }}>
                    <img 
                        src={imagePreviewUrl} 
                        alt="Previsualización de la imagen" 
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} 
                    />
                </Box>
            )}
            {/* --- Fin Nuevo Campo para Subir Imagen --- */}

          </DialogContent>
          <DialogActions sx={{
            backgroundColor: "#f5f5f5",
            p: 3,
            justifyContent: "flex-end"
          }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              sx={{ px: 3, py: 1.2 }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !tipoEstudio || !codigoReferencia || !medicoSolicitante}
              sx={{ px: 3, py: 1.2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Registrar Estudio"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};

export default AgregarEstudio;