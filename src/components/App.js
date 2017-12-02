import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import KeyMachine from './KeyMachine';

const App = () => (
  <MuiThemeProvider>
    <KeyMachine />
  </MuiThemeProvider>
);

export default App;
