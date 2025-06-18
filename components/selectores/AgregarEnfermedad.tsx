import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, // Importamos DialogActions para los botones
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Box,
  Chip,
  IconButton,
  Snackbar, // Importamos Snackbar para mensajes de éxito/error
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert"; // Necesario para personalizar Alert en Snackbar
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material/Select";

// Importa los tipos generados por GraphQL
import {
  useGetEnfermedadesQuery,
  useCreateCitaEnfermedadMutation,
  EnfermedadInput, // Asegúrate de importar EnfermedadInput si tu mutación lo requiere
  // Asume que tienes un tipo para EnfermedadNode si usas GetEnfermedadesQuery
  // Podrías necesitar importar algo como:
  // EnfermedadNode,
} from "../../graphql/types"; // ajustá el path si es necesario

// Helper para Snackbar con Alert (reutilizado)
const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Define un tipo más específico para 'cita'
interface Cita {
  id_cita: string;
  // Agrega aquí otras propiedades de 'cita' que uses o que existan en tu esquema
}

interface Props {
  open: boolean;
  onClose: () => void;
  cita: Cita | null; // Mejoramos el tipado: cita puede ser null o una Cita
}

const AgregarEnfermedad: React.FC<Props> = ({ open, onClose, cita }) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  // selectedEnfermedades ya no es necesario como estado, se puede derivar
  // const [selectedEnfermedades, setSelectedEnfermedades] = React.useState<any[]>([]);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error" | "warning" | "info">("info");

  // Consulta para obtener enfermedades
  const { data, loading, error: queryError, refetch } = useGetEnfermedadesQuery({
    variables: { limit: 100, skip: 0 },
    // Opcional: Solo ejecutar la consulta si el modal está abierto y la cita es válida
    skip: !open || !cita?.id_cita,
    fetchPolicy: "network-only", // Siempre busca la última data
  });

  // Mutación para crear la cita-enfermedad
  const [createCitaEnfermedad, { loading: saving, error: mutationError }] =
    useCreateCitaEnfermedadMutation();

  // Reiniciar estado al abrir el modal y recargar enfermedades
  React.useEffect(() => {
    if (open) {
      setSelectedIds([]); // Limpiar la selección al abrir
      // setSelectedEnfermedades([]); // No es necesario si se deriva
      if (cita?.id_cita) {
        refetch(); // Recargar la lista de enfermedades cada vez que se abre el modal
      }
    }
  }, [open, cita?.id_cita, refetch]); // Dependencias para useEffect

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const ids = event.target.value as string[];
    setSelectedIds(ids);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleGuardar = async () => {
    // Validar antes de proceder
    if (!cita?.id_cita) {
      setSnackbarMessage("Error: No se ha seleccionado una cita válida para asociar la enfermedad.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (selectedIds.length === 0) {
      setSnackbarMessage("Por favor, selecciona al menos una enfermedad.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    // Preparar las enfermedades seleccionadas para la mutación
    const enfermedadesParaGuardar: EnfermedadInput[] = [];
    selectedIds.forEach(id => {
      const selectedEnf = data?.getEnfermedades?.edges?.find(
        (e) => e.node?.id_enfermedad === id
      )?.node;

      // Asegurarse de que el nodo de enfermedad existe y tiene las propiedades necesarias
      if (selectedEnf && selectedEnf.id_enfermedad && selectedEnf.nombre_enf) {
        enfermedadesParaGuardar.push({
          id_enfermedad: selectedEnf.id_enfermedad,
          nombre_enf: selectedEnf.nombre_enf,
          // Incluye aquí otras propiedades si tu EnfermedadInput las requiere
          // Por ejemplo, si 'gravedad' y 'sintomas' son obligatorios en EnfermedadInput
          gravedad: selectedEnf.gravedad || null, // Asegúrate de manejar nulos si es opcional
          sintomas: selectedEnf.sintomas || null, // Asegúrate de manejar nulos si es opcional
        } as EnfermedadInput); // Casting para asegurar el tipo si es necesario
      }
    });

    if (enfermedadesParaGuardar.length === 0) {
        setSnackbarMessage("Error: Ninguna de las enfermedades seleccionadas es válida.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
    }

    try {
      await createCitaEnfermedad({
        variables: {
          citaId: cita.id_cita,
          enfermedades: enfermedadesParaGuardar, // Pasa el array de EnfermedadInput
        },
      });

      setSnackbarMessage("Enfermedad(es) agregada(s) exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Limpiar y cerrar después de un guardado exitoso
      setSelectedIds([]);
      onClose();
    } catch (err) {
      console.error("Error al guardar enfermedad(es):", err);
      const errorMessage = (err as Error).message || "Error desconocido";
      setSnackbarMessage(`Error al guardar enfermedad(es): ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedIds([]); // Limpiar la selección al cerrar
    onClose();
    setSnackbarOpen(false); // Cerrar cualquier Snackbar activo
  };

  // Obtener la lista de enfermedades disponibles, filtrando nulos
  const enfermedadesOptions = React.useMemo(() => {
    return data?.getEnfermedades?.edges
      ?.map((edge) => edge?.node) // Mapear a los nodos
      .filter((node): node is { id_enfermedad: string; nombre_enf: string; gravedad?: string; sintomas?: string } => // Filtrar y tipar solo los nodos válidos
        node !== null &&
        node !== undefined &&
        typeof node.id_enfermedad === 'string' &&
        typeof node.nombre_enf === 'string'
      ) || []; // Asegurarse de que siempre sea un array
  }, [data]);


  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        {/* Título del Diálogo con el estilo consistente */}
        <DialogTitle
          sx={{
            backgroundColor: "#1976d2", // Color azul
            color: "#fff", // Texto blanco
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          Agregar Enfermedad(es) a la Cita
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: "#f5f5f5", // Fondo gris claro
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
              Error al cargar enfermedades: {queryError.message}
            </SnackbarAlert>
          ) : (
            <FormControl
                fullWidth
                sx={{ mt: 2 }}
                disabled={enfermedadesOptions.length === 0} // Deshabilita si no hay opciones
            >
              <InputLabel id="enfermedad-select-label">Seleccionar Enfermedades</InputLabel>
              <Select
                labelId="enfermedad-select-label"
                multiple
                value={selectedIds}
                onChange={handleChange}
                label="Seleccionar Enfermedades" // Importante para que el label flote correctamente
                autoFocus // Enfocar el select al abrir el diálogo
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((id) => {
                      // Buscar la enfermedad por ID en las opciones disponibles
                      const enf = enfermedadesOptions.find((e) => e.id_enfermedad === id);
                      return (
                        <Chip
                          key={id}
                          label={enf?.nombre_enf || "Desconocida"}
                          onDelete={() => setSelectedIds(selectedIds.filter((item) => item !== id))}
                          sx={{ backgroundColor: '#e0e0e0' }} // Estilo para el chip
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {enfermedadesOptions.length > 0 ? (
                  enfermedadesOptions.map((item) => (
                    <MenuItem
                      key={item.id_enfermedad} // Usar el ID como key
                      value={item.id_enfermedad}
                    >
                      {item.nombre_enf}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">No hay enfermedades disponibles</MenuItem> // Mensaje si la lista está vacía
                )}
              </Select>
            </FormControl>
          )}

          {/* El error de mutación se maneja ahora con Snackbar para consistencia */}
          {/* {mutationError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {mutationError.message}
            </Alert>
          )} */}
        </DialogContent>

        {/* Acciones del Diálogo con estilos consistentes */}
        <DialogActions
          sx={{
            backgroundColor: "#f5f5f5", // Mismo fondo que el contenido
            p: 3,
            justifyContent: "flex-end", // Alinea botones a la derecha
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
            disabled={saving || selectedIds.length === 0 || !cita?.id_cita || enfermedadesOptions.length === 0}
            sx={{ px: 3, py: 1.2 }}
          >
            {saving ? <CircularProgress size={24} color="inherit" /> : "Guardar Enfermedad(es)"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <SnackbarAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};

export default AgregarEnfermedad;