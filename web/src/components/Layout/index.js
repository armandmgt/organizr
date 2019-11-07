import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withTheme from '@material-ui/core/styles/withTheme';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import client from '../../apollo';
import auth from '../../auth';

const links = [
  { path: '/', exact: true, title: 'Dashboard', icon: DashboardIcon },
  { path: '/todos', title: 'Todos', icon: PlaylistAddCheckIcon },
];

const Layout = ({ title, children }) => {
  const history = useHistory();
  const [open, setOpened] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpened(true);
  };
  const handleDrawerClose = () => {
    setOpened(false);
  };
  const handleSignOut = async () => {
    auth.deleteToken();
    await client.resetStore();
    history.push('/signin');
  };

  return (
    <Root>
      <ShiftingAppBar position="absolute" open={open}>
        <AppToolbar>
          <MenuButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            open={open}
          >
            <MenuIcon />
          </MenuButton>
          <Title component="h1" variant="h6" color="inherit" noWrap>
            {title}
          </Title>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </AppToolbar>
      </ShiftingAppBar>
      <AppDrawer variant="permanent" open={open}>
        <ToolbarIcon>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </ToolbarIcon>
        <Divider />
        <List>
          {links.map(l => (
            <ListItem
              key={l.path}
              to={l.path}
              exact={l.exact}
              button
              component={NavLink}
              activeClassName="Mui-selected"
            >
              <ListItemIcon>
                <l.icon />
              </ListItemIcon>
              <ListItemText primary={l.title} />
            </ListItem>
          ))}
        </List>
        <SignOutIcon>
          <IconButton onClick={handleSignOut}>
            <ExitToAppIcon />
          </IconButton>
        </SignOutIcon>
      </AppDrawer>
      <Content>
        <AppBarSpacer />
        <AppContainer>{children}</AppContainer>
      </Content>
    </Root>
  );
};

const drawerWidth = 240;

const Root = styled.div`
  display: flex;
`;

const ShiftingAppBar = withTheme(styled(({ open, ...other }) => (
  <AppBar {...other} />
))`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  transition: ${({ theme }) =>
    theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })};
  ${({ theme, open }) =>
    open
      ? `
      margin-left: ${drawerWidth}px;
      width: calc(100% - ${drawerWidth}px);
      transition: ${theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })};`
      : ''}
`);

const AppToolbar = styled(Toolbar)`
  padding-right: 24px;
`;

const AppBarSpacer = withTheme(styled.div(({ theme }) => theme.mixins.toolbar));

const MenuButton = styled(({ open, ...other }) => <IconButton {...other} />)`
  margin-right: 36px;
  ${({ open }) => (open ? 'display: none;' : '')}
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const AppDrawer = withTheme(styled(({ open, ...other }) => (
  <Drawer {...other} />
))`
  & .MuiDrawer-paper {
    position: relative;
    white-space: nowrap;
    width: ${drawerWidth}px;
    transition: ${({ theme }) =>
      theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })};
    ${({ theme, open }) =>
      open
        ? ''
        : `
      overflow-x: hidden;
      transition: ${theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
      width: ${theme.spacing(7)}px;
      ${theme.breakpoints.up('sm')} {
        width: ${theme.spacing(9)}px;
      }
    `}
  }
`);

const ToolbarIcon = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  ${({ theme }) => css(theme.mixins.toolbar)};
`);

const SignOutIcon = withTheme(styled(ToolbarIcon)`
  position: absolute;
  bottom: 0;
`);

const Content = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
`;

const AppContainer = withTheme(styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(4)}px;
  padding-bottom: ${({ theme }) => theme.spacing(4)}px;
`);

export default Layout;
