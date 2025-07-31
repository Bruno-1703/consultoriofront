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

        <Tooltip title="Refrescar">
          <IconButton onClick={() => refetch()} color="secondary" sx={{ borderRadius: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>

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
