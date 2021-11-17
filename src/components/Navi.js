import React, {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomerList from "./Customers";
import TrainingList from "./Trainings";

function NavTabs() {
    const [value, setValue] = useState("one")
    const handleChange = (event, value) => {
        setValue(value);
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs textColor="white" value={value} onChange={handleChange}>
                    <Tab value="one" label="Customers"/>
                    <Tab value="two" label="Trainings"/>
                </Tabs>
            </AppBar>
            {value === "one" && <div style={{marginTop: 20, marginBottom: 20}}>Customers <CustomerList /></div>}
            {value === "two" && <div style={{marginTop: 20, marginBottom: 20}}>Trainings <TrainingList /></div>}
        </div>
    )
}

export default NavTabs;