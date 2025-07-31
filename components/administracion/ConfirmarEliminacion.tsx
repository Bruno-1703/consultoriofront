import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@mui/material";

interface ConfirmarEliminacionProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => void;
  mensaje?: string;
  disable?: boolean;
}

const ConfirmarEliminacion: React.FC<ConfirmarEliminacionProps> = ({
  open,
  onClose,
  onConfirmar,
  mensaje = "¿Estás seguro de que deseas eliminar este registro?",
  disable = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <Typography>{mensaje}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={disable}>Cancelar</Button>
        <Button onClick={onConfirmar} color="error" disabled={disable} variant="contained">Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarEliminacion;
