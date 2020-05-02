import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import GitHub from '@material-ui/icons/GitHub';
import React from 'react';
import styled from 'styled-components';

const Text = styled(Typography)`
  margin-top: 8px;  
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Rules = () => {
  const [openExplainations, setOpenExplainations] = React.useState(false);
  const [openRules, setOpenRules] = React.useState(false);
  
  return(
    <Paper style={{padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
      <Button variant='contained' onClick={() => setOpenRules(true)}>
        Règles
      </Button>
      <Button variant='contained' onClick={() => setOpenExplainations(true)}>
        Fonctionnement du site
      </Button>
      <Button variant='contained' startIcon={<GitHub/>} href="https://github.com/tcheymol/code-names" target="_blank">
        Dépôt GitHub
      </Button>
      <Dialog
        open={openRules}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenRules(false)}
      >
        <DialogTitle>
          Règles du jeu
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Text><Chip color="secondary" label="1" /> Le jeu peut se jouer à partie de 4 joueurs</Text>
            <Text><Chip color="secondary" label="2" /> La table est constitués de 25 cartes contenant un mot</Text>
            <Text><Chip color="secondary" label="3" /> Chaque chef d’équipe doit faire deviner en le moins de tours possible les mots du plateau de jeu de la couleur de son équipe au reste de l’équipe</Text>
            <Text><Chip color="secondary" label="4" /> L’équipe qui commence doit deviner 9 mots, l’autre équipe 8</Text>
            <Text><Chip color="secondary" label="5" /> À chaque tour, le chef d’équipe donne un mot indice, et un nombre de mots à deviner avec ce mot indice (Par exemple: “Mer, 2 mots ”)</Text>
            <Text><Chip color="secondary" label="6" /> Le mot indice doit avoir un rapport avec les mots à deviner (par exemple, je peux dire “Mer, 2 mots” si dans mes mots à deviner avec ce mot indice se trouvent “Vagues” et “Bateau“)</Text>
            <Text><Chip color="secondary" label="7" /> Le reste de l’équipe annonce ainsi des mots un par un jusqu’à ce que le nombre de mots à deviner, quand ils tombent d’accord, ils demandent la validation du chef d’équipe</Text>
            <Text><Chip color="secondary" label="8" /> Le tour s’arrête</Text>
            <div style={{marginLeft: 16}}>
              <Text><Chip color="primary" size="small" label="a" /> Dès qu’un mot non valide est annoncé par l’équipe (mot neutre, mot de l’autre équipe ou mot noir) même si le nombre de mots à deviner avec ce mot indic</Text>
              <Text><Chip color="primary" size="small" label="b" /> Dès que le total de mots à deviner avec cet indice est atteint</Text>
            </div>
            <Text><Chip color="secondary" label="9" /> Règles complètes ici : <a style={{color: 'white'}} href="https://iello.fr/regles/Codenames_regles.pdf">https://iello.fr/regles/Codenames_regles.pdf</a></Text>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRules(false)} variant="outlined">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openExplainations}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenExplainations(false)}
      >
        <DialogTitle>
          Fonctionnement du site
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Text><Chip color="secondary" label="1" /> Créer une partie</Text>
            <Text><Chip color="secondary" label="2" /> Rejoindre une équipe en choisissant son pseudonyme</Text>
            <Text><Chip color="secondary" label="3" /> la première personne qui a rejoint une équipe devient “Chef de partie” (il voit tout en haut de son écran qu’il est administrateur)</Text>
            <Text><Chip color="secondary" label="4" /> Le chef de partie peut effectuer les actions suivantes</Text>
            <div style={{marginLeft: 16}}>
              <Text><Chip size="small" label="a" /> Choisir un chef d’équipe pour chaque équipe. Le chef d’équipe est celui qui fera deviner aux autres</Text>
              <Text><Chip size="small" label="b" /> Commencer la partie, attention, vous ne pouvez commencer la partir qu’après avoir désigné un chef pour chaque équipe.</Text>
              <Text><Chip size="small" label="c" /> Supprimer la partie sur la page d’accueil</Text>
            </div>
            <Text><Chip color="secondary" label="5" /> Inviter d’autres joueurs à rejoindre la partie</Text>
            <Text><Chip color="secondary" label="6" /> Une fois que les équipes sont pleines, le chef de la partie clique sur “commencer la partie”</Text>
            <Text><Chip color="secondary" label="7" /> Le chef d’équipe qui a 9 mots à faire deviner commence</Text>
            <Text><Chip color="secondary" label="8" /> Il donne vocalement son mot indice et le nombre de mots à deviner</Text>
            <Text><Chip color="secondary" label="9" /> Une fois que les autres membres de l’équipe tombent d’accord sur un mot à deviner, le chef d’équipe clique sur ce mot</Text>
            <Text><Chip color="secondary" label="10" /> Une fois le tour terminé (tous les mots ont été devinés, ou un mot incorrect a été rencontré), c’est à l’autre équipe de jouer</Text>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExplainations(false)} variant="outlined">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
);
  }
