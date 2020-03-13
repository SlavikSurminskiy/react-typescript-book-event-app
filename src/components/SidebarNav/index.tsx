import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Icons
import Menu from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';
import EventAvailable from '@material-ui/icons/EventAvailable';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuBtn: {
      position: 'fixed',
      left: '30px',
      top: '30px',
      transform: 'scale(2)',
    },
    menuLink: {
      minWidth: '150px',
      marginLeft: '-20px',
      color: theme.palette.text.primary,
      fontWeight: 'bold',
      textDecoration: 'none',
    },
  }),
);


export const SidebarNav: React.FC = () => {
  const classes = useStyles();
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(prev => !prev)
  }

  return (
    <>
      <Menu onClick={toggleNav} className={classes.menuBtn} />
      <Drawer open={showNav} onClose={toggleNav}>
        <List>
          <ListItem>
            <ListItemIcon><Home /></ListItemIcon>
            <Link to="/" onClick={toggleNav} className={classes.menuLink}>Home</Link>
          </ListItem>
          <ListItem>
            <ListItemIcon><EventAvailable /></ListItemIcon>
            <Link to="/events" onClick={toggleNav} className={classes.menuLink}>Events</Link>
          </ListItem>
        </List>
      </Drawer >
    </>
  );
}
