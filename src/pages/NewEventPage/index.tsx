import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import NewEventForm from '../../components/NewEventForm';
import NewEventSelectDate from '../../components/NewEventSelectDate';
import NewEventCompletion from '../../components/NewEventСompletion';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  const steps = ['Describe occasion', 'Set date', 'All done']
  const [activeStep, setActiveStep] = useState(0);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <NewEventForm onSaveClick={handleHext} />
      case 1:
        return <NewEventSelectDate onSaveClick={handleHext} onBackClick={handleBack} />
      case 2:
        return <NewEventCompletion onBackClick={handleBack} />
      default:
        return <h3>Unknown step</h3>
    }
  }

  const handleHext = () => {
    setActiveStep(prevStep => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1)
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} className={classes.margin}>
        <Typography variant="h3" component="h3" align="center">
          What's the occasion?
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12} md={8}>
        {getStepContent(activeStep)}
      </Grid>
    </Grid>
  );
}
