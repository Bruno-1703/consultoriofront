import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Enfermedad {
  id: string;
  nombre_enf: string;
  sintomas: string;
  gravedad: string;
}

interface EnfermedadesModalProps {
  open: boolean;
  onClose: () => void;
  enfermedadSeleccionada: Enfermedad | null;
  onEditar: () => void;
}

const EnfermedadesModal: React.FC<EnfermedadesModalProps> = ({
  open,
  onClose,
  enfermedadSeleccionada,
  onEditar,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Detalles de la Enfermedad
          </Typography>
          <IconButton onClick={onClose} size="small" aria-label="cerrar">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent dividers>
        {enfermedadSeleccionada ? (
          <Stack spacing={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Nombre:
            </Typography>
            <Typography>{enfermedadSeleccionada.nombre_enf}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Síntomas:
            </Typography>
            <Typography>{enfermedadSeleccionada.sintomas}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Gravedad:
            </Typography>
            <Typography>{enfermedadSeleccionada.gravedad}</Typography>
          </Stack>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Seleccione una enfermedad para ver los detalles.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
 
        <Button onClick={onClose} color="primary" variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnfermedadesModal;
