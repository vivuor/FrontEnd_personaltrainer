import React, { useState, useEffect} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomerList() {
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {field: "firstname", sortable: true, filter: true, lockPosition: true},
        {field: "lastname", sortable: true, filter: true, lockPosition: true},
        {field: "streetaddress", sortable: true, filter: true, lockPosition: true},
        {field: "postcode", sortable: true, filter: true, lockPosition: true}, 
        {field: "city", sortable: true, filter: true, lockPosition: true},
        {field: "email", sortable: true, filter: true, lockPosition: true}, 
        {field: "phone", sortable: true, filter: true, lockPosition: true},
    ]

    return (
        <div style={{maringTop: 20}}>
            <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: "80%", margin: "auto"}}>
                <AgGridReact 
                rowData={customer}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                />
            </div>
        </div>
    );
}

export default CustomerList;