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
} from "@mui/material";
import { styled } from "@mui/system";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import LocalHospitalIcon from "@mui/icons-material/Healing";
import EventIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/PersonOutline";
import MedicationIcon from "@mui/icons-material/MedicalServices";
import WarningIcon from "@mui/icons-material/ReportProblemOutlined";

const FlatDialog = styled(Dialog)({
  "& .MuiDialogPaper-root": {
    borderRadius: 10,
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    padding: 12,
  },
});

const FlatButton = styled(Button)({
  backgroundColor: "#424242",
  color: "#fff",
  padding: "6px 16px",
  borderRadius: 6,
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const SectionBox = styled(Box)({
  marginBottom: 16,
  padding: "12px 16px",
  borderRadius: 6,
  backgroundColor: "#f7f7f7",
  border: "1px solid #e0e0e0",
});

const LightDivider = styled(Divider)({
  margin: "12px 0",
  borderColor: "#ccc",
});

interface Estudio {
  tipo_estudio: string;
  codigo_referencia: string;
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
    cancelada,
    fechaProgramada,
    enfermedades,
    medicamentos,
    paciente,
    estudios,
  } = cita;

  return (
    <FlatDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1.3rem",
          fontWeight: 600,
          color: "#333",
        }}
      >
        Detalles de la Cita
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {/* Paciente primero */}
          <Grid item xs={12} sm={6}>
            <SectionBox>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                <PersonIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
                Paciente
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#444" }}>
                <strong>Nombre:</strong> {paciente?.nombre_paciente || "No disponible"}
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#444" }}>
                <strong>DNI:</strong> {paciente?.dni || "No disponible"}
              </Typography>
            </SectionBox>
          </Grid>

          {/* Fecha */}
          <Grid item xs={12} sm={6}>
            <SectionBox>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                <EventIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
                Fecha
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#444" }}>
                {new Date(fechaProgramada).toLocaleString("es-AR", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </SectionBox>
          </Grid>

          {/* Motivo */}
          <Grid item xs={12} sm={6}>
            <SectionBox>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                <InfoIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
                Motivo
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#444" }}>{motivoConsulta}</Typography>
            </SectionBox>
          </Grid>

          {/* Observaciones */}
          <Grid item xs={12} sm={6}>
            <SectionBox>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                <LocalHospitalIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
                Observaciones
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#444" }}>
                {observaciones || "No se ingresaron observaciones."}
              </Typography>
            </SectionBox>
          </Grid>

          {/* Enfermedades y Medicamentos */}
          {(enfermedades?.length > 0 || medicamentos?.length > 0) && (
            <Grid item xs={12}>
              <SectionBox>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  <MedicationIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
                  Detalles Médicos
                </Typography>
                {enfermedades?.length > 0 && (
                  <Typography sx={{ fontSize: 14, color: "#444", mb: 1 }}>
                    <strong>Enfermedades:</strong>{" "}
                    {enfermedades.map((e: any) => e?.nombre_enf).join(", ")}
                  </Typography>
                )}
                {medicamentos?.length > 0 && (
                  <Typography sx={{ fontSize: 14, color: "#444" }}>
                    <strong>Medicamentos:</strong>{" "}
                    {medicamentos.map((m: any) => m?.nombre_med).join(", ")}
                  </Typography>
                )}
              </SectionBox>
            </Grid>
          )}

          {/* Estudios */}
          {estudios?.length > 0 && (
            <Grid item xs={12}>
              <SectionBox>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  <LocalHospitalIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
                  Estudios
                </Typography>
                <Grid container spacing={2}>
                  {estudios.map((estudio: Estudio, index: number) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          border: "1px solid #ddd",
                          borderRadius: 6,
                          padding: 2,
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <Typography sx={{ fontSize: 14, color: "#444" }}>
                          <strong>Tipo:</strong> {estudio.tipo_estudio}
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: "#444" }}>
                          <strong>Fecha:</strong>{" "}
                          {new Date(estudio.fecha_realizacion).toLocaleDateString("es-AR")}
                        </Typography>
                        {estudio.resultado && (
                          <Typography sx={{ fontSize: 14, color: "#444" }}>
                            <strong>Resultado:</strong> {estudio.resultado}
                          </Typography>
                        )}
                        {estudio.medico_solicitante && (
                          <Typography sx={{ fontSize: 14, color: "#444" }}>
                            <strong>Médico:</strong> {estudio.medico_solicitante}
                          </Typography>
                        )}
                        <Typography sx={{ fontSize: 14, color: "#444" }}>
                          <strong>Urgente:</strong> {estudio.urgente ? "Sí" : "No"}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </SectionBox>
            </Grid>
          )}

          {/* Cita cancelada */}
          {cancelada && (
            <Grid item xs={12}>
              <SectionBox sx={{ backgroundColor: "#ffebee" }}>
                <Typography
                  sx={{
                    color: "#c62828",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <WarningIcon sx={{ fontSize: 18, mr: 1 }} />
                  Cita cancelada
                </Typography>
              </SectionBox>
            </Grid>
          )}
        </Grid>

        {/* Botón cerrar */}
        <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
          <FlatButton onClick={onClose}>Cerrar</FlatButton>
        </DialogActions>
      </DialogContent>
    </FlatDialog>
  );
};

export default CitaModal;
