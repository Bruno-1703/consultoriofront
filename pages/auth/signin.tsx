import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Box, Alert, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import backgroundImage from './background.jpg';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const result = await signIn("credentials", { redirect: false, email, password });
      if (result?.error) {
        setError(result.error);
      } else {
        const callbackUrl = (router.query.callbackUrl as string) || "/";
        await router.push(callbackUrl);
      }
    } catch {
      setError("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setError("Su clave no coincide");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error registrando usuario");
      }

      setOpen(false);
      alert("¡El usuario se ha registrado correctamente! Ya puedes iniciar sesión.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card
        sx={{
          width: "80%",
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
            Consultorio médico 👩‍⚕️👨‍⚕️
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Ingrese sus credenciales
          </Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSignIn} sx={{ mt: 2 }}>
            <TextField fullWidth label="Email" name="email" type="email" margin="normal" required />
            <TextField fullWidth label="Clave" name="password" type="password" margin="normal" required />
            <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2 }}>
              {loading ? "Cargando..." : "Sign In"}
            </Button>
          </Box>
          <Button fullWidth onClick={() => setOpen(true)} sx={{ mt: 2 }}>Registrarse</Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Complete el siguiente formulario para su registración</DialogTitle>
        <DialogContent>
          <Box component="form" id="register-form" onSubmit={handleRegister} sx={{ mt: 2 }}>
            <TextField fullWidth label="Email" name="email" type="email" margin="normal" required />
            <TextField fullWidth label="Nombre" name="name" type="name" margin="normal" required />
            <TextField fullWidth label="Clave" name="password" type="password" margin="normal" required />
            <TextField fullWidth label="Confirme su Clave" name="confirmPassword" type="password" margin="normal" required />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary" form="register-form">Registrarse</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
