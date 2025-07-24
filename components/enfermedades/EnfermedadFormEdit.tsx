import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  useGetEnfermedadByIdQuery,
  useUpdateEnfermedadMutation,
} from "../../graphql/types";

interface EnfermedadFormEditProps {
  enfermedadId: string;
  onClose: () => void;
}

const EnfermedadFormEdit: React.FC<EnfermedadFormEditProps> = ({ enfermedadId, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);

  const { data, loading, error } = useGetEnfermedadByIdQuery({
    variables: { id: enfermedadId },
    fetchPolicy: "network-only",
  });

  const [updateEnfermedad, { loading: updating }] = useUpdateEnfermedadMutation();

  // Cargar los datos en el formulario
  useEffect(() => {
    if (data?.getEnfermedadById) {
      setNombre(data.getEnfermedadById.nombre_enf || "");
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      await updateEnfermedad({
        variables: {
         enfermedadId : enfermedadId,
          data: {
            nombre_enf: nombre.trim(),
          },
        },
      });

      setSuccessSnackbar("Enfermedad actualizada con éxito.");
      setTimeout(onClose, 1000); // Cierra el formulario después de 1s
    } catch (err: any) {
      setErrorSnackbar(`Error al actualizar: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">Error al cargar los datos: {error.message}</Alert>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Editar Enfermedad
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Nombre de la enfermedad"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={updating || nombre.trim() === ""}
          >
            {updating ? <CircularProgress size={24} /> : "Guardar cambios"}
          </Button>
        </Stack>
      </Stack>

      {/* Snackbar Éxito */}
      <Snackbar
        open={!!successSnackbar}
        autoHideDuration={3000}
        onClose={() => setSuccessSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccessSnackbar(null)} severity="success">
          {successSnackbar}
        </Alert>
      </Snackbar>

      {/* Snackbar Error */}
      <Snackbar
        open={!!errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setErrorSnackbar(null)} severity="error">
          {errorSnackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EnfermedadFormEdit;
