import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../providers/Auth';
import SideMenu from '../SideMenu';
import SearchVideo from '../SearchVideo';
import ProfileMenu from '../ProfileMenu';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();
  const { state } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className={classes.container}>
        <div>
          <Toolbar>
            <IconButton
              data-testid="side-menu-btn"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpenSideMenu(!openSideMenu)}
            >
              <MenuIcon />
            </IconButton>
            <SearchVideo />
          </Toolbar>
        </div>
        <IconButton
          data-testid="profile-menu-btn"
          className={classes.accountIcon}
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          {state.isAuthenticated ? (
            <img src={state.token.avatarUrl} alt="avatar" height="24" width="24" />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
      </AppBar>
      <ProfileMenu anchorEl={anchorEl} handleProfileMenuClose={handleProfileMenuClose} />
      <SideMenu open={openSideMenu} setOpen={setOpenSideMenu} />
    </>
  );
};

export default Header;
