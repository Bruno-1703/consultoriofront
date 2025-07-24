import { useRouter } from 'next/router';
import { List, Grid } from '@mui/material';

import { MenuItem } from './MenuItem';
import { IMenuItem } from '../types';
import { useSession } from 'next-auth/react';
import { MENU_PERMISSIONS, Role } from '../../interfaces/roles';

export const MenuItemsList = ({ items = [] }: { items?: IMenuItem[] }) => {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role as Role | undefined;

  if (!items.length || !role) return null;

  // Filtramos solo ítems permitidos para el rol
  const allowedRoutes = MENU_PERMISSIONS[role] ?? [];
  const filteredItems = items.filter(item => item.route ? allowedRoutes.includes(item.route) : true);

  return (
    <Grid>
      <List sx={{ p: 0 }}>
        {filteredItems.map(({ literal, route, Icon }) => (
          <MenuItem
            Icon={Icon}
            literal={literal}
            route={route}
            key={route ?? literal}
            selected={pathname === route}
          />
        ))}
      </List>
    </Grid>
  );
};
