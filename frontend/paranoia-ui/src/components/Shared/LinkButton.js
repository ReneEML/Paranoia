import { Button } from '@material-ui/core';
import React from 'react'

const LinkButton = ({ name, onClickHandler }) => {
    return (
        <Button
            onClick={() => onClickHandler()}
            size="large"
            style={{color:'white'}}
        >
            {name}

        </Button>
    );
}

export default LinkButton;