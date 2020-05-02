import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Games } from '../api/games.js';
import GameCard from './GameCard';
import GameForm from './GameForm';

const GamesList = ({ games }) => (
    <div>
      <GameForm />
      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );

export default withTracker(() => {
  return {
    games: Games.find({}).fetch(),
  };
})(GamesList);
