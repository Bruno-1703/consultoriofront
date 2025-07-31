import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import backgroundImage from "./background.jpg";

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
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        const callbackUrl = (router.query.callbackUrl as string) || "/";
        await router.push(callbackUrl);
      }
    } catch {
      setError("Ocurrió un error durante el inicio de sesión");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;
    const nombre_completo = (
      form.elements.namedItem("nombre_completo") as HTMLInputElement
    ).value;
    const especialidad = (
      form.elements.namedItem("especialidad") as HTMLInputElement
    ).value;
    const matricula = (form.elements.namedItem("matricula") as HTMLInputElement)
      .value;
    const dni = (form.elements.namedItem("dni") as HTMLInputElement).value;
    const telefono = (form.elements.namedItem("telefono") as HTMLInputElement)
      .value;
    const direccion = (form.elements.namedItem("direccion") as HTMLInputElement)
      .value;
    if (password !== confirmPassword) {
      setError("Su clave no coincide");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_usuario: name, // este es el campo correcto que espera el backend
          email,
          password,
          nombre_completo,
          especialidad,
          matricula,
          dni,
          telefono,
          rol_usuario: "SIN ROL", // opcional, pero útil para evitar undefined
        }),

      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error registrando usuario");
      }

      setOpen(false);
      alert(
        "¡El usuario se ha registrado correctamente! Ya puedes iniciar sesión."
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ocurrió un error");
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          zIndex: 0,
        }}
      />

      {/* Capa semitransparente para oscurecer un poco la imagen */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      {/* Contenido principal */}
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            width: "100%",
            p: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: 5,
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Consultorio médico 👩‍⚕️👨‍⚕️
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              Ingrese sus credenciales
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSignIn} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Clave"
                name="password"
                type="password"
                margin="normal"
                required
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
            </Box>

            <Button fullWidth onClick={() => setOpen(true)} sx={{ mt: 2 }}>
              Registrarse
            </Button>
            <Button
              fullWidth
              href="/auth/restore-password"
              sx={{ mt: 1 }}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* Diálogo de registro */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Complete el siguiente formulario para su registración
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="register-form"
            onSubmit={handleRegister}
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Nombre de Usuario"
              name="name"
              type="text"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Nombre Completo"
              name="nombre_completo"
              type="text"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Especialidad"
              name="especialidad"
              type="text"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Matrícula"
              name="matricula"
              type="text"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="DNI"
              name="dni"
              type="text"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              type="text"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Dirección"
              name="direccion"
              type="text"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Clave"
              name="password"
              type="password"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirme su Clave"
              name="confirmPassword"
              type="password"
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            form="register-form"
          >
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
