import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  TablePagination,
  Badge,
  Tooltip,
  Chip,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import {
  useGetCitasByFechaQuery,
  Cita,
  useCancelarCitaMutation,
  useReprogramarCitaMutation,
} from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import {
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// =====================================================
// FILA DE CITA
// =====================================================

interface CitaRowProps {
  row: Cita;
  userId?: string;
}

const CitaRow: React.FC<CitaRowProps> = ({ row, userId }) => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditDate, setOpenEditDate] = React.useState(false);

  const [newFecha, setNewFecha] = React.useState<any>(null);

  const [reprogramarCita, { loading: reprogramming }] =
    useReprogramarCitaMutation();

  const [cancelarCita] = useCancelarCitaMutation();

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // ABRIR REPROGRAMACIÓN
  const abrirReprogramar = () => {
    setNewFecha(dayjs(row.fechaProgramada)); // ← NO Number()
    setOpenEditDate(true);
  };

  // CANCELAR CITA
  const handleCancelar = async () => {
    if (!row.id_cita) return;
    try {
      await cancelarCita({ variables: { id: row.id_cita } });
      setSnackbar({
        open: true,
        message: "Cita cancelada correctamente.",
        severity: "success",
      });
      setOpenDialog(false);
    } catch {
      setSnackbar({
        open: true,
        message: "No se pudo cancelar la cita.",
        severity: "error",
      });
    }
  };

  // REPROGRAMAR CITA
  const handleReprogramar = async () => {
    if (!row.id_cita || !newFecha) return;
    try {
      await reprogramarCita({
        variables: {
          citaId: row.id_cita,
          fechaProgramada: newFecha.toDate(), // IMPORTANTE
        },
      });

      setSnackbar({
        open: true,
        message: "¡Cita reprogramada correctamente!",
        severity: "success",
      });

      setOpenEditDate(false);
    } catch {
      setSnackbar({
        open: true,
        message: "Error al reprogramar la cita",
        severity: "error",
      });
    }
  };


  return (
    <>
      {/* FILA PRINCIPAL */}
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>{row.motivoConsulta}</TableCell>

        <TableCell align="center">
          {dayjs(row.fechaProgramada).format("DD/MM/YYYY HH:mm")}
        </TableCell>

        <TableCell align="center">
          <Chip
            label={row.cancelada ? "Cancelada" : "Pendiente"}
            size="small"
            color={row.cancelada ? "error" : "warning"}
          />
        </TableCell>

        <TableCell align="center">
          {!row.cancelada && (
            <Tooltip title="Reprogramar">
              <IconButton onClick={abrirReprogramar}>
                <EditCalendarIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>

        <TableCell align="center">
          {!row.cancelada && (
            <Button
              color="error"
              size="small"
              variant="contained"
              onClick={() => setOpenDialog(true)}
            >
              Cancelar
            </Button>
          )}
        </TableCell>
      </TableRow>

      {/* DETALLES */}
      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={open} unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2">🧑 Paciente</Typography>

              <Typography><strong>Nombre:</strong> {row.paciente?.nombre_paciente}</Typography>
              <Typography><strong>DNI:</strong> {row.paciente?.dni}</Typography>

              <Box sx={{ mt: 2 }} />

              <Typography variant="subtitle2">🧑‍⚕️ Médico</Typography>

              <Typography><strong>Nombre:</strong> {row.doctor?.nombre_completo}</Typography>
              <Typography><strong>Email:</strong> {row.doctor?.email}</Typography>
              <Typography><strong>Especialidad:</strong> {row.doctor?.especialidad}</Typography>
              <Typography><strong>Matrícula:</strong> {row.doctor?.matricula}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* DIALOGO REPROGRAMAR */}
      <Dialog open={openEditDate} onClose={() => setOpenEditDate(false)}>
        <DialogTitle>Reprogramar cita</DialogTitle>

        <DialogContent dividers>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Nueva fecha y hora"
              value={newFecha}
              onChange={setNewFecha}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEditDate(false)}>Cancelar</Button>

          <Button
            variant="contained"
            onClick={handleReprogramar}
            disabled={!newFecha || reprogramming}
          >
            {reprogramming ? "Guardando..." : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOGO CANCELAR */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Cancelar cita</DialogTitle>
        <DialogContent>
          <Typography>¿Deseas cancelar esta cita?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button color="error" variant="contained" onClick={handleCancelar}>
            Sí, cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};


// =====================================================
// TABLA PRINCIPAL
// =====================================================

interface CollapsibleTableProps {
  fecha: string;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ fecha }) => {
  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const shouldFetch = status === "authenticated";

  const startOfDay = dayjs(fecha).startOf("day").toISOString();
  const endOfDay = dayjs(fecha).endOf("day").toISOString();



  const { data, loading, error, refetch } = useGetCitasByFechaQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        fechaProgramada: fecha, // "2026-01-04"
        buscar: searchTerm || undefined,
        registradoPorId: session?.user?.id,
      },
    },
    fetchPolicy: "cache-and-network",
  });
  if (!shouldFetch || loading)
    return <TableSkeleton rows={3} columns={6} />;
  if (error)
    return <Typography color="error">{error.message}</Typography>;

  const citas = data?.getCitasByFecha.edges ?? [];
  const totalCount = data?.getCitasByFecha.aggregate.count ?? 0;

  return (
    <Box>
      {/* FILTROS */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(to right, #141414, hsla(236, 20%, 15%, 1.00))",
          boxShadow: "0 0 15px rgba(0, 150, 255, 0.15)",
        }}
      >
        {/* BUSCADOR */}
        <TextField
          label="Buscar motivo"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          sx={{
            width: 260,
            "& label": { color: "#9bbbd4" },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "#3d4d63" },
              "&:hover fieldset": { borderColor: "#64b5f6" },
              "&.Mui-focused fieldset": { borderColor: "#2196f3" },
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon sx={{ color: "#64b5f6" }} />
              </IconButton>
            ),
          }}
        />

        {/* ACCIONES */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* REFRESH */}
          <Tooltip title="Refrescar">
            <IconButton
              onClick={() => refetch()}
              sx={{
                color: "#64b5f6",
                transition: "0.2s",
                "&:hover": {
                  transform: "rotate(90deg)",
                  color: "#90caf9",
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          {/* CONTADOR REAL */}
          <Badge
            badgeContent={citas.length}
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#29b6f6",
                color: "64b5f6",
                fontWeight: "bold",
                fontSize: "0.9rem",
                boxShadow: "0 0 10px #29b6f6",
              },
            }}
          >
            <ListIcon sx={{ color: "white" }} />
          </Badge>
        </Box>
      </Box>

      {/* TABLA */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              <TableCell sx={{ color: "primary.contrastText" }} />
              <TableCell sx={{ color: "primary.contrastText", fontWeight: 600 }}>
                Motivo
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "primary.contrastText", fontWeight: 600 }}
              >
                Fecha
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "primary.contrastText", fontWeight: 600 }}
              >
                Estado
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "primary.contrastText", fontWeight: 600 }}
              >
                Acciones
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "primary.contrastText", fontWeight: 600 }}
              >
                Cancelar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citas.map((item) => (
              <CitaRow
                key={item.node.id_cita}
                row={item.node as Cita}
                userId={session?.user?.id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINACIÓN */}
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(_, np) => setPage(np)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
};

export default CollapsibleTable;
