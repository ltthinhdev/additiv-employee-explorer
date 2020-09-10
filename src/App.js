import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

import Explorer from './scenes/Explorer/Explorer';
import Overview from './scenes/Overview/Overview';
import './App.css';

const GlobalCss = withStyles({
  '@global': {
    ".MuiOutlinedInput-notchedOutline": {
      border: 0
    },
    ".MuiFormControl-fullWidth": {
      boxShadow: '-3px -3px 2px 0px #87acce59, 3px 3px 2px 0px #ffffffad',
      borderRadius: '10px'
    },
    ".MuiInputLabel-outlined.MuiInputLabel-shrink": {
      backgroundColor: '#f1f8ff',
      padding: '0 4px',
      color: '#717171'
    },
    ".MuiAutocomplete-paper": {
      backgroundColor: '#f1f8ff',
    }
  },
})(() => null);

function App() {
  return (
    <div className="App">
      <GlobalCss />
      <Router>
        <Switch>
          <Route path="/" exact component={Explorer} />
          <Route path="/overview/:name" exact component={Overview} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
