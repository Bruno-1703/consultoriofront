// components/MedicamentoDetalleModal.tsx

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";

type Medicamento = {
  nombre_med: string;
  marca: string;
  fecha_vencimiento: string;
  dosis_hs: number;
  stock: number;
};

interface MedicamentoDetalleModalProps {
  open: boolean;
  onClose: () => void;
  medicamento: Medicamento | null;
}

const MedicamentoDetalleModal: React.FC<MedicamentoDetalleModalProps> = ({
  open,
  onClose,
  medicamento,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalle del Medicamento</DialogTitle>
      <DialogContent>
        {medicamento && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Nombre
              </Typography>
              <Typography variant="body1">{medicamento.nombre_med}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Marca
              </Typography>
              <Typography variant="body1">{medicamento.marca}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Fecha Vencimiento
              </Typography>
              <Typography variant="body1">
                {new Date(medicamento.fecha_vencimiento).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Dosis cada
              </Typography>
              <Typography variant="body1">{medicamento.dosis_hs} horas</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Stock
              </Typography>
              <Typography variant="body1">{medicamento.stock} unidades</Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MedicamentoDetalleModal;
