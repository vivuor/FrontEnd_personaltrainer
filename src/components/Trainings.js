import React, { useState, useEffect} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Moment from "react-moment";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

function TrainingList() {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchTraining();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    };

    const deleteTraining = url => {
        if (window.confirm("Oletko varma, että haluat poistaa treenin?")) {
            fetch(url, 
            { method: "DELETE" })
            .then(response => {
                if (response.ok){
                    fetchTraining();
                    setMsg("Treeni poistettu!");
                    setOpen(true);
                }
                else   
                    alert("Poisto epäonnistui")
            })
            .catch(err => console.error(err))
        }
    };

    const columns = [
        {field: "date", sortable: true, filter: true, lockPosition: true, width: 200,
            cellRendererFramework: params => <Moment format="DD.MM.YYYY HH:mm" date={params.data.date} />}, 
        {field: "duration", sortable: true, filter: true, lockPosition: true, width: 150}, 
        {field: "activity", sortable: true, filter: true, lockPosition: true},
        {field: "customer.firstname", sortable: true, filter: true, lockPosition: true},
        {field: "customer.lastname", sortable: true, filter: true, lockPosition: true},
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 120,
            lockPosition: true,
            cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteTraining(`https://customerrest.herokuapp.com/api/trainings/${params.data.id}`)}>Delete</Button>
        }
    ]

    return (
        <div style={{maringTop: 20}}>
            <h1>Traininglist</h1>
            <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: "60%", margin: "auto"}}>
                <AgGridReact 
                    rowData={training}
                    columnDefs={columns}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar 
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={handleClose}
            />
        </div>
    );
}

export default TrainingList;