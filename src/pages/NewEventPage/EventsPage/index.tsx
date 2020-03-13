import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import EventsList from '../../../components/EventsList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  }),
);

export const EventsPage: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" component="h3" align="center" className={classes.margin}>
        Saved Events
      </Typography>
      <EventsList />
    </>
  )
}