import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';

// route components
import {GamesPage} from './GamesPage';
import GamePage from './GamePage';
import NotFoundPage from './NotFoundPage';

const browserHistory = createBrowserHistory();


const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


export const AppRouter = () => (
  <ThemeProvider theme={theme}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={GamesPage}/>
        <Route exact path="/game/:id" component={GamePage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  </ThemeProvider>
);
