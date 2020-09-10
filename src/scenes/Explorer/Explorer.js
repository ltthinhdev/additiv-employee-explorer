import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import styles from './css/Explorer.module.css';

const getAllEmployees = async function () {
    let response = await fetch('http://api.additivasia.io/api/v1/assignment/employees/');
    let json = await response.json();
    return json;
}

export default function Explorer() {
    const history = useHistory();

    let [selectedName, setSelectedName] = React.useState(null);
    let [employees, setEmployees] = React.useState([]);
    React.useEffect(() => {
        getAllEmployees()
            .then(employees => {
                setEmployees(employees);
            })
    }, [])

    const handleSearchClick = function () {
        if (selectedName) {
            history.push(`/overview/${selectedName}`);
        }
    }

    const handleNameSelect = function (event, newValue) {
        setSelectedName(() => newValue)
    }

    return (
        <div className={styles.wrapper}>
            <h3>Employee Explorer</h3>
            <div className={styles.search_wrapper}>
                <Autocomplete
                    className={styles.text_box}
                    options={employees}
                    getOptionLabel={(option) => option}
                    onChange={handleNameSelect}
                    renderInput={(params) => <TextField {...params} label="Employee Name" variant="outlined" />}
                />
                <Button variant="contained" color="primary" onClick={handleSearchClick}>
                    Search
                </Button>
            </div>
        </div>
    )
}