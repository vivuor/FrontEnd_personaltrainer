import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDayjs from "@mui/lab/AdapterDayjs"

function AddTraining (props){
    const [open, setOpen] = useState(false)
    const [training, setTraining] = useState({
        date: new Date(),
        duration: "",
        activity: "",
        customer: props.customer,
    })

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
      const handleSave = () => {
          props.addTraining(training);
          handleClose();
      };
  
      const inputChanged = e => {
          setTraining({...training, [e.target.name]: e.target.value })
      };

      const dateChanger = date => {
        date = date.toISOString();
        setTraining({...training, date: date})
      };


    return (
        <div>
            <Button size="small" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{marginBottom: 10}}>
                    New Training
                </DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={training.date}
                        onChange={(newValue) => {
                        dateChanger(newValue);
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    label="Duration"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    label="Activity"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>
          </div>
      )
}

export default AddTraining;