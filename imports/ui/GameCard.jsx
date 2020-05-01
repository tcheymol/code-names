import React from 'react';
import { Games } from '../api/games.js';
import GameForm from './GameForm';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => (
  <Link to={`/game/${game._id}`} style={{textDecoration: 'none'}}>
    <Card style={{marginTop: 16}}>
      <CardContent>
        <Typography variant='h5' component='h2'>
        {game.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary">Voir la partie</Button>
      </CardActions>
    </Card>
  </Link>
);

export default GameCard;
