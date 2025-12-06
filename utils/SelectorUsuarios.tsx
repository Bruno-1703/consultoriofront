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
    onChange(event.target.value || null);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "#f0f4f8",
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          color="#1976d2"
        >
          Seleccionar Persona
        </Typography>

        {error && (
          <Alert severity="error">{`Error al cargar personas: ${error.message}`}</Alert>
        )}

        {/* Input de búsqueda por DNI */}
        <TextField
          label="Escribe el DNI"
          value={value ?? ""}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          disabled={loading || !!error}
          helperText={
            error
              ? "No se puede cargar personas"
              : "Escribe el DNI o selecciona de la lista"
          }
          InputProps={{
            sx: {
              backgroundColor: "#fff",
              borderRadius: 1,
              fontSize: "0.85rem",
            },
            endAdornment: loading && (
              <CircularProgress size={18} sx={{ marginRight: 1 }} />
            ),
          }}
        />

        {/* Selector de la lista */}
        <Box>
          <Typography
            variant="caption"
            sx={{ mb: 1, color: "#555", fontWeight: 500 }}
          >
            O selecciona de la lista:
          </Typography>
          <TextField
            select
            value={value ?? ""}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            disabled={loading || !!error}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                fontSize: "0.85rem",
              },
            }}
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={18} />
              </MenuItem>
            ) : (
              data?.getPacientes?.edges.map((persona) => (
                <MenuItem
                  key={persona.node.id_paciente}
                  value={persona.node.dni ?? ""}
                >
                  {`${persona.node.nombre_paciente} ${persona.node.apellido_paciente} (DNI: ${persona.node.dni})`}
                </MenuItem>
              ))
            )}
          </TextField>
        </Box>
      </Stack>
    </Box>
  );
};

export default PersonaSelector;
