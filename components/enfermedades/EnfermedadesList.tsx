import * as React from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Badge,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useGetEnfermedadesQuery } from '../../graphql/types';
import EnfermedadForm from './EnfermedadForm';
import EnfermedadesDrawer from './EnfermedadesDrawer';

const EnfermedadesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedEnfermedad, setSelectedEnfermedad] = React.useState<any>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const { data, loading, error, refetch } = useGetEnfermedadesQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: { 
       // nombre_enf: "searchTerm" 
    },
    },
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (enfermedad: any) => {
    setSelectedEnfermedad(enfermedad);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedEnfermedad(null);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Gestión de Enfermedades
        </Typography>
        
      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginBottom: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            },
            fontWeight: 'bold',
            paddingX: 2,
          }}
        >
          {showForm ? "Ocultar Formulario" : "Registrar Enfermedad"}
        </Button>

        <TextField
          label="Buscar por Nombre"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />
        <Tooltip title="Refrescar">
          <IconButton
            onClick={() => refetch()}
            color="secondary"
            sx={{
              borderRadius: 1,
              backgroundColor: '#f0f0f0',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Badge badgeContent={data?.getEnfermedades.aggregate.count || 0} color="primary">
          <LocalHospitalIcon sx={{ color: '#1976d2' }} />
        </Badge>
      </Stack>

      {showForm && (
        <Box sx={{ marginBottom: 2, padding: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
          <EnfermedadForm onClose={() => setShowForm(false)} onSubmit={function (formData: { nombre_enf: string; sintomas: string; gravedad: string; }): void {
                      throw new Error('Function not implemented.');
                  } } />
        </Box>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginY: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginY: 3 }}>
          Error al cargar las enfermedades: {error.message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Síntomas</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Tratamiento</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', padding: '6px 16px' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getEnfermedades?.edges.map((enfermedad, index) => (
              <TableRow
                key={enfermedad.node?.id_enfermedad}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                  height: '48px',
                }}
              >
                <TableCell>{enfermedad.node.nombre_enf}</TableCell>
                <TableCell>{enfermedad.node.sintomas}</TableCell>
                <TableCell>{enfermedad.node.gravedad}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton aria-label="visualizar" color="primary" onClick={() => handleViewDetails(enfermedad.node)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton aria-label="editar" color="secondary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton aria-label="eliminar" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data?.getEnfermedades.aggregate.count || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          marginTop: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          boxShadow: 1,
        }}
      />

      <EnfermedadesDrawer
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedEnfermedad={selectedEnfermedad}
      />
    </Box>
  );
};

export default EnfermedadesList;
