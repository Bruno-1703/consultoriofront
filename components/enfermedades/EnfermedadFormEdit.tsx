import React, { useEffect, useState } from "react";
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
  Alert,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  EnfermedadInput,
  useCreateEnfermedadMutation,
  useUpdateEnfermedadMutation,
  useGetEnfermedadByIdQuery,
} from "../../graphql/types";

interface EnfermedadFormProps {
  enfermedadId?: string | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
  isEditing: boolean;

}
const EnfermedadForm: React.FC<EnfermedadFormProps> = ({ enfermedadId,   isEditing,
  onClose,
  onSuccess,
  onError, }) => {
  const [nombre_enfermedad, setNombreEnfermedad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_diagnostico, setFechaDiagnostico] = useState<Dayjs | null>(null);
  const [tipo, setTipo] = useState("");
  const [gravedad, setGravedad] = useState("");
  const [tratamiento, setTratamiento] = useState("");

  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");

  const [errors, setErrors] = useState({
    nombre_enfermedad: false,
    fecha_diagnostico: false,
  });

  const [createEnfermedadMutation, { loading: creating }] = useCreateEnfermedadMutation();
  const [updateEnfermedadMutation, { loading: updating }] = useUpdateEnfermedadMutation();
  const { data, loading: fetching } = useGetEnfermedadByIdQuery({
    skip: !enfermedadId,
    variables: { id: enfermedadId ?? "" },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getEnfermedadById) {
      const enf = data.getEnfermedadById;
      setNombreEnfermedad(enf.nombre_enf ?? "");
      setDescripcion(enf.sintomas ?? "");
      setGravedad(enf.gravedad ?? "");
    }
  }, [data]);

  const validateForm = () => {
    const newErrors = {
      nombre_enfermedad: !nombre_enfermedad.trim(),
      fecha_diagnostico: !fecha_diagnostico || !fecha_diagnostico.isValid(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const resetForm = () => {
    setNombreEnfermedad("");
    setDescripcion("");
    setFechaDiagnostico(null);
    setTipo("");
    setGravedad("");
    setTratamiento("");
    setErrors({ nombre_enfermedad: false, fecha_diagnostico: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setSnackbarMessage("Por favor, completa los campos obligatorios.");
      setSnackbarSeverity("warning");
      return;
    }

    const enfermedadInput: EnfermedadInput = {
      nombre_enf: nombre_enfermedad.trim(),
      sintomas: descripcion.trim() || undefined,
      gravedad: gravedad || undefined,
    };

    try {
      if (enfermedadId) {
        await updateEnfermedadMutation({ variables: { enfermedadId, data: enfermedadInput } });
        setSnackbarMessage("Enfermedad actualizada exitosamente.");
      } else {
        await createEnfermedadMutation({ variables: { data: enfermedadInput } });
        setSnackbarMessage("Enfermedad registrada exitosamente.");
        resetForm();
      }

      setSnackbarSeverity("success");
      setTimeout(onClose, 1000);
    } catch (error: any) {
      console.error(error);
      setSnackbarMessage("Ocurrió un error al guardar los datos.");
      setSnackbarSeverity("error");
    }
  };

  if (fetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={150}>
        <CircularProgress />
      </Box>
    );
  }

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
        {enfermedadId ? "Editar Enfermedad" : "Registrar Nueva Enfermedad"}
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
              <Select value={tipo} onChange={(e) => setTipo(e.target.value)} label="Tipo">
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
              <Select value={gravedad} onChange={(e) => setGravedad(e.target.value)} label="Gravedad">
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
              disabled={creating || updating}
              sx={{ py: 1.5 }}
            >
              {(creating || updating) ? <CircularProgress size={24} color="inherit" /> : enfermedadId ? "Guardar Cambios" : "Registrar Enfermedad"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={5000}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarMessage(null)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EnfermedadForm;
