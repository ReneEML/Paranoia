import React from 'react';
import Header from './components/Shared/Header';
import Routing from './components/Shared/Routing'
import theme from './styles/Theme';
import { MuiThemeProvider} from '@material-ui/core/styles';

class App extends React.Component{
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Routing />
      </MuiThemeProvider>
    );
  }
}

export default App;
