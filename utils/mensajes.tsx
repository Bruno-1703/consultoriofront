import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const Mensajes = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [pacienteIdEditar, setPacienteIdEditar] = useState<string | null>(null);
  const [debugMessage, setDebugMessage] = useState<string | null>(null);

  const handleEditPaciente = (pacienteId: string | null | undefined) => {
    // Use Snackbar to display debugging information
    setDebugMessage(`Editing patient ID: ${pacienteId}`); // Show in Snackbar
    if (pacienteId != null) {
      setPacienteIdEditar(pacienteId);
      setIsEditing(true);
    }
  };

  return (
    <div>
      <button onClick={() => handleEditPaciente("12345")}>Edit Patient</button>

      <Snackbar
        open={Boolean(debugMessage)}
        autoHideDuration={6000}
        onClose={() => setDebugMessage(null)}
      >
        <Alert onClose={() => setDebugMessage(null)} severity="info" sx={{ width: '100%' }}>
          {debugMessage}
        </Alert>
      </Snackbar>

      <div>
        <p>isEditing: {isEditing ? "True" : "False"}</p>
        <p>pacienteIdEditar: {pacienteIdEditar}</p>
      </div>
    </div>
  );
};

export default Mensajes;
