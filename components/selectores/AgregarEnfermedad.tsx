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
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  useGetEnfermedadesQuery,
  useCreateCitaEnfermedadMutation,
} from "../../graphql/types";

// Estilos personalizados
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: "16px",
    backgroundColor: "#fafafa",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
}));

const StyledTitle = styled(DialogTitle)(() => ({
  fontWeight: "bold",
  fontSize: "1.4rem",
  textAlign: "center",
  paddingBottom: "0",
  color: "#333",
}));

const StyledFormControl = styled(FormControl)(() => ({
  marginTop: "20px",
}));

const StyledButton = styled(Button)(() => ({
  marginTop: "24px",
  fontWeight: 600,
  padding: "10px",
  borderRadius: "8px",
  textTransform: "none",
}));

interface Props {
  open: boolean;
  onClose: () => void;
  cita: any;
}

const AgregarEnfermedad: React.FC<Props> = ({ open, onClose, cita }) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedEnfermedades, setSelectedEnfermedades] = React.useState<any[]>([]);

  const { data, loading, error } = useGetEnfermedadesQuery({
    variables: { limit: 100, skip: 0 },
  });

  const [createCitaEnfermedad, { loading: saving, error: mutationError }] =
    useCreateCitaEnfermedadMutation();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const ids = event.target.value as string[];
    setSelectedIds(ids);

    const seleccionadas = data?.getEnfermedades?.edges
      ?.filter((e) => ids.includes(e.node?.id_enfermedad ?? ""))
      .map((e) => e.node);
    setSelectedEnfermedades(seleccionadas || []);
  };

  const handleGuardar = async () => {
    if (!cita?.id_cita || selectedEnfermedades.length === 0) return;

    try {
      await createCitaEnfermedad({
        variables: {
          citaId: cita.id_cita,
          enfermedades: selectedEnfermedades.map((enf) => ({
            id_enfermedad: enf.id_enfermedad,
            nombre_enf: enf.nombre_enf,
            gravedad: enf.gravedad,
            sintomas: enf.sintomas,
          })),
        },
      });
      onClose();
      // Limpiar los valores al guardar
      setSelectedIds([]);
      setSelectedEnfermedades([]);
    } catch (err) {
      console.error("Error al guardar enfermedades:", err);
    }
  };

  const handleClose = () => {
    onClose();
    // Limpiar los valores al cerrar sin guardar
    setSelectedIds([]);
    setSelectedEnfermedades([]);
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <StyledTitle>
        Agregar Enfermedades
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 12, top: 12, color: "#999" }}
        >
          <CloseIcon />
        </IconButton>
      </StyledTitle>

      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">Error al cargar enfermedades</Alert>
        ) : (
          <StyledFormControl fullWidth>
            <InputLabel>Seleccionar Enfermedades</InputLabel>
            <Select
              multiple
              value={selectedIds}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((id) => {
                    const enf = data?.getEnfermedades?.edges.find(
                      (e) => e.node?.id_enfermedad === id
                    );
                    return <Chip key={id} label={enf?.node?.nombre_enf || "Desconocida"} />;
                  })}
                </Box>
              )}
            >
              {data?.getEnfermedades?.edges?.map((item) => (
                <MenuItem
                  key={item.node?.id_enfermedad}
                  value={item.node?.id_enfermedad || ""}
                >
                  {item.node?.nombre_enf}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        )}

        {mutationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error al guardar: {mutationError.message}
          </Alert>
        )}

        <StyledButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGuardar}
          disabled={saving || selectedEnfermedades.length === 0}
        >
          {saving ? "Guardando..." : "Guardar"}
        </StyledButton>

        <StyledButton variant="outlined" color="secondary" fullWidth onClick={handleClose}>
          Cancelar
        </StyledButton>
      </DialogContent>
    </StyledDialog>
  );
};

export default AgregarEnfermedad;
