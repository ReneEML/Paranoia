import React from 'react';
import { Button } from '@material-ui/core';
import '../styles/home.css';

class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    onclick = () => {
        console.log("Works")
    }

    render(){
        return (
                <Button onClick={this.onclick} variant="contained" id="homebutton">{this.props.name}</Button>
        );
    }
  }
  
  export default Main; 