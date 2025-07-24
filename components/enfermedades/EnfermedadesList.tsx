import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  TablePagination,
  IconButton,
  Stack,
  Badge,
  Tooltip,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { NetworkStatus } from "@apollo/client";

import ConfirmarEliminacionEnfermedad from "../../utils/ConfirmarEliminacionEnfermedad";
import TableSkeleton from "../../utils/TableSkeleton";
import { useDeleteEnfermedadMutation, useGetEnfermedadesQuery } from "../../graphql/types";
import EnfermedadFormEdit from "./EnfermedadCrear";
import EnfermedadesModal from "./EnfermedadesModal";

const Enfermedades: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEnfermedad, setSelectedEnfermedad] = useState<any>(null);
  const [eliminarEnfermedad, setEliminarEnfermedad] = useState<string | null>(null);
  const [enfermedadIdEditar, setEnfermedadIdEditar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data, loading, error, refetch, networkStatus } = useGetEnfermedadesQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        nombre_enf: searchTerm,
      },
    },
  });

  const [deleteEnfermedadMutation] = useDeleteEnfermedadMutation();

  // Manejo del cambio en el buscador
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // Cambio de página en la tabla
  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Cambio de cantidad de filas por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Abrir edición para enfermedad
  const handleEditEnfermedad = (id: string | null) => {
    if (id) {
      setEnfermedadIdEditar(id);
      setIsEditing(true);
      setShowForm(false);
    }
  };

  // Cerrar edición
  const handleCloseEdit = () => {
    setIsEditing(false);
    setEnfermedadIdEditar(null);
  };

  // Abrir modal para visualizar
  const handleOpenModal = (enfermedad: any) => {
    setSelectedEnfermedad(enfermedad);
    setModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEnfermedad(null);
  };

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (eliminarEnfermedad) {
      try {
        await deleteEnfermedadMutation({ variables: { id: eliminarEnfermedad } });
        setSuccessSnackbar("Enfermedad eliminada exitosamente.");
        setEliminarEnfermedad(null);
        refetch();
      } catch (err: any) {
        setErrorSnackbar(`Error al eliminar enfermedad: ${err.message}`);
        setEliminarEnfermedad(null);
      }
    }
  };

  // Mostrar loading skeleton si está cargando
  if (loading && networkStatus !== NetworkStatus.refetch) return <TableSkeleton rows={3} columns={4} />;

  // Mostrar error y snackbar
  if (error) {
    setErrorSnackbar(error.message);
    return null;
  }

  const enfermedades = data?.getEnfermedades?.edges?.map(edge => edge.node) || [];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Gestión de Enfermedades
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(prev => !prev)}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            fontWeight: "bold",
            px: 2,
          }}
        >
          {showForm ? "Ocultar Formulario" : "Registrar Enfermedad"}
        </Button>

        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />

        <Tooltip title="Refrescar">
          <span>
            <IconButton
              onClick={() => refetch()}
              color="secondary"
              disabled={networkStatus === NetworkStatus.refetch}
              sx={{
                borderRadius: 1,
                backgroundColor: "#f0f0f0",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Enfermedades">
          <Badge badgeContent={data?.getEnfermedades?.aggregate.count || 0} color="primary">
            <MedicalServicesIcon sx={{ color: "#1976d2" }} />
          </Badge>
        </Tooltip>
      </Stack>

      {networkStatus === NetworkStatus.refetch && <LinearProgress />}

      {showForm && !isEditing && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
          {/* Aquí iría tu formulario de registro */}
          <Typography>Formulario para registrar nueva enfermedad (a implementar)</Typography>
        </Box>
      )}

      {isEditing && enfermedadIdEditar && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
          <EnfermedadFormEdit enfermedadId={enfermedadIdEditar} onClose={handleCloseEdit} />
        </Box>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["ID", "Nombre", "Acciones"].map(header => (
                <TableCell
                  key={header}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    padding: "6px 16px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {enfermedades.map((enfermedad, index) => (
              <TableRow
                key={enfermedad.id_enfermedad}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f5f5f5",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  height: "48px",
                }}
              >
                <TableCell>{enfermedad.id_enfermedad}</TableCell>
                <TableCell>{enfermedad.nombre_enf}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton color="primary" onClick={() => handleOpenModal(enfermedad)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditEnfermedad(enfermedad.id_enfermedad ?? null)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => setEliminarEnfermedad(enfermedad.id_enfermedad ?? null)}>
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
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data?.getEnfermedades?.aggregate.count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />

      {/* Confirmación de eliminación */}
      <ConfirmarEliminacionEnfermedad
        open={!!eliminarEnfermedad}
        onClose={() => setEliminarEnfermedad(null)}
        id={eliminarEnfermedad || ""}
        onConfirm={handleConfirmDelete}
      />

      {/* Snackbar para errores */}
      <Snackbar
        open={!!errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setErrorSnackbar(null)} severity="error" sx={{ width: "100%" }}>
          {errorSnackbar}
        </Alert>
      </Snackbar>

      {/* Snackbar para éxito */}
      <Snackbar
        open={!!successSnackbar}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccessSnackbar(null)} severity="success" sx={{ width: "100%" }}>
          {successSnackbar}
        </Alert>
      </Snackbar>

      {/* Modal para visualizar */}
      <EnfermedadesModal
        open={modalOpen}
        enfermedadSeleccionada={selectedEnfermedad}
        onClose={handleCloseModal}
        onEditar={() => {
          if (selectedEnfermedad?.id_enfermedad) {
            handleEditEnfermedad(selectedEnfermedad.id_enfermedad);
            handleCloseModal();
          }
        }}
      />
    </Box>
  );
};

export default Enfermedades;
