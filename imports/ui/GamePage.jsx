import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import styled from 'styled-components';
import { Games } from '../api/games.js';
import { Participants } from '../api/participants.js';
import GameTable from './GameTable.jsx';
import JoinGameForm from './JoinGameForm';

const StyledPaper = styled(Paper)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center; 
  min-height: 100px;
`;


const GamePage = ({ game, blueParticipants, redParticipants, currentParticipant}) => {
  if (!game) return null;
  const isAdmin = currentParticipant && game.adminId === currentParticipant._id;
  const startGame = () => {
    Games.update(game._id, {
      $set: { isStarted: true },
    });
  }
  const updateBlueLeader = (leaderId) => {
    Games.update(game._id, {
      $set: { blueLeaderId: leaderId },
    });
  }
  const updateRedLeader = (leaderId) => {
    Games.update(game._id, {
      $set: { redLeaderId: leaderId },
    });
  }
  return (
    <div>
      <Card style={{marginTop: 16, marginBottom: 16}}>
        <CardContent style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant='h5' component='h2'>
          {game.name}
          </Typography>
          {!currentParticipant ? null : (
            <>
              <Typography variant='h5' component='h2'>
                Vous êtes : {currentParticipant.name}
              </Typography>
              <div style={{padding: 8, borderRadius: 4, backgroundColor: currentParticipant.color === 'blue' ? '#2980b9' : '#e74c3c'}}>
                <Typography variant='h5' component='h2'>
                  Vous êtes : {currentParticipant.color === 'blue' ? 'Bleu' : 'Rouge'}
                </Typography>
              </div>
              {isAdmin ?  (
                <span style={{fontSize: 40, color: 'gold'}}>👑 Admin</span>
              ) : null}
            </>
          )}
          <>
            {game.isStarted ? (
              <span style={{fontSize: 40, color: 'whitesmoke'}}>Partie en cours</span>
            ) : (
              <>
                {isAdmin && game.redLeaderId && game.blueLeaderId ?  (
                  <Button onClick={startGame} variant="contained">Commencer la partie</Button>
                ) : null}
              </>
            )}
          </>
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card style={{marginTop: 16, marginBottom: 16, backgroundColor: '#2980b9'}}>
            <CardContent>
              <Typography variant='h5' component='h2' style={{color: 'white', textAlign: 'center'}}>
                Équipe bleue
              </Typography>
              <Divider/>
              <Grid container style={{ marginTop: 16}}></Grid>
              <Grid container>
                {!currentParticipant && !game.isStarted ?  (
                  <Grid item xs={6}>
                      <JoinGameForm gameId={game._id} color="blue" participants={[...blueParticipants, ...redParticipants]}/>
                  </Grid>
                ) : null}
                <Grid item xs={!currentParticipant && !game.isStarted ? 6 : 12}>
                  <Typography variant='h6' component='h6'  style={{color: 'white'}}>Participants</Typography>
                  <Divider/>
                  <div style={{marginTop: 16}}> </div>
                  {blueParticipants.map((participant) => (
                    <div key={participant._id} style={{color: 'white', display: 'flex', justifyContent: 'space-between'}}> 
                      {participant.name}
                      {participant._id === game.blueLeaderId ? <span>👑</span> : null}
                      {!game.isStarted && isAdmin ?  (
                        <Button variant="outlined" onClick={() => updateBlueLeader(participant._id)}>Choisir comme leader</Button>
                      ) : null }
                    </div>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{marginTop: 16, marginBottom: 16, backgroundColor: '#e74c3c'}}>
            <CardContent>
              <Typography variant='h5' component='h2'  style={{color: 'white', textAlign: 'center'}}>
              Équipe rouge
              </Typography>
              <Divider/>
              <Grid container style={{ marginTop: 16}}>
                <Grid item xs={6}>
                  {!currentParticipant && !game.isStarted ?  (
                    <JoinGameForm gameId={game._id} color="red"  participants={[...blueParticipants, ...redParticipants]}/>
                  ) : null }
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6' component='h6'  style={{color: 'white'}}>Participants</Typography>
                  <Divider/>
                  {redParticipants.map((participant) => (
                    <div key={participant._id} style={{color: 'white', display: 'flex', justifyContent: 'space-between'}}> 
                      {participant.name}
                      {participant._id === game.redLeaderId ? <span>👑</span> : null}
                      {!game.isStarted && isAdmin ?  (
                        <Button variant="outlined" onClick={() => updateRedLeader(participant._id)}>Choisir comme leader</Button>
                      ) : null }
                    </div>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <GameTable game={game}/>
    </div>
);
}

export default withTracker(({match}) => {
  const gameId = match.params.id;
  const games = Games.find({_id: gameId}).fetch()
  const currentParticipantId = localStorage.getItem(gameId);
  const participants = Participants.find({_id: currentParticipantId, gameId}).fetch()

  return {
    game: games[0],
    blueParticipants: Participants.find({gameId, color: 'blue'}).fetch(),
    redParticipants: Participants.find({gameId, color: 'red'}).fetch(),
    currentParticipant: participants[0],
  };
})(GamePage);
