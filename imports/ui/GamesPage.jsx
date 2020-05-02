import Container from '@material-ui/core/Container';
import React from 'react';
import GamesList from './GamesList.jsx';
import { Rules } from './Rules.jsx';

export const GamesPage = () => (
  <Container maxWidth="md">
    <h1>Liste des parties!</h1>
    <Rules/>
    <GamesList />
  </Container>
);
