import * as React from "react";
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  CircularProgress, Avatar, Stack, MenuItem, Select, FormControl, 
  Divider, GlobalStyles
} from "@mui/material";
import { LocationOn, LocalHospital, AddCircleOutline, CalendarMonth } from "@mui/icons-material";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Citas from "../components/citas/Citas";
import { FormularioCitaV2 } from "../components/citas/FormularioCita";
import { useGetCentrosQuery } from "../graphql/types";

dayjs.locale("es");

const IndexPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [selectedCentroId, setSelectedCentroId] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { data, loading, error } = useGetCentrosQuery({
    variables: { skip: 0, limit: 10, where: {} },
  });

  const centros = data?.getCentros?.edges || [];

  React.useEffect(() => {
    if (centros.length > 0 && !selectedCentroId) {
      setSelectedCentroId(centros[0].node.id);
    }
  }, [centros]);

  const centroActivo = centros.find(c => c.node.id === selectedCentroId)?.node;

  if (loading && !data) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress thickness={2} />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", bgcolor: "#fff" }}>
      {/* Reset de márgenes globales para ocupar toda la pantalla */}
      <GlobalStyles styles={{ body: { margin: 0, padding: 0, overflow: 'hidden' } }} />
      
      {/* PANEL IZQUIERDO: CONFIGURACIÓN (ANCHO FIJO) */}
      <Box sx={{ 
        width: 380, 
        borderRight: "1px solid #E5E7EB", 
        display: "flex", 
        flexDirection: "column",
        bgcolor: "#F9FAFB" 
      }}>
        <Box sx={{ p: 3, bgcolor: "#fff", borderBottom: "1px solid #E5E7EB" }}>
          <Typography variant="h6" fontWeight={900} sx={{ color: "#111827", mb: 2 }}>
            Gestión de Turnos
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={selectedCentroId}
              onChange={(e) => setSelectedCentroId(e.target.value)}
              sx={{ borderRadius: "8px", bgcolor: "#fff", fontWeight: 600 }}
            >
              {centros.map((c) => (
                <MenuItem key={c.node.id} value={c.node.id}>{c.node.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1, px: 1 }}>
            <CalendarMonth fontSize="small" color="primary" />
            <Typography variant="overline" fontWeight={700} color="text.secondary">Calendario</Typography>
          </Stack>
          
          <Box sx={{ bgcolor: "#fff", borderRadius: "12px", border: "1px solid #E5E7EB", p: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar 
                value={selectedDate} 
                onChange={(v) => v && setSelectedDate(v)} 
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: "#EEF2FF", borderRadius: "12px", border: "1px solid #E0E7FF" }}>
            <Typography variant="subtitle2" fontWeight={800} color="#3730A3" gutterBottom>Información de Sede</Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <LocationOn sx={{ color: '#4338CA', fontSize: 20 }} />
                <Typography variant="body2" color="#4338CA">{centroActivo?.direccion}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <LocalHospital sx={{ color: '#4338CA', fontSize: 20 }} />
                <Typography variant="body2" color="#4338CA">{centroActivo?.tipo}</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* PANEL DERECHO: AGENDA (ANCHO FLUIDO) */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
        
        {/* Header Superior Superior */}
        <Box sx={{ 
          px: 4, py: 3, 
          borderBottom: "1px solid #E5E7EB",
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <Box>
            <Typography variant="h4" fontWeight={900} letterSpacing="-1.5px">
              {centroActivo?.nombre}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Turnos para el <span style={{ fontWeight: 800, color: '#000' }}>{selectedDate.format("dddd, D [de] MMMM")}</span>
            </Typography>
          </Box>
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddCircleOutline />}
            onClick={() => setDialogOpen(true)}
            sx={{ borderRadius: "10px", px: 4, py: 1.5, fontWeight: 700, textTransform: 'none' }}
          >
            Nueva Cita
          </Button>
        </Box>

        {/* AREA DE CITAS (FULL WIDTH) */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 0 }}>
          {/* Se pasa el ID del centro para que el componente Citas filtre */}
          <Citas fecha={selectedDate.format("YYYY-MM-DD")} /* AcentroId={selectedCentroId}*/ />
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>Registrar Turno</DialogTitle>
        <DialogContent dividers>
          <FormularioCitaV2 onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default IndexPage;