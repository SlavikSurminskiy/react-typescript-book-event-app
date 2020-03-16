import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    }
  }),
);

type EventInfoProps = {
  eventName: string
  eventNotes: string
}

export const EventInfo: React.FC<EventInfoProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} >
        <Typography variant="h4" color='primary' component="h4" align="center">
          {props.eventName}
        </Typography>
        <Typography component="p" align="center" className={classes.margin}>
          {props.eventNotes}
        </Typography>
      </Grid>
    </>
  )
}