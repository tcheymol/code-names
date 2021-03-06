import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';
import React from 'react';
import { Cards } from '../api/cards.js';
import { Games } from '../api/games.js';

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getStartingTeam = () => {
  return Math.random() >= 0.5 ? 'red' : 'blue';
}

const getGameWords = (startingTeam) => {
  let words = Cards.find({}).fetch();
  wordsSample = [];
  redTeamCardsCount = 8;
  blueTeamCardsCount = 8;
  if (startingTeam === 'red') {
    redTeamCardsCount++;
  } else {
    blueTeamCardsCount++;
  }
  for (let i = 1; i <= 7; i++) {
    const newWord = words[Math.floor(Math.random() * words.length)];
    wordsSample.push({
      ...newWord,
      color: 'neutral'
    });
    words = [...words.filter((word) => word._id !== newWord._id)];
  }
  for (let i = 1; i <= redTeamCardsCount; i++) {
    const newWord = words[Math.floor(Math.random() * words.length)];
    wordsSample.push({
      ...newWord,
      color: 'red'
    });
    words = [...words.filter((word) => word._id !== newWord._id)];
  }
  for (let i = 1; i <= blueTeamCardsCount; i++) {
    const newWord = words[Math.floor(Math.random() * words.length)];
    wordsSample.push({
      ...newWord,
      color: 'blue'
    });
    words = [...words.filter((word) => word._id !== newWord._id)];
  }
  const newWord = words[Math.floor(Math.random() * words.length)];
  wordsSample.push({
    ...newWord,
    color: 'black'
  });
  words = [...words.filter((word) => word._id !== newWord._id)];
  
  return  shuffle(wordsSample);
}

const GameForm = ({ words }) =>  (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.name.length > 0) {
          const startingTeam = getStartingTeam();
          Games.insert({
            name: values.name,
            cards: getGameWords(startingTeam),
            startingTeam,
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

export default GameForm;
