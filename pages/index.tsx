import * as React from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box, // ✅ Solo Box es necesario para el layout
} from "@mui/material";


import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
import localeData from "dayjs/plugin/localeData.js";
import "dayjs/locale/es";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Suponiendo que estas son las rutas correctas a tus componentes locales
import Citas from "../components/citas/Citas";
import { FormularioCita } from "../components/citas/FormularioCita";

// Configurar Dayjs
dayjs.extend(weekOfYear);
dayjs.extend(localeData);
dayjs.locale("es");

const IndexPage: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs>(dayjs());
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) setValue(newValue);
  };

  const toggleDialog = (open: boolean) => () => setDialogOpen(open);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container maxWidth={false} sx={{ flex: 1, display: "flex", flexDirection: "column", py: 4, px: 2 }}>
        
        {/* Título y Banner */}
        <Box
          sx={{
            textAlign: "center",
            background: "linear-gradient(to right,rgb(67, 152, 236),rgb(76, 106, 175))",
            borderRadius: 4,
            p: 3,
            color: "white",
            mb: 4,
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            ¡BIENVENIDO AL CONSULTORIO MÉDICO!
          </Typography>
          <Typography variant="subtitle1" sx={{ fontStyle: "italic", opacity: 0.9 }}>
            Cuidamos tu salud con dedicación y compromiso 👩‍⚕️👨‍⚕️
          </Typography>
        </Box>

        {/* Layout principal (Anteriormente Grid) */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap', // Permite que los elementos se envuelvan en pantallas pequeñas
            gap: 2, // Espacio entre elementos (similar a spacing={2})
            // En pantallas medianas (md), ocupa el 50% cada uno
            // En pantallas pequeñas (xs), ocupa el 100% cada uno
          }}
        >
          
          {/* Columna de Información del Consultorio (Anteriormente Grid item xs={12} md={6}) */}
          <Box
            sx={{
              flexBasis: { xs: '100%', md: 'calc(50% - 8px)' }, // Calcula el 50% menos el gap (2*4px)
              flexGrow: 1,
            }}
          >
            <Paper sx={{ p: 3, mb: 3, height: '100%' }}>
              <Typography variant="h6">Hora actual</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {new Date().toLocaleString()}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Información del consultorio</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Dirección" secondary="Calle AV Pancho Ramirez S/N, Ciudad Sauce De Luna" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Teléfono" secondary="+123 456 7890" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Horario" secondary="Lunes a Sábado, 8:00 a 12:00 AM - 16:00 a 21:00 PM" />
                </ListItem>
              </List>
            </Paper>
          </Box>

          {/* Columna de Calendario y Botón de Cita (Anteriormente Grid item xs={12} md={6}) */}
          <Box
            sx={{
              flexBasis: { xs: '100%', md: 'calc(50% - 8px)' }, // Calcula el 50% menos el gap
              flexGrow: 1,
            }}
          >
            <Paper sx={{ p: 3, mb: 3, height: '100%' }}>
              <Typography variant="h6">Calendario de citas</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar value={value} onChange={handleDateChange} />
                </LocalizationProvider>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleDialog(true)}
                  sx={{ mt: 2, width: "100%", maxWidth: 300 }}
                >
                  Agregar Cita
                </Button>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Citas para el día: **{value.format("DD/MM/YYYY")}**
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Lista de Citas para el día seleccionado */}
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6">Lista de Citas</Typography>
          <Citas fecha={value.format("YYYY-MM-DD")} />
        </Paper>

      </Container>
      
      {/* Dialogo para agregar cita */}
      <Dialog open={dialogOpen} onClose={toggleDialog(false)}>
        <DialogTitle>Agregar Cita</DialogTitle>
        <DialogContent>
          <FormularioCita onClose={toggleDialog(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog(false)} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IndexPage;