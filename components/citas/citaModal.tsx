import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";

import InfoIcon from "@mui/icons-material/InfoOutlined";
import LocalHospitalIcon from "@mui/icons-material/Healing";
import EventIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/PersonOutline";
import MedicationIcon from "@mui/icons-material/MedicalServices";
import WarningIcon from "@mui/icons-material/ReportProblemOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const FlatDialog = styled(Dialog)(() => ({
  "& .MuiDialogPaper-root": {
    borderRadius: 14,
    backgroundColor: "#fafafa",
    padding: 16,
  },
}));

const HeaderBox = styled(Box)(() => ({
  background: "linear-gradient(135deg, #1976d2, #0d47a1)",
  color: "#fff",
  padding: "16px 24px",
  borderRadius: 10,
  marginBottom: 20,
}));

const FlatButton = styled(Button)(() => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "6px 20px",
  borderRadius: 8,
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#125aa0",
  },
}));

const SectionBox = styled(Box)(() => ({
  padding: "14px 16px",
  borderRadius: 10,
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
}));

interface Estudio {
  tipo_estudio: string;
  fecha_realizacion: string;
  resultado?: string;
  medico_solicitante?: string;
  urgente?: boolean;
}

const CitaModal: React.FC<{
  open: boolean;
  onClose: () => void;
  cita: any | null;
}> = ({ open, onClose, cita }) => {
  if (!cita) return null;

  const {
    motivoConsulta,
    observaciones,
    diagnostico,
    cancelada,
    fechaProgramada,
    enfermedades,
    medicamentos,
    paciente,
    estudios,
  } = cita;

  const fechaValida =
    fechaProgramada && !isNaN(Number(fechaProgramada))
      ? new Date(Number(fechaProgramada))
      : null;

  return (
    <FlatDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* HEADER */}
      <HeaderBox>
        <Typography variant="h6" fontWeight={700}>
          Detalles de la Cita
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Historia clínica del paciente
        </Typography>
      </HeaderBox>

      <DialogContent>
        <Grid container spacing={2}>
          {/* PACIENTE */}
          <Grid item xs={12} sm={6}>
            <SectionBox>
              <Typography fontWeight={600} mb={1}>
                <PersonIcon sx={{ fontSize: 18, mr: 1 }} />
                Paciente
              </Typography>

              <Typography fontSize={14}>
                <strong>Nombre:</strong> {paciente?.nombre_paciente || "—"}
              </Typography>
              <Typography fontSize={14}>
                <strong>DNI:</strong> {paciente?.dni || "—"}
              </Typography>
            </SectionBox>
          </Grid>

          {/* FECHA */}
          <Grid item xs={12} sm={6}>
            <SectionBox>
              <Typography fontWeight={600} mb={1}>
                <EventIcon sx={{ fontSize: 18, mr: 1 }} />
                Fecha
              </Typography>

              <Typography fontSize={14}>
                {fechaValida
                  ? fechaValida.toLocaleString("es-AR", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Fecha no disponible"}
              </Typography>
            </SectionBox>
          </Grid>

          {/* DIAGNÓSTICO (PRIORIDAD VISUAL) */}
          <Grid item xs={12}>
            <SectionBox
              sx={{
                border: "1px solid #90caf9",
                backgroundColor: "#e3f2fd",
              }}
            >
              <Typography
                fontWeight={700}
                color="#0d47a1"
                mb={0.5}
                display="flex"
                alignItems="center"
              >
                <AssignmentTurnedInIcon sx={{ fontSize: 20, mr: 1 }} />
                Diagnóstico Médico
              </Typography>

              <Typography
                fontSize={14}
                color="#0d47a1"
                fontStyle={diagnostico ? "normal" : "italic"}
              >
                {diagnostico || "Diagnóstico aún no cargado por el médico."}
              </Typography>
            </SectionBox>
          </Grid>

          {/* MOTIVO */}
          <Grid item xs={12} sm={6}>
            <SectionBox>
              <Typography fontWeight={600} mb={1}>
                <InfoIcon sx={{ fontSize: 18, mr: 1 }} />
                Motivo de consulta
              </Typography>
              <Typography fontSize={14}>{motivoConsulta}</Typography>
            </SectionBox>
          </Grid>

          {/* OBSERVACIONES */}
          <Grid item xs={12} sm={6}>
            <SectionBox>
              <Typography fontWeight={600} mb={1}>
                <LocalHospitalIcon sx={{ fontSize: 18, mr: 1 }} />
                Observaciones
              </Typography>
              <Typography fontSize={14}>
                {observaciones || "Sin observaciones."}
              </Typography>
            </SectionBox>
          </Grid>

          {/* ENFERMEDADES / MEDICAMENTOS */}
          {(enfermedades?.length > 0 || medicamentos?.length > 0) && (
            <Grid item xs={12}>
              <SectionBox>
                <Typography fontWeight={600} mb={1}>
                  <MedicationIcon sx={{ fontSize: 18, mr: 1 }} />
                  Tratamiento
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {enfermedades?.map((e: any, i: number) => (
                    <Chip key={i} label={e.nombre_enf} color="warning" />
                  ))}
                  {medicamentos?.map((m: any, i: number) => (
                    <Chip key={i} label={m.nombre_med} color="success" />
                  ))}
                </Box>
              </SectionBox>
            </Grid>
          )}

          {/* ESTUDIOS */}
          {estudios?.length > 0 && (
            <Grid item xs={12}>
              <SectionBox>
                <Typography fontWeight={600} mb={1}>
                  <LocalHospitalIcon sx={{ fontSize: 18, mr: 1 }} />
                  Estudios solicitados
                </Typography>

                <Grid container spacing={2}>
                  {estudios.map((estudio: Estudio, i: number) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box
                        sx={{
                          border: "1px dashed #bbb",
                          borderRadius: 8,
                          p: 2,
                        }}
                      >
                        <Typography fontSize={14}>
                          <strong>{estudio.tipo_estudio}</strong>
                        </Typography>
                        <Typography fontSize={13}>
                          Fecha:{" "}
                          {new Date(
                            estudio.fecha_realizacion
                          ).toLocaleDateString("es-AR")}
                        </Typography>

                        {estudio.resultado && (
                          <Typography fontSize={13}>
                            Resultado: {estudio.resultado}
                          </Typography>
                        )}

                        {estudio.urgente && (
                          <Chip
                            label="Urgente"
                            color="error"
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </SectionBox>
            </Grid>
          )}

          {/* CANCELADA */}
          {cancelada && (
            <Grid item xs={12}>
              <SectionBox sx={{ backgroundColor: "#ffebee" }}>
                <Typography color="error" fontWeight={700}>
                  <WarningIcon sx={{ fontSize: 18, mr: 1 }} />
                  Cita cancelada
                </Typography>
              </SectionBox>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <FlatButton onClick={onClose}>Cerrar</FlatButton>
      </DialogActions>
    </FlatDialog>
  );
};

export default CitaModal;
