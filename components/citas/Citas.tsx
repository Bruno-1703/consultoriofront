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

const CitaRow = ({ row }: { row: Cita }) => {
  const [open, setOpen] = React.useState(false);
  const [cancelarCita] = useCancelarCitaMutation();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCancelar = async () => {
    if (!row.id_cita) {
      setSnackbarMessage("El ID de la cita no está disponible.");
      setOpenSnackbar(true);
      return;
    }

    try {
      await cancelarCita({
        variables: { id: row.id_cita },
      });
      setSnackbarMessage("Cita cancelada correctamente.");
    } catch (err) {
      console.error("Error cancelando cita", err);
      setSnackbarMessage("No se pudo cancelar la cita.");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleConfirmarCancelar = () => {
    setOpenDialog(false);
    handleCancelar();
  };

  return (
    <>
      <TableRow
        sx={{
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          },
        }}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={4} sx={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 8px",
              gap: 2,
            }}
          >
            <Typography sx={{ flex: "2 1 150px", fontWeight: "600" }}>
              {row.motivoConsulta}
            </Typography>
            <Typography
              sx={{ flex: "1 1 100px", textAlign: "center", color: "#555" }}
            >
              {dayjs(row.fechaSolicitud).format("DD/MM/YYYY HH:mm")}
            </Typography>
            <Box sx={{ flex: "1 1 110px", textAlign: "center" }}>
              <Chip
                label={row.cancelada ? "Cancelada" : "Pendiente"}
                color={row.cancelada ? "error" : "warning"}
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 120px", textAlign: "center" }}>
              {!row.cancelada && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => setOpenDialog(true)}
                  sx={{
                    fontWeight: "600",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    borderRadius: 2,
                    px: 2,
                  }}
                >
                  Cancelar
                </Button>
              )}
            </Box>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                padding: 2,
                backgroundColor: "#f0f4ff",
                borderRadius: 2,
                boxShadow: 2,
                borderLeft: "5px solid #3949ab",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#303f9f", mb: 2 }}
              >
                Detalles de la Cita
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ minWidth: 150 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Observaciones:
                  </Typography>
                  <Typography>{row.observaciones || "N/A"}</Typography>
                </Box>
                <Box sx={{ minWidth: 150 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Paciente:</Typography>
                  <Typography>
                    {row.paciente?.nombre_paciente || "N/A"}{" "}
                    {row.paciente?.apellido_paciente || ""}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas cancelar esta cita?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} variant="contained">
            No
          </Button>
          <Button
            onClick={handleConfirmarCancelar}
            color="error"
            variant="contained"
          >
            Sí, Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

interface CollapsibleTableProps {
  fecha: dayjs.Dayjs;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ fecha }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, loading, error, refetch } = useGetCitasByFechaQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {},
    },
  });

  const citas = data?.getCitasByFecha.edges || [];
  const totalCount = data?.getCitasByFecha.aggregate.count || 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
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

  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mb: 2,
          gap: 1,
        }}
      >
        <TextField
          label="Buscar por Motivo"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
            sx: { borderRadius: 3, backgroundColor: "#fff" },
          }}
        />
        <Tooltip title="Refrescar">
          <IconButton onClick={() => refetch()} sx={{ marginLeft: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="body1" sx={{ marginLeft: 2 }}>
          Total de Citas:
        </Typography>
        <Badge badgeContent={totalCount} color="primary" sx={{ marginLeft: 1 }}>
          <ListIcon color="action" />
        </Badge>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Motivo Consulta</TableCell>
              <TableCell align="center">Fecha Solicitud</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>



          <TableBody>
            {citas.map((items) => (
              <CitaRow key={items.node.id_cita} row={items.node as Cita} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default CollapsibleTable;
