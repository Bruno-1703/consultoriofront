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

  const [newFecha, setNewFecha] = React.useState<dayjs.Dayjs | null>(
    dayjs(Number(row.fechaProgramada))
  );

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [cancelarCita] = useCancelarCitaMutation();
  const [reprogramarCita, { loading: reprogramming }] =
    useReprogramarCitaMutation();

  const isSameDate = dayjs(Number(row.fechaProgramada)).isSame(
    newFecha,
    "minute"
  );

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

  const handleReprogramar = async () => {
    if (!row.id_cita || !newFecha) return;

    try {
      await reprogramarCita({
        variables: {
          citaId: row.id_cita,
          fechaProgramada: newFecha.toISOString(),
          registradoPorId: userId,
        },
      });

      setSnackbar({
        open: true,
        message: "¡Cita reprogramada!",
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
          {dayjs(Number(row.fechaProgramada)).format("DD/MM/YYYY HH:mm")}
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
            <Tooltip title="Modificar fecha">
              <IconButton
                onClick={() => {
                  setNewFecha(dayjs(Number(row.fechaProgramada)));
                  setOpenEditDate(true);
                }}
              >
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
              <Typography variant="body2">
                <strong>Paciente:</strong>{" "}
                {row.paciente?.nombre_paciente}{" "}
                {row.paciente?.apellido_paciente}
              </Typography>
              <Typography variant="body2">
                <strong>Médico:</strong> {row.doctor?.nombre_completo}
              </Typography>
              <Typography variant="body2">
                <strong>Observaciones:</strong>{" "}
                {row.observaciones || "Sin observaciones"}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* DIALOGO REPROGRAMAR */}
      <Dialog
        open={openEditDate}
        onClose={() => setOpenEditDate(false)}
        maxWidth="xs"
        fullWidth
      >
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
            disabled={reprogramming || isSameDate}
          >
            {reprogramming ? "Guardando..." : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOGO CANCELAR */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmación</DialogTitle>
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

  // 🛠️ MEMO CORREGIDO
  const filtros = React.useMemo(() => {
    // Definimos el tipo como 'any' o crea una interface que coincida con CitaWhereInput
    const where: any = {};

    // 📅 Filtro por rango de fecha (Día completo)
    if (fecha) {
      where.fechaProgramada = {
        gte: dayjs(fecha).startOf("day").toISOString(),
        lte: dayjs(fecha).endOf("day").toISOString(),
      };
    }

    // 🔍 Filtro por motivo (Enviamos solo el string como espera tu backend)
    if (searchTerm.trim()) {
      where.motivoConsulta = searchTerm.trim();
    }

    // Por defecto, solo citas no finalizadas (opcional, según tu lógica)
    where.finalizada = false;

    return where;
  }, [searchTerm, fecha]);

  const { data, loading, error, refetch } = useGetCitasByFechaQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: filtros,
    },
    skip: !shouldFetch,
    fetchPolicy: "cache-and-network", // Recomendado para ver cambios tras reprogramar
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
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Buscar motivo"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />

        <Tooltip title="Refrescar">
          <IconButton onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        <Badge badgeContent={totalCount} color="primary">
          <ListIcon />
        </Badge>
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
