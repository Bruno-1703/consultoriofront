// components/shared/ConfirmarEliminacion.tsx
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { FC } from 'react';

export interface ConfirmarEliminacionProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => void;
  mensaje: string;
  disablets?: boolean; // Opción de deshabilitar botones, si aplica
}

const ConfirmarEliminacion: FC<ConfirmarEliminacionProps> = ({
  open,
  onClose,
  onConfirmar,
  mensaje,
  disablets = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¿Estás seguro?</DialogTitle>
      <DialogContent>{mensaje}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={disablets}>Cancelar</Button>
        <Button onClick={onConfirmar} color="error" disabled={disablets}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarEliminacion;
