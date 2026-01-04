import * as React from "react";
import {
  Paper, Typography, Button, Dialog, DialogTitle,
  DialogContent, Box, CircularProgress, Chip, Avatar, Stack, Divider
} from "@mui/material";
import {
  LocationOn, Phone, AccessTime, AddCircleOutline, 
  MapOutlined, CalendarMonth, ChevronRight
} from "@mui/icons-material";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Citas from "../components/citas/Citas";
import { FormularioCitaV2 } from "../components/citas/FormularioCita";
import { useGetCentrosQuery } from "../graphql/types";

dayjs.locale("es");

const IndexPage: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs>(dayjs());
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { data, loading } = useGetCentrosQuery({
    variables: { skip: 0, limit: 10, where: {} },
  });

  const centro = data?.getCentros.edges?.[0]?.node;

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#fff' }}>
      <CircularProgress thickness={2} size={40} color="primary" />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#fff" }}>
      
      {/* BARRA SUPERIOR (HEADER) DE BORDE A BORDE */}
      <Box sx={{ 
        borderBottom: "1px solid #E5E7EB", 
        px: { xs: 2, md: 4 }, 
        py: 2, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        position: "sticky",
        top: 0,
        bgcolor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 10
      }}>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40, borderRadius: "10px" }}>
            <CalendarMonth />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>
              {centro?.nombre || "Panel Médico"}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
              {centro?.tipo} • Sauce De Luna
            </Typography>
          </Box>
          
        </Stack>
            <Button
          variant="contained"
          disableElevation
          startIcon={<AddCircleOutline />}
          onClick={() => setDialogOpen(true)}
          sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, px: 3 }}
        >
          Nueva Cita
        </Button>

    
      </Box>

      {/* CUERPO PRINCIPAL - OCUPA TODO EL ANCHO RESTANTE */}
      <Box sx={{ display: "flex", flex: 1, flexDirection: { xs: "column", md: "row" } }}>
        
        {/* PANEL IZQUIERDO: CALENDARIO E INFO (ESTÁTICO EN MD) */}
        <Box sx={{ 
          width: { xs: "100%", md: "380px" }, 
          borderRight: { md: "1px solid #E5E7EB" },
          p: 3,
          bgcolor: "#F9FAFB"
        }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: "#374151" }}>
            Calendario de Turnos
          </Typography>
          
          <Paper elevation={0} sx={{ borderRadius: "16px", border: "1px solid #E5E7EB", p: 1, mb: 4, bgcolor: "#fff" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar 
                value={value} 
                onChange={(v) => v && setValue(v)} 
                sx={{
                  width: '100%',
                  '& .MuiPickersDay-root.Mui-selected': { bgcolor: 'primary.main' },
                }}
              />
            </LocalizationProvider>
          </Paper>

          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: "#374151" }}>
            Detalles del Centro
          </Typography>
          
          <Stack spacing={2}>
            <InfoItem icon={<LocationOn fontSize="small" />} label="Dirección" value={centro?.direccion} color="#3B82F6" />
            <InfoItem icon={<AccessTime fontSize="small" />} label="Horarios" value="08:00 - 21:00 (Lunes a Sábado)" color="#F59E0B" />
            <InfoItem icon={<Phone fontSize="small" />} label="Contacto" value="+54 343 123-4567" color="#10B981" />
          </Stack>
        </Box>

        {/* PANEL DERECHO: LISTA DE CITAS (SCROLL INDEPENDIENTE) */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
                Agenda del Día
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Viendo citas para el <strong>{value.format("D [de] MMMM, YYYY")}</strong>
              </Typography>
            </Box>
            <Chip 
              label={`${dayjs().format("YYYY")}`} 
              variant="outlined" 
              sx={{ fontWeight: 600, borderRadius: "6px" }} 
            />
          </Box>

          <Paper elevation={0} sx={{ 
            borderRadius: "16px", 
            border: "1px solid #E5E7EB", 
            minHeight: "60vh",
            bgcolor: "#fff",
            overflow: "hidden"
          }}>
            {/* Aquí se renderiza tu componente de Citas */}
            <Citas fecha={value.format("YYYY-MM-DD")} />
          </Paper>
        </Box>
      </Box>

      {/* DIALOG MODERNO */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' } }}
      >
        <Box sx={{ p: 1 }}>
          <DialogTitle sx={{ fontWeight: 800 }}>Registrar Nueva Cita</DialogTitle>
          <DialogContent>
            <FormularioCitaV2 onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};

// Componente auxiliar para la información del centro
const InfoItem = ({ icon, label, value, color }: { icon: any, label: string, value: any, color: string }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 32, height: 32, borderRadius: "8px" }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="caption" sx={{ color: "text.secondary", display: 'block', lineHeight: 1 }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: "#1F2937" }}>{value}</Typography>
    </Box>
  </Stack>
);

export default IndexPage;

