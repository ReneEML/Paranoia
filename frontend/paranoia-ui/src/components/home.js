import React from 'react';
import CustomButton from './homebutton.js'
import '../styles/home.css';

class Home extends React.Component{
    render(){
        return (
            <div className = "homepage">
                <h id="title">Paranoia</h>
            
                <div className = "buttondiv">
                    <CustomButton name = "Create Room"/>
                    <CustomButton name = "Join Room"/>
                </div>
            </div>
        );
    }
  }
  
  export default Home; 