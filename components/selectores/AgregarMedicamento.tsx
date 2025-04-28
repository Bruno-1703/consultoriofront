import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  useGetMedicamentosQuery,
  useCreateCitaMedicamentoMutation,
} from "../../graphql/types"; // ajustá el path si es necesario

interface Props {
  open: boolean;
  onClose: () => void;
  cita: any;
}

const AgregarMedicamento: React.FC<Props> = ({ open, onClose, cita }) => {
  const [medicamentoId, setMedicamentoId] = React.useState("");

  const { data, loading, error } = useGetMedicamentosQuery({
    variables: {
      limit: 50,
      skip: 0,
      where: {},
    },
  });

  const [createCitaMedicamento, { loading: saving, error: mutationError }] =
    useCreateCitaMedicamentoMutation();

  const handleChange = (event: any) => {
    setMedicamentoId(event.target.value);
  };

  const handleGuardar = async () => {
    if (!cita?.id_cita || !medicamentoId) return;

    const selectedMed = data?.getMedicamentos?.edges?.find(
      (m) => m.node?.id_medicamento === medicamentoId
    )?.node;

    if (!selectedMed) return;

    try {
      await createCitaMedicamento({
        variables: {
          citaId: cita.id_cita,
          medicamentos: [
            {
              id_medicamento: selectedMed.id_medicamento,
              nombre_med: selectedMed.nombre_med,
            },
          ],
        },
      });

      // Limpiar y cerrar
      setMedicamentoId("");
      onClose();
    } catch (err) {
      console.error("Error al guardar medicamento:", err);
    }
  };

  const handleClose = () => {
    setMedicamentoId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Agregar Medicamento</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">Error al cargar medicamentos</Alert>
        ) : (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Medicamento</InputLabel>
            <Select value={medicamentoId} onChange={handleChange}>
              {data?.getMedicamentos?.edges?.map((item) => (
                <MenuItem
                  key={item.node?.id_medicamento ?? ""}
                  value={item.node?.id_medicamento ?? ""}
                >
                  {item.node?.nombre_med ?? "Desconocido"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {mutationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {mutationError.message}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!medicamentoId || saving}
          onClick={handleGuardar}
        >
          {saving ? "Guardando..." : "Guardar"}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 1 }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AgregarMedicamento;
