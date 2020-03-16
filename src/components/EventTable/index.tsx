import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { addNewParticipantName, checkNewDay } from '../../store/singleEvent/actions';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';

import './style.scss';


const mapStateToProps = (state: RootState) => {
  return { singleEvent: state.singleEvent }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewParticipantName: (n: string) => dispatch(addNewParticipantName(n)),
    checkNewDay: (ind: number, isChecked: boolean) => dispatch(checkNewDay(ind, isChecked)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

const EventTable: React.FC<PropsFromRedux> = (props) => {

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.addNewParticipantName(e.target.value);
  }

  const dayCheckboxHandler = (checkboxIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.checkNewDay(checkboxIndex, event.target.checked)
  };

  const { singleEvent } = props;

  return (
    <div className="event-table-wrapper">
      <table className="event-table">
        <thead>
          <tr>
            <td></td>
            {singleEvent.dates.map((d, i) => (<td key={i}>{d.toLocaleDateString()}</td>))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography variant="h6" color='primary' component="span">
                Participant number
              </Typography>
            </td>
            {singleEvent.participantsCount.map((count, i) => (<td key={i}>{count}</td>))}
          </tr>
          <tr>
            <td>
              <AccountCircle className="user-icon" />
              <TextField
                value={singleEvent.newParticipant.name}
                onChange={nameChangeHandler}
                placeholder="Your name"
                variant="outlined"
              />
            </td>
            {singleEvent.newParticipant.checkedDays.map((isDayChecked, i) => {
              return (
                <td key={i}>
                  <Checkbox
                    className="event-table__checkbox"
                    checked={isDayChecked}
                    onChange={dayCheckboxHandler(i)}
                    color="primary"
                  />
                </td>
              )
            })}
          </tr>
          {/* TODO change participant key(pInd) attribute to user id */}
          {singleEvent.participants.map((p, pInd) => {
            return (
              <tr key={pInd}>
                <td>
                  <Typography variant="h6" component="span">
                    {p.name}
                  </Typography>
                </td>
                {p.checkedDays.map((d, dInd) => {
                  return (
                    <td key={dInd}>
                      <Checkbox
                        className="event-table__checkbox"
                        checked={d}
                        disabled
                        color="primary"
                      />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default connector(EventTable);