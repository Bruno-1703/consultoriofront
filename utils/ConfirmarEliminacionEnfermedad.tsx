import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from '@mui/material';

interface ConfirmarEliminacionEnfermedadProps {
  open: boolean;
  id: string;
  onConfirm: () => void;
  onClose: () => void;
  disable?: boolean;
  titulo?: string;
  mensaje?: string;
}

const ConfirmarEliminacionEnfermedad: React.FC<ConfirmarEliminacionEnfermedadProps> = ({
  open,
  id,
  onConfirm,
  onClose,
  disable = false,
  titulo = 'Confirmación',
  mensaje = '¿Estás seguro de que deseas eliminar esta enfermedad?',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {mensaje}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {disable ? (
          <LinearProgress color="secondary" sx={{ width: '100%', mb: 1 }} />
        ) : (
          <>
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              color="primary"
              autoFocus
              disabled={disable}
            >
              Confirmar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarEliminacionEnfermedad;
