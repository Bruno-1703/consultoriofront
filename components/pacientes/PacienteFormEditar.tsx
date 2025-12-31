import React, { useEffect, useState } from "react";
import {
  useUpdatePacienteMutation,
  useGetPacienteQuery,
  PacienteInput,
} from "../../graphql/types";
import {
  Box, Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Grid, Typography, Divider, CircularProgress, SelectChangeEvent
} from "@mui/material";

interface PacienteFormProps {
  pacienteId: string;
  onClose: () => void;
}

const PacienteFormEdit: React.FC<PacienteFormProps> = ({ pacienteId, onClose }) => {
  const [formData, setFormData] = useState<PacienteInput>({
    dni: "", nombre_paciente: "", apellido_paciente: "", telefono: "",
    edad: undefined, altura: undefined, fecha_nacimiento: undefined,
    sexo: "", grupo_sanguineo: "", alergias: "", obra_social: "",
    email: "", direccion: "", nacionalidad: "",
  });

  const { data, loading } = useGetPacienteQuery({ variables: { id: pacienteId } });
  const [updatePacienteMutation, { loading: updating }] = useUpdatePacienteMutation();

  useEffect(() => {
    if (data?.getPaciente) {
      const p = data.getPaciente;
      setFormData({
        ...p,
        fecha_nacimiento: p.fecha_nacimiento ? new Date(p.fecha_nacimiento) : undefined,
      } as any);
    }
  }, [data]);

  const handleInputChange = (key: keyof PacienteInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" ? (e.target.value === "" ? undefined : Number(e.target.value)) : e.target.value;
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key: keyof PacienteInput) => (e: SelectChangeEvent<string>) => {
    setFormData(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePacienteMutation({ variables: { pacienteId, data: formData } });
      onClose();
    } catch (err) { console.error(err); }
  };

  if (loading) return <Box sx={{ textAlign: 'center', py: 5 }}><CircularProgress /></Box>;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        
        {/* SECCIÓN PERSONAL */}
        <Grid item xs={12}><Typography variant="subtitle2" color="primary">DATOS PERSONALES</Typography></Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="DNI" value={formData.dni || ""} onChange={handleInputChange("dni")} fullWidth required size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" type="email" value={formData.email || ""} onChange={handleInputChange("email")} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" value={formData.nombre_paciente || ""} onChange={handleInputChange("nombre_paciente")} fullWidth required size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Apellido" value={formData.apellido_paciente || ""} onChange={handleInputChange("apellido_paciente")} fullWidth required size="small" />
        </Grid>

        <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>

        {/* SECCIÓN MÉDICA */}
        <Grid item xs={12}><Typography variant="subtitle2" color="primary">INFORMACIÓN MÉDICA</Typography></Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Edad" type="number" value={formData.edad ?? ""} onChange={handleInputChange("edad")} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Altura (cm)" type="number" value={formData.altura ?? ""} onChange={handleInputChange("altura")} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Sexo</InputLabel>
            <Select value={formData.sexo || ""} label="Sexo" onChange={handleSelectChange("sexo")}>
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Femenino</MenuItem>
              <MenuItem value="O">Otro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha Nacimiento" type="date" fullWidth size="small" InputLabelProps={{ shrink: true }}
            value={formData.fecha_nacimiento instanceof Date ? formData.fecha_nacimiento.toISOString().split('T')[0] : ""}
            onChange={(e) => setFormData(prev => ({ ...prev, fecha_nacimiento: e.target.value ? new Date(e.target.value) : undefined }))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Grupo Sanguíneo</InputLabel>
            <Select value={formData.grupo_sanguineo || ""} label="Grupo Sanguíneo" onChange={handleSelectChange("grupo_sanguineo")}>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>

        {/* CONTACTO */}
        <Grid item xs={12} sm={6}>
          <TextField label="Teléfono" value={formData.telefono || ""} onChange={handleInputChange("telefono")} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Obra Social" value={formData.obra_social || ""} onChange={handleInputChange("obra_social")} fullWidth size="small" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Dirección" value={formData.direccion || ""} onChange={handleInputChange("direccion")} fullWidth size="small" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Alergias" multiline rows={2} value={formData.alergias || ""} onChange={handleInputChange("alergias")} fullWidth size="small" />
        </Grid>

        <Grid item xs={12} sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="inherit" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={updating} sx={{ px: 4 }}>
            {updating ? "Guardando..." : "Actualizar Paciente"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PacienteFormEdit;