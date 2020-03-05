import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import EventNote from '@material-ui/icons/EventNote';
import SaveIcon from '@material-ui/icons/Save';

interface INewEventFormProps {
  onSaveClick: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      flexGrow: 1,
    },
    margin: {
      marginTop: theme.spacing(3),
    },
    button: {
      marginTop: theme.spacing(4),
    },
  }),
);

export const NewEventForm: React.FC<INewEventFormProps> = (props) => {
  const classes = useStyles();
  const [valid, setValid] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (value.trim() !== '') {
      setValid(prev => true);
    } else {
      setValid(prev => false);
    }
  }

  const saveBtnHandler = () => {
    props.onSaveClick();
  }

  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="flex-end" className={classes.margin}>
        <Grid item>
          <PlaylistAdd />
        </Grid>
        <Grid item className={classes.fullWidth}>
          <TextField label="Title" fullWidth onChange={changeHandler} />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="flex-end" className={classes.margin}>
        <Grid item>
          <EventNote />
        </Grid>
        <Grid item className={classes.fullWidth}>
          <TextField label="Notes" multiline fullWidth />
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Button
          disabled={!valid}
          onClick={saveBtnHandler}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
          </Button>
      </Grid>
    </React.Fragment>
  );
}
