import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { saveNewEvent } from '../../store/newEvent/actions';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Event from '@material-ui/icons/Event';


const mapStateToProps = (state: RootState) => {
  return { newEvent: state.newEvent }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    saveNewEvent: () => dispatch(saveNewEvent()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type NewEventCompletionProps = PropsFromRedux & {
  onBackClick: () => void
}

// Implemented component as class
// just for training how to work with class component in typescript

class NewEventCompletion extends React.Component<NewEventCompletionProps> {

  backBtnHandler = () => {
    this.props.onBackClick()
  }

  saveBtnHandler = () => {
    this.props.saveNewEvent()
  }

  render() {
    return (
      <React.Fragment>
        <Grid>
          <Grid item xs={12} >
            <Typography variant="h4" color='primary' component="h4" align="center">
              {this.props.newEvent.title}
            </Typography>
            <Typography component="p" align="center" style={{ marginTop: '16px' }}>
              {this.props.newEvent.notes}
            </Typography>
          </Grid>
        </Grid>
        <List>
          {this.props.newEvent.dates.map(d => (
            <ListItem key={d.toString()}>
              <ListItemIcon><Event /></ListItemIcon>
              <ListItemText primary={d.toDateString()} />
            </ListItem>
          ))}
        </List>
        <Grid container justify="space-between">
          <Button
            onClick={this.backBtnHandler}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBack />}
          >
            Back
            </Button>
          <Button
            disabled={this.props.newEvent.isSending || this.props.newEvent.isSaved}
            onClick={this.saveBtnHandler}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save Event
            </Button>
        </Grid>
        {this.props.newEvent.isSending && <LinearProgress style={{ marginTop: '32px' }} />}
        {this.props.newEvent.statusText &&
          <Alert
            severity={this.props.newEvent.isSaved ? 'success' : 'error'}
            variant="filled"
            style={{ marginTop: '32px' }}
          >
            {this.props.newEvent.statusText}
          </Alert>
        }
      </React.Fragment >
    )
  }
}

export default connector(NewEventCompletion);
