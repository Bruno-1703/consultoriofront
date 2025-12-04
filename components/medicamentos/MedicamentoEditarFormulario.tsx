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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(145deg, #f0f4f8, #cdd5df)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          border: "1px solid #b0bec5",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: "#3f51b5", mb: 3 }}
        >
          {isEditing ? "Editar Medicamento" : "Registrar Nuevo Medicamento"}
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "#9fa8da" }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="nombre_med"
                value={formData.nombre_med}
                onChange={handleChange}
                fullWidth
                required
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                fullWidth
                required
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            {/* Fecha de Vencimiento con DatePicker */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Vencimiento"
                  value={fechaVencimiento}
                  onChange={(newValue) => {
                    setFechaVencimiento(newValue);
                    setFormData((prev) => ({
                      ...prev,
                      fecha_vencimiento: newValue
                        ? newValue.toDate().toISOString()
                        : "",
                    }));
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "medium",
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "& fieldset": { borderColor: "#bdbdbd" },
                          "&:hover fieldset": { borderColor: "#7986cb" },
                          "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Dosis (ej. Cada 8 horas)"
                name="dosis_hs"
                type="text"
                value={formData.dosis_hs || ""}
                onChange={handleChange}
                fullWidth
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Agente Principal"
                name="agente_principal"
                value={formData.agente_principal}
                onChange={handleChange}
                fullWidth
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Efectos Secundarios"
                name="efectos_secundarios"
                value={formData.efectos_secundarios}
                onChange={handleChange}
                fullWidth
                multiline
                size="medium"
                rows={3}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Categoría"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                fullWidth
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraindicaciones"
                name="contraindicaciones"
                value={formData.contraindicaciones}
                onChange={handleChange}
                fullWidth
                multiline
                size="medium"
                rows={3}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Prescripción requerida"
                name="prescripcion_requerida"
                select
                value={formData.prescripcion_requerida ? "true" : "false"}
                onChange={handleSelectChange}
                fullWidth
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              >
                <MenuItem value="true">Sí</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Lista negra"
                name="lista_negra"
                select
                value={formData.lista_negra ? "true" : "false"}
                onChange={handleSelectChange}
                fullWidth
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#bdbdbd" },
                    "&:hover fieldset": { borderColor: "#7986cb" },
                    "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              >
                <MenuItem value="true">Sí</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <Button
              variant="outlined"
              onClick={onClose}
              size="large"
              sx={{
                borderRadius: 2,
                borderColor: "#607d8b",
                color: "#607d8b",
                "&:hover": {
                  backgroundColor: "#eceff1",
                  borderColor: "#455a64",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                borderRadius: 2,
                backgroundColor: "#4caf50",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              {isEditing ? "Actualizar" : "Registrar"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default MedicamentoEditarFormulario;
