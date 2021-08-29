import React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import theme from '../../styles/Theme'
import useStyles from '../../styles/Styles'

const StyledTextField = withStyles({
    root: {
        color: '#dee3ea',
        '& label.Mui-focused': {
            color: theme.palette.primary.contrastText,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.primary.contrastText,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.primary.contrastText,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.contrastText,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.contrastText,
            },
        },
    },
})(TextField);

const CustomTextField = ({label, value, onChangeHandler}) => {
    const styles = useStyles();
    return (
        <StyledTextField
            color="primary"
            label={label}
            value={value}
            onChange={(e) => onChangeHandler(e.target.value)}
            variant='outlined'
            InputProps={
                {
                    className: styles.input
                }
            }
            InputLabelProps={
                {
                    classes: {
                        root: styles.input
                    }
                }
            }
        />
    );
}


export default CustomTextField;