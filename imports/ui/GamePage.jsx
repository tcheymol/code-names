import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Games } from '../api/games.js';
import { Participants } from '../api/participants.js';
import GameTable from './GameTable.jsx';
import JoinGameForm from './JoinGameForm';
import { Rules } from './Rules';

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
      <Rules/>
      <Card style={{marginTop: 16, marginBottom: 16}}>
        <CardContent style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link to="/">
            <Button variant="outlined" startIcon={<HomeIcon />}>Accueil</Button>
          </Link>
          <Typography variant='h5' component='h2'>
          Partie : {game.name}
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
                <span style={{fontSize: 25, color: 'gold'}}><LockIcon /> Chef de partie</span>
              ) : null}
            </>
          )}
          <>
            {game.isStarted ? (
              <>
              {game.isOver ? null : (
                <span style={{fontSize: 40, color: 'whitesmoke'}}>Partie en cours</span>
              )}
              </>
            ) : (
              <>
                {isAdmin && game.redLeaderId && game.blueLeaderId ?  (
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Button onClick={startGame} variant="contained">Commencer la partie</Button>
                  <span style={{maxWidth: 200}}>Attention, une fois la partie commencée, plus personne ne pourra la rejoindre</span>
                  </div>
                ) : null}
              </>
            )}
          </>
        </CardContent>
      </Card>
      { game.isOver && game.winner ? (
        <Card style={{marginTop: 16, marginBottom: 16, backgroundColor: game.startingTeam === 'blue' ? '#2980b9' : '#e74c3c'}}>
          <CardContent>
            <Typography variant='h5' component='h2' style={{color: 'white', textAlign: 'center'}}>
              {`Partie remportée par l'équipe ${game.winner === 'blue' ? 'Bleue' : 'Rouge'}`}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card style={{marginTop: 16, marginBottom: 16, backgroundColor: game.startingTeam === 'blue' ? '#2980b9' : '#e74c3c'}}>
          <CardContent>
            <Typography variant='h5' component='h2' style={{color: 'white', textAlign: 'center'}}>
              {`L'Équipe ${game.startingTeam === 'blue' ? 'bleue' : 'rouge'} commence`}
            </Typography>
          </CardContent>
        </Card>
      )}
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
                  <div style={{marginTop: 16}}> </div>
                  {blueParticipants.map((participant) => (
                    <div key={participant._id} style={{color: 'white', display: 'flex', justifyContent: 'space-between'}}> 
                      {participant.name}
                      {participant._id === game.adminId ? <span>(Chef de partie)</span> : null}
                      {participant._id === game.blueLeaderId ? <span>(Chef d'équipe)</span> : null}
                      {!game.isStarted && isAdmin ?  (
                        <Button variant="outlined" onClick={() => updateBlueLeader(participant._id)}>Choisir comme chef bleu</Button>
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
                  {!currentParticipant && !game.isStarted ?  (
                <Grid item xs={6}>
                    <JoinGameForm gameId={game._id} color="red"  participants={[...blueParticipants, ...redParticipants]}/>
                </Grid>
                  ) : null }
                <Grid item xs={!currentParticipant && !game.isStarted ? 6 : 12}>
                  <div style={{marginTop: 16}}> </div>
                  {redParticipants.map((participant) => (
                    <div key={participant._id} style={{color: 'white', display: 'flex', justifyContent: 'space-between'}}> 
                      {participant.name}
                      {participant._id === game.adminId ? <span>(Chef de partie)</span> : null}
                      {participant._id === game.redLeaderId ? <span>(Chef d'équipe)</span> : null}
                      {!game.isStarted && isAdmin ?  (
                        <Button variant="outlined" onClick={() => updateRedLeader(participant._id)}>Choisir comme chef rouge</Button>
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
