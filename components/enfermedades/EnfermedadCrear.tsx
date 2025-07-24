import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { EnfermedadInput, useCreateEnfermedadMutation } from "../../graphql/types";

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface EnfermedadFormProps {
  enfermedadId: string;
  onClose: () => void;
}
const EnfermedadForm: React.FC<EnfermedadFormProps> = ({ onClose }) => {
  const [nombre_enfermedad, setNombreEnfermedad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_diagnostico, setFechaDiagnostico] = useState<Dayjs | null>(null);
  const [tipo, setTipo] = useState("");
  const [gravedad, setGravedad] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");

  const [errors, setErrors] = useState({
    nombre_enfermedad: false,
    fecha_diagnostico: false,
  });

  const [createEnfermedadMutation, { loading }] = useCreateEnfermedadMutation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const resetForm = () => {
    setNombreEnfermedad("");
    setDescripcion("");
    setFechaDiagnostico(null);
    setTipo("");
    setGravedad("");
    setTratamiento("");
    setErrors({
      nombre_enfermedad: false,
      fecha_diagnostico: false,
    });
  };

  const validateForm = () => {
    const newErrors = {
      nombre_enfermedad: !nombre_enfermedad.trim(),
      fecha_diagnostico: !fecha_diagnostico || !fecha_diagnostico.isValid(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(e => e);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      setSnackbarMessage("Por favor, corrige los errores en el formulario.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const enfermedadInput: EnfermedadInput = {
      nombre_enf: nombre_enfermedad.trim(),
      sintomas: descripcion.trim() || undefined,
      gravedad: gravedad || undefined,
    };

    try {
      await createEnfermedadMutation({ variables: { data: enfermedadInput } });
      setSnackbarMessage("Enfermedad creada exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      resetForm();
      if (onClose) {
        setTimeout(() => onClose(), 500);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error al crear la enfermedad.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <Typography variant="h5" textAlign="center" fontWeight="bold" color="primary" mb={3}>
        Registrar Nueva Enfermedad
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre de la Enfermedad"
              value={nombre_enfermedad}
              onChange={(e) => setNombreEnfermedad(e.target.value)}
              fullWidth
              size="small"
              error={errors.nombre_enfermedad}
              helperText={errors.nombre_enfermedad ? "El nombre es obligatorio" : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Diagnóstico"
                value={fecha_diagnostico}
                onChange={(newValue) => {
                  setFechaDiagnostico(newValue);
                  setErrors((prev) => ({
                    ...prev,
                    fecha_diagnostico: !newValue || !newValue.isValid(),
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: errors.fecha_diagnostico,
                    helperText: errors.fecha_diagnostico ? "Fecha inválida" : "",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo</InputLabel>
              <Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                label="Tipo"
              >
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                <MenuItem value="Crónica">Crónica</MenuItem>
                <MenuItem value="Aguda">Aguda</MenuItem>
                <MenuItem value="Infecciosa">Infecciosa</MenuItem>
                <MenuItem value="Genética">Genética</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Gravedad</InputLabel>
              <Select
                value={gravedad}
                onChange={(e) => setGravedad(e.target.value)}
                label="Gravedad"
              >
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                <MenuItem value="Leve">Leve</MenuItem>
                <MenuItem value="Moderada">Moderada</MenuItem>
                <MenuItem value="Severa">Severa</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Tratamiento"
              value={tratamiento}
              onChange={(e) => setTratamiento(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Registrar Enfermedad"}
            </Button>
          </Grid>

        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </SnackbarAlert>
      </Snackbar>
    </Box>
  );
};

export default EnfermedadForm;
