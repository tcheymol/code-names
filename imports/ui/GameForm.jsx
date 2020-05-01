import { Formik } from 'formik';
import { withTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Games } from '../api/games.js';
import { Cards } from '../api/cards.js';

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const GameForm = ({ words }) =>  (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.name.length > 0) {
          Games.insert({
            name: values.name,
            cards: words,
            isStarted: false,
            shownCardsIds: [],
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Paper style={{padding: 16, display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent: 'center'}}>
            <div>
              <Typography variant='h5' component='h2'  style={{color: 'white', textAlign: 'center'}}>
                Créer une partie
              </Typography>
            </div>
            <div style={{display: 'flex', alignSelf: 'stretch', justifyContent: 'center', marginTop: 16}}>
              <TextField
              id="outlined-basic"
              label="Nom"
              type='name'
              name='name'
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              />
              {errors.name && touched.name && errors.name}
              <Button variant='contained' type='submit'>
                Créer
              </Button>
            </div>
          </Paper>
        </form>
      )}
    </Formik>
  );

export default withTracker(() => {
  let words = Cards.find({}).fetch();
  wordsSample = [];
  startingTeam = Math.random() >= 0.5;
  redTeamCardsCount = 8;
  blueTeamCardsCount = 8;
  if (startingTeam) {
    redTeamCardsCount++;
  } else {
    blueTeamCardsCount++;
  }
  for (let i = 1; i <= 7; i++) {
    const newWord = words[Math.floor(Math.random() * words.length)];
    wordsSample.push({
      ...words[Math.floor(Math.random() * words.length)],
      color: 'neutral'
    });
    words = words.filter((word) => word._id !== newWord._id);
  }
  for (let i = 1; i <= redTeamCardsCount; i++) {
    const newWord = words[Math.floor(Math.random() * words.length)];
    wordsSample.push({
      ...words[Math.floor(Math.random() * words.length)],
      color: 'red'
    });
    words = words.filter((word) => word._id !== newWord._id);
  }
  for (let i = 1; i <= blueTeamCardsCount; i++) {
    const newWord = words[Math.floor(Math.random() * words.length)];
    wordsSample.push({
      ...words[Math.floor(Math.random() * words.length)],
      color: 'blue'
    });
    words = words.filter((word) => word._id !== newWord._id);
  }
  const newWord = words[Math.floor(Math.random() * words.length)];
  wordsSample.push({
    ...words[Math.floor(Math.random() * words.length)],
    color: 'black'
  });
  words = words.filter((word) => word._id !== newWord._id);
  return {
    words: shuffle(wordsSample)
  };
})(GameForm);
