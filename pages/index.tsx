import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
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
  Box,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Citas from "../components/citas/Citas";
import { FormularioCita } from "../components/citas/FormularioCita";
import 'dayjs/locale/es'; // Importa el idioma
dayjs.locale('es');       // 
const IndexPage: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const toggleDialog = (open: boolean) => () => {
    setDialogOpen(open);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingY: 4,
          paddingX: 2,
        }}
      >
        {/* Título */}
        <Typography variant="h4" align="center" gutterBottom>
          Bienvenidos al consultorio médico 👩‍⚕️👨‍⚕️
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          {/* Información del Consultorio */}
          <Grid xs={12} md={6} sx={{ display: "flex" }}>
            <Paper sx={{ padding: 3, marginBottom: 3, flex: 1 }}>
              <Typography variant="h6">Hora actual</Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {new Date().toLocaleString()}
              </Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6">Información del consultorio</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Dirección"
                    secondary="Calle AV Pancho Ramirez S/N, Ciudad Sauce De Luna"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Teléfono" secondary="+123 456 7890" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Horario"
                    secondary="Lunes a Sábado, 8:00 a 12:00 AM - 16:00 a 21:00 PM"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Calendario de Citas y Botón */}
          <Grid xs={12} md={6} sx={{ display: "flex" }}>
            <Paper sx={{ padding: 3, marginBottom: 3, flex: 1 }}>
              <Typography variant="h6">Calendario de citas</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </LocalizationProvider>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleDialog(true)}
                  sx={{ marginTop: 2, width: "100%", maxWidth: 300 }}
                >
                  Agregar Cita
                </Button>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Citas para el día: {value?.format("DD/MM/YYYY")}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

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

        {/* Lista de Citas */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h6">Lista de Citas</Typography>
          <Citas fecha={value || dayjs()} />
        </Paper>
      </Container>
    </Box>
  );
};

export default IndexPage;
