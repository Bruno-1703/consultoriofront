import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EnfermedadesDrawer = ({ drawerOpen, handleCloseDrawer, selectedEnfermedad }) => {
  return (
    <Dialog open={drawerOpen} onClose={handleCloseDrawer} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Detalles de la Enfermedad
          </Typography>
          <IconButton onClick={handleCloseDrawer} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent dividers>
        {selectedEnfermedad ? (
          <Stack spacing={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Nombre:
            </Typography>
            <Typography>{selectedEnfermedad.nombre_enf}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Síntomas:
            </Typography>
            <Typography>{selectedEnfermedad.sintomas}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Gravedad:
            </Typography>
            <Typography>{selectedEnfermedad.gravedad}</Typography>
          </Stack>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Seleccione una enfermedad para ver los detalles.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDrawer} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnfermedadesDrawer;
