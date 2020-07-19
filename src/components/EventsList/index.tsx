import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { loadEvents } from '../../store/events/async-actions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// Icons
import Event from '@material-ui/icons/Event';


const mapStateToProps = (state: RootState) => {
  return { events: state.events.events }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadEvents: () => dispatch(loadEvents()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

const EventsList: React.FC<PropsFromRedux> = (props) => {
  useEffect(() => {
    props.loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List>
      {props.events.map(ev => {
        return (
          <ListItem button component={Link} to={'event/' + ev._id} key={ev._id}>
            <ListItemAvatar>
              <Avatar>
                <Event />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ev.title} secondary={ev.notes} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default connector(EventsList);