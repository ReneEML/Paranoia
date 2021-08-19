import { Button } from '@material-ui/core';
import React from 'react'

const LinkButton = ({ name, onClickHandler }) => {
    return (
        <Button
            onClick={() => onClickHandler()}
            color="primary"
            variant="contained"
            size="large"
        >
            {name}

        </Button>
    );
}

export default LinkButton;