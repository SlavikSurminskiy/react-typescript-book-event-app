import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { EventDatesType } from '../../store/newEvent/types';
import { addNewEventDates } from '../../store/newEvent/actions';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DayPicker, { DayModifiers, DateUtils } from 'react-day-picker';

// Icons
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';

import 'react-day-picker/lib/style.css';
import './style.scss';


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
  return { newEventDates: state.newEvent.dates }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewEventDates: (d: EventDatesType) => dispatch(addNewEventDates(d)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type NewEventSelectDateProps = PropsFromRedux & {
  onBackClick: () => void
  onSaveClick: () => void
}

const NewEventSelectDate: React.FC<NewEventSelectDateProps> = (props) => {
  const classes = useStyles();
  const [valid, setValid] = useState(false);
  const { newEventDates } = props;

  useEffect(() => {
    validationForm(newEventDates);
  }, [newEventDates])

  const validationForm = (dates: EventDatesType) => {
    setValid(prev => dates.length > 0);
  }

  const handleDayClick = (day: Date, modifiers: DayModifiers) => {
    let dates: EventDatesType = [];
    if (modifiers.selected) {
      dates = newEventDates.filter(d => !DateUtils.isSameDay(d, day))
      props.addNewEventDates(dates)
    } else {
      dates = [...newEventDates, day]
      props.addNewEventDates(dates)
    }
    validationForm(dates);
  }

  const backBtnHandler = () => {
    props.onBackClick();
  }

  const saveBtnHandler = () => {
    props.onSaveClick();
  }

  return (
    <React.Fragment>
      <div className="eventDataPicker">
        <DayPicker
          onDayClick={handleDayClick}
          selectedDays={newEventDates}
        />
      </div>
      <Grid container justify="space-between">
        <Button
          onClick={backBtnHandler}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
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

export default connector(NewEventSelectDate);
