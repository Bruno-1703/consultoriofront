import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Alert, Typography, Box, Button, TextField, TablePagination,
  IconButton, Stack, Badge, Tooltip, Snackbar, Dialog, DialogContent,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import TableSkeleton from "../../utils/TableSkeleton";
import { useGetUsuariosQuery } from "../../graphql/types";
import UsuarioDetalleModal from "./UsuarioDetalleModal";
import ConfirmarEliminacion from "./ConfirmarEliminacion";
import UsuarioEditarFormulario from "./UsuarioEditarFormulario";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"; // icono PDF
import FileDownloadIcon from "@mui/icons-material/FileDownload"; // icono descarga
const Administracion: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [editingUsuarioId, setEditingUsuarioId] = useState<string | null>(null);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<any>(null);
  const [usuarioToDeleteId, setUsuarioToDeleteId] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetUsuariosQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: searchTerm ? { nombre_completo: searchTerm } : {},
    },
  });
  const descargarReporteUsuarios = () => {
    const fecha = new Date();
    const fechaStr = fecha
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "")
      .split(".")[0];

    const escapeCSV = (str: any) =>
      `"${String(str ?? "").replace(/"/g, '""')}"`;

    const encabezado =
      ["DNI", "Nombre completo", "Email", "Teléfono", "Rol", "Especialidad"].map(escapeCSV).join(",") +
      "\n";

    const filas = usuarios
      .map((u: any) =>
        [
          u.dni,
          u.nombre_completo,
          u.email,
          u.telefono,
          u.rol_usuario,
          u.especialidad,
        ]
          .map(escapeCSV)
          .join(",")
      )
      .join("\n");

    const contenido = encabezado + filas;

    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte_usuarios_${fechaStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const descargarReporteCitas = async () => {
    try {
      const response = await fetch('http://localhost:3000/reportes/citas', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('No se pudo descargar el archivo');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte-citas.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  const handleBackup = async () => {
    try {
      const res = await fetch('/api/backup/json');
      if (!res.ok) throw new Error('Error al generar backup');

      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${new Date().toISOString()}.json`;
      a.click();

      setBackupSnackbar("Backup descargado correctamente.");
    } catch (err) {
      console.error(err);
      setErrorSnackbar("Error al generar el backup.");
    }
  };


  // Manejo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // Paginación
  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Abrir/Cerrar modales
  const handleOpenDetailModal = (usuario: any) => {
    setSelectedUsuario(usuario);
    setShowDetailModal(true);
  };
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUsuario(null);
  };

  // Snackbar
  const handleSnackbarClose = () => {
    setErrorSnackbar(null);
    setSuccessSnackbar(null);
  };

  // Confirmar eliminación (faltaba la función)
  const handleConfirmDelete = () => {
    // Aquí va tu lógica de eliminación usando usuarioToDeleteId
    // Por ejemplo, llamar a un mutation y luego refetch/refrescar la lista
    setUsuarioToDeleteId(null);
    setSuccessSnackbar("Usuario eliminado correctamente.");
    refetch();
  };

  if (loading) return <TableSkeleton rows={3} columns={7} />;
  if (error) {
    setErrorSnackbar(error.message);
    return null;
  }

  const usuarios = data?.getUsuarios?.edges?.map(edge => edge.node) || [];
  const totalCount = data?.getUsuarios?.aggregate?.count || 0;

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Gestión de Usuarios
        </Typography>
      </Stack>
 <Box
  sx={{
    mb: 3,
    p: 2,
    backgroundColor: "#e3f2fd",
    borderRadius: 2,
    border: "1px solid #90caf9",
    boxShadow: 1,
  }}
>
  <Typography
    variant="h6"
    sx={{ fontWeight: "bold", mb: 2, color: "#1976d2", textTransform: "uppercase" }}
  >
    Backup del Sistema
  </Typography>

  <Stack direction="row" spacing={2}>
    <Button
      variant="outlined"
      startIcon={<PictureAsPdfIcon />}
      onClick={descargarReporteCitas}
      sx={{
        borderColor: "#1976d2",
        color: "#1976d2",
        "&:hover": {
          backgroundColor: "#1976d2",
          color: "#fff",
        },
      }}
    >
      Reporte Citas (PDF)
    </Button>

    <Button
      variant="outlined"
      startIcon={<FileDownloadIcon />}
      onClick={descargarReporteUsuarios}
      sx={{
        borderColor: "#1976d2",
        color: "#1976d2",
        "&:hover": {
          backgroundColor: "#1976d2",
          color: "#fff",
        },
      }}
    >
      Usuarios (CSV)
    </Button>

    <Button
      variant="outlined"
      startIcon={<FileDownloadIcon />}
      onClick={handleBackup}
      sx={{
        borderColor: "#1976d2",
        color: "#1976d2",
        "&:hover": {
          backgroundColor: "#1976d2",
          color: "#fff",
        },
      }}
    >
      Backup JSON
    </Button>
  </Stack>
</Box>

      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateFormModal(true)}
          sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#115293" }, fontWeight: "bold", px: 2 }}
        >
          Registrar Nuevo Usuario
        </Button>

        <TextField
          label="Buscar por nombre o email"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />

        {/* <Tooltip title="Refrescar">
          <IconButton onClick={() => refetch()} color="secondary" sx={{ borderRadius: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip> */}

        <Tooltip title="Total de Usuarios">
          <Badge badgeContent={totalCount} color="primary">
            <VisibilityIcon sx={{ color: "#1976d2" }} />
          </Badge>
        </Tooltip>
      </Stack>

      {/* Modal Crear Usuario */}
      <Dialog open={showCreateFormModal} onClose={() => setShowCreateFormModal(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          {/* Aquí puedes agregar tu formulario para crear usuario */}
        </DialogContent>
      </Dialog>

      {/* Modal Editar Usuario */}
      <Dialog open={Boolean(editingUsuarioId)} onClose={() => setEditingUsuarioId(null)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <UsuarioEditarFormulario
            isEditing={true}
            usuarioId={editingUsuarioId ?? undefined}
            onClose={() => setEditingUsuarioId(null)}
            onSuccess={() => {
              setEditingUsuarioId(null);
              setSuccessSnackbar("Usuario editado correctamente.");
              refetch();
            }}
            onError={(msg: string) => setErrorSnackbar(msg)}
          />
        </DialogContent>
      </Dialog>

      {/* Tabla de usuarios */}
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 1110 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {["DNI", "Nombre completo", "Email", "Teléfono", "Rol", "Especialidad", "Acciones"].map(header => (
                <TableCell key={header} sx={{ color: "white", fontWeight: "bold", px: 2 }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((usuario, index) => (
                <TableRow
                  key={usuario.id_Usuario}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#f5f5f5",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                    height: "48px",
                  }}
                >
                  <TableCell>{usuario.dni}</TableCell>
                  <TableCell>{usuario.nombre_completo}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefono}</TableCell>
                  <TableCell>{usuario.rol_usuario}</TableCell>
                  <TableCell>{usuario.especialidad}</TableCell>

                  <TableCell align="center">
                    <Tooltip title="Visualizar">
                      <IconButton onClick={() => handleOpenDetailModal(usuario)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar">
                      <IconButton color="info" onClick={() => setEditingUsuarioId(usuario.id_Usuario ?? null)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar">
                      <IconButton color="error" onClick={() => setUsuarioToDeleteId(usuario.id_Usuario ?? null)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>


                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Snackbars */}
      <Snackbar open={Boolean(errorSnackbar)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {errorSnackbar}
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(successSnackbar)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {successSnackbar}
        </Alert>
      </Snackbar>

      {/* Modal detalles de usuario */}
      <UsuarioDetalleModal open={showDetailModal} onClose={handleCloseDetailModal} usuario={selectedUsuario} />

      {/* Confirmar eliminación */}
      {usuarioToDeleteId && (
        <ConfirmarEliminacion
          open={Boolean(usuarioToDeleteId)}
          onClose={() => setUsuarioToDeleteId(null)}
          onConfirmar={handleConfirmDelete}
          mensaje="¿Deseas eliminar este usuario?"
          disable={false}
        />
      )}
    </Box>
  );
};

export default Administracion;
function setBackupSnackbar(arg0: string) {
  throw new Error("Function not implemented.");
}

