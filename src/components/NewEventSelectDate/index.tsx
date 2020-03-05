import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DayPicker, { DayModifiers, DateUtils } from 'react-day-picker';

// Icons
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';

import 'react-day-picker/lib/style.css';
import './style.scss';

interface INewEventSelectDate {
  onBackClick: () => void
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

export const NewEventSelectDate: React.FC<INewEventSelectDate> = (props) => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState<Date[]>([new Date()]);

  const handleDayClick = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.selected) {
      handleDateChange((selectedDays: Date[]) => {
        return selectedDays.filter(d => !DateUtils.isSameDay(d, day))
      })
    } else {
      handleDateChange((selectedDays: Date[]) => [...selectedDays, day])
    }
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
          selectedDays={selectedDate}
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