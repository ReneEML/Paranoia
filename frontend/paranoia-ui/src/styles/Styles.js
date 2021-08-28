import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        background: 'black',
        color: 'white',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    title: {
        fontSize: 60
    }
});

export default useStyles;
