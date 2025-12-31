import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  TextField, Button, Grid, Box, Typography, FormControlLabel,
  Checkbox, Select, MenuItem, InputLabel, FormControl,
  Stack, CircularProgress, Snackbar, Alert, Divider
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { useCreateMedicamentoMutation } from '../../graphql/types';

const DOSIS_OPTIONS = ['Una vez al día', 'Dos veces al día', 'Tres veces al día', 'Cada 6 horas', 'Cada 8 horas', 'Cada 12 horas'];
const CATEGORIA_OPTIONS = ['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Antipirético', 'Antihistamínico', 'Otros'];

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const CrearMedicamentoFormulario: React.FC<Props> = ({ onClose, onSuccess, onError }) => {
  // Estado consolidado para campos simples (opcional, pero aquí mantenemos tu estructura para claridad)
  const [formData, setFormData] = useState({
    nombreMed: '',
    marca: '',
    dosisHs: '',
    agentePrincipal: '',
    efectosSecundarios: '',
    categoria: '',
    contraindicaciones: '',
    stock: '' as number | '',
    listaNegra: false,
    prescripcion: false,
  });

  const [fechaVencimiento, setFechaVencimiento] = useState<Dayjs | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as any });

  const [createMedicamentoMutation, { loading }] = useCreateMedicamentoMutation();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.nombreMed || !formData.marca || !fechaVencimiento || !formData.dosisHs) {
      setSnackbar({ open: true, message: 'Faltan campos obligatorios (*)', severity: 'warning' });
      return;
    }

    try {
      await createMedicamentoMutation({
        variables: {
          data: {
            nombre_med: formData.nombreMed.trim(),
            marca: formData.marca.trim(),
            fecha_vencimiento: fechaVencimiento.toISOString(),
            dosis_hs: formData.dosisHs,
            agente_principal: formData.agentePrincipal.trim() || null,
            efectos_secundarios: formData.efectosSecundarios.trim() || null,
            lista_negra: formData.listaNegra,
            categoria: formData.categoria || null,
            contraindicaciones: formData.contraindicaciones.trim() || null,
            prescripcion_requerida: formData.prescripcion,
            stock: formData.stock === '' ? 0 : Number(formData.stock),
          }
        }
      });
      onSuccess();
    } catch (err: any) {
      onError(err.message);
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'background.paper' }}>
      <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom>
        Nuevo Registro Médicamento
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Complete la información técnica y existencias del producto.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* SECCIÓN 1: Identificación */}
          <Grid item xs={12}><Divider textAlign="left"><Typography variant="caption" color="text.secondary">IDENTIFICACIÓN</Typography></Divider></Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre del Medicamento"
              fullWidth required size="small"
              value={formData.nombreMed}
              onChange={(e) => handleInputChange('nombreMed', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Laboratorio / Marca"
              fullWidth required size="small"
              value={formData.marca}
              onChange={(e) => handleInputChange('marca', e.target.value)}
            />
          </Grid>

          {/* SECCIÓN 2: Detalles Médicos */}
          <Grid item xs={12}><Divider textAlign="left"><Typography variant="caption" color="text.secondary">DETALLES TÉCNICOS</Typography></Divider></Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Vencimiento *"
                value={fechaVencimiento}
                onChange={setFechaVencimiento}
                slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small" required>
              <InputLabel>Dosis Sugerida</InputLabel>
              <Select
                value={formData.dosisHs}
                label="Dosis Sugerida"
                onChange={(e) => handleInputChange('dosisHs', e.target.value)}
              >
                {DOSIS_OPTIONS.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Componente Activo"
              fullWidth size="small"
              value={formData.agentePrincipal}
              onChange={(e) => handleInputChange('agentePrincipal', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Categoría</InputLabel>
              <Select
                value={formData.categoria}
                label="Categoría"
                onChange={(e) => handleInputChange('categoria', e.target.value)}
              >
                {CATEGORIA_OPTIONS.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          {/* SECCIÓN 3: Seguridad y Stock */}
          <Grid item xs={12}><Divider textAlign="left"><Typography variant="caption" color="text.secondary">SEGURIDAD Y EXISTENCIAS</Typography></Divider></Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Stock Inicial"
              type="number" fullWidth size="small"
              value={formData.stock}
              onChange={(e) => handleInputChange('stock', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Checkbox size="small" checked={formData.listaNegra} onChange={(e) => handleInputChange('listaNegra', e.target.checked)} />}
              label={<Typography variant="body2">Lista Negra</Typography>}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Checkbox size="small" checked={formData.prescripcion} onChange={(e) => handleInputChange('prescripcion', e.target.checked)} />}
              label={<Typography variant="body2">Receta Médica</Typography>}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraindicaciones"
              multiline rows={2} fullWidth size="small"
              value={formData.contraindicaciones}
              onChange={(e) => handleInputChange('contraindicaciones', e.target.value)}
            />
          </Grid>

          {/* ACCIONES */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button 
                variant="text" 
                color="inherit" 
                onClick={onClose} 
                startIcon={<CloseIcon />}
              >
                Cerrar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                sx={{ px: 4 }}
              >
                {loading ? 'Guardando...' : 'Registrar'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CrearMedicamentoFormulario;