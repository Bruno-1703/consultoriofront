import * as React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardContent, 
  Modal,
  Grid, // ✅ Importamos Grid para layout de dos columnas
  Divider, // ✅ Importamos Divider para separar secciones
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'; // Icono para datos médicos
import PersonIcon from '@mui/icons-material/Person'; // Icono para datos personales
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Icono para contacto

// Definimos un tipo para selectedPaciente para mayor claridad
interface PacienteDetails {
  id_paciente?: string;
  dni?: string;
  nombre_paciente?: string;
  apellido_paciente?: string;
  edad?: number;
  altura?: number;
  telefono?: string;
  fecha_nacimiento?: string; // Asumimos string en formato fecha
  sexo?: string;
  grupo_sanguineo?: string;
  alergias?: string;
  obra_social?: string;
  email?: string;
  direccion?: string;
  nacionalidad?: string;
}

interface PacientesModalProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
  selectedPaciente: PacienteDetails | null;
}

const PacientesModal: React.FC<PacientesModalProps> = ({ modalOpen, handleCloseModal, selectedPaciente }) => {
  
  // Componente para mostrar un campo de detalle
  const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <Box sx={{ mb: 1.5 }}>
      <Typography component="strong" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2', display: 'block' }}> 
        {label}:
      </Typography>
      <Typography variant="body1" sx={{ color: '#444444' }}>
        {value || 'N/A'}
      </Typography>
    </Box>
  );

  // Agrupación de datos para la presentación
  const personalData = selectedPaciente ? [
    { label: 'DNI', value: selectedPaciente.dni },
    { label: 'Nombre Completo', value: `${selectedPaciente.nombre_paciente || ''} ${selectedPaciente.apellido_paciente || ''}`.trim() },
    { label: 'Sexo', value: selectedPaciente.sexo },
    { label: 'Nacionalidad', value: selectedPaciente.nacionalidad },
    { label: 'Fecha de Nacimiento', 
      value: selectedPaciente.fecha_nacimiento 
        ? dayjs(selectedPaciente.fecha_nacimiento).format('DD/MM/YYYY')
        : 'N/A' 
    },
  ] : [];

  const medicalData = selectedPaciente ? [
    { label: 'Edad', value: selectedPaciente.edad },
    { label: 'Altura', value: selectedPaciente.altura ? `${selectedPaciente.altura} cm` : 'N/A' },
    { label: 'Grupo Sanguíneo', value: selectedPaciente.grupo_sanguineo },
    { label: 'Alergias', value: selectedPaciente.alergias || 'Ninguna conocida' },
    { label: 'Obra Social', value: selectedPaciente.obra_social || 'N/A' },
  ] : [];
  
  const contactData = selectedPaciente ? [
    { label: 'Teléfono', value: selectedPaciente.telefono },
    { label: 'Email', value: selectedPaciente.email || 'N/A' },
    { label: 'Dirección', value: selectedPaciente.direccion || 'N/A' },
  ] : [];


  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, // ✅ Aumentamos el ancho para las columnas
          maxWidth: '90%', // Máximo 90% del viewport
          maxHeight: '90vh', // Para que sea scrollable
          backgroundColor: '#f5f5f5',
          color: '#333333',
          padding: 4,
          borderRadius: '8px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)', // Sombra más prominente
          outline: 'none',
          overflowY: 'auto', // Permite desplazamiento si el contenido es largo
        }}
      >
        {/* Título de la Modal */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            backgroundColor: '#1976d2',
            color: '#fff',
            py: 2,
            px: 3,
            borderRadius: '8px 8px 0 0',
            mt: -4, 
            mx: -4, 
            mb: 2,
            position: 'sticky', // Fija el título al hacer scroll
            top: 0,
            zIndex: 10,
          }}
        >
          <Typography 
            id="modal-title" 
            variant="h6"
            component="h2"
            sx={{ fontWeight: 'bold' }}
          >
            📋 Detalles Completos del Paciente
          </Typography>
          <IconButton 
            onClick={handleCloseModal} 
            sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {selectedPaciente && (
          <Card
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: 2,
              boxShadow: 'none', // Quitamos la sombra de la tarjeta interna
              
            }}
          >
            <CardContent sx={{ '&:last-child': { pb: 2 } }}> 
              
              {/* SECCIÓN 1: DATOS PERSONALES */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  <PersonIcon sx={{ mr: 1 }} /> Datos Personales
                </Typography>
                <Grid container spacing={3}>
                  {personalData.map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <DetailItem label={field.label} value={field.value} />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* SECCIÓN 2: DATOS MÉDICOS */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  <HealthAndSafetyIcon sx={{ mr: 1 }} /> Información Médica y Administrativa
                </Typography>
                <Grid container spacing={3}>
                  {medicalData.map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <DetailItem label={field.label} value={field.value} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              <Divider sx={{ my: 3 }} />

              {/* SECCIÓN 3: CONTACTO Y UBICACIÓN */}
              <Box>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  <ContactMailIcon sx={{ mr: 1 }} /> Contacto y Ubicación
                </Typography>
                <Grid container spacing={3}>
                  {contactData.map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <DetailItem label={field.label} value={field.value} />
                    </Grid>
                  ))}
                </Grid>
              </Box>

            </CardContent>
          </Card>
        )}
      </Box>
    </Modal>
  );
};

export default PacientesModal;