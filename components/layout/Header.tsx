import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Box,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
import { useDrawerContext } from "../context/drawer-context";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export const Header = () => {
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const theme = useTheme();
  const { data: session } = useSession();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSignOut = async () => {
    setOpenSnackbar(true);
    setTimeout(() => {
      signOut();
    }, 1500);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "primary.dark",
          color: "secondary.contrastText",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {/* Logo: Cruz azul clickeable que redirige al inicio */}
          <Link href="/" passHref>
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              alt="Logo Cruz Azul"
              sx={{ width: 36, height: 36, cursor: "pointer" }}
            />
          </Link>

          {/* Botón de menú */}
          <IconButton
            color="inherit"
            onClick={() => toggleIsOpened(!isOpened)}
            sx={{ padding: theme.spacing(1) }}
          >
            {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          {/* Título */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Consultorio
          </Typography>

          {/* Usuario y botón */}
          {session ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1">
                Hola 👋 {session.user?.name}
              </Typography>
              <Button
                onClick={handleSignOut}
                variant="outlined"
                color="secondary"
                startIcon={<LogoutIcon />}
                sx={{
                  borderRadius: 2,
                  borderColor: "secondary.contrastText",
                  color: "secondary.contrastText",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                  }
                }}
              >
                Cerrar sesión
              </Button>
            </Box>
          ) : (
            <Button color="inherit" href="/auth/signin">
              Iniciar sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Alerta Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Has cerrado sesión correctamente.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
