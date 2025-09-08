import React, { useEffect, useState } from "react";
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
  Tooltip,
  Snackbar,
  Alert,
  Badge,
  DialogContent,
  Dialog,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicationIcon from "@mui/icons-material/Medication";

import ConfirmarEliminacionEnfermedad from "../../utils/ConfirmarEliminacionEnfermedad";
import TableSkeleton from "../../utils/TableSkeleton";
import {
  useDeleteEnfermedadMutation,
  useGetEnfermedadesQuery,
} from "../../graphql/types";
import EnfermedadesModal from "./EnfermedadesModal";
import EnfermedadForm from "./EnfermedadFormEdit";
import EnfermedadCrear from "./EnfermedadCrear";

const Enfermedades: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [enfermedadIdEditar, setEnfermedadIdEditar] = useState<string | null>(
    null
  );
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEnfermedad, setSelectedEnfermedad] = useState<any>(null);
  const [eliminarEnfermedad, setEliminarEnfermedad] = useState<string | null>(
    null
  );
  const { data, loading, error, refetch } = useGetEnfermedadesQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {}
    },
    fetchPolicy: "network-only",
  });

  const [deleteEnfermedadMutation] = useDeleteEnfermedadMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event: any, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetailModal = (enfermedad: any) => {
    setSelectedEnfermedad(enfermedad);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedEnfermedad(null);
  };

  const handleEditEnfermedad = (id: string | null) => {
    setEnfermedadIdEditar(id);
  };

  const handleConfirmDelete = async () => {
    if (eliminarEnfermedad) {
      try {
        await deleteEnfermedadMutation({
          variables: { id: eliminarEnfermedad },
        });
        setSuccessSnackbar("Enfermedad eliminada exitosamente.");
        setEliminarEnfermedad(null);
        refetch();
      } catch (err: any) {
        setErrorSnackbar(`Error al eliminar enfermedad: ${err.message}`);
        setEliminarEnfermedad(null);
      }
    }
  };

  const handleFormSuccess = () => {
    setSuccessSnackbar("Operación exitosa.");
    setShowCreateFormModal(false);
    setEnfermedadIdEditar(null);
    refetch();
  };

  const handleFormError = (msg: string) => {
    setErrorSnackbar(`Error: ${msg}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error) {
    setErrorSnackbar(error.message);
    return null;
  }

  const enfermedades =
    data?.getEnfermedades?.edges?.map((edge) => edge.node) || [];

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Gestión de Enfermedades
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateFormModal(true)}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            fontWeight: "bold",
            px: 2,
          }}
        >
          Registrar Nueva Enfermedad
        </Button>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />
        <Tooltip title="Refrescar">
          <IconButton
            onClick={() => refetch()}
            color="secondary"
            sx={{ borderRadius: 1 }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Total de Enfermedades">
          <Badge
            badgeContent={data?.getEnfermedades?.aggregate?.count || 0}
            color="primary"
          >
            <MedicationIcon sx={{ color: "#1976d2" }} />
          </Badge>
        </Tooltip>
      </Stack>

      <Dialog
        open={showCreateFormModal}
        onClose={() => setShowCreateFormModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <EnfermedadCrear
            onClose={() => setShowCreateFormModal(false)} enfermedadId={""}            // onSuccess={handleFormSuccess}
          // onError={handleFormError}
          // isEditing={false}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(enfermedadIdEditar)}
        onClose={() => setEnfermedadIdEditar(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <EnfermedadForm
            enfermedadId={enfermedadIdEditar}
            isEditing={true}
            onClose={() => setEnfermedadIdEditar(null)}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
          />
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {[, "Nombre", "Gravedad", "Sintomas", "Acciones"].map((header) => (
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
                <TableCell>
                  {`${enfermedad.nombre_enf ?? ""}`.charAt(0).toUpperCase() +
                    `${enfermedad.nombre_enf ?? ""}`.slice(1)}
                </TableCell>
                <TableCell>
                  {`${enfermedad.gravedad ?? ""}`.charAt(0).toUpperCase() +
                    `${enfermedad.gravedad ?? ""}`.slice(1)}
                </TableCell>
                <TableCell>
                  {`${enfermedad.sintomas ?? ""}`.charAt(0).toUpperCase() +
                    `${enfermedad.sintomas ?? ""}`.slice(1)}
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDetailModal(enfermedad)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        handleEditEnfermedad(
                          enfermedad.id_enfermedad ?? null
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      color="error"
                      onClick={() =>
                        setEliminarEnfermedad(enfermedad.id_enfermedad ?? null)
                      }
                    >
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

      <ConfirmarEliminacionEnfermedad
        open={!!eliminarEnfermedad}
        onClose={() => setEliminarEnfermedad(null)}
        id={eliminarEnfermedad || ""}
        onConfirm={handleConfirmDelete}
      />

      <Snackbar
        open={!!errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorSnackbar(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorSnackbar}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successSnackbar}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessSnackbar(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successSnackbar}
        </Alert>
      </Snackbar>

      <EnfermedadesModal
        open={showDetailModal}
        enfermedadSeleccionada={selectedEnfermedad}
        onClose={handleCloseModal}
        onEditar={() => {
          if (selectedEnfermedad?.id_enfermedad) {
            setEnfermedadIdEditar(selectedEnfermedad.id_enfermedad);
            handleCloseModal();
          }
        }}
      />
    </Box>
  );
};

export default Enfermedades;
