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
} from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSession } from "next-auth/react";

// =====================================================
//                 FILA DE CITA
// =====================================================

const CitaRow = ({ row }: { row: Cita }) => {
  const [open, setOpen] = React.useState(false);
  const [cancelarCita] = useCancelarCitaMutation();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDialog, setOpenDialog] = React.useState(false);

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
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "linear-gradient(90deg, #1c1c2e 0%, #171722 100%)",
          transition: "all 0.25s ease",
          "&:hover": {
            background: "linear-gradient(90deg, #24243a 0%, #1d1d2c 100%)",
            transform: "scale(1.002)",
          },
        }}
      >
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              color: "#7cb7ff",
              transition: "0.2s",
              "&:hover": { color: "#a8d3ff", transform: "rotate(10deg)" },
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ color: "#e0e0e0", fontWeight: 600 }}>
          {row.motivoConsulta}
        </TableCell>

        <TableCell align="center" sx={{ color: "#b0b3c6" }}>
          {dayjs(Number(row.fechaProgramada)).format("DD MMM YYYY")}
        </TableCell>

        <TableCell align="center">
          <Chip
            label={row.cancelada ? "Cancelada" : "Pendiente"}
            color={row.cancelada ? "error" : "warning"}
            variant="filled"
            sx={{
              fontWeight: "bold",
              fontSize: "0.7rem",
              borderRadius: "6px",
              padding: "2px 4px",
              backgroundColor: row.cancelada
                ? "rgba(255, 82, 82, 0.2)"
                : "rgba(255, 193, 7, 0.2)",
              color: row.cancelada ? "#ff5252" : "#ffc107",
            }}
          />
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

      {/* DETALLES EXPANDIBLES */}
      <TableRow>
        <TableCell colSpan={5} sx={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                padding: 3,
                background: "linear-gradient(160deg, #202033, #181825)",
                borderRadius: 3,
                boxShadow: "0 0 18px rgba(0,0,0,0.5)",
                borderLeft: "5px solid #77aaff",
                animation: "fadeIn 0.3s ease",
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateY(-4px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#a2c9ff",
                  mb: 3,
                  letterSpacing: "0.5px",
                }}
              >
                Detalles de la Cita
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

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity as any}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* DIÁLOGO */}
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
    </>
  );
};

// ===============================================================
//                 TABLA PRINCIPAL (OPTIMIZADA)
// ===============================================================

interface CollapsibleTableProps {
  fecha: string;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ fecha }) => {
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
          background: "linear-gradient(90deg,#1d1d2c,#171722)",
          p: 2,
          borderRadius: 3,
          boxShadow: "0 0 12px rgba(0,0,0,0.4)",
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
        sx={{
          backgroundColor: "#161622",
          borderRadius: 4,
          boxShadow: "0 0 25px rgba(0,0,0,0.6)",
        }}
      >
        <Table stickyHeader>
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "#202033",
                color: "#98c3ff",
                fontWeight: "bold",
                fontSize: "0.85rem",
                letterSpacing: "0.5px",
              },
            }}
          >
            <TableRow>
              <TableCell />
              <TableCell>Motivo Consulta</TableCell>
              <TableCell align="center">Fecha Solicitud</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
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
          mt: 2,
          backgroundColor: "#1c1c2b",
          color: "#cfd3e0",
          borderRadius: 2,
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "#cfd3e0",
          },
          "& .MuiInputBase-root": {
            color: "#fff",
          },
        }}
      />
    </Box>
  );
};

export default CollapsibleTable;
