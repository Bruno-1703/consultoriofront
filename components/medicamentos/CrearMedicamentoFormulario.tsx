import React from 'react';
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
} from '@mui/material';
import { useCreateMedicamentoMutation } from '../../graphql/types';

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
}

const CrearMedicamentoFormulario: React.FC<CrearMedicamentoFormularioProps> = ({ onClose }) => {
  const [nombreMed, setNombreMed] = React.useState('');
  const [marca, setMarca] = React.useState('');
  const [fechaVencimiento, setFechaVencimiento] = React.useState('');
  const [dosisHs, setDosisHs] = React.useState('');
  const [agentePrincipal, setAgentePrincipal] = React.useState('');
  const [efectosSecundarios, setEfectosSecundarios] = React.useState('');
  const [listaNegra, setListaNegra] = React.useState(false);
  const [categoria, setCategoria] = React.useState('');
  const [contraindicaciones, setContraindicaciones] = React.useState('');
  const [prescripcionRequerida, setPrescripcionRequerida] = React.useState(false);
  const [stock, setStock] = React.useState(0);

  const [createMedicamentoMutation, { data, loading, error }] = useCreateMedicamentoMutation();

  const resetForm = () => {
    setNombreMed('');
    setMarca('');
    setFechaVencimiento('');
    setDosisHs('');
    setAgentePrincipal('');
    setEfectosSecundarios('');
    setListaNegra(false);
    setCategoria('');
    setContraindicaciones('');
    setPrescripcionRequerida(false);
    setStock(0);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const medicamentoData = {
      nombre_med: nombreMed,
      marca: marca,
      fecha_vencimiento: new Date(fechaVencimiento).toISOString(),
      dosis_hs: dosisHs,
      agente_principal: agentePrincipal,
      efectos_secundarios: efectosSecundarios,
      lista_negra: listaNegra,
      categoria: categoria,
      contraindicaciones: contraindicaciones,
      prescripcion_requerida: prescripcionRequerida,
      stock: stock,
    };

    try {
      await createMedicamentoMutation({
        variables: { data: medicamentoData },
      });
      console.log('Medicamento creado con éxito');
      resetForm();
      onClose();
    } catch (err) {
      console.error('Error al crear medicamento:', err);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Registro de Medicamento
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Nombre y Marca */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre Medicamento *"
              value={nombreMed}
              onChange={(e) => setNombreMed(e.target.value)}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Marca *"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
              fullWidth
            />
          </Grid>

          {/* Fecha de Vencimiento y Dosis (select) */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Vencimiento *"
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="dosis-label">Dosis (frecuencia)</InputLabel>
              <Select
                labelId="dosis-label"
                value={dosisHs}
                label="Dosis (frecuencia)"
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

          {/* Agente Principal y Categoría (select) */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Agente Principal"
              value={agentePrincipal}
              onChange={(e) => setAgentePrincipal(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select
                labelId="categoria-label"
                value={categoria}
                label="Categoría"
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categoriaOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Efectos Secundarios y Stock */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Efectos Secundarios"
              value={efectosSecundarios}
              onChange={(e) => setEfectosSecundarios(e.target.value)}
              multiline
              rows={2}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              type="number"
              inputProps={{ min: 0 }}
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              fullWidth
            />
          </Grid>

          {/* Contraindicaciones */}
          <Grid item xs={12}>
            <TextField
              label="Contraindicaciones"
              value={contraindicaciones}
              onChange={(e) => setContraindicaciones(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>

          {/* Checkboxes */}
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={listaNegra}
                  onChange={(e) => setListaNegra(e.target.checked)}
                />
              }
              label="Lista Negra"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={prescripcionRequerida}
                  onChange={(e) => setPrescripcionRequerida(e.target.checked)}
                />
              }
              label="Prescripción Requerida"
            />
          </Grid>

          {/* Botones Guardar y Cancelar */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ borderRadius: '8px', padding: '1rem', textTransform: 'none' }}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Medicamento'}
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancel}
                disabled={loading}
                sx={{ borderRadius: '8px', padding: '1rem', textTransform: 'none' }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

      {/* Mensajes de error y éxito */}
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          Error al crear el medicamento.
        </Typography>
      )}
      {data && (
        <Typography color="success.main" sx={{ mt: 1 }}>
          Medicamento creado correctamente.
        </Typography>
      )}
    </Box>
  );
};

export default CrearMedicamentoFormulario;
