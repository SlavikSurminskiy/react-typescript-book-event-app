import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
    }
  }),
);


export const NewEventPage: React.FC = () => {
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

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} className={classes.margin}>
        <Typography variant="h3" component="h3" align="center">
          What's the occasion?
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
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
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
