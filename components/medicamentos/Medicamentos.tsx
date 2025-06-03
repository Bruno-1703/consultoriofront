import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StockIcon from "@mui/icons-material/LocalMall";

import { useGetMedicamentosQuery } from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import ConfirmarEliminacion from "../../utils/ConfirmarEliminacion";
import MedicamentoFormulario from "./MedicamentoEditarFormulario";
import CrearMedicamentoFormulario from "./CrearMedicamentoFormulario";
import MedicamentoDetalleModal from "./MedicamentoDetalleModalProps";

const Medicamentos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedicamento, setSelectedMedicamento] = useState<any>(null);
  const [eliminarMedicamento, setEliminarMedicamento] = useState<string | null>(
    null
  );
  const [medicamentoIdEditar, setMedicamentoIdEditar] = useState<string | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  const handleEditMedicamento = (medicamentoId: string | null | undefined) => {
    if (medicamentoId != null) {
      setMedicamentoIdEditar(medicamentoId);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setMedicamentoIdEditar(null);
    setShowForm(false);
  };

  const handleOpenModal = (medicamento: any) => {
    setSelectedMedicamento(medicamento);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMedicamento(null);
  };

  const handleSnackbarClose = () => {
    setErrorSnackbar(null);
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbar(null);
  };

  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error) {
    setErrorSnackbar(error.message);
    return null;
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
     <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
    Gestión de Medicamentos
  </Typography>

</Stack>


      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm((prev) => !prev)}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            fontWeight: "bold",
            px: 2,
          }}
        >
          {showForm ? "Ocultar Formulario" : "Registrar Medicamento"}
        </Button>
        <TextField
          label="Buscar por nombre o marca"
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
        <Tooltip title="Medicamentos">
          <Badge
            badgeContent={data?.getMedicamentos.aggregate.count || 0}
            color="primary"
          >
            <MedicationIcon sx={{ color: "#1976d2" }} />
          </Badge>
        </Tooltip>
      </Stack>

      {showForm && (
  <Box sx={{ mb: 2, p: 2, backgroundColor: 'whit', borderRadius: 2 }}>
  <CrearMedicamentoFormulario onClose={() => setShowForm(false)} />

  </Box>
)}

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 1110 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {[
                "Nombre",
                "Marca",
                "Fecha Vencimiento",
                "Dosis",
                "Stock",
                "Acciones",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: "white", fontWeight: "bold", px: 2 }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getMedicamentos.edges.map((medicamento, index) => (
              <TableRow
                key={medicamento.node.id_medicamento}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f5f5f5",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  height: "48px",
                }}
              >
                <TableCell>{medicamento.node.nombre_med}</TableCell>
                <TableCell>{medicamento.node.marca}</TableCell>
                <TableCell>
                  {new Date(
                    medicamento.node.fecha_vencimiento
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>{medicamento.node.dosis_hs}</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {medicamento.node.stock} unidades
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton
                      onClick={() => handleOpenModal(medicamento.node)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() =>
                        handleEditMedicamento(medicamento.node.id_medicamento)
                      }
                      color="secondary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Controlar Stock">
                    <IconButton
                      color="success"
                      onClick={() =>
                        alert(
                          `Controlar stock para: ${medicamento.node.nombre_med}`
                        )
                      }
                    >
                      <StockIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      color="error"
                      onClick={() =>
                        setEliminarMedicamento(
                          medicamento.node.id_medicamento ?? null
                        )
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
        count={data?.getMedicamentos?.aggregate.count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Snackbar de error */}
      <Snackbar
        open={Boolean(errorSnackbar)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorSnackbar}
        </Alert>
      </Snackbar>

      {/* Snackbar de éxito */}
      <Snackbar
        open={Boolean(successSnackbar)}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successSnackbar}
        </Alert>
      </Snackbar>

      {/* Modal de visualización */}
      <MedicamentoDetalleModal
  open={modalOpen}
  onClose={handleCloseModal}
  medicamento={selectedMedicamento}
/>

      {eliminarMedicamento && (
        <ConfirmarEliminacion
          open={Boolean(eliminarMedicamento)}
          onClose={() => setEliminarMedicamento(null)}
          onConfirmar={() => {
            // Aquí debería ir la lógica para eliminar el medicamento
            setSuccessSnackbar("Medicamento eliminado.");
            setEliminarMedicamento(null);
            refetch();
          }}
          mensaje="¿Deseas eliminar este medicamento?"
          disable={false}
        />
      )}
    </Box>
  );
};

export default Medicamentos;
