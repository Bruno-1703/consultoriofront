import { useState, FormEvent, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { token } = router.query;

  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Token inválido o faltante");
      return;
    }

    if (nuevaPassword !== confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
      mutation ResetearPassword($token: String!, $nuevaPassword: String!) {
        resetearPassword(token: $token, nuevaPassword: $nuevaPassword)
      }
    `,
          variables: {
            token,
            nuevaPassword,
          },
        }),
      });
      const json = await res.json();
      if (json.errors) {
        throw new Error(json.errors[0]?.message || "Error al resetear");
      }

      setSuccess(json.data.resetearPassword);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Restablecer contraseña
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Nueva contraseña"
          type="password"
          fullWidth
          required
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirmar contraseña"
          type="password"
          fullWidth
          required
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? "Procesando..." : "Restablecer contraseña"}
        </Button>
      </Box>
    </Container>
  );
}
