import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {createTask} from '../api/index';



export default function AssignTaskDialog() {
  const [open, setOpen] = React.useState(false);
  const [valueName, setValueName] = React.useState('');
  const [valueDescription, setValueDescription] = React.useState('');


  const handleChangeName = (event) => {
    setValueName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setValueDescription(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssing = () => {
    const data = {
      "name" : valueName , 
      "content" : valueDescription
    };
    console.log(`data is ${valueName} descr is ${valueDescription}`)

    createTask(data).then(response => {
      console.log(response)
      
      alert("Successfully created task !")
    }).catch(error => {
      if(error.status === 401) {
        alert("Invalid email or password")
      }
    })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Assign a task
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Assign a task</DialogTitle>
        <DialogContent>
          
        <TextField
          id="standard-multiline-flexible"
          label="Task Name"
          rowsMax={1}
          value={valueName}
          onChange={handleChangeName}
        /><br/><br/>

        <TextField
          id="standard-multiline-flexible"
          label="Task description"
          multiline
          rowsMax={4}
          value={valueDescription}
          onChange={handleChangeDescription}
        />
        <FormControl >
        <InputLabel id="demo-simple-select-label">Pick</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
        >
          <MenuItem value={1}>User 1</MenuItem>
          <MenuItem value={2}>User 2</MenuItem>
          <MenuItem value={3}>User 3</MenuItem>
        </Select>
      </FormControl>

        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssing} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}