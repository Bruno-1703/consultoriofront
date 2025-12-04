import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { IMenuItem } from '../types';

type Props = IMenuItem & {
  selected?: boolean;
  onClick?: () => void;
};

export const MenuItem: React.FC<Props> = ({
  route,
  literal,
  Icon,
  selected,
  onClick,
}) => {
  const link = (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        sx={{
          '&.Mui-selected': {
            backgroundColor: 'primary.dark',
            color: 'common.white',
          },
          '&:hover': {
            backgroundColor: 'primary.light',
            color: 'common.white',
          },
        }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={[
            { minWidth: 'auto' },
            (theme) => ({
              paddingRight: theme.spacing(2),
            }),
          ]}
        >
          <Icon sx={{ color: 'secondary.dark' }} />
        </ListItemIcon>
        <ListItemText primary={literal} />
      </ListItemButton>
    </ListItem>
  );

  return route
    ? <Link href={route} passHref style={{
        textDecoration: 'none',
        color: 'inherit',
    }}>{link}</Link>
    : link;
};
