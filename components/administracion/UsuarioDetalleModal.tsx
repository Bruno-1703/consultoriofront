import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface UsuarioDetalleModalProps {
  open: boolean;
  onClose: () => void;
  usuario: {
    dni: string;
    nombre_completo: string;
    email: string;
    telefono: string;
    rol_usuario: string;
    especialidad?: string;
  } | null;
}

const UsuarioDetalleModal: React.FC<UsuarioDetalleModalProps> = ({ open, onClose, usuario }) => {
  if (!usuario) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Detalle de Usuario
        <IconButton
          aria-label="cerrar"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1"><strong>DNI:</strong> {usuario.dni}</Typography>
        <Typography variant="body1"><strong>Nombre completo:</strong> {usuario.nombre_completo}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {usuario.email}</Typography>
        <Typography variant="body1"><strong>Teléfono:</strong> {usuario.telefono}</Typography>
        <Typography variant="body1"><strong>Rol:</strong> {usuario.rol_usuario}</Typography>
        <Typography variant="body1"><strong>Especialidad:</strong> {usuario.especialidad || "-"}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default UsuarioDetalleModal;
