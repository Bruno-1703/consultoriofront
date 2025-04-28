import React, { useEffect, useState } from "react";
import {
  useUpdatePacienteMutation,
  PacienteInput,
  useGetPacienteQuery,
} from "../../graphql/types"; // Asegúrate de importar el tipo correcto
import { Box, Button, TextField } from "@mui/material";

interface PacienteFormProps {
  pacienteId: string;
  onClose: () => void;
}

const PacienteFormEdit: React.FC<PacienteFormProps> = ({
  pacienteId,
  onClose,
}) => {
  console.log(pacienteId);
  const [formData, setFormData] = useState<PacienteInput>({
    dni: "",
    nombre_paciente: "",
    apellido_paciente: "",
    telefono: "",
    edad: 0,
    sexo: "",
    grupo_sanguineo: "",
  });

  // Obtener los datos del paciente a través de la consulta
  const { data, loading, error } = useGetPacienteQuery({
    variables: {
      id: pacienteId, // Asegúrate de pasar el id del paciente
    },
  });
  // Mutación para actualizar el paciente
  const [updatePacienteMutation] = useUpdatePacienteMutation();

  // Actualiza los valores del formulario cuando se obtienen los datos del paciente
  useEffect(() => {
    if (data?.getPaciente) {
      setFormData({
        dni: data.getPaciente.dni,
        nombre_paciente: data.getPaciente.nombre_paciente,
        apellido_paciente: data.getPaciente.apellido_paciente,
        telefono: data.getPaciente.telefono,
        edad: data.getPaciente.edad,
        sexo: data.getPaciente.sexo,
        grupo_sanguineo: data.getPaciente.grupo_sanguineo,
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePacienteMutation({
        variables: {
          pacienteId: pacienteId,
          data: formData, // Pasa los datos del formulario como variables
        },
      });
      onClose(); // Cierra el formulario después de la actualización
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el paciente</div>;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="DNI"
        value={formData.dni}
        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
        fullWidth
      />
      <TextField
        label="Nombre"
        value={formData.nombre_paciente}
        onChange={(e) =>
          setFormData({ ...formData, nombre_paciente: e.target.value })
        }
        fullWidth
      />
      <TextField
        label="Apellido"
        value={formData.apellido_paciente}
        onChange={(e) =>
          setFormData({ ...formData, apellido_paciente: e.target.value })
        }
        fullWidth
      />
      <TextField
        label="Teléfono"
        value={formData.telefono}
        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
        fullWidth
      />
      <TextField
        label="Edad"
        value={formData.edad}
        type="number"
        onChange={(e) =>
          setFormData({ ...formData, edad: parseInt(e.target.value) })
        }
        fullWidth
      />
      {/* Otros campos del formulario, como sexo y grupo sanguíneo */}
      <TextField
        label="Sexo"
        value={formData.sexo}
        onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
        fullWidth
      />
      <TextField
        label="Grupo Sanguíneo"
        value={formData.grupo_sanguineo}
        onChange={(e) =>
          setFormData({ ...formData, grupo_sanguineo: e.target.value })
        }
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Guardar Cambios
      </Button>
    </Box>
  );
};

export default PacienteFormEdit;
