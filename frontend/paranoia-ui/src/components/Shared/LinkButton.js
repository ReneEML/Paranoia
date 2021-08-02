import { Button } from '@material-ui/core';
import React from 'react'
import '../../styles/home.css';

const LinkButton = ({ name, onClickHandler }) => {
    return (
        <Button
            onClick={() => onClickHandler()}
            variant="contained"
            id="homebutton"
        >
            {name}

        </Button>
    );
}

export default LinkButton;