import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Cards } from '../api/cards.js';

const CardsList = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <div>{card.text}</div>
      ))}
    </div>
  );
};
export default withTracker(() => {
  return {
    cards: Cards.find({}).fetch(),
  };
})(CardsList);
