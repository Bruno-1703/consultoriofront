import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Stack,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useCreateMedicamentoMutation } from '../../graphql/types';

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const dosisOptions = [
  'Una vez al día',
  'Dos veces al día',
  'Tres veces al día',
  'Cada 6 horas',
  'Cada 8 horas',
  'Cada 12 horas',
];

const categoriaOptions = [
  'Antibiótico',
  'Analgésico',
  'Antiinflamatorio',
  'Antipirético',
  'Antihistamínico',
  'Otros',
];

interface CrearMedicamentoFormularioProps {
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const CrearMedicamentoFormulario: React.FC<CrearMedicamentoFormularioProps> = ({
  onClose,
  onSuccess,
  onError,
}) => {
  const [nombreMed, setNombreMed] = React.useState('');
  const [marca, setMarca] = React.useState('');
  const [fechaVencimiento, setFechaVencimiento] = React.useState<Dayjs | null>(null);
  const [dosisHs, setDosisHs] = React.useState('');
  const [agentePrincipal, setAgentePrincipal] = React.useState('');
  const [efectosSecundarios, setEfectosSecundarios] = React.useState('');
  const [listaNegra, setListaNegra] = React.useState(false);
  const [categoria, setCategoria] = React.useState('');
  const [contraindicaciones, setContraindicaciones] = React.useState('');
  const [prescripcionRequerida, setPrescripcionRequerida] = React.useState(false);
  const [stock, setStock] = React.useState<number | ''>('');

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error' | 'warning' | 'info'>('info');

  const [createMedicamentoMutation, { loading }] = useCreateMedicamentoMutation();

  const resetForm = () => {
    setNombreMed('');
    setMarca('');
    setFechaVencimiento(null);
    setDosisHs('');
    setAgentePrincipal('');
    setEfectosSecundarios('');
    setListaNegra(false);
    setCategoria('');
    setContraindicaciones('');
    setPrescripcionRequerida(false);
    setStock('');
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación simple:
    if (!nombreMed.trim() || !marca.trim() || !fechaVencimiento || !dosisHs.trim()) {
      setSnackbarMessage('Por favor completa todos los campos requeridos.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const medicamentoData = {
      nombre_med: nombreMed.trim(),
      marca: marca.trim(),
      fecha_vencimiento: fechaVencimiento.toISOString(),
      dosis_hs: dosisHs,
      agente_principal: agentePrincipal.trim() || null,
      efectos_secundarios: efectosSecundarios.trim() || null,
      lista_negra: listaNegra,
      categoria: categoria || null,
      contraindicaciones: contraindicaciones.trim() || null,
      prescripcion_requerida: prescripcionRequerida,
      stock: stock === '' ? 0 : Number(stock),
    };

    try {
      await createMedicamentoMutation({ variables: { data: medicamentoData } });
      setSnackbarMessage('Medicamento creado con éxito.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      resetForm();
      onSuccess();
    } catch (err: any) {
      setSnackbarMessage(err.message || 'Error al crear el medicamento.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      onError(err.message);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 700,
        margin: 'auto',
        mt: 4,
        transition: 'all 0.3s ease',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Typography variant="h5" textAlign="center" fontWeight="bold" color="primary" mb={3}>
        Registro de Medicamento
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre Medicamento *"
              value={nombreMed}
              onChange={(e) => setNombreMed(e.target.value)}
              fullWidth
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Marca *"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              fullWidth
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Vencimiento *"
                value={fechaVencimiento}
                onChange={(newValue) => setFechaVencimiento(newValue)}
                slotProps={{
                  textField: { fullWidth: true, size: 'small', required: true },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small" required>
              <InputLabel id="dosis-label">Dosis *</InputLabel>
              <Select
                labelId="dosis-label"
                value={dosisHs}
                label="Dosis *"
                onChange={(e) => setDosisHs(e.target.value)}
              >
                {dosisOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Agente Principal"
              value={agentePrincipal}
              onChange={(e) => setAgentePrincipal(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select
                labelId="categoria-label"
                value={categoria}
                label="Categoría"
                onChange={(e) => setCategoria(e.target.value)}
              >
                <MenuItem value="">
                  <em>Ninguna</em>
                </MenuItem>
                {categoriaOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Efectos Secundarios"
              value={efectosSecundarios}
              onChange={(e) => setEfectosSecundarios(e.target.value)}
              multiline
              rows={2}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))}
              fullWidth
              size="small"
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraindicaciones"
              value={contraindicaciones}
              onChange={(e) => setContraindicaciones(e.target.value)}
              multiline
              rows={3}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={listaNegra}
                  onChange={(e) => setListaNegra(e.target.checked)}
                  size="small"
                />
              }
              label="Lista Negra"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={prescripcionRequerida}
                  onChange={(e) => setPrescripcionRequerida(e.target.checked)}
                  size="small"
                />
              }
              label="Prescripción Requerida"
            />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={1}>
              <Button variant="outlined" onClick={handleCancel} disabled={loading} size="small">
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                size="small"
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': { backgroundColor: '#388e3c' },
                }}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <SnackbarAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </SnackbarAlert>
      </Snackbar>
    </Box>
  );
};

export default CrearMedicamentoFormulario;
