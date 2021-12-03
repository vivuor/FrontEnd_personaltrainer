import React, { useState, useEffect} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function CustomerList() {
    const [customer, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    };

    const addCustomer = customer => {
        fetch("https://customerrest.herokuapp.com/api/customers",
            {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(customer)
            }
        )
        .then(response => {
            if (response.ok){
                fetchCustomers();
                setMsg("Asiakas lisätty");
                setOpen(true);
            }
            else
                alert("Lisääminen epäonnistui")
        })
        .catch(err => console.error(err))
    };

    const editCustomer = (url, updatedCustomer) =>  {
        fetch(url, {
            method: "PUT",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(_=> {
            setMsg("Asiakkaan tiedot päivitetty");
            setOpen(true);
            fetchCustomers()
        })
        .catch(err => console.error(err))
    };

    const deleteCustomer = url => {
        if (window.confirm("Oletko varma, että haluat poistaa asiakkaan?")) {
            fetch(url, 
            { method: "DELETE" })
            .then(response => {
                if (response.ok){
                    fetchCustomers();
                    setMsg("Asiakas poistettu");
                    setOpen(true);
                }
                else   
                    alert("Poisto epäonnistui")
            })
            .catch(err => console.error(err))
        }
    };

    const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings",
        {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok){
                fetchCustomers();
                setMsg("Treeni lisätty");
                setOpen(true);
        }
        else
            alert("Lisääminen epäonnistui")
        })
        .catch(err => console.error(err))
    };    

    const columns = [
        {field: "firstname", sortable: true, filter: true, lockPosition: true},
        {field: "lastname", sortable: true, filter: true, lockPosition: true},
        {field: "streetaddress", sortable: true, filter: true, lockPosition: true},
        {field: "postcode", sortable: true, filter: true, lockPosition: true, width: 150}, 
        {field: "city", sortable: true, filter: true, lockPosition: true, width: 150},
        {field: "email", sortable: true, filter: true, lockPosition: true}, 
        {field: "phone", sortable: true, filter: true, lockPosition: true},
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 150,
            lockPosition: true,
            cellRendererFramework: params => <AddTraining addTraining={addTraining} customer={params.data.links[0].href} />
        }, 
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 120,
            lockPosition: true,
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params}  />
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 120,
            lockPosition: true,
            cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>
        }
    ]

    return (
        <div style={{marginTop: 20}}>
            <h1>Customerlist</h1>
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{marginTop: 30, height: 600, width: "90%", margin: "auto"}}>
                <AgGridReact 
                rowData={customer}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
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

export default CustomerList;