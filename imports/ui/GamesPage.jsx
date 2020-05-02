import Container from '@material-ui/core/Container';
import React from 'react';
import GamesList from './GamesList.jsx';

export const GamesPage = () => (
  <Container maxWidth="md">
    <h1>Liste des parties!</h1>
    <GamesList />
  </Container>
);
