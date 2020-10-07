import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';
import { storage } from '../../utils/storage';

const ProfileMenu = ({ anchorEl, handleProfileMenuClose }) => {
  const { state, dispatch } = useAuth();
  const history = useHistory();

  const handleSignInOut = () => {
    if (state.isAuthenticated) {
      dispatch({
        type: 'LOGOUT',
      });
      history.push('/');
      storage.clear();
    } else {
      history.push('/login');
    }
    handleProfileMenuClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!anchorEl}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleSignInOut}>
        {state.isAuthenticated ? 'Sign Out' : 'Sign In'}
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
