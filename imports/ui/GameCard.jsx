import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Link } from 'react-router-dom';
import { Games } from '../api/games.js';
import { Participants } from '../api/participants.js';

const GameCard = ({ game, currentParticipant }) => {
  const isAdmin = currentParticipant && game.adminId === currentParticipant._id;
  const deleteGame = () => {
      Games.remove(game._id);
  }
  return  (
    <Card style={{marginTop: 16}}>
        <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h5' component='h2'>
          {game.name}
          </Typography>
          {isAdmin ?  (
            <span style={{fontSize: 25, color: 'gold'}}><LockIcon /> Vous êtes chef de cette partie</span>
            ) : null}
        </CardContent>
        <CardActions style={{justifyContent: 'space-between'}}>
          <Link to={`/game/${game._id}`} style={{textDecoration: 'none'}}>
          <Button variant="contained" color="primary">Voir la partie</Button>
          </Link>
          {currentParticipant && game.adminId === currentParticipant._id ? (
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={deleteGame}>Supprimer</Button>
          ) : null}
        </CardActions>
      </Card>
  );
}

export default withTracker(({ game }) => {
  const currentParticipantId = localStorage.getItem(game._id);
  const participants = Participants.find({_id: currentParticipantId, gameId: game._id}).fetch()
  return {
    currentParticipant: participants[0],
  };
})(GameCard);
