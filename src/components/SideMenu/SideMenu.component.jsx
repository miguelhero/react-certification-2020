import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const SideMenu = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <div className={classes.list}>
        <List>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="My Favourites" />
          </ListItem>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default SideMenu;
