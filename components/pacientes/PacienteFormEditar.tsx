import React, { useEffect, useState } from "react";
import {
  useUpdatePacienteMutation,
  useGetPacienteQuery,
  PacienteInput,
} from "../../graphql/types";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface PacienteFormProps {
  pacienteId: string;
  onClose: () => void;
}

const PacienteFormEdit: React.FC<PacienteFormProps> = ({ pacienteId, onClose }) => {
  const [formData, setFormData] = useState<PacienteInput>({
    dni: "",
    nombre_paciente: "",
    apellido_paciente: "",
    telefono: "",
    edad: undefined,
    altura: undefined,
    fecha_nacimiento: undefined,
    sexo: "",
    grupo_sanguineo: "",
    alergias: "",
    obra_social: "",
    email: "",
    direccion: "",
    nacionalidad: "",
  });

  const { data, loading, error } = useGetPacienteQuery({
    variables: { id: pacienteId },
  });

  const [updatePacienteMutation, { loading: updating }] = useUpdatePacienteMutation();

  useEffect(() => {
    if (data?.getPaciente) {
      const paciente = data.getPaciente;
      setFormData({
        dni: paciente.dni ?? "",
        nombre_paciente: paciente.nombre_paciente ?? "",
        apellido_paciente: paciente.apellido_paciente ?? "",
        telefono: paciente.telefono ?? "",
        edad: paciente.edad ?? undefined,
        altura: paciente.altura ?? undefined,
        fecha_nacimiento: paciente.fecha_nacimiento
          ? new Date(paciente.fecha_nacimiento)
          : undefined,
        sexo: paciente.sexo ?? "",
        grupo_sanguineo: paciente.grupo_sanguineo ?? "",
        alergias: paciente.alergias ?? "",
        obra_social: paciente.obra_social ?? "",
        email: paciente.email ?? "",
        direccion: paciente.direccion ?? "",
        nacionalidad: paciente.nacionalidad ?? "",
      });
    }
  }, [data]);

  const handleInputChange = (key: keyof PacienteInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectChange = (key: keyof PacienteInput) => (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      fecha_nacimiento: e.target.value ? new Date(e.target.value) : undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePacienteMutation({
        variables: {
          pacienteId,
          data: formData,
        },
      });
      onClose();
    } catch (err) {
      console.error("Error al actualizar paciente:", err);
    }
  };

  if (loading) return <div>Cargando paciente...</div>;
  if (error) return <div>Error al cargar paciente: {error.message}</div>;

  // Estilos comunes para inputs y selects para separarlos
  const inputStyle = { marginBottom: "16px" };

  return (
     <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#f9f9f9",
        padding: 3,
        borderRadius: 2,
        maxWidth: 1500,
        width: "90%",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <TextField
        label="DNI"
        value={formData.dni || ""}
        onChange={handleInputChange("dni")}
        fullWidth
        sx={inputStyle}
      />
      <TextField
        label="Nombre"
        value={formData.nombre_paciente || ""}
        onChange={handleInputChange("nombre_paciente")}
        fullWidth
        sx={inputStyle}
      />
      <TextField
        label="Apellido"
        value={formData.apellido_paciente || ""}
        onChange={handleInputChange("apellido_paciente")}
        fullWidth
        sx={inputStyle}
      />
      <TextField
        label="Teléfono"
        value={formData.telefono || ""}
        onChange={handleInputChange("telefono")}
        fullWidth
        sx={inputStyle}
      />
      <TextField
        label="Edad"
        type="number"
        value={formData.edad ?? ""}
        onChange={handleInputChange("edad")}
        fullWidth
        inputProps={{ min: 0 }}
        sx={inputStyle}
      />
      <TextField
        label="Altura (cm)"
        type="number"
        value={formData.altura ?? ""}
        onChange={handleInputChange("altura")}
        fullWidth
        inputProps={{ min: 0 }}
        sx={inputStyle}
      />
      <TextField
        label="Fecha de nacimiento"
        type="date"
        value={formData.fecha_nacimiento ? formData.fecha_nacimiento.toISOString().substring(0, 10) : ""}
        onChange={handleDateChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={inputStyle}
      />
      <FormControl fullWidth sx={inputStyle}>
        <InputLabel>Sexo</InputLabel>
        <Select
          value={formData.sexo || ""}
          label="Sexo"
          onChange={handleSelectChange("sexo")}
        >
          <MenuItem value="">
            <em>Seleccionar</em>
          </MenuItem>
          <MenuItem value="M">Masculino</MenuItem>
          <MenuItem value="F">Femenino</MenuItem>
          <MenuItem value="O">Otro</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={inputStyle}>
        <InputLabel>Grupo Sanguíneo</InputLabel>
        <Select
          value={formData.grupo_sanguineo || ""}
          label="Grupo Sanguíneo"
          onChange={handleSelectChange("grupo_sanguineo")}
        >
          <MenuItem value="">
            <em>Seleccionar</em>
          </MenuItem>
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="A-">A-</MenuItem>
          <MenuItem value="B+">B+</MenuItem>
          <MenuItem value="B-">B-</MenuItem>
          <MenuItem value="O+">O+</MenuItem>
          <MenuItem value="O-">O-</MenuItem>
          <MenuItem value="AB+">AB+</MenuItem>
          <MenuItem value="AB-">AB-</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Alergias"
        value={formData.alergias || ""}
        onChange={handleInputChange("alergias")}
        fullWidth
        multiline
        rows={2}
        sx={inputStyle}
      />
      <TextField
        label="Obra Social"
        value={formData.obra_social || ""}
        onChange={handleInputChange("obra_social")}
        fullWidth
        sx={inputStyle}
      />
      <TextField
        label="Email"
        type="email"
        value={formData.email || ""}
        onChange={handleInputChange("email")}
        fullWidth
        sx={inputStyle}
      />
      <TextField
        label="Dirección"
        value={formData.direccion || ""}
        onChange={handleInputChange("direccion")}
        fullWidth
        multiline
        rows={2}
        sx={inputStyle}
      />
      <TextField
        label="Nacionalidad"
        value={formData.nacionalidad || ""}
        onChange={handleInputChange("nacionalidad")}
        fullWidth
        sx={inputStyle}
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

export default PacienteFormEdit;
