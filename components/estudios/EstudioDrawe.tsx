import * as React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardContent 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EstudiosDrawer = ({ drawerOpen, handleCloseDrawer, selectedEstudio }) => {
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleCloseDrawer}
      PaperProps={{
        sx: {
          width: 400,
          padding: 3,
          backgroundColor: '#1e1e1e', // Fondo oscuro
          color: '#e0e0e0', // Texto claro
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // Sombra elegante
          borderRadius: '8px 0 0 8px', // Bordes suaves en el drawer
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#90caf9' }}>
          Detalles del Estudio
        </Typography>
        <IconButton onClick={handleCloseDrawer} sx={{ color: '#f44336' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {selectedEstudio && (
        <Card
          sx={{
            backgroundColor: '#2b2b2b',
            color: '#e0e0e0',
            borderRadius: 2,
            padding: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            marginTop: 2,
          }}
        >
          <CardContent>
            {/* <Typography variant="body1" sx={{ color: '#90caf9' }}>
              <strong>ID Estudio:</strong> {selectedEstudio.id_estudio || 'N/A'}
            </Typography> */}
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Tipo de Estudio:</strong> {selectedEstudio.tipo_estudio || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Fecha de Realización:</strong> {selectedEstudio.fecha_realizacion ? new Date(selectedEstudio.fecha_realizacion).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Resultado:</strong> {selectedEstudio.resultado || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Código de Referencia:</strong> {selectedEstudio.codigo_referencia || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Observaciones:</strong> {selectedEstudio.observaciones || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Médico Solicitante:</strong> {selectedEstudio.medico_solicitante || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Urgente:</strong> {selectedEstudio.urgente ? 'Sí' : 'No'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Drawer>
  );
};

export default EstudiosDrawer;
