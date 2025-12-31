import React, { useState, useEffect, useRef } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Alert, Typography, Box, Button, TextField, TablePagination,
  IconButton, Stack, Badge, Tooltip, Snackbar, LinearProgress,
  Dialog, DialogTitle, DialogContent, Divider, InputAdornment
} from "@mui/material";

// Iconos
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import { NetworkStatus } from "@apollo/client";

import PacienteForm from "./PacienteForm";
import PacienteFormEdit from "./PacienteFormEditar";
import PacientesModal from "./pacienteModal";
import ConfirmarEliminacion from "../../utils/ConfirmarEliminacion";
import TableSkeleton from "../../utils/TableSkeleton";

import {
  useElimiarPacienteLogMutation,
  useGetPacientesQuery,
} from "../../graphql/types";

const Pacientes: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [eliminarPaciente, setEliminarPaciente] = useState<string | null | undefined>(null);
  const [pacienteIdEditar, setPacienteIdEditar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce para búsqueda
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(0);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  const { data, loading, error, refetch, networkStatus } = useGetPacientesQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: { nombre_paciente: searchTerm || "" },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [eliminarPacienteLogMutation] = useElimiarPacienteLogMutation();

  const handleEditPaciente = (id: string | null | undefined) => {
    if (id) {
      setPacienteIdEditar(id);
      setIsEditing(true);
    }
  };

  const handleEliminarPaciente = async (pacienteId: string) => {
    try {
      await eliminarPacienteLogMutation({ variables: { pacienteId } });
      await refetch();
      setSuccessSnackbar("Paciente eliminado correctamente.");
    } catch (e) {
      setErrorSnackbar("Error al intentar eliminar el paciente.");
    }
  };
const handleOpenModal = (paciente: any) => {
    setSelectedPaciente(paciente); // Guardamos los datos del paciente en el estado
    setModalOpen(true);            // Abrimos el modal
  };

  // 2. Asegúrate de que handleCloseModal esté así:
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPaciente(null);
  };

  if (loading && networkStatus !== NetworkStatus.refetch)
    return <TableSkeleton rows={8} columns={6} />;


  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      
      {/* TÍTULO Y ESTADÍSTICAS RÁPIDAS */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1a237e", letterSpacing: "-0.5px" }}>
            Directorio de Pacientes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Administra la información y el historial de tus pacientes
          </Typography>
        </Box>
        
        <Tooltip title="Total de pacientes activos">
          <Badge badgeContent={data?.getPacientes.aggregate.count || 0} color="primary" max={999}>
            <Paper sx={{ p: 1.5, borderRadius: "50%", display: 'flex', boxShadow: 2 }}>
              <PersonIcon sx={{ color: "#1a237e" }} />
            </Paper>
          </Badge>
        </Tooltip>
      </Stack>

      {/* BARRA DE ACCIONES */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDrawer(true)}
            sx={{ 
              borderRadius: 2, 
              px: 3, 
              py: 1, 
              textTransform: "none", 
              fontWeight: "bold",
              boxShadow: "0 4px 14px 0 rgba(25,118,210,0.39)"
            }}
          >
            Nuevo Paciente
          </Button>

          <TextField
            fullWidth
            size="small"
            placeholder="Buscar por nombre o apellido..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ 
              "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#fff" } 
            }}
          />

          <Tooltip title="Actualizar lista">
            <IconButton 
              onClick={() => refetch()} 
              disabled={networkStatus === NetworkStatus.refetch}
              sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>

      {networkStatus === NetworkStatus.refetch && <LinearProgress sx={{ mb: 1, borderRadius: 1 }} />}

      {/* TABLA DE DATOS */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.03)", overflow: "hidden" }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1a237e" }}>
              {["DNI", "Nombre", "Apellido", "Edad", "Teléfono", "Acciones"].map((header) => (
                <TableCell key={header} sx={{ color: "white", fontWeight: 600, py: 2 }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getPacientes?.edges.map((paciente, index) => (
              <TableRow 
                key={paciente.node.id_paciente}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{paciente.node.dni}</TableCell>
                <TableCell>{paciente.node.nombre_paciente}</TableCell>
                <TableCell>{paciente.node.apellido_paciente}</TableCell>
                <TableCell>
                   <Badge badgeContent={paciente.node.edad} color="info" showZero sx={{ "& .MuiBadge-badge": { position: 'static', transform: 'none' } }} />
                </TableCell>
                <TableCell>{paciente.node.telefono}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Detalles">
                      <IconButton size="small" color="primary" onClick={() => handleOpenModal(paciente.node)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton size="small" color="secondary" onClick={() => handleEditPaciente(paciente.node.id_paciente)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" color="error" onClick={() => setEliminarPaciente(paciente.node.id_paciente)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.getPacientes?.aggregate.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          sx={{ borderTop: "1px solid #eee" }}
        />
      </TableContainer>

      {/* MODAL DE EDICIÓN */}
      <Dialog 
        open={isEditing} 
        onClose={() => setIsEditing(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8f9fa' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a237e" }}>Actualizar Expediente</Typography>
          <IconButton onClick={() => setIsEditing(false)} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 3 }}>
          {pacienteIdEditar && (
            <PacienteFormEdit 
              pacienteId={pacienteIdEditar} 
              onClose={() => { setIsEditing(false); refetch(); setSuccessSnackbar("Cambios guardados."); }} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* OTROS MODALES Y ALERTAS */}
      <PacienteForm open={openDrawer} onClose={() => { setOpenDrawer(false); refetch(); }} />
<PacientesModal 
  modalOpen={modalOpen} 
  handleCloseModal={handleCloseModal} // <-- Cambia handleOpenModal por handleCloseModal
  selectedPaciente={selectedPaciente} 
/>      
      <ConfirmarEliminacion
        open={Boolean(eliminarPaciente)}
        onClose={() => setEliminarPaciente(null)}
        onConfirmar={() => { if (eliminarPaciente) handleEliminarPaciente(eliminarPaciente); setEliminarPaciente(null); } }
        titulo="Eliminar Paciente"
        mensaje="Esta acción no se puede deshacer. ¿Deseas continuar?" disable={false}      />

      <Snackbar open={Boolean(errorSnackbar)} autoHideDuration={5000} onClose={() => setErrorSnackbar(null)}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>{errorSnackbar}</Alert>
      </Snackbar>

      <Snackbar open={Boolean(successSnackbar)} autoHideDuration={5000} onClose={() => setSuccessSnackbar(null)}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{successSnackbar}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Pacientes;