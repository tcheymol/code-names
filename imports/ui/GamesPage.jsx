import React from 'react';
import Games from './Games.jsx';
import Container from '@material-ui/core/Container';

export const GamesPage = () => (
  <Container maxWidth="md">
    <h1>Liste des parties!</h1>
    <Games />
  </Container>
);
