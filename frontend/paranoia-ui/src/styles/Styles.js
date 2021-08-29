import React from 'react'
import { makeStyles } from '@material-ui/core';
import theme from './Theme'

const useStyles = makeStyles({
    container: {
        background: 'black',
        color: theme.palette.primary.contrastText,
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    title: {
        fontSize: 60
    },
    input: {
        color: theme.palette.primary.contrastText
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    label: {
        color: theme.palette.primary.contrastText,
        "&.Mui-focused": {
            color: theme.palette.primary.contrastText,
        },
    },
    select: {
        "&:after": {
          borderBottomColor: theme.palette.primary.contrastText,
        },
        "& .MuiSvgIcon-root": {
          color: theme.palette.primary.contrastText,
        },
      },
});

export default useStyles;
