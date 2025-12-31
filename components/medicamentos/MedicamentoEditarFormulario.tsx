import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import {
  useCreateMedicamentoMutation,
  useUpdateMedicamentoMutation,
  useGetMedicamentoQuery,
  MedicamentoInput,
} from "../../graphql/types";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  isEditing: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
  idMedicamento?: string | null;
}

const initialState: MedicamentoInput = {
  nombre_med: "",
  marca: "",
  fecha_vencimiento: "",
  dosis_hs: "",
  agente_principal: "",
  efectos_secundarios: "",
  categoria: "",
  contraindicaciones: "",
  prescripcion_requerida: false,
  lista_negra: false,
};

const MedicamentoEditarFormulario: React.FC<Props> = ({
  isEditing,
  onClose,
  onSuccess,
  onError,
  idMedicamento,
}) => {
  const [formData, setFormData] = useState<MedicamentoInput>(initialState);
  const [createMedicamento] = useCreateMedicamentoMutation();
  const [updateMedicamento] = useUpdateMedicamentoMutation();

  const { data } = useGetMedicamentoQuery({
    skip: !isEditing || !idMedicamento,
    variables: { id: idMedicamento! },
  });

  const [fechaVencimiento, setFechaVencimiento] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (data?.getMedicamento && isEditing) {
      setFormData({ ...initialState, ...data.getMedicamento });
    }
  }, [data, isEditing]);

  // Sync fechaVencimiento state with formData.fecha_vencimiento
  useEffect(() => {
    if (formData.fecha_vencimiento) {
      setFechaVencimiento(dayjs(formData.fecha_vencimiento));
    } else {
      setFechaVencimiento(null);
    }
  }, [formData.fecha_vencimiento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "true",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { __typename, id_medicamento, ...cleanData } = formData as any;

      if (fechaVencimiento) {
        cleanData.fecha_vencimiento = fechaVencimiento.toDate();
      } else {
        cleanData.fecha_vencimiento = null;
      }

      if (isEditing && idMedicamento) {
        await updateMedicamento({
          variables: {
            medicamentoId: idMedicamento,
            data: cleanData,
          },
        });
      } else {
        await createMedicamento({
          variables: {
            data: cleanData,
          },
        });
      }
      setFormData(initialState);
      setFechaVencimiento(null);
      onSuccess();
    } catch (err: any) {
      onError(err.message);
    }
  };

  return (
   <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, color: "#1a237e", mb: 1 }}>
        {isEditing ? "Editar Medicamento" : "Nuevo Registro"}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Complete los campos técnicos y de control de stock.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nombre Comercial" name="nombre_med" value={formData.nombre_med} onChange={handleChange} fullWidth required size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Marca/Laboratorio" name="marca" value={formData.marca} onChange={handleChange} fullWidth required size="small" />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Vencimiento"
                value={fechaVencimiento}
                onChange={(newValue) => setFechaVencimiento(newValue)}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Dosis Recomendada" name="dosis_hs" value={formData.dosis_hs} onChange={handleChange} fullWidth size="small" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Agente Principal (Fórmula)" name="agente_principal" value={formData.agente_principal} onChange={handleChange} fullWidth size="small" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Categoría" name="categoria" value={formData.categoria} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Receta" name="prescripcion_requerida" select value={formData.prescripcion_requerida ? "true" : "false"} onChange={handleSelectChange} fullWidth size="small">
              <MenuItem value="true">Sí</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Stock Crítico" name="lista_negra" select value={formData.lista_negra ? "true" : "false"} onChange={handleSelectChange} fullWidth size="small">
              <MenuItem value="true">Sí</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Efectos Secundarios" name="efectos_secundarios" value={formData.efectos_secundarios} onChange={handleChange} fullWidth multiline rows={2} size="small" />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button onClick={onClose} variant="text" sx={{ color: "text.secondary" }}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: "#2e7d32", "&:hover": { bgcolor: "#1b5e20" }, px: 4, borderRadius: 2 }}>
            {isEditing ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Stack>
      </Box>
    </Box>

  );
};

export default MedicamentoEditarFormulario;
