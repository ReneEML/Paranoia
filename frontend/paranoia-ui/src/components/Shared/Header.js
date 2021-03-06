import { AppBar, IconButton, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
        marginBottom:'2vh'
    }
  }));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static"className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Paranoia
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;