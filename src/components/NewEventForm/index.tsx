import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { addNewEventTitle, addNewEventNotes } from '../../store/newEvent/actions';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import EventNote from '@material-ui/icons/EventNote';
import SaveIcon from '@material-ui/icons/Save';


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

const mapStateToProps = (state: RootState) => {
  return { newEvent: state.newEvent }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewEventTitle: (t: string) => dispatch(addNewEventTitle(t)),
    addNewEventNotes: (n: string) => dispatch(addNewEventNotes(n))
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type NewEventFormProps = PropsFromRedux & {
  onSaveClick: () => void
}

const NewEventForm: React.FC<NewEventFormProps> = (props) => {
  const classes = useStyles();
  const [valid, setValid] = useState(false);
  const { title, notes } = props.newEvent;

  useEffect(() => {
    validationForm(title);
  }, [title])

  const validationForm = (str: string) => {
    setValid(prev => str.trim() !== '');
  }

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    validationForm(e.target.value);
    props.addNewEventTitle(e.target.value);
  }

  const notesChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.addNewEventNotes(e.target.value);
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
          <TextField label="Title" value={title} fullWidth onChange={titleChangeHandler} />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="flex-end" className={classes.margin}>
        <Grid item>
          <EventNote />
        </Grid>
        <Grid item className={classes.fullWidth}>
          <TextField label="Notes" value={notes} multiline fullWidth onChange={notesChangeHandler} />
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

export default connector(NewEventForm);
