import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Title from './Title';
import AssignTaskDialog from './AssignTaskDialog'

import {getTask} from '../api/index';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Tasks() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Your tasks</Title>
      
      <div>
      <Alert severity="info">
      <AlertTitle>Task title</AlertTitle>
        Task Description — <strong>by-User3</strong>
    </Alert>
    <Alert severity="info">
      <AlertTitle>Task title</AlertTitle>
        Task Description — <strong>by-User3</strong>
    </Alert>
      </div>
      <div>
        <AssignTaskDialog/>
      </div>
    </React.Fragment>
  );
}