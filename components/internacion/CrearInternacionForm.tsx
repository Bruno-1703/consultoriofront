import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { GetPacientesQuery, useCamasDisponiblesQuery, useInternarPacienteMutation } from "../../graphql/types";


interface Props {
  pacientes: GetPacientesQuery["getPacientes"] | any[];
}

export const CrearInternacionForm = ({ pacientes }: Props) => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    pacienteId: "",
    camaId: "",
    diagnostico: "",
    observaciones: "",
  });

  const { data: camasData, loading: camasLoading } =
    useCamasDisponiblesQuery();

  const [internarPaciente, { loading: creando }] =
    useInternarPacienteMutation({
      onCompleted: () => {
        alert("Paciente internado con éxito");
        setOpen(false);
      },
      onError: (err) => alert(err.message),
    });

  const handleSubmit = () => {
    internarPaciente({
      variables: {
        data: {
          pacienteId: form.pacienteId,
          camaId: form.camaId,
          diagnostico: form.diagnostico,
          observaciones: form.observaciones,
        },
      },
    });
  };

  // Soporta ambos formatos: array simple o edges estilo Relay
const listaPacientes = Array.isArray(pacientes)
  ? pacientes
  : pacientes?.edges?.map(e => e.node) ?? [];

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Internar Paciente
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Nueva Internación</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            select
            label="Paciente"
            value={form.pacienteId}
            onChange={(e) => setForm({ ...form, pacienteId: e.target.value })}
          >
            {listaPacientes?.map((p) => (
              <MenuItem key={p.id_paciente} value={p.id_paciente}>
                {p.nombre_paciente} {p.apellido_paciente}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Cama disponible"
            value={form.camaId}
            onChange={(e) => setForm({ ...form, camaId: e.target.value })}
            disabled={camasLoading}
          >
            {camasData?.camasDisponibles?.map((c) => (
              <MenuItem key={c.id_cama} value={c.id_cama}>
                Cama {c.numero} – {c.pabellon?.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Diagnóstico"
            value={form.diagnostico}
            onChange={(e) =>
              setForm({ ...form, diagnostico: e.target.value })
            }
            multiline
          />

          <TextField
            label="Observaciones"
            value={form.observaciones}
            onChange={(e) =>
              setForm({ ...form, observaciones: e.target.value })
            }
            multiline
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={creando}
          >
            Internar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
