import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import {
  useGetUsuarioByIdQuery,
  useUpdateUsuarioMutation,
  UsuarioInput,
} from "../../graphql/types";

interface Props {
  isEditing: boolean;
  usuarioId?: string | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const initialState: UsuarioInput = {
  nombre_usuario: "",
  email: "",
  password: "",
  rol_usuario: "USUARIO",
  nombre_completo: "",
  especialidad: "",
  matricula: "",
  telefono: "",
  dni: "",
};

const UsuarioEditarFormulario: React.FC<Props> = ({
  isEditing,
  usuarioId,
  onClose,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<UsuarioInput>(initialState);

  const {
    data: usuarioData,
    loading: loadingUsuario,
    error: errorUsuario,
  } = useGetUsuarioByIdQuery({
    skip: !isEditing || !usuarioId,
    variables: { id: usuarioId ?? "" },
  });

useEffect(() => {
  if (usuarioData?.getUsuarioById && isEditing) {
    const {
      __typename,
      id_Usuario,
      ...rest
    } = usuarioData.getUsuarioById;

    const safeFormData: UsuarioInput = {
      ...initialState,
      ...rest,
      // Asegurarse de que todos los campos sean string, no null
      nombre_usuario: rest.nombre_usuario ?? "",
      email: rest.email ?? "",
      nombre_completo: rest.nombre_completo ?? "",
      especialidad: rest.especialidad ?? "",
      matricula: rest.matricula ?? "",
      telefono: rest.telefono ?? "",
      dni: rest.dni ?? "",
      rol_usuario: rest.rol_usuario ?? "USUARIO",
      password: "", // siempre string
    };

    setFormData(safeFormData);
  }
}, [usuarioData, isEditing]);

  const [updateUsuario, { loading: loadingUpdate }] = useUpdateUsuarioMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = { ...formData };
    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    try {
      await updateUsuario({
        variables: {
          usuarioId: usuarioId!,
          data: dataToSend,
        },
      });
      onSuccess();
    } catch (err: any) {
      onError(err.message || "Error actualizando el usuario");
    }
  };

  if (loadingUsuario) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (errorUsuario) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography color="error" align="center">
          Error cargando datos del usuario.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isEditing ? "Editar Usuario" : "Registrar Usuario"}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nombre de Usuario"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required={!isEditing}
              placeholder={isEditing ? "Dejar en blanco para no cambiar" : ""}
            />
            <TextField
              label="Rol"
              name="rol_usuario"
              value={formData.rol_usuario}
              onChange={handleChange}
              select
              fullWidth
            >
              <MenuItem value="Secretaria">Secretaria</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>

            </TextField>
            <TextField
              label="Nombre Completo"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Especialidad"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Matrícula"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <Button variant="outlined" onClick={onClose} disabled={loadingUpdate}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={loadingUpdate}>
              {isEditing ? "Actualizar" : "Registrar"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default UsuarioEditarFormulario;
