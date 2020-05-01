import { Formik } from 'formik';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Participants } from '../api/participants.js';

const JoinGameForm = ({ gameId, color, participants }) => (
  <Formik
    initialValues={{ name: '' }}
    onSubmit={(values, { setSubmitting }) => {
      const participantId = Participants.insert({
        name: values.name,
        gameId,
        color,
        isAdmin: !participants || participants.length === 0,
      });
      localStorage.setItem('participantId', participantId);
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
        <TextField
          id="outlined-basic"
          label="Nom"
          type='name'
          name='name'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && touched.name && errors.name}
        <Button variant='contained' type='submit'>
          Rejoindre
        </Button>
      </form>
    )}
  </Formik>
);

export default JoinGameForm;
