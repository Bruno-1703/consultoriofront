import { useState, FormEvent } from "react";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";

export default function RestorePassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("http://localhost:3006/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation SolicitarRecuperacionPassword($email: String!) {
              solicitarRecuperacionPassword(email: $email)
            }
          `,
          variables: { email },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0]?.message || "Error desconocido");
      }

      setSuccess("Instrucciones enviadas a tu correo.");
      setEmail("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Restaurar contraseña 🔒
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        Ingresá tu correo electrónico y te enviaremos instrucciones.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Correo electrónico"
          name="email"
          type="email"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Button variant="contained" fullWidth type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar instrucciones"}
        </Button>
      </Box>
    </Container>
  );
}
