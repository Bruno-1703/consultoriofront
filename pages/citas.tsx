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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import MedicationIcon from "@mui/icons-material/MedicalServices";
import AddchartIcon from "@mui/icons-material/Addchart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useFinalizarCitaMutation, useGetCitasQuery } from "../graphql/types";
import PersonaSelector from "../utils/SelectorUsuarios";
import CitaModal from "../components/citas/citaModal";
import AgregarEstudio from "../components/selectores/AgregarEstudios";
import AgregarEnfermedad from "../components/selectores/AgregarEnfermedad";
import AgregarMedicamento from "../components/selectores/AgregarMedicamento";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

const HistoriasPaciente: React.FC = () => {
  const { data: session } = useSession();
const userId = session?.user.id; 
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedPersona, setSelectedPersona] = React.useState<string | null>(
    null
  );

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCita, setSelectedCita] = React.useState<any | null>(null);
  const [finalizarCita, { loading: loadingFinalizar }] =
    useFinalizarCitaMutation();

  const [openEstudioModal, setOpenEstudioModal] = React.useState(false);
  const [openEnfermedadModal, setOpenEnfermedadModal] = React.useState(false);
  const [openMedicamentoModal, setOpenMedicamentoModal] = React.useState(false);

  // ESTADO CORREGIDO: Aseguramos que `citaToFinalizeId` solo sea string o null
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [citaToFinalizeId, setCitaToFinalizeId] = React.useState<string | null>(
    null
  );

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

  // Handler para abrir el diálogo de confirmación (asegurándose que el ID es string)
  const handleOpenConfirmDialog = (citaId: string) => {
    setCitaToFinalizeId(citaId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCitaToFinalizeId(null);
  };

  const handleConfirmFinalize = async () => {
    if (citaToFinalizeId) {
      try {
        await finalizarCita({ variables: { id: citaToFinalizeId } });
        refetch();
        handleCloseConfirmDialog();
      } catch (e) {
        console.error("Error al finalizar cita:", e);
        handleCloseConfirmDialog();
      }
    }
  };
  

  const { data, loading, error, refetch } = useGetCitasQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        buscar: searchTerm,
        doctor: {id: userId, dni:"",nombre_completo:"",matricula:"", especialidad:"",nombre_usuario:"",telefono:"",email:""},
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
                  <Typography sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {historia.node.fechaProgramada
                      ? dayjs(Number(historia.node.fechaProgramada)).isValid()
                        ? dayjs(Number(historia.node.fechaProgramada)).format("DD/MM/YYYY HH:mm")
                        : "Fecha inválida"
                      : "Sin fecha"}
                  </Typography>
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
                        disabled={!!historia.node.finalizada}
                      >
                        <AddchartIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Agregar Enfermedad">
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenEnfermedadModal(historia.node)}
                        disabled={!!historia.node.finalizada}
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
                        disabled={!!historia.node.finalizada}
                      >
                        <MedicationIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title={
                        historia.node.finalizada
                          ? "Cita Finalizada"
                          : "Finalizar Cita"
                      }
                    >
                      <span>
                        <IconButton
                          color="error"
                          // CORRECCIÓN AQUÍ: Solo llama a handleOpenConfirmDialog si id_cita no es null/undefined
                          onClick={() => historia.node?.id_cita && handleOpenConfirmDialog(historia.node.id_cita)}
                          disabled={loadingFinalizar || !!historia.node.finalizada}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </span>
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

      {/* Modales existentes */}
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

      {/* Diálogo de Confirmación */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar Finalización de Cita"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas finalizar esta cita? Una vez finalizada, no se podrán agregar más datos (estudios, enfermedades, medicamentos).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmFinalize}
            color="error"
            autoFocus
            disabled={loadingFinalizar}
          >
            {loadingFinalizar ? <CircularProgress size={24} /> : "Finalizar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HistoriasPaciente;