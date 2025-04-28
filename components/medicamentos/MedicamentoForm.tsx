import React from 'react';
import { TextField, Button, Grid, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const EstudioForm = () => {
  const [fechaRealizacion, setFechaRealizacion] = React.useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    <Box 
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: 3,
        maxWidth: '600px',
        margin: 'auto'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Registro de Estudio
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
 
          <Grid item xs={12}>
            <TextField
              label="Tipo de Estudio"
              name="tipoEstudio"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Resultado"
              name="resultado"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Código de Referencia"
              name="codigoReferencia"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observaciones"
              name="observaciones"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Médico Solicitante"
              name="medicoSolicitante"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="urgente" />}
              label="Urgente"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EstudioForm;
