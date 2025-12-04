import React from "react";
import { Box, Typography, Paper, IconButton, Stack, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface ManualUsuarioProps {
  pdfUrl: string; // URL o ruta del manual en PDF
  onBack?: () => void; // Acción al presionar volver
}

const ManualUsuario: React.FC<ManualUsuarioProps> = ({ pdfUrl, onBack }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Encabezado */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          p: 2,
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        {onBack && (
          <IconButton onClick={onBack} sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <PictureAsPdfIcon fontSize="large" />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Manual de Usuario
        </Typography>
      </Stack>

      <Divider />

      {/* Visor PDF */}
<Box
  sx={{ flex: 1, p: 2, position: 'relative' }}
  onContextMenu={e => e.preventDefault()} // bloquea clic derecho
>
  <iframe
    src={pdfUrl}
    width="100%"
    height="100%"
    style={{
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#fff",
      userSelect: "none", // bloquea selección en algunos navegadores
      pointerEvents: "auto",
    }}
    title="Manual de Usuario"
  />
  {/* Overlay para bloquear eventos extra (opcional) */}
  <Box
    sx={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      // backgroundColor: 'transparent',
      pointerEvents: 'none', // deja pasar eventos al iframe, cambia a 'auto' para bloquear todos eventos
      userSelect: 'none',
    }}
  />
</Box>

    </Paper>
  );
};

export default ManualUsuario;
