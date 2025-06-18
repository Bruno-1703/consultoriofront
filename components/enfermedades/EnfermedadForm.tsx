import React, { useEffect, useState } from "react";
import {
  
  useUpdateEnfermedadMutation,
  EnfermedadInput,
  useGetEnfermedadByIdQuery,
} from "../../graphql/types";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

interface EnfermedadFormEditProps {
  enfermedadId: string;
  onClose: () => void;
}

const EnfermedadFormEdit: React.FC<EnfermedadFormEditProps> = ({
  enfermedadId,
  onClose,
}) => {
  const [formData, setFormData] = useState<EnfermedadInput>({
    nombre_enf: "",
    sintomas: "",
    gravedad: "",
  });

  const { data, loading, error } = useGetEnfermedadByIdQuery({
    variables: { id: enfermedadId },
  });

  const [updateEnfermedadMutation, { loading: updating }] = useUpdateEnfermedadMutation();

  useEffect(() => {
    if (data?.getEnfermedadById) {
      const enfermedad = data.getEnfermedadById;
      setFormData({
        nombre_enf: enfermedad.nombre_enf ?? "",
        sintomas: enfermedad.sintomas ?? "",
        gravedad: enfermedad.gravedad ?? "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEnfermedadMutation({
        variables: {
          enfermedadId,
          data: formData,
        },
      });
      onClose();
    } catch (err) {
      console.error("Error al actualizar enfermedad:", err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error al cargar: {error.message}</Alert>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#f9f9f9",
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <TextField
        name="nombre_enf"
        label="Nombre de la Enfermedad"
        value={formData.nombre_enf}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        name="sintomas"
        label="Síntomas"
        value={formData.sintomas}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        name="gravedad"
        label="Gravedad"
        value={formData.gravedad}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={updating}
        fullWidth
      >
        {updating ? "Guardando..." : "Guardar Cambios"}
      </Button>
    </Box>
  );
};

export default EnfermedadFormEdit;
