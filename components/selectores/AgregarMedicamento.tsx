import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import {
  useGetMedicamentosQuery,
  useCreateCitaMedicamentoMutation,
  // Necesitamos el tipo MedicamentoInput si tu mutación lo espera
  MedicamentoInput, // <--- Asegúrate de importar esto si es necesario
  // MedicamentoNode, // Si lo usas para tipar Medicamento en el useMemo
} from "../../graphql/types";

// Helper para Snackbar con Alert
const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Cita {
  id_cita: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  cita: Cita | null;
}

const AgregarMedicamento: React.FC<Props> = ({ open, onClose, cita }) => {
  const [medicamentoId, setMedicamentoId] = React.useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error" | "warning" | "info">("info");

  const {
    data,
    loading,
    error: queryError,
    refetch,
  } = useGetMedicamentosQuery({
    variables: {
      limit: 50,
      skip: 0,
      where: {},
    },
    skip: !open || !cita?.id_cita,
    fetchPolicy: "network-only",
  });

  const [createCitaMedicamento, { loading: saving, error: mutationError }] =
    useCreateCitaMedicamentoMutation();

  React.useEffect(() => {
    if (open) {
      setMedicamentoId("");
      if (cita?.id_cita) {
        refetch();
      }
    }
  }, [open, cita?.id_cita, refetch]);

  const handleChange = (event: { target: { value: unknown } }) => {
    setMedicamentoId(event.target.value as string);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleGuardar = async () => {
    if (!cita?.id_cita) {
      setSnackbarMessage("Error: No se ha seleccionado una cita válida para asociar el medicamento.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!medicamentoId) {
      setSnackbarMessage("Por favor, selecciona un medicamento de la lista.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const selectedMed = data?.getMedicamentos?.edges?.find(
      (m) => m?.node?.id_medicamento === medicamentoId
    )?.node;

    if (!selectedMed || !selectedMed.id_medicamento || !selectedMed.nombre_med) {
      setSnackbarMessage("Error: Medicamento seleccionado no válido o faltan datos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await createCitaMedicamento({
        variables: {
          citaId: cita.id_cita,
          // *** LA CORRECCIÓN ESTÁ AQUÍ ***
          medicamentos: [ // Tu mutación espera un array 'medicamentos'
            {
              id_medicamento: selectedMed.id_medicamento,
              nombre_med: selectedMed.nombre_med,
              // Si tu MedicamentoInput tiene otros campos OBLIGATORIOS, deberías incluirlos aquí.
              // Por ejemplo:
              // dosis: "1 pastilla",
              // frecuencia: "cada 8 horas",
            } as MedicamentoInput, // <--- Asegúrate de tipar esto si MedicamentoInput es complejo
          ],
        },
      });

      setSnackbarMessage("Medicamento agregado exitosamente a la cita.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setMedicamentoId("");
      onClose();
    } catch (err) {
      console.error("Error al guardar medicamento:", err);
      const errorMessage = (err as Error).message || "Error desconocido";
      setSnackbarMessage(`Error al guardar medicamento: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    setMedicamentoId("");
    onClose();
    setSnackbarOpen(false);
  };

  const medicamentosOptions = React.useMemo(() => {
    return data?.getMedicamentos?.edges
      ?.map((edge) => edge?.node)
      .filter((node): node is { id_medicamento: string; nombre_med: string } =>
        node !== null &&
        node !== undefined &&
        typeof node.id_medicamento === 'string' &&
        typeof node.nombre_med === 'string'
      ) || [];
  }, [data]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            pb: 2,
          }}
        >
          Agregar Medicamento a la Cita
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: "#f5f5f5",
            pt: 2,
            pb: 2,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
              <CircularProgress />
            </Box>
          ) : queryError ? (
            <SnackbarAlert severity="error">
              Error al cargar medicamentos: {queryError.message}
            </SnackbarAlert>
          ) : (
            <FormControl
              fullWidth
              sx={{ mt: 2 }}
              disabled={medicamentosOptions.length === 0}
            >
              <InputLabel id="medicamento-select-label">Medicamento</InputLabel>
              <Select
                labelId="medicamento-select-label"
                value={medicamentoId}
                onChange={handleChange}
                label="Medicamento"
                autoFocus
                key={medicamentosOptions.length > 0 ? "select-with-options" : "select-no-options"}
              >
                {medicamentosOptions.length > 0 ? (
                  medicamentosOptions.map((med) => (
                    <MenuItem
                      key={med.id_medicamento}
                      value={med.id_medicamento}
                    >
                      {med.nombre_med}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    No hay medicamentos disponibles
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: "#f5f5f5",
            p: 3,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{ px: 3, py: 1.2 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuardar}
            disabled={saving || !medicamentoId || !cita?.id_cita || medicamentosOptions.length === 0}
            sx={{ px: 3, py: 1.2 }}
          >
            {saving ? <CircularProgress size={24} color="inherit" /> : "Guardar Medicamento"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <SnackbarAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};

export default AgregarMedicamento;