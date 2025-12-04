import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [editingMedicamentoId, setEditingMedicamentoId] = useState<string | null>(null);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMedicamento, setSelectedMedicamento] = useState<any>(null);
  const [medicamentoToDeleteId, setMedicamentoToDeleteId] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetMedicamentosQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        nombre_med: searchTerm,
        marca: searchTerm,
      },
    },
  });

  const [deleteMedicamentoMutation] = useDeleteMedicamentoMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
        setErrorSnackbar(`Error al eliminar medicamento: ${err.message}`);
        setMedicamentoToDeleteId(null);
      }
    }
  };

  const handleFormSuccess = () => {
    setSuccessSnackbar("Operación exitosa.");
    setShowCreateFormModal(false);
    setEditingMedicamentoId(null);
    refetch();
  };

  const handleFormError = (msg: string) => {
    setErrorSnackbar(`Error: ${msg}`);
  };

  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error) {
    setErrorSnackbar(error.message);
    return null;
  }

  const medicamentos = data?.getMedicamentos?.edges?.map(edge => edge.node) || [];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Gestión de Medicamentos
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateFormModal(true)}
          sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#115293" }, fontWeight: "bold", px: 2 }}
        >
          Registrar Nuevo Medicamento
        </Button>
        <TextField
          label="Buscar por nombre o marca"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />
        <Tooltip title="Refrescar">
          <IconButton onClick={() => refetch()} color="secondary" sx={{ borderRadius: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Total de Medicamentos">
          <Badge badgeContent={data?.getMedicamentos?.aggregate?.count || 0} color="primary">
            <MedicationIcon sx={{ color: "#1976d2" }} />
          </Badge>
        </Tooltip>
      </Stack>

      {/* Crear nuevo medicamento */}
      <Dialog open={showCreateFormModal} onClose={() => setShowCreateFormModal(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <CrearMedicamentoFormulario
            onClose={() => setShowCreateFormModal(false)}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
          />
        </DialogContent>
      </Dialog>

      {/* Editar medicamento existente */}
      <Dialog open={Boolean(editingMedicamentoId)} onClose={() => setEditingMedicamentoId(null)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <MedicamentoEditarFormulario
            idMedicamento={editingMedicamentoId}
            isEditing={true}
            onClose={() => setEditingMedicamentoId(null)}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
          />
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 1110 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["Nombre", "Marca", "Fecha Vencimiento", "Dosis", "Stock", "Acciones"].map((header) => (
                <TableCell key={header} sx={{ color: "white", fontWeight: "bold", px: 2 }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {medicamentos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No se encontraron medicamentos.
                </TableCell>
              </TableRow>
            ) : (
              medicamentos.map((medicamento, index) => (
                <TableRow
                  key={medicamento.id_medicamento}
                  sx={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#f5f5f5", "&:hover": { backgroundColor: "#e0e0e0" }, height: "48px" }}
                >
                  <TableCell>{medicamento.nombre_med}</TableCell>
                  <TableCell>{medicamento.marca}</TableCell>
                  <TableCell>{new Date(medicamento.fecha_vencimiento).toLocaleDateString()}</TableCell>
                  <TableCell>{medicamento.dosis_hs}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {medicamento.stock} unidades
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Visualizar">
                      <IconButton onClick={() => handleOpenDetailModal(medicamento)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        color="info"
                        onClick={() => setEditingMedicamentoId(medicamento.id_medicamento ?? null)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        color="error"
                        onClick={() => setMedicamentoToDeleteId(medicamento.id_medicamento ?? null)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data?.getMedicamentos?.aggregate?.count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Snackbar open={Boolean(errorSnackbar)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {errorSnackbar}
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(successSnackbar)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {successSnackbar}
        </Alert>
      </Snackbar>

      <MedicamentoDetalleModal open={showDetailModal} onClose={handleCloseDetailModal} medicamento={selectedMedicamento} />

      {medicamentoToDeleteId && (
        <ConfirmarEliminacion
          open={Boolean(medicamentoToDeleteId)}
          onClose={() => setMedicamentoToDeleteId(null)}
          onConfirmar={handleConfirmDelete}
          mensaje="¿Deseas eliminar este medicamento?"
          disable={false}
        />
      )}
    </Box>
  );
};

export default Medicamentos;
