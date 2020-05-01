import { Meteor } from 'meteor/meteor';
import {Cards} from '../imports/api/cards.js';
import '../imports/api/games.js';
import '../imports/api/participants.js';
import words from '../imports/api/words';

Meteor.startup(() => {
    Cards.remove({});
    words.forEach((word) => {
        Cards.insert({'text': word});
    });
});
