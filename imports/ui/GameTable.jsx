import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import styled from 'styled-components';
import { Games } from '../api/games.js';
import { Participants } from '../api/participants.js';

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
    if (!game.isStarted || game.isOver) return;
    
    result = window.confirm('Valider cette carte ?');
    if (result) {
      Games.update(game._id, {
        $set: { shownCardsIds: [...game.shownCardsIds, cardId] },
      });
      let blueShownCardsCount = game.cards.filter((card) => {
        return game.shownCardsIds && game.shownCardsIds.includes(card._id) && card.color === 'blue';
      }).length;
      let redShownCardsCount = game.cards.filter((card) => {
        return game.shownCardsIds && game.shownCardsIds.includes(card._id) && card.color === 'red';
      }).length;
      let blackShownCardsCount = game.cards.filter((card) => {
        return game.shownCardsIds && game.shownCardsIds.includes(card._id) && card.color === 'black';
      }).length;
      const shownCardColor = game.cards.find((card) => card._id === cardId).color;
      if (shownCardColor === 'blue') {
        blueShownCardsCount++;
      } else if (shownCardColor === 'red') {
        redShownCardsCount++;
      } else if (shownCardColor === 'black') { 
        blackShownCardsCount++;
      }

      let redCardsCount = 8;
      let blueCardsCount = 8;
      if (game.startingTeam === 'blue') {
        blueCardsCount++;
      } else {
        redCardsCount++;
      }
      
      if (blueCardsCount === blueShownCardsCount || redCardsCount === redShownCardsCount || 1 === blackShownCardsCount) {
        let winner = blueCardsCount === blueShownCardsCount ? 'blue' : 'red';
        if (1 === blackShownCardsCount) {
          winner = currentParticipant.color === 'blue' ? 'red' : 'blue';
        }
        Games.update(game._id, {
          $set: { isOver: true, winner },
        });
      }
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
          color = '#2c3e50';
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
                  <StyledPaper  style={{color: !isShown ? color : '#ecf0f1', backgroundColor: isShown ? color : '#ecf0f1', width: '100%', border: `3px solid ${!isShown ? color : 'transparent'}` }}>{card.text}</StyledPaper>
                </ButtonBase>
            </Grid>
          ) : (
            <Grid item xs={2}>
              <StyledPaper style={{color: isShown ? '#ecf0f1' : '#2c3e50', width: '100%', backgroundColor: isShown ? color : '#ecf0f1', width: '100%'}}>
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
  const currentParticipantId = localStorage.getItem(game._id);
  const participants = Participants.find({_id: currentParticipantId, gameId: game._id}).fetch()

  return {
    currentParticipant: participants[0],
  };
})(GameTable);
