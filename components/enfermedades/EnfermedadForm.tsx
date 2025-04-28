import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCreateEnfermedadMutation } from "../../graphql/types";

interface EnfermedadFormProps {
  onSubmit: (formData: { nombre_enf: string; sintomas: string; gravedad: string }) => void;
  onClose: () => void;
  defaultValues?: {
    nombre_enf?: string;
    sintomas?: string;
    gravedad?: string;
  };
}

const EnfermedadForm: React.FC<EnfermedadFormProps> = ({
  onSubmit,
  onClose,
  defaultValues = {},
}) => {
  const [formData, setFormData] = React.useState({
    nombre_enf: defaultValues.nombre_enf || "",
    sintomas: defaultValues.sintomas || "",
    gravedad: defaultValues.gravedad || "Leve",
  });

  const [createEnfermedadMutation, { data, loading, error }] = useCreateEnfermedadMutation();
  
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // Estado para manejar el Snackbar
  const [snackbarMessage, setSnackbarMessage] = React.useState(""); // Mensaje del Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error">("success"); // Severidad del snackbar

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createEnfermedadMutation({
        variables: { data: formData },
      });
      setSnackbarMessage("Enfermedad creada con éxito!"); // Mensaje de éxito
      setSnackbarSeverity("success"); // Cambiar a éxito
      setOpenSnackbar(true); // Abrir el Snackbar
      onSubmit(formData); // Si la mutación es exitosa, llamamos a onSubmit
      onClose(); // Cerrar el formulario
    } catch (err) {
      // Si hay un error, muestra un mensaje de error
      setSnackbarMessage("Hubo un error al crear la enfermedad. Intenta de nuevo.");
      setSnackbarSeverity("error"); // Cambiar a error
      setOpenSnackbar(true);
      console.error(err); // Puedes personalizar el error si lo deseas
    }
  };

  // Comprobar si `error` tiene un valor válido y mostrar mensaje si es necesario
  React.useEffect(() => {
    if (error) {
      setSnackbarMessage("Hubo un error al crear la enfermedad. Intenta de nuevo.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [error]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        {defaultValues.nombre_enf ? "Editar Enfermedad" : "Registrar Enfermedad"}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Nombre de la Enfermedad"
          name="nombre_enf"
          value={formData.nombre_enf}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <TextField
          label="Síntomas"
          name="sintomas"
          value={formData.sintomas}
          onChange={handleInputChange}
          required
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          select
          label="Gravedad"
          name="gravedad"
          value={formData.gravedad}
          onChange={handleInputChange}
          required
          fullWidth
        >
          {["Leve", "Moderada", "Grave"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Hubo un error al guardar la enfermedad. Por favor intente de nuevo.
        </Typography>
      )}
      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "flex-end" }}>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading} // Deshabilitar el botón mientras se está procesando la mutación
        >
          {loading ? <CircularProgress size={24} /> : defaultValues.nombre_enf ? "Guardar Cambios" : "Registrar"}
        </Button>
      </Stack>
      {/* Snackbar para mostrar mensaje de éxito o error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EnfermedadForm;
