import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Games } from '../api/games.js';
import { Participants } from '../api/participants.js';
import JoinGameForm from './JoinGameForm';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center; 
  min-height: 100px;
`;


const GameTable = ({ game, currentParticipant}) => {
  if (!game || !currentParticipant) return null;
  const isLeader = currentParticipant._id === game.blueLeaderId || currentParticipant._id === game.redLeaderId;

  const showCard = (cardId) => {
    result = window.confirm('Valider cette carte ?');
    if (result) {
      Games.update(game._id, {
        $set: { shownCardsIds: [...game.shownCardsIds, cardId] },
      });
    }
  }

  return (
    <Grid container spacing={3}>
      {game.cards.map((card, index) => {
        let color;
        if (card.color === 'blue') {
          color = '#2980b9';
        } else if (card.color === 'red') {
          color = '#e74c3c';
        }else if (card.color === 'black') {
          color = null;
        } else {
          color = '#F2C50F';
        }
        const isShown = game.shownCardsIds && game.shownCardsIds.includes(card._id);
        return(
        <React.Fragment key={card.text}>
          {
            Number.isInteger(index / 5) ?  <Grid item xs={1}></Grid> : null
          }
          {isLeader ? (
            <Grid item xs={2}>
                <ButtonBase style={{width: '100%'}} onClick={() => showCard(card._id)}>
                  <StyledPaper  style={{backgroundColor: color, width: '100%', border: `3px solid ${isShown ? '#27ae60' : 'transparent'}` }}>{card.text}</StyledPaper>
                </ButtonBase>
            </Grid>
          ) : (
            <Grid item xs={2}>
              <StyledPaper style={{backgroundColor: isShown ? color : null, width: '100%'}}>
                {card.text}
              </StyledPaper>
            </Grid>
          )}
          {
            Number.isInteger((index + 1) / 5) ?  <Grid item xs={1}></Grid> : null
          }
        </React.Fragment>
      )})}
    </Grid>
  );
}

export default withTracker(( { game } ) => {
  const currentParticipantId = localStorage.getItem('participantId');
  const participants = Participants.find({_id: currentParticipantId, gameId: game._id}).fetch()

  return {
    currentParticipant: participants[0],
  };
})(GameTable);
