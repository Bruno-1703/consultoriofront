import React from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useGetPacientesQuery } from "../graphql/types";
import SearchIcon from "@mui/icons-material/Search";

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
    onChange(event.target.value || null); // Este valor es el DNI
  };

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
      }}
    >
      <Stack spacing={3}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#1976d2", letterSpacing: 0.4 }}
        >
          Seleccionar Persona
        </Typography>

        {error && (
          <Alert severity="error">
            Error al cargar las personas: {error.message}
          </Alert>
        )}

        {/* Entrada de DNI */}
        <TextField
          label="Escribe el DNI"
          value={value ?? ""}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          disabled={loading}
          placeholder="Ej: 12345678"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading && (
                  <CircularProgress size={20} sx={{ marginRight: 1 }} />
                )}
              </>
            ),
            sx: {
              borderRadius: 2,
              backgroundColor: "#fff",
            },
          }}
          helperText="Puedes escribir el DNI directamente o elegir de la lista"
        />

        {/* Lista de selección */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "#555", fontWeight: 600 }}
          >
            O selecciona de la lista:
          </Typography>

          <TextField
            select
            value={value ?? ""}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled={loading || !!error}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
            }}
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              data?.getPacientes?.edges.map((persona) => (
                <MenuItem
                  key={persona.node.id_paciente}
                  value={persona.node.dni ?? ""}
                >
                  {`${persona.node.nombre_paciente} ${persona.node.apellido_paciente} — DNI: ${persona.node.dni}`}
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
