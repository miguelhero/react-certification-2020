import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    backgroundColor: '#f5f6f7',
  },
  nounderline: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.8)',
  },
});

const SideMenu = ({ open, setOpen }) => {
  const classes = useStyles();
  const { state } = useAuth();

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <div className={classes.list}>
        <List>
          <Link to="/" className={classes.nounderline}>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        {state.isAuthenticated && (
          <List>
            <Link to="/favorites" className={classes.nounderline}>
              <ListItem button>
                <ListItemText primary="My Favorites" />
              </ListItem>
            </Link>
          </List>
        )}
      </div>
    </Drawer>
  );
};

export default SideMenu;
