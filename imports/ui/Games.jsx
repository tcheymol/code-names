import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Games } from '../api/games.js';
import GameForm from './GameForm';
import GameCard from './GameCard';

const GamesList = ({ games }) => {
  return (
    <div>
      <GameForm />
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default withTracker(() => {
  return {
    games: Games.find({}).fetch(),
  };
})(GamesList);
