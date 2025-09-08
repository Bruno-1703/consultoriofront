import { Session } from "next-auth";
import { IMenuItem } from "../types";
import { ROUTES } from "./routes";
// tus íconos e items base
import {
  Dashboard as DashboardIcon,
  CalendarMonth as CalendarMonthIcon,
  Person as PersonIcon,
  LibraryBooks as LibraryBooksIcon,
  Medication as MedicationIcon,
  CoronavirusOutlined as CoronavirusOutlinedIcon,
  People as PeopleIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';

export const MENU_LIST: IMenuItem[] = [
  {
    route: ROUTES.main,
    literal: 'Dashboard',
    Icon: DashboardIcon,
  },
  {
    route: ROUTES.citas,
    literal: 'Citas',
    Icon: CalendarMonthIcon,
  },
  {
    route: ROUTES.pacientes,
    literal: 'Pacientes',
    Icon: PersonIcon,
  },
  {
    route: ROUTES.estudios,
    literal: 'Estudios',
    Icon: LibraryBooksIcon,
  },
  {
    route: ROUTES.medicamentos,
    literal: 'Medicamentos',
    Icon: MedicationIcon,
  },
  {
    route: ROUTES.enfermedades,
    literal: 'Enfermedades',
    Icon: CoronavirusOutlinedIcon,
  },
  {
    route: ROUTES.admin,
    literal: 'Administracion',
    Icon: PeopleIcon,
  },
  {
    route: ROUTES.manual,
    literal: 'Manual De Usuario',
    Icon: MenuBookIcon,  // o HelpOutlineIcon si preferís
  },


];



