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

import { PacienteInput, useCreatePacienteMutation } from "../../graphql/types";

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface PacienteFormProps {
  onClose?: () => void;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ onClose }) => {
  const [dni, setDni] = useState("");
  const [nombre_paciente, setNombrePaciente] = useState("");
  const [apellido_paciente, setApellidoPaciente] = useState("");
  const [edad, setEdad] = useState("");
  const [altura, setAltura] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState<Dayjs | null>(null);
  const [sexo, setSexo] = useState("");
  const [grupo_sanguineo, setGrupoSanguineo] = useState("");
  const [alergias, setAlergias] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");

  const [errors, setErrors] = useState({
    dni: false,
    nombre_paciente: false,
    apellido_paciente: false,
    fechaNacimiento: false,
    email: false,
  });

  const [createPacienteMutation, { loading }] = useCreatePacienteMutation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const resetForm = () => {
    setDni("");
    setNombrePaciente("");
    setApellidoPaciente("");
    setEdad("");
    setAltura("");
    setTelefono("");
    setFechaNacimiento(null);
    setSexo("");
    setGrupoSanguineo("");
    setAlergias("");
    setObraSocial("");
    setEmail("");
    setDireccion("");
    setNacionalidad("");

    setErrors({
      dni: false,
      nombre_paciente: false,
      apellido_paciente: false,
      fechaNacimiento: false,
      email: false,
    });
  };

  const validateForm = () => {
    const newErrors = {
      dni: !dni,
      nombre_paciente: !nombre_paciente,
      apellido_paciente: !apellido_paciente,
      fechaNacimiento: !fechaNacimiento || !fechaNacimiento.isValid(),
      email: email ? !/\S+@\S+\.\S+/.test(email) : false,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      setSnackbarMessage("Por favor, corrige los errores en el formulario.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const parsedEdad = edad ? parseInt(edad, 10) : undefined;
    const parsedAltura = altura ? parseFloat(altura) : undefined;

    const pacienteInput: PacienteInput = {
      dni,
      nombre_paciente,
      apellido_paciente,
      edad: parsedEdad,
      altura: parsedAltura,
      telefono: telefono || undefined,
      fecha_nacimiento: fechaNacimiento ? fechaNacimiento.format("YYYY-MM-DD") : undefined,
      sexo: sexo || undefined,
      grupo_sanguineo: grupo_sanguineo || undefined,
      alergias: alergias || undefined,
      obra_social: obraSocial || undefined,
      email: email || undefined,
      direccion: direccion || undefined,
      nacionalidad: nacionalidad || undefined,
    };

    try {
      await createPacienteMutation({ variables: { data: pacienteInput } });
      setSnackbarMessage("Paciente creado exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      resetForm();
      if (onClose) {
        setTimeout(() => onClose(), 500);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error al crear el paciente.");
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
        Registrar Nuevo Paciente
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              fullWidth
              size="small"
              error={errors.dni}
              helperText={errors.dni ? "El DNI es obligatorio" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nombre"
              value={nombre_paciente}
              onChange={(e) => setNombrePaciente(e.target.value)}
              fullWidth
              size="small"
              error={errors.nombre_paciente}
              helperText={errors.nombre_paciente ? "El nombre es obligatorio" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Apellido"
              value={apellido_paciente}
              onChange={(e) => setApellidoPaciente(e.target.value)}
              fullWidth
              size="small"
              error={errors.apellido_paciente}
              helperText={errors.apellido_paciente ? "El apellido es obligatorio" : ""}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Edad"
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Altura (cm)"
              type="number"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Nacimiento"
                value={fechaNacimiento}
                onChange={(newValue) => {
                  setFechaNacimiento(newValue);
                  setErrors((prev) => ({
                    ...prev,
                    fechaNacimiento: !newValue || !newValue.isValid(),
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: errors.fechaNacimiento,
                    helperText: errors.fechaNacimiento ? "Fecha inválida" : "",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sexo</InputLabel>
              <Select value={sexo} onChange={(e) => setSexo(e.target.value)} label="Sexo">
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
                <MenuItem value="O">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Grupo Sanguíneo</InputLabel>
              <Select
                value={grupo_sanguineo}
                onChange={(e) => setGrupoSanguineo(e.target.value)}
                label="Grupo Sanguíneo"
              >
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Alergias"
              value={alergias}
              onChange={(e) => setAlergias(e.target.value)}
              fullWidth
              multiline
              rows={2}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Obra Social"
              value={obraSocial}
              onChange={(e) => setObraSocial(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size="small"
              error={errors.email}
              helperText={errors.email ? "Email inválido" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              fullWidth
              multiline
              rows={2}
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Nacionalidad"
              value={nacionalidad}
              onChange={(e) => setNacionalidad(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ py: 1.5 }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Registrar Paciente"}
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

export default PacienteForm;
