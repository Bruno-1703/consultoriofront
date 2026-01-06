import * as React from "react";
import {
  Paper, Typography, Button, Dialog, DialogTitle,
  DialogContent, Box, Chip, Avatar, Stack, Divider
} from "@mui/material";
import {
  Phone, AccessTime, AddCircleOutline, 
  CalendarMonth, Dashboard, EventNote
} from "@mui/icons-material";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es"; // Importante para el idioma
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Citas from "../components/citas/Citas";
import { FormularioCitaV2 } from "../components/citas/FormularioCita";

// Forzamos el locale a español
dayjs.locale("es");

const THEME = {
  header: "#1e293b",
  accent: "#6366f1",
  bg: "#f8fafc",
  sidebar: "#ffffff",
  cardBorder: "#e2e8f0",
  calendarHeader: "#f1f5f9"
};

const IndexPage: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs>(dayjs());
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: THEME.bg }}>
      
      {/* HEADER */}
      <Box sx={{ 
        bgcolor: THEME.header, px: { xs: 2, md: 4 }, py: 1.5, 
        display: "flex", justifyContent: "space-between", alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: THEME.accent, width: 40, height: 40, borderRadius: "10px" }}>
            <EventNote sx={{ fontSize: 24 }} />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
            Med<Box component="span" sx={{ color: THEME.accent }}>Calendar</Box>
          </Typography>
        </Stack>

        <Button
          variant="contained"
          disableElevation
          startIcon={<AddCircleOutline />}
          onClick={() => setDialogOpen(true)}
          sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, bgcolor: THEME.accent }}
        >
          Agendar Turno
        </Button>
      </Box>

      <Box sx={{ display: "flex", flex: 1, flexDirection: { xs: "column-reverse", md: "row" } }}>
        
        {/* AGENDA (IZQUIERDA) */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: "-1px" }}>
              Próximos Turnos
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 500 }}>
              Agenda para el <Box component="span" sx={{ color: THEME.accent, fontWeight: 700 }}>
                {value.format("dddd D [de] MMMM")}
              </Box>
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ 
            borderRadius: "20px", border: `1px solid ${THEME.cardBorder}`,
            minHeight: "65vh", bgcolor: "#fff", overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
          }}>
            <Citas fecha={value.format("YYYY-MM-DD")} />
          </Paper>
        </Box>

        {/* PANEL DEL CALENDARIO (DERECHA) - LA ESTRELLA */}
        <Box sx={{ 
          width: { xs: "100%", md: "420px" }, 
          bgcolor: THEME.sidebar, borderLeft: `1px solid ${THEME.cardBorder}`,
          p: 3, display: 'flex', flexDirection: 'column', gap: 3
        }}>
          
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800, color: "#1e293b", textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}>
              Navegación Temporal
            </Typography>

            {/* CONTENEDOR ESPECIAL PARA EL CALENDARIO */}
            <Paper elevation={0} sx={{ 
              borderRadius: "24px", 
              border: `2px solid ${THEME.accent}20`, // Borde sutil del color acento
              bgcolor: "#fff",
              p: 1,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DateCalendar 
                  value={value} 
                  onChange={(v) => v && setValue(v)} 
                  sx={{
                    width: '100%',
                    '& .MuiPickersCalendarHeader-root': {
                      paddingLeft: '16px',
                      paddingRight: '8px',
                      mb: 1
                    },
                    '& .MuiPickersCalendarHeader-label': {
                      fontWeight: 800,
                      color: "#1e293b",
                      textTransform: 'capitalize'
                    },
                    '& .MuiDayCalendar-header': {
                      bgcolor: THEME.calendarHeader,
                      borderRadius: "12px",
                      margin: "0 10px",
                      padding: "5px 0"
                    },
                    '& .MuiDayCalendar-weekDayLabel': {
                      fontWeight: 700,
                      color: THEME.accent,
                    },
                    '& .MuiPickersDay-root': {
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      borderRadius: "12px",
                      '&.Mui-selected': {
                        bgcolor: THEME.accent,
                        boxShadow: `0 4px 10px ${THEME.accent}60`,
                        '&:hover': { bgcolor: THEME.accent }
                      },
                      '&:hover': { bgcolor: `${THEME.accent}15` },
                      '&.MuiPickersDay-today': {
                        borderColor: THEME.accent,
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Paper>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* INFO EXTRA */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800, color: "#1e293b" }}>
              Centro de Atención
            </Typography>
            <Stack spacing={2}>
              <InfoItem icon={<AccessTime />} label="Horario comercial" value="Lun a Vie - 08:00 a 20:00" color={THEME.accent} />
              <InfoItem icon={<Phone />} label="Guardia 24hs" value="+54 9 343 456-7890" color="#ef4444" />
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* DIALOG */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        fullWidth maxWidth="sm"
        PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 900, color: "#0f172a" }}>Registrar Paciente</DialogTitle>
        <DialogContent>
          <FormularioCitaV2 onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const InfoItem = ({ icon, label, value, color }: { icon: any, label: string, value: string, color?: string }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Avatar sx={{ bgcolor: `${color || '#64748b'}15`, color: color || '#64748b', width: 36, height: 36, borderRadius: "10px" }}>
      {React.cloneElement(icon, { sx: { fontSize: 18 } })}
    </Avatar>
    <Box>
      <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, display: 'block', lineHeight: 1.2 }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b" }}>{value}</Typography>
    </Box>
  </Stack>
);

export default IndexPage;