import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  useCreateMedicamentoMutation,
  useUpdateMedicamentoMutation,
  useGetMedicamentoQuery,
  MedicamentoInput,
} from "../../graphql/types";

interface Props {
  isEditing: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
  idMedicamento?: string | null;
}

const MedicamentoEditarFormulario: React.FC<Props> = ({
  isEditing,
  onClose,
  onSuccess,
  onError,
  idMedicamento,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MedicamentoInput>();

  const [createMedicamento] = useCreateMedicamentoMutation();
  const [updateMedicamento] = useUpdateMedicamentoMutation();

  const { data } = useGetMedicamentoQuery({
    skip: !isEditing || !idMedicamento,
    variables: { id: idMedicamento! },
  });

  useEffect(() => {
    if (data?.getMedicamento && isEditing) {
      const m = data.getMedicamento;
      setValue("nombre_med", m.nombre_med);
      setValue("marca", m.marca);
      setValue("fecha_vencimiento", m.fecha_vencimiento);
      setValue("dosis_hs", m.dosis_hs);
      setValue("agente_principal", m.agente_principal || "");
      setValue("efectos_secundarios", m.efectos_secundarios || "");
      setValue("lista_negra", m.lista_negra || false);
      setValue("categoria", m.categoria || "");
      setValue("contraindicaciones", m.contraindicaciones || "");
      setValue("prescripcion_requerida", m.prescripcion_requerida || false);
    }
  }, [data, isEditing, setValue]);

  const onSubmit = async (input: MedicamentoInput) => {
    try {
      if (isEditing && idMedicamento) {
        await updateMedicamento({
          variables: {
            medicamentoId: idMedicamento,
            data: input,
          },
        });
      } else {
        await createMedicamento({
          variables: {
            data: input,
          },
        });
      }
      reset();
      onSuccess();
    } catch (err: any) {
      onError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h6" gutterBottom>
        {isEditing ? "Editar Medicamento" : "Registrar Nuevo Medicamento"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nombre"
            fullWidth
            {...register("nombre_med", { required: true })}
            error={!!errors.nombre_med}
            helperText={errors.nombre_med && "Este campo es obligatorio"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Marca"
            fullWidth
            {...register("marca", { required: true })}
            error={!!errors.marca}
            helperText={errors.marca && "Este campo es obligatorio"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Fecha de Vencimiento"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register("fecha_vencimiento", { required: true })}
            error={!!errors.fecha_vencimiento}
            helperText={errors.fecha_vencimiento && "Este campo es obligatorio"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Dosis (horas)"
            type="number"
            fullWidth
            {...register("dosis_hs", { required: true, min: 1 })}
            error={!!errors.dosis_hs}
            helperText={errors.dosis_hs && "Debe ser un número mayor a 0"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Agente Principal" fullWidth {...register("agente_principal")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Efectos Secundarios" fullWidth {...register("efectos_secundarios")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Categoría" fullWidth {...register("categoria")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Contraindicaciones" fullWidth {...register("contraindicaciones")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Prescripción Requerida"
            fullWidth
            select
            defaultValue={false}
            {...register("prescripcion_requerida", {
              setValueAs: (v) => v === "true",
            })}
          >
            <MenuItem value="true">Sí</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Lista Negra"
            fullWidth
            select
            defaultValue={false}
            {...register("lista_negra", {
              setValueAs: (v) => v === "true",
            })}
          >
            <MenuItem value="true">Sí</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? "Actualizar" : "Registrar"}
        </Button>
      </Stack>
    </Box>
  );
};

export default MedicamentoEditarFormulario;
