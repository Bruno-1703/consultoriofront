import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Alert, Typography, Box, Button, TextField, TablePagination,
  IconButton, Stack, Badge, Tooltip, Snackbar, Dialog, DialogContent,
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useGetMedicamentosQuery, useDeleteMedicamentoMutation } from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import ConfirmarEliminacion from "../../utils/ConfirmarEliminacion";
import CrearMedicamentoFormulario from "./CrearMedicamentoFormulario";
import MedicamentoEditarFormulario from "./MedicamentoEditarFormulario";
import MedicamentoDetalleModal from "./MedicamentoDetalleModalProps";

const Medicamentos: React.FC = () => {
  // Estados para paginación y búsqueda
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados para Modales y Formularios
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [editingMedicamentoId, setEditingMedicamentoId] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMedicamento, setSelectedMedicamento] = useState<any>(null);
  const [medicamentoToDeleteId, setMedicamentoToDeleteId] = useState<string | null>(null);

  // Estados para Notificaciones
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);

  // Query de Apollo
  const { data, loading, error, refetch } = useGetMedicamentosQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        nombre_med: searchTerm || undefined,
        marca: searchTerm || undefined,
        

      },
    },
    fetchPolicy: "cache-and-network"
  });

  const [deleteMedicamentoMutation] = useDeleteMedicamentoMutation();

  // Manejo de errores de la Query (Evita bucle infinito)
  useEffect(() => {
    if (error) {
      setErrorSnackbar(error.message);
    }
  }, [error]);

  // Handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event: any, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetailModal = (medicamento: any) => {
    setSelectedMedicamento(medicamento);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedMedicamento(null);
  };

  const handleSnackbarClose = () => {
    setErrorSnackbar(null);
    setSuccessSnackbar(null);
  };

  const handleConfirmDelete = async () => {
    if (medicamentoToDeleteId) {
      try {
        await deleteMedicamentoMutation({ variables: { id: medicamentoToDeleteId } });
        setSuccessSnackbar("Medicamento eliminado exitosamente.");
        setMedicamentoToDeleteId(null);
        refetch();
      } catch (err: any) {
        setErrorSnackbar(`Error al eliminar: ${err.message}`);
        setMedicamentoToDeleteId(null);
      }
    }
  };

  const handleFormSuccess = () => {
    setSuccessSnackbar("Operación realizada con éxito.");
    setShowCreateFormModal(false);
    setEditingMedicamentoId(null);
    refetch();
  };

  const handleFormError = (msg: string) => setErrorSnackbar(`Error: ${msg}`);

  // Skeleton de carga
  if (loading && !data) return <TableSkeleton rows={rowsPerPage} columns={6} />;

  const medicamentos = data?.getMedicamentos?.edges?.map(edge => edge.node) || [];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Gestión de Medicamentos
        </Typography>
        
        <Tooltip title="Total de Medicamentos">
          <Badge badgeContent={data?.getMedicamentos?.aggregate?.count || 0} color="primary">
            <Paper sx={{ p: 1, borderRadius: "50%", display: "flex" }}>
              <MedicationIcon color="primary" />
            </Paper>
          </Badge>
        </Tooltip>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => setShowCreateFormModal(true)}
          sx={{ fontWeight: "bold", textTransform: "none" }}
        >
          Nuevo Medicamento
        </Button>
        <TextField
          label="Buscar por nombre o marca"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ backgroundColor: "white" }}
        />
        <IconButton onClick={() => refetch()} color="primary">
          <RefreshIcon />
        </IconButton>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              {["Nombre", "Marca", "Vencimiento", "Dosis", "Stock", "Acciones"].map((h) => (
                <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {medicamentos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No hay registros disponibles.
                </TableCell>
              </TableRow>
            ) : (
              medicamentos.map((med, index) => (
                <TableRow key={med.id_medicamento} hover sx={{ bgcolor: index % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <TableCell>{med.nombre_med}</TableCell>
                  <TableCell>{med.marca}</TableCell>
                  <TableCell>{med.fecha_vencimiento ? new Date(med.fecha_vencimiento).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell>{med.dosis_hs}</TableCell>
                  <TableCell>{med.stock ?? 0} uds</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" color="primary" onClick={() => handleOpenDetailModal(med)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="info" onClick={() => setEditingMedicamentoId(med.id_medicamento || null)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => setMedicamentoToDeleteId(med.id_medicamento || null)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data?.getMedicamentos?.aggregate?.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* MODALES */}
      <Dialog open={showCreateFormModal} onClose={() => setShowCreateFormModal(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <CrearMedicamentoFormulario onClose={() => setShowCreateFormModal(false)} onSuccess={handleFormSuccess} onError={handleFormError} />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editingMedicamentoId)} onClose={() => setEditingMedicamentoId(null)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <MedicamentoEditarFormulario idMedicamento={editingMedicamentoId} isEditing={true} onClose={() => setEditingMedicamentoId(null)} onSuccess={handleFormSuccess} onError={handleFormError} />
        </DialogContent>
      </Dialog>

      <MedicamentoDetalleModal open={showDetailModal} onClose={handleCloseDetailModal} medicamento={selectedMedicamento} />
      
      <ConfirmarEliminacion open={Boolean(medicamentoToDeleteId)} onClose={() => setMedicamentoToDeleteId(null)} onConfirmar={handleConfirmDelete} mensaje="¿Seguro que deseas eliminar este medicamento?" disable={false} />

      {/* SNACKBARS */}
      <Snackbar open={Boolean(errorSnackbar)} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert severity="error" variant="filled">{errorSnackbar}</Alert>
      </Snackbar>
      <Snackbar open={Boolean(successSnackbar)} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert severity="success" variant="filled">{successSnackbar}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Medicamentos;