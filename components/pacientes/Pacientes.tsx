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
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PacienteForm from "./PacienteForm"; // Ensure this component exists
import {
  useElimiarPacienteLogMutation,
  useGetPacientesQuery,
} from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import PacientesModal from "./pacienteModal";
import ConfirmarEliminacion from "../../utils/ConfirmarEliminacion";
import PacienteFormEdit from "./PacienteFormEditar"; // Ensure this component exists

const Pacientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [eliminarPaciente, setEliminarPaciente] = useState<string | null>(null);
  const [pacienteIdEditar, setPacienteIdEditar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [debugMessage, setDebugMessage] = useState<string | null>(null); // Debug message state

  const { data, loading, error, refetch } = useGetPacientesQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        dni: searchTerm,
        apellido_paciente: searchTerm,
        nombre_paciente: searchTerm,
      },
    },
  });

  const [eliminarPacienteLogMutation] = useElimiarPacienteLogMutation();

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

  const handleEditPaciente = (pacienteId: string | null | undefined) => {
    // Set the debug message
    setDebugMessage(`Editing patient ID: ${pacienteId}`); // Set the debug message
    if (pacienteId != null) {
      setPacienteIdEditar(pacienteId);
      setIsEditing(true);  // Ensure `isEditing` is set to true
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false); // Close edit form
    setPacienteIdEditar(null); // Clear patient ID
    setShowForm(false); // Hide the form if necessary
  };

  const handleEliminarPaciente = async (pacienteId: string) => {
    try {
      await eliminarPacienteLogMutation({ variables: { pacienteId } });
      refetch();
      setSuccessSnackbar("Paciente eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el paciente:", error);
      setErrorSnackbar("Error al eliminar el paciente.");
    }
  };

  const handleOpenModal = (paciente: any) => {
    setSelectedPaciente(paciente);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPaciente(null);
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
          Gestión de Pacientes
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
          onClick={() => setShowForm((prev) => !prev)} // Toggle form visibility
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            fontWeight: "bold",
            paddingX: 2,
          }}
        >
          {showForm ? "Ocultar Formulario" : "Registrar Paciente"}
        </Button>
        <TextField
          label="Buscar por DNI"
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
        <Tooltip title="Pacientes">
          <Badge
            badgeContent={data?.getPacientes.aggregate.count || 0}
            color="primary"
          >
            <PersonIcon sx={{ color: "#1976d2" }} />
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
          <PacienteForm /> {/* Ensure this component exists */}
        </Box>
      )}

      {isEditing && pacienteIdEditar ? (
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
          }}
        >
          <PacienteFormEdit
            pacienteId={pacienteIdEditar}
            onClose={handleCloseEdit}
          />
        </Box>
      ) : null}

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 1110 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["DNI", "Nombre", "Apellido", "Edad", "Teléfono", "Acciones"].map(
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
            {data?.getPacientes?.edges.map((paciente, index) => (
              <TableRow
                key={paciente.node.id_paciente}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f5f5f5",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  height: "48px",
                }}
              >
                <TableCell>{paciente.node.dni}</TableCell>
                <TableCell>{paciente.node.nombre_paciente}</TableCell>
                <TableCell>{paciente.node.apellido_paciente}</TableCell>
                <TableCell>{paciente.node.edad}</TableCell>
                <TableCell>{paciente.node.telefono}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton
                      aria-label="visualizar"
                      color="primary"
                      onClick={() => handleOpenModal(paciente.node)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label="editar"
                      color="secondary"
                      onClick={() =>
                        handleEditPaciente(paciente.node.id_paciente)
                      } // Switch to edit mode
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      aria-label="eliminar"
                      color="error"
                      onClick={() => {
                        if (paciente.node.id_paciente) {
                          setEliminarPaciente(paciente.node.id_paciente);
                        } else {
                          setEliminarPaciente(null);
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
        count={data?.getPacientes?.aggregate.count || 0}
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

      {/* Debug Snackbar */}
      <Snackbar
        open={Boolean(debugMessage)}
        autoHideDuration={6000}
        onClose={() => setDebugMessage(null)}
      >
        <Alert
          onClose={() => setDebugMessage(null)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {debugMessage}
        </Alert>
      </Snackbar>

      <PacientesModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedPaciente={selectedPaciente}
      />
      <ConfirmarEliminacion
        open={Boolean(eliminarPaciente)}
        onClose={() => setEliminarPaciente(null)}
        onConfirmar={() => {
          if (eliminarPaciente) {
            handleEliminarPaciente(eliminarPaciente);
          }
          setEliminarPaciente(null); // Reset the state
        }}
        mensaje="¿Estás seguro de que deseas eliminar este paciente?"
        titulo="Confirmar Eliminación"
        disable={false}
      />
    </Box>
  );
};

export default Pacientes;
