import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import MedicationIcon from "@mui/icons-material/Medication";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { useGetCitasQuery } from "../graphql/types";
import PersonaSelector from "../utils/SelectorUsuarios";
import CitaModal from "../components/citas/citaModal";
import AgregarEstudio from "../components/selectores/AgregarEstudios";
import AgregarEnfermedad from "../components/selectores/AgregarEnfermedad";
import AgregarMedicamento from "../components/selectores/AgregarMedicamento";
import AddchartIcon from '@mui/icons-material/Addchart';
const HistoriasPaciente: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedPersona, setSelectedPersona] = React.useState<string | null>(
    null
  );

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCita, setSelectedCita] = React.useState<any | null>(null);

  // Estados para modales
  const [openEstudioModal, setOpenEstudioModal] = React.useState(false);
  const [openEnfermedadModal, setOpenEnfermedadModal] = React.useState(false);
  const [openMedicamentoModal, setOpenMedicamentoModal] = React.useState(false);

  const handleOpenEstudioModal = (cita: any) => {
    setSelectedCita(cita);
    setOpenEstudioModal(true);
  };
  const handleOpenEnfermedadModal = (cita: any) => {
    setSelectedCita(cita);
    setOpenEnfermedadModal(true);
  };
  const handleOpenMedicamentoModal = (cita: any) => {
    setSelectedCita(cita);
    setOpenMedicamentoModal(true);
  };

  const handleCloseAllModals = () => {
    setOpenEstudioModal(false);
    setOpenEnfermedadModal(false);
    setOpenMedicamentoModal(false);
    setSelectedCita(null);
  };

  const { data, loading, error, refetch } = useGetCitasQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        buscar: searchTerm,
        paciente: {
          dni: selectedPersona,
        },
      },
    },
  });

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

  const handleVisualizarClick = (cita: any) => {
    setSelectedCita(cita);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCita(null);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Historias del Paciente
        </Typography>

        <Tooltip title="Refrescar">
          <IconButton onClick={() => refetch()} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box sx={{ marginBottom: 2 }}>
        <PersonaSelector
          value={selectedPersona}
          onChange={(value) => setSelectedPersona(value)}
        />
      </Box>

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ my: 3 }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 3 }}>
          Error al cargar las historias: {error.message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["Fecha", "Motivo de Consulta", "Diagnóstico", "Acciones"].map(
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
            {data?.getCitas.edges?.map((historia, index) => (
              <TableRow
                key={historia.node?.id_cita}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f5f5f5",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                  height: "48px",
                }}
              >
                <TableCell>
                  {new Date(historia.node.fechaSolicitud).toLocaleDateString()}
                </TableCell>
                <TableCell>{historia.node.motivoConsulta}</TableCell>
                <TableCell>{historia.node.observaciones}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Visualizar">
                      <IconButton
                        color="primary"
                        onClick={() => handleVisualizarClick(historia.node)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Agregar Estudio">
                      <IconButton
                        color="info"
                        onClick={() => handleOpenEstudioModal(historia.node)}
                      >
                        <AddchartIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Agregar Enfermedad">
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenEnfermedadModal(historia.node)}
                      >
                        <CoronavirusIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Agregar Medicamento">
                      <IconButton
                        color="success"
                        onClick={() =>
                          handleOpenMedicamentoModal(historia.node)
                        }
                      >
                        <MedicationIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data?.getCitas.aggregate.count || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginTop: 2 }}
      />

      {/* Modal de cita */}
      <CitaModal
        open={openModal}
        onClose={handleCloseModal}
        cita={selectedCita}
      />
      <AgregarEstudio
        open={openEstudioModal}
        onClose={handleCloseAllModals}
        cita={selectedCita}
      />
      <AgregarEnfermedad
        open={openEnfermedadModal}
        onClose={handleCloseAllModals}
        cita={selectedCita}
      />
      <AgregarMedicamento
        open={openMedicamentoModal}
        onClose={handleCloseAllModals}
        cita={selectedCita}
      />
    </Box>
  );
};

export default HistoriasPaciente;
