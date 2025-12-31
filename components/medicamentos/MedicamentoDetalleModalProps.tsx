import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
// Iconos para mejorar la identificación visual
import MedicationIcon from '@mui/icons-material/Medication';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AssignmentIcon from '@mui/icons-material/Assignment';

type Medicamento = {
  nombre_med: string;
  marca: string;
  fecha_vencimiento: string;
  dosis_hs: string | number;
  stock: number;
  agente_principal?: string;
  efectos_secundarios?: string;
  categoria?: string;
  contraindicaciones?: string;
  prescripcion_requerida?: boolean;
  lista_negra?: boolean;
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
  if (!medicamento) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <MedicationIcon />
          <Typography variant="h6">Detalles del Medicamento</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {/* Cabecera con Nombre y Estados Críticos */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Box>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {medicamento.nombre_med}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <BusinessIcon fontSize="small" /> {medicamento.marca}
              </Typography>
            </Box>
            <Stack spacing={1} alignItems="flex-end">
              {medicamento.lista_negra && (
                <Chip label="Lista Negra" color="error" size="small" icon={<WarningAmberIcon />} />
              )}
              <Chip 
                label={medicamento.prescripcion_requerida ? "Receta Obligatoria" : "Venta Libre"} 
                variant="outlined" 
                color={medicamento.prescripcion_requerida ? "warning" : "success"}
                size="small"
              />
            </Stack>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={3}>
            {/* Información Logística */}
            <Grid item xs={12} sm={4}>
              <Typography variant="caption" color="textSecondary" display="flex" alignItems="center" gap={0.5}>
                <CalendarMonthIcon fontSize="inherit" /> VENCIMIENTO
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {new Date(medicamento.fecha_vencimiento).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="caption" color="textSecondary" display="flex" alignItems="center" gap={0.5}>
                <InventoryIcon fontSize="inherit" /> STOCK ACTUAL
              </Typography>
              <Typography variant="body1" fontWeight="bold" color={medicamento.stock < 10 ? "error.main" : "inherit"}>
                {medicamento.stock} unidades
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="caption" color="textSecondary" display="flex" alignItems="center" gap={0.5}>
                <AssignmentIcon fontSize="inherit" /> DOSIS
              </Typography>
              <Typography variant="body1">
                {medicamento.dosis_hs}
              </Typography>
            </Grid>

            <Grid item xs={12}>
                <Divider><Chip label="Información Farmacológica" size="small" variant="outlined" /></Divider>
            </Grid>

            {/* Información Farmacológica */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary">Agente Principal</Typography>
              <Typography variant="body2">{medicamento.agente_principal || "No especificado"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary">Categoría</Typography>
              <Typography variant="body2">{medicamento.categoria || "N/A"}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary">Efectos Secundarios</Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {medicamento.efectos_secundarios || "Sin efectos secundarios reportados."}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ p: 1.5, bgcolor: '#fff4f4', borderRadius: 1, borderLeft: '4px solid #d32f2f' }}>
                <Typography variant="subtitle2" color="error" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <WarningAmberIcon fontSize="small" /> Contraindicaciones
                </Typography>
                <Typography variant="body2">
                  {medicamento.contraindicaciones || "Ninguna contraindicación registrada."}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
        <Button onClick={onClose} variant="outlined" color="primary" sx={{ borderRadius: 2 }}>
          Regresar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MedicamentoDetalleModal;