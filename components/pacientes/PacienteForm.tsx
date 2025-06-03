import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { PacienteInput, useCreatePacienteMutation } from "../../graphql/types";
import dayjs, { Dayjs } from "dayjs";

const PacienteForm = () => {
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    dni: false,
    nombre_paciente: false,
    apellido_paciente: false,
    fechaNacimiento: false,
  });

  const [createPacienteMutation] = useCreatePacienteMutation();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = dayjs(event.target.value);
    const isValidDate = inputDate.isValid();
    if (isValidDate) {
      setFechaNacimiento(inputDate);
      setErrors((prevErrors) => ({ ...prevErrors, fechaNacimiento: false }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, fechaNacimiento: true }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      dni: !dni,
      nombre_paciente: !nombre_paciente,
      apellido_paciente: !apellido_paciente,
      fechaNacimiento: !fechaNacimiento,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const pacienteInput: PacienteInput = {
      dni,
      apellido_paciente,
      nombre_paciente,
      edad: parseInt(edad, 10),
      altura: parseFloat(altura),
      telefono,
      fecha_nacimiento: fechaNacimiento ? fechaNacimiento.format("YYYY-MM-DD") : "",
      sexo,
      grupo_sanguineo,
      alergias,
    };

    try {
      await createPacienteMutation({
        variables: {
          data: pacienteInput,
        },
      });
      setSuccessMessage("Paciente creado exitosamente");
      resetForm();
    } catch (error) {
      console.error("Error al crear paciente:", error);
    }
  };

  const resetForm = () => {
    setDni("");
    setNombrePaciente("");
    setApellidoPaciente("");
    setFechaNacimiento(null);
    setEdad("");
    setAltura("");
    setTelefono("");
    setSexo("");
    setGrupoSanguineo("");
    setAlergias("");
  };

  const isFormValid = () => {
    // El formulario es válido si no hay errores
    return !Object.values(errors).includes(true) && dni && nombre_paciente && apellido_paciente && fechaNacimiento;
  };

  return (
<Box
  sx={{
    padding: 3,
    margin: "auto",  // Centramos el Box
    backgroundColor: "#ffffff",  // Fondo blanco para mejor contraste
    borderRadius: 2,  // Bordes redondeados
    boxShadow: 3,  // Agregamos sombra para darle profundidad
    transition: "all 0.3s ease",  // Transición suave para interacciones
    "&:hover": {
      boxShadow: 6,  // Aumentamos la sombra al pasar el mouse
    },
  }}
>
  <Typography
    variant="h6"
    gutterBottom
    sx={{
      fontWeight: "bold",  // Resaltamos el título con mayor grosor
      color: "#1976d2",  // Un color de texto atractivo
      fontSize: "1.2rem",  // Ajustamos el tamaño del título para que se vea más grande
    }}
  >
    Registrar Paciente
  </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#f9f9f9",
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          fullWidth
          size="small"
          required
          error={errors.dni}
          helperText={errors.dni ? "El DNI es obligatorio" : ""}
        />
        <TextField
          label="Nombre"
          value={nombre_paciente}
          onChange={(e) => setNombrePaciente(e.target.value)}
          fullWidth
          size="small"
          required
          error={errors.nombre_paciente}
          helperText={errors.nombre_paciente ? "El nombre es obligatorio" : ""}
        />
        <TextField
          label="Apellido"
          value={apellido_paciente}
          onChange={(e) => setApellidoPaciente(e.target.value)}
          fullWidth
          size="small"
          required
          error={errors.apellido_paciente}
          helperText={errors.apellido_paciente ? "El apellido es obligatorio" : ""}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <TextField
          label="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          fullWidth
          size="small"
        />

        <TextField
          label="Fecha de Nacimiento"
          type="date"
          value={fechaNacimiento ? fechaNacimiento.format("YYYY-MM-DD") : ""}
          onChange={handleDateChange}
          fullWidth
          required
          error={errors.fechaNacimiento}
          helperText={errors.fechaNacimiento ? "Formato de fecha inválido (YYYY-MM-DD)" : ""}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth size="small">
          <InputLabel>Sexo</InputLabel>
          <Select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            label="Sexo"
          >
            <MenuItem value={"M"}>Masculino</MenuItem>
            <MenuItem value={"F"}>Femenino</MenuItem>
            <MenuItem value={"O"}>Otro</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Grupo Sanguíneo</InputLabel>
          <Select
            value={grupo_sanguineo}
            onChange={(e) => setGrupoSanguineo(e.target.value)}
            label="Grupo Sanguíneo"
          >
            <MenuItem value={"A+"}>A+</MenuItem>
            <MenuItem value={"A-"}>A-</MenuItem>
            <MenuItem value={"B+"}>B+</MenuItem>
            <MenuItem value={"B-"}>B-</MenuItem>
            <MenuItem value={"O+"}>O+</MenuItem>
            <MenuItem value={"O-"}>O-</MenuItem>
            <MenuItem value={"AB+"}>AB+</MenuItem>
            <MenuItem value={"AB-"}>AB-</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Alergias"
          value={alergias}
          onChange={(e) => setAlergias(e.target.value)}
          fullWidth
          size="small"
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid()}
        >
          Registrar
        </Button>
      </Box>

      {successMessage && (
        <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
          <Alert onClose={() => setSuccessMessage(null)} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default PacienteForm;
