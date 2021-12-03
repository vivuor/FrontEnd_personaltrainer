import React, {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomerList from "./Customers";
import TrainingList from "./Trainings";
import CalendarPage from "./Calendar";

function NavTabs() {
    const [value, setValue] = useState("one")
    const handleChange = (event, value) => {
        setValue(value);
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs textColor="inherit" value={value} onChange={handleChange}>
                    <Tab value="one" label="Customers"/>
                    <Tab value="two" label="Trainings"/>
                    <Tab value="three" label="Calendar"/>
                </Tabs>
            </AppBar>
            {value === "one" && <div style={{marginTop: 20, marginBottom: 20}}> <CustomerList /></div>}
            {value === "two" && <div style={{marginTop: 20, marginBottom: 20}}> <TrainingList /></div>}
            {value === "three" && <div style={{marginTop: 20, marginBottom: 20}}> <CalendarPage /></div>}
        </div>
    )
};

export default NavTabs;