  import React from "react";
  import {
    Box,
    Stack,
    Typography,
    TextField,
    MenuItem,
    CircularProgress,
    Alert,
  } from "@mui/material";
  import { useGetPacientesQuery } from "../graphql/types";

  interface PersonaSelectorProps {
    value: string | null;
    onChange: (value: string | null) => void;
  }

  const PersonaSelector: React.FC<PersonaSelectorProps> = ({
    value,
    onChange,
  }) => {
    const { data, loading, error } = useGetPacientesQuery();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value || null); // Este valor será el dni
    };

    return (
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold">
            Seleccionar Persona
          </Typography>

          {error && (
            <Alert severity="error">
              Error al cargar las personas: {error.message}
            </Alert>
          )}

      <TextField
    select
    label="Seleccionar Persona"
    value={value ?? ""} // Asegura que nunca es null
    onChange={handleChange}
    fullWidth
    variant="outlined"
    disabled={loading || !!error}
    helperText={
      error
        ? "No se puede cargar personas"
        : "Selecciona una persona de la lista"
    }
  >
    {loading && (
      <MenuItem value="" disabled>
        <CircularProgress size={20} sx={{ marginRight: 1 }} />
        Cargando personas...
      </MenuItem>
    )}

    {data?.getPacientes?.edges.map((persona) => (
      <MenuItem
        key={persona.node.id_paciente}
        value={persona.node.dni ?? ""} 
      >
        {`${persona.node.nombre_paciente} ${persona.node.apellido_paciente} (DNI: ${persona.node.dni})`}
      </MenuItem>
    ))}
  </TextField>

        </Stack>
      </Box>
    );
  };

  export default PersonaSelector;
