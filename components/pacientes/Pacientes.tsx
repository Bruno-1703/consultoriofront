import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  LinearProgress,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const [debugMessage, setDebugMessage] = useState<string | null>(null);

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
      where: {
        nombre_paciente: searchTerm || "",
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [eliminarPacienteLogMutation] = useElimiarPacienteLogMutation();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditPaciente = (pacienteId: string | null | undefined) => {
    setDebugMessage(`Editing patient ID: ${pacienteId}`);
    if (pacienteId != null) {
      setPacienteIdEditar(pacienteId);
      setIsEditing(true);
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setPacienteIdEditar(null);
  };

  const handleEliminarPaciente = async (pacienteId: string) => {
    try {
      await eliminarPacienteLogMutation({ variables: { pacienteId } });
      await refetch();
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

  const handleSnackbarClose = () => setErrorSnackbar(null);
  const handleSuccessSnackbarClose = () => setSuccessSnackbar(null);

  if (loading && networkStatus !== NetworkStatus.refetch)
    return <TableSkeleton rows={3} columns={5} />;

  if (error) {
    setErrorSnackbar(error.message);
    return null;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Gestión de Pacientes
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDrawer(true)}
        >
          Registrar Paciente
        </Button>

        <TextField
          inputRef={inputRef}
          label="Buscar por nombre o apellido"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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

        <Tooltip title="Pacientes">
          <Badge badgeContent={data?.getPacientes.aggregate.count || 0} color="primary">
            <PersonIcon sx={{ color: "#1976d2" }} />
          </Badge>
        </Tooltip>
      </Stack>

      {networkStatus === NetworkStatus.refetch && <LinearProgress />}

      {/* FORMULARIO - DRAWER */}
      {/* FORMULARIO - MODAL */}
      <PacienteForm
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          refetch(); // refresca la tabla cuando se cierra el modal
          setSuccessSnackbar("Paciente creado con éxito.");
        }}
      />
      {/* FORM EDIT */}
      {isEditing && pacienteIdEditar && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
          <PacienteFormEdit pacienteId={pacienteIdEditar} onClose={handleCloseEdit} />
        </Box>
      )}

      {/* TABLA */}
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 1110 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["DNI", "Nombre", "Apellido", "Edad", "Teléfono", "Acciones"].map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: "white", fontWeight: "bold", padding: "6px 16px" }}
                >
                  {header}
                </TableCell>
              ))}
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
                    <IconButton color="primary" onClick={() => handleOpenModal(paciente.node)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar">
                    <IconButton color="secondary" onClick={() => handleEditPaciente(paciente.node.id_paciente)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Eliminar">
                    <IconButton
                      color="error"
                      onClick={() => setEliminarPaciente(paciente.node.id_paciente)}
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

      {/* PAGINACIÓN */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data?.getPacientes?.aggregate.count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* SNACKBARS */}
      <Snackbar open={Boolean(errorSnackbar)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {errorSnackbar}
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(successSnackbar)} autoHideDuration={6000} onClose={handleSuccessSnackbarClose}>
        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {successSnackbar}
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(debugMessage)} autoHideDuration={6000} onClose={() => setDebugMessage(null)}>
        <Alert onClose={() => setDebugMessage(null)} severity="info" sx={{ width: "100%" }}>
          {debugMessage}
        </Alert>
      </Snackbar>

      {/* MODAL VER PACIENTE */}
      <PacientesModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedPaciente={selectedPaciente}
      />

      {/* CONFIRMAR ELIMINACIÓN */}
      <ConfirmarEliminacion
        open={Boolean(eliminarPaciente)}
        onClose={() => setEliminarPaciente(null)}
        onConfirmar={() => {
          if (eliminarPaciente) handleEliminarPaciente(eliminarPaciente);
          setEliminarPaciente(null);
        }}
        mensaje="¿Estás seguro de que deseas eliminar este paciente?"
        titulo="Confirmar Eliminación"
        disable={false}
      />
    </Box>
  );
};

export default Pacientes;
