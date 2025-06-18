import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Badge,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import {
  useGetEnfermedadesQuery,
  useDeleteEnfermedadMutation,
} from '../../graphql/types';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EnfermedadFormEdit from './EnfermedadForm';
import EnfermedadesDrawer from './EnfermedadesDrawer';
import ConfirmarEliminacion from '../../utils/ConfirmarEliminacion';

const EnfermedadesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [enfermedadIdEditar, setEnfermedadIdEditar] = useState<string | null>(null);
  const [selectedEnfermedad, setSelectedEnfermedad] = useState<any>(null);
  const [eliminarId, setEliminarId] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetEnfermedadesQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: searchTerm ? { nombre_enf: searchTerm } : undefined,
    },
  });

  const [deleteEnfermedad] = useDeleteEnfermedadMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDrawer = (enfermedad: any) => {
    setSelectedEnfermedad(enfermedad);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedEnfermedad(null);
  };

 const handleEdit = (id: string | null) => {
  if (!id) return; // evitar nulos
  setEnfermedadIdEditar(id);
  setShowForm(false);
};


  const handleCloseEdit = () => {
    setEnfermedadIdEditar(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEnfermedad({ variables: { id } });
      refetch();
      setSuccessSnackbar('Enfermedad eliminada con éxito.');
    } catch (err) {
      setErrorSnackbar('Error al eliminar la enfermedad.');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Gestión de Enfermedades</Typography>
        <Badge badgeContent={data?.getEnfermedades.aggregate.count || 0} color="primary">
          <LocalHospitalIcon sx={{ color: '#1976d2' }} />
        </Badge>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={() => setShowForm(!showForm)}
          sx={{
            backgroundColor: '#1976d2',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#115293' },
          }}
        >
          {showForm ? 'Ocultar Formulario' : 'Registrar Enfermedad'}
        </Button>

        <TextField
          label="Buscar por Nombre"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />

        <Tooltip title="Refrescar">
          <IconButton onClick={() => refetch()} color="secondary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {enfermedadIdEditar && (
        <Box sx={{ marginBottom: 2, backgroundColor: '#e3f2fd', borderRadius: 2, padding: 2 }}>
          <EnfermedadFormEdit enfermedadId={enfermedadIdEditar} onClose={handleCloseEdit} />
        </Box>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" marginY={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">Error al cargar enfermedades: {error.message}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Síntomas</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gravedad</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getEnfermedades.edges.map((enf, index) => (
                <TableRow
                  key={enf.node.id_enfermedad}
                  sx={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5' }}
                >
                  <TableCell>{enf.node.nombre_enf}</TableCell>
                  <TableCell>{enf.node.sintomas}</TableCell>
                  <TableCell>{enf.node.gravedad}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Visualizar">
                      <IconButton color="primary" onClick={() => handleOpenDrawer(enf.node)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton color="secondary" onClick={() => handleEdit(enf.node.id_enfermedad || null )}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton color="error" onClick={() => setEliminarId(enf.node.id_enfermedad || null )}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        component="div"
        count={data?.getEnfermedades.aggregate.count || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <EnfermedadesDrawer
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedEnfermedad={selectedEnfermedad}
      />

      <ConfirmarEliminacion
        open={Boolean(eliminarId)}
        onClose={() => setEliminarId(null)}
        onConfirmar={() => {
          if (eliminarId) handleDelete(eliminarId);
          setEliminarId(null);
        }}
        mensaje="¿Estás seguro de que deseas eliminar esta enfermedad?"
        titulo="Confirmar Eliminación"
        disable={false}
      />

      <Snackbar
        open={Boolean(successSnackbar)}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbar(null)}
      >
        <Alert severity="success" onClose={() => setSuccessSnackbar(null)}>
          {successSnackbar}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorSnackbar)}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(null)}
      >
        <Alert severity="error" onClose={() => setErrorSnackbar(null)}>
          {errorSnackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EnfermedadesList;
