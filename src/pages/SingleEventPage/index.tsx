import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { RootState } from '../../store';
import { loadSingleEvent } from '../../store/singleEvent/actions';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { EventInfo } from '../../components/EventInfo';
import EventTable from '../../components/EventTable';

// Icons
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(3),
    }
  }),
);

type MatchParams = {
  id: string
}

interface OwnProps extends RouteComponentProps<MatchParams> {
}


const mapStateToProps = (state: RootState) => {
  return {
    singleEventTitle: state.singleEvent.title,
    singleEventNotes: state.singleEvent.notes,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadSingleEvent: (id: string) => dispatch(loadSingleEvent(id)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

const SingleEventPage: React.FC<PropsFromRedux & OwnProps> = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.loadSingleEvent(props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Grid>
        <EventInfo
          eventName={props.singleEventTitle}
          eventNotes={props.singleEventNotes}
        />
        <EventTable />
        <Grid container justify="center">
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save
            </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default connector(SingleEventPage);