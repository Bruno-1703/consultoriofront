import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Box,
  Button
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from "@mui/icons-material";
import { useDrawerContext } from "../context/drawer-context";
import { useSession, signOut } from "next-auth/react";

export const Header = () => {
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const theme = useTheme();
  const { data: session } = useSession();
 
  return (
    <AppBar
      sx={{ backgroundColor: "primary.dark", color: "secondary.contrastText" }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => toggleIsOpened(!isOpened)}
          sx={{ padding: theme.spacing(1) }}
        >
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Consultorio
        </Typography>

        {session ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">Hola👋{session.user?.name}</Typography>
            <Button color="inherit" onClick={() => signOut()}>
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
  );
};

export default Header;
