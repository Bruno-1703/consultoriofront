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
import dayjs from "dayjs";
import {
  useGetCitasByFechaQuery,
  Cita,
  useCancelarCitaMutation,
  // 💡 SE IMPORTA LA MUTACIÓN DE REPROGRAMACIÓN
  useReprogramarCitaMutation, 
} from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSession } from "next-auth/react"; // 💡 NECESARIO PARA OBTENER EL userId
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// =====================================================
//                 FILA DE CITA
// =====================================================

const CitaRow = ({ row }: { row: Cita }) => {
  const { data: session } = useSession(); // OBTENER LA SESIÓN
  const [open, setOpen] = React.useState(false);
  const [cancelarCita] = useCancelarCitaMutation();  
 
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  const [openEditDate, setOpenEditDate] = React.useState(false);
  const [newFecha, setNewFecha] = React.useState<dayjs.Dayjs | null>(
    dayjs(Number(row.fechaProgramada))
  );

  const [
    reprogramarCitaMutation, 
    { loading: reprogramming }
  ] = useReprogramarCitaMutation({
    refetchQueries: [
      'GetCitasByFecha', // Recarga la tabla
    ],
  });
  
  // 4. NUEVA FUNCIÓN PARA REPROGRAMAR (con la variable declarada correctamente)
  const handleReprogramar = async () => {
    if (!row.id_cita || !newFecha) {
      setSnackbar({
        open: true,
        message: "Datos incompletos para reprogramar.",
        severity: "error",
      });
      return;
    } 

    const fechaTimestamp = newFecha.valueOf(); 
    const userId = session?.user?.id;
    
    try {
      await reprogramarCitaMutation({
        variables: {
          citaId: row.id_cita,
          fechaProgramada: fechaTimestamp, // USAMOS LA VARIABLE DECLARADA
          registradoPorId: userId || 'Desconocido', 
        },
      });
      
      setSnackbar({
        open: true,
        message: "Cita reprogramada correctamente.",
        severity: "success",
      });
      setOpenEditDate(false); 

    } catch (e: any) {
      console.error("Error al reprogramar cita:", e);
      setSnackbar({
        open: true,
        message: "Error al reprogramar la cita: " + (e.message || "Verifique la consola."),
        severity: "error",
      });
    }
  };

  const handleCancelar = async () => {
    if (!row.id_cita) {
      setSnackbar({
        open: true,
        message: "ID de cita inexistente.",
        severity: "error",
      });
      return;
    }

    try {
      await cancelarCita({ variables: { id: row.id_cita } });
      setSnackbar({
        open: true,
        message: "Cita cancelada correctamente.",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "No se pudo cancelar la cita.",
        severity: "error",
      });
    }
  };

  return (
    <>
      {/* FILA PRINCIPAL */}
      <TableRow
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}

      >
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >

            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ fontWeight: 500, color: "text.primary" }}>
          {row.motivoConsulta}
        </TableCell>

        <TableCell align="center" sx={{ color: "text.secondary" }}>
          {/* Muestra la nueva fecha si se actualiza */}
          {dayjs(Number(row.fechaProgramada)).format("DD/MM/YYYY hh:mm A")}
        </TableCell>

        <TableCell align="center">
          <Chip
            label={row.cancelada ? "Cancelada" : "Pendiente"}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 22,
              borderRadius: 1.5,
              px: 0.5,
              backgroundColor: row.cancelada
                ? "rgba(244, 67, 54, 0.12)"
                : "rgba(255, 193, 7, 0.18)",
              color: row.cancelada ? "error.main" : "#9c6f00",
            }}
          />
        </TableCell>

        <TableCell align="center">
          {!row.cancelada && (
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              {/* MODIFICAR FECHA */}
              <Tooltip title="Modificar fecha">
                <IconButton
                  onClick={() => {
                    // 💡 Al abrir, resetear el estado de la nueva fecha a la actual de la fila
                    setNewFecha(dayjs(Number(row.fechaProgramada)));
                    setOpenEditDate(true);
                  }}
                  sx={{
                    color: "#7cb7ff",
                    background: "rgba(124,183,255,0.1)",
                    "&:hover": {
                      background: "rgba(124,183,255,0.25)",
                      transform: "scale(1.1)",
                    },
                    transition: "0.25s",
                  }}
                >
                  <EditCalendarIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* CANCELAR */}


            </Box>
          )}
        </TableCell>


        <TableCell align="center">
          {!row.cancelada && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setOpenDialog(true)}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.75rem",
                borderRadius: 2,
                boxShadow: "0 0 8px rgba(255,0,0,0.3)",
                transition: "0.25s",
                "&:hover": {
                  boxShadow: "0 0 12px rgba(255,0,0,0.55)",
                  transform: "scale(1.05)",
                },
              }}
            >
              Cancelar
            </Button>
          )}
        </TableCell>
      </TableRow>

      {/* DETALLES EXPANDIBLES (sin cambios) */}
      <TableRow>
        <TableCell colSpan={6} sx={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                m: 2,
                p: 3,
                backgroundColor: "background.default",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}

            >
              <Typography variant="subtitle1" fontWeight={600}>
                Detalles de la cita
              </Typography>


              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                  },
                  gap: 3,
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontWeight: "bold", mb: 1, color: "#e5e8f0" }}
                  >
                    Observaciones:
                  </Typography>
                  <Typography sx={{ color: "#bfc3d9" }}>
                    {row.observaciones || "N/A"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{ fontWeight: "bold", mb: 1, color: "#e5e8f0" }}
                  >
                    Paciente:
                  </Typography>
                  <Typography sx={{ color: "#bfc3d9" }}>
                    {row.paciente?.nombre_paciente}{" "}
                    {row.paciente?.apellido_paciente}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{ fontWeight: "bold", mb: 1, color: "#e5e8f0" }}
                  >
                    Médico Asignado:
                  </Typography>
                  <Typography sx={{ color: "#bfc3d9" }}>
                    <strong>DNI:</strong> {row.doctor?.dni} <br />
                    <strong>Nombre:</strong> {row.doctor?.nombre_completo}{" "}
                    <br />
                    <strong>Especialidad:</strong> {row.doctor?.especialidad}{" "}
                    <br />
                    <strong>Email:</strong> {row.doctor?.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* SNACKBAR (sin cambios) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity as any}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* DIÁLOGO CANCELAR (sin cambios) */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <Typography>¿Deseas cancelar esta cita?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button onClick={handleCancelar} color="error" variant="contained">
            Sí, Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* DIÁLOGO MODIFICAR FECHA (Conexión de la mutación) */}
      <Dialog
        open={openEditDate}
        onClose={() => setOpenEditDate(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            background: "linear-gradient(160deg,#202033,#181825)",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: "#a2c9ff", fontWeight: "bold" }}>
          Modificar Fecha de la Cita
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Nueva fecha y hora"
              value={newFecha}
              onChange={(value) => setNewFecha(value)}
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  backgroundColor: "#fff",
                  borderRadius: 2,
                },
              }}
            />
          </LocalizationProvider>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenEditDate(false)}
            sx={{ color: "#cfd3e0" }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleReprogramar} // 👈 CONEXIÓN A LA FUNCIÓN DE MUTACIÓN
            disabled={reprogramming || !newFecha || dayjs(Number(row.fechaProgramada)).isSame(newFecha)} // 💡 Deshabilita si carga o si la fecha no ha cambiado
            sx={{
              background: "linear-gradient(90deg,#7cb7ff,#4aa3ff)",
              fontWeight: 600,
              "&:hover": {
                boxShadow: "0 0 12px rgba(124,183,255,0.6)",
              },
            }}
          >
            {reprogramming ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

// ===============================================================
//                 TABLA PRINCIPAL (sin cambios)
// ===============================================================

interface CollapsibleTableProps {
  fecha: string;

}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ fecha, }) => {
// ... (código de CollapsibleTable sin cambios)
  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Evitar ejecutar la consulta antes de tener sesión
  const shouldFetch = status === "authenticated";

  const filtros = React.useMemo(
    () => ({
      motivoConsulta: searchTerm,
      fechaProgramada: fecha,
      registradoPorId: session?.user?.id ?? "",
    }),
    [searchTerm, fecha, session?.user?.id]
  );

  const { data, loading, error, refetch } = useGetCitasByFechaQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: filtros,
    },
    skip: !shouldFetch,
    fetchPolicy: "network-only",
  });

  const citas = data?.getCitasByFecha.edges ?? [];
  const totalCount = data?.getCitasByFecha.aggregate.count ?? 0;

  const handleRefetch = () =>
    refetch({ limit: rowsPerPage, skip: page * rowsPerPage, where: filtros });

  if (!shouldFetch) return <TableSkeleton rows={3} columns={5} />;
  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ width: "100%" }}>
      {/* FILTROS */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          gap: 2,
          p: 2,

        }}
      >
        <TextField
          label="Buscar por Motivo"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          size="small"
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fff",
              transition: "0.25s",
              "&:hover": { boxShadow: "0 0 6px rgba(0,0,0,0.25)" },
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton sx={{ color: "#1976d2" }}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />

        <Tooltip title="Refrescar">
          <IconButton
            onClick={handleRefetch}
            sx={{
              color: "#7cb7ff",
              "&:hover": { color: "#b8d9ff", transform: "rotate(30deg)" },
              transition: "0.3s",
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        <Typography sx={{ ml: 2, color: "#e0e0e0" }}>
          Total de Citas:
        </Typography>

        <Badge badgeContent={totalCount} color="primary">
          <ListIcon sx={{ color: "#90caf9" }} />
        </Badge>
      </Box>

      {/* TABLA */}
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: 3,
          background:
            "linear-gradient(180deg, rgba(33, 231, 182, 0.33) 0%, #d1d1e6ff 100%)",
          border: "1px solid rgba(232, 241, 241, 0.15)",
          boxShadow: "0 0 25px rgba(0,0,0,0.45)",
        }}
      >

        <Table stickyHeader>
          <TableHead
            sx={{
              "& th": {
                background:
                  "linear-gradient(180deg, #190849ff, #10106bff)",
                color: "#e0e0e4ff",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(27, 49, 75, 0.25)",
              },
            }}
          >

            <TableRow
              sx={{
                backgroundColor: "rgba(255,255,255,0.02)",
                transition: "0.25s",
                "&:hover": {
                  backgroundColor: "rgba(150, 120, 219, 0.06)",
                },
                "& td": {
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                },
              }}
            >

              <TableCell />
              <TableCell>Motivo</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
              <TableCell align="center">Cancelar</TableCell>
            </TableRow>
          </TableHead>


          <TableBody>
            {citas.map((item) => (
              <CitaRow key={item.node.id_cita} row={item.node as Cita} />
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
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      />
    </Box>
  );
};

export default CollapsibleTable;