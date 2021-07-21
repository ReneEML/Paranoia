import { Button } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import '../styles/home.css';

const LinkButton = ({ name, path }) => {
    const history = useHistory();
    const handleOnClick = () => {
        history.push(path);
    }
    return (
        <Button
            to={path}
            onClick={() => handleOnClick()}
            variant="contained"
            id="homebutton"
        >
            {name}

        </Button>
    );
}

export default LinkButton;