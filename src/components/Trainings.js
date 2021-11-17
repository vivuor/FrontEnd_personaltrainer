import React, { useState, useEffect} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from "dayjs";

function TrainingList() {
    const [training, setTraining] = useState([]);

    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTraining(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {field: "date", sortable: true, filter: true, lockPosition: true, width: 300}, 
        {field: "duration", sortable: true, filter: true, lockPosition: true}, 
        {field: "activity", sortable: true, filter: true, lockPosition: true}, 
    ]

    return (
        <div style={{maringTop: 20}}>
                <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: "50%", margin: "auto"}}>
                <AgGridReact 
                rowData={training}
                columnDefs={columns}
                suppressCellSelection={true}
                />
            </div>
        </div>
    );
}

export default TrainingList;