import React, { useState } from "react";
import { Button, TextField, Box, Typography, MenuItem } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useCreateUsuarioMutation } from "../../graphql/types";

const initialState = {
  dni: "",
  email: "",
  especialidad: "",
  matricula: "",
  nombre_completo: "",
  nombre_usuario: "",
  telefono: "",
  password: "",
  rol_usuario: "usuario",
};

export default function CrearUsuarioFormulario({ onUsuarioCreado }: { onUsuarioCreado?: () => void }) {
  const [form, setForm] = useState(initialState);

  const [createUsuarioMutation, { data, loading, error }] = useCreateUsuarioMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUsuarioMutation({ variables: { data: form } });
      setForm(initialState);
      if (onUsuarioCreado) onUsuarioCreado();
    } catch (err) {
      // Manejo de error
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
        p: 3,
        minWidth: 350,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
        Crear Nuevo Usuario
      </Typography>
      <TextField label="DNI" name="dni" value={form.dni} onChange={handleChange} required size="small" />
      <TextField label="Nombre completo" name="nombre_completo" value={form.nombre_completo} onChange={handleChange} required size="small" />
      <TextField label="Email" name="email" value={form.email} onChange={handleChange} required type="email" size="small" />
      <TextField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} required size="small" />
      <TextField label="Especialidad" name="especialidad" value={form.especialidad} onChange={handleChange} required size="small" />
      <TextField label="Matricula" name="matricula" value={form.matricula} onChange={handleChange} required size="small" />
      <TextField label="Nombre de usuario" name="nombre_usuario" value={form.nombre_usuario} onChange={handleChange} required size="small" />
      <TextField label="Contraseña" name="password" value={form.password} onChange={handleChange} required type="password" size="small" />
      <TextField
        select
        label="Rol"
        name="rol_usuario"
        value={form.rol_usuario}
        onChange={handleChange}
        required
        size="small"
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="usuario">Usuario</MenuItem>
        <MenuItem value="doctor">Doctor</MenuItem>
        <MenuItem value="recepcionista">Recepcionista</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2, fontWeight: "bold" }}>
        {loading ? "Creando..." : "Crear Usuario"}
      </Button>
      {error && (
        <Box sx={{ mt: 1 }}>
          <Typography color="error" variant="body2">{error.message}</Typography>
        </Box>
      )}
    </Box>
  );
}
