import * as React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardContent, 
  Modal 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

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
  obra_social?: string; // Nuevo campo
  email?: string;       // Nuevo campo
  direccion?: string;   // Nuevo campo
  nacionalidad?: string; // Nuevo campo
}

interface PacientesModalProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
  selectedPaciente: PacienteDetails | null;
}

const PacientesModal: React.FC<PacientesModalProps> = ({ modalOpen, handleCloseModal, selectedPaciente }) => {
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
          width: 725,
          backgroundColor: '#f5f5f5', // Fondo claro, similar al DialogContent del otro componente
          color: '#333333', // Texto oscuro para contraste
          padding: 4,
          borderRadius: '8px', // Bordes redondeados
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Sombra más prominente
          outline: 'none', // Quita el contorno al enfocar
        }}
      >
        {/* Título de la Modal similar al DialogTitle */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            backgroundColor: '#1976d2', // Fondo azul del título
            color: '#fff', // Texto blanco
            py: 2, // Padding vertical
            px: 3, // Padding horizontal
            borderRadius: '8px 8px 0 0', // Bordes superiores redondeados
            mt: -4, // Ajuste para que el título se solape ligeramente con el borde del Box
            mx: -4, // Ajuste para que el título ocupe todo el ancho de la modal
            mb: 2 // Margen inferior para separar del contenido
          }}
        >
          <Typography 
            id="modal-title" 
            variant="h6" // Hacemos el título h6 para que coincida con el tamaño del DialogTitle
            component="h2" // Semánticamente correcto para título de modal
            sx={{ 
              fontWeight: 'bold', 
            }}
          >
            Detalles del Paciente
          </Typography>
          <IconButton 
            onClick={handleCloseModal} 
            sx={{ 
              color: '#fff', // Icono blanco
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } // Ligero hover blanco
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {selectedPaciente && (
          <Card
            sx={{
              backgroundColor: '#ffffff', // Fondo blanco para la tarjeta de detalles
              color: '#333333', // Texto oscuro
              borderRadius: '8px', // Bordes consistentes
              padding: 2, // Reducimos un poco el padding interno de la Card
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Sombra más suave para la Card
              marginTop: 2,
            }}
          >
            <CardContent sx={{ '&:last-child': { pb: 2 } }}> {/* Ajusta padding inferior */}
              {[
                { label: 'ID Paciente', value: selectedPaciente.id_paciente },
                { label: 'DNI', value: selectedPaciente.dni },
                { label: 'Nombre', value: selectedPaciente.nombre_paciente },
                { label: 'Apellido', value: selectedPaciente.apellido_paciente },
                { label: 'Edad', value: selectedPaciente.edad },
                { label: 'Altura', value: selectedPaciente.altura ? `${selectedPaciente.altura} cm` : 'N/A' },
                { label: 'Teléfono', value: selectedPaciente.telefono },
                { label: 'Fecha de Nacimiento', 
                  value: selectedPaciente.fecha_nacimiento 
                    ? dayjs(selectedPaciente.fecha_nacimiento).format('DD/MM/YYYY') // Formato de fecha consistente
                    : 'N/A' 
                },
                { label: 'Sexo', value: selectedPaciente.sexo },
                { label: 'Grupo Sanguíneo', value: selectedPaciente.grupo_sanguineo },
                { label: 'Alergias', value: selectedPaciente.alergias },
                { label: 'Obra Social', value: selectedPaciente.obra_social }, // Nuevo
                { label: 'Email', value: selectedPaciente.email },             // Nuevo
                { label: 'Dirección', value: selectedPaciente.direccion },     // Nuevo
                { label: 'Nacionalidad', value: selectedPaciente.nacionalidad }, // Nuevo
              ].map((field, index) => (
                <Typography
                  key={index}
                  variant="body2" // Usamos body2 para un texto ligeramente más pequeño y consistente
                  sx={{
                    color: '#444444', // Color de texto ligeramente más oscuro para los valores
                    mt: index > 0 ? 1 : 0, // Espaciado entre líneas
                  }}
                >
                  <Typography component="strong" sx={{ fontWeight: 'bold', color: '#1976d2' }}> {/* Label en azul */}
                    {field.label}:
                  </Typography>
                  {" "} {/* Espacio */}
                  {field.value || 'N/A'}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}
      </Box>
    </Modal>
  );
};

export default PacientesModal;