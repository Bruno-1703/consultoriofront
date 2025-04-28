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
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicamentoForm from "./MedicamentoForm"; // Asegúrate de tener este componente
import {
  useGetMedicamentosQuery,
} from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import ConfirmarEliminacion from "../../utils/ConfirmarEliminacion";

const Medicamentos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>(""); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedicamento, setSelectedMedicamento] = useState<any>(null);
  const [eliminarMedicamento, setEliminarMedicamento] = useState<string | null>(null);
  const [medicamentoIdEditar, setMedicamentoIdEditar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [debugMessage, setDebugMessage] = useState<string | null>(null);

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

  // const [eliminarMedicamentoLogMutation] = useEliminarMedicamentoLogMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value!);
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
    setDebugMessage(`Editing medicamento ID: ${medicamentoId}`);
    if (medicamentoId != null) {
      setMedicamentoIdEditar(medicamentoId);
      setIsEditing(true);
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setMedicamentoIdEditar(null);
    setShowForm(false);
  };

  // const handleEliminarMedicamento = async (medicamentoId: string) => {
  //   try {
  //     await eliminarMedicamentoLogMutation({ variables: { medicamentoId } });
  //     refetch();
  //     setSuccessSnackbar("Medicamento eliminado con éxito.");
  //   } catch (error) {
  //     console.error("Error al eliminar el medicamento:", error);
  //     setErrorSnackbar("Error al eliminar el medicamento.");
  //   }
  // };

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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Gestión de Medicamentos
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: 2, alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm((prev) => !prev)} 
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            fontWeight: "bold",
            paddingX: 2,
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
            sx={{
              borderRadius: 1,
              backgroundColor: "#f0f0f0",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
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
        <Box
          sx={{
            marginBottom: 2,
            padding: 2,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
          }}
        >
          <MedicamentoForm /> 
        </Box>
      )}

      {isEditing && medicamentoIdEditar ? (
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
          }}
        >
          {/* <MedicamentoFormEdit
            medicamentoId={medicamentoIdEditar}
            onClose={handleCloseEdit}
          /> */}
        </Box>
      ) : null}

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 1110 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["Nombre", "Marca", "Fecha Vencimiento", "Dosis", "Acciones"].map(
                (header) => (
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
                )
              )}
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
                <TableCell>{new Date(medicamento.node.fecha_vencimiento).toLocaleDateString()}</TableCell>
                <TableCell>{medicamento.node.dosis_hs}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton
                      aria-label="visualizar"
                      color="primary"
                      onClick={() => handleOpenModal(medicamento.node)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label="editar"
                      color="secondary"
                      onClick={() =>
                        handleEditMedicamento(medicamento.node.id_medicamento)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      aria-label="eliminar"
                      color="error"
                      onClick={() => {
                        if (medicamento.node.id_medicamento) {
                          setEliminarMedicamento(medicamento.node.id_medicamento);
                        } else {
                          setEliminarMedicamento(null);
                        }
                      }}
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

      {/* Error Snackbar */}
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

      {/* Success Snackbar */}
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
{/* 
      <MedicamentosModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedMedicamento={selectedMedicamento}
      /> */}

      {/* <ConfirmarEliminacion
        open={Boolean(eliminarMedicamento)}
        onClose={() => setEliminarMedicamento(null)}
        onConfirmar={() => {
          if (eliminarMedicamento) {
            handleEliminarMedicamento(eliminarMedicamento);
          }
          setEliminarMedicamento(null);
        }}
        mensaje="¿Estás seguro de que deseas eliminar este medicamento?"
        titulo="Confirmar Eliminación"
        disable={false}
      /> */}
    </Box>
  );
};

export default Medicamentos;
