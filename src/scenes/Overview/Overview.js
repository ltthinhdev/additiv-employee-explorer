import React from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import styles from './css/Overview.module.css';

const getSubordinates = async function (name) {
    let response = await fetch(`http://api.additivasia.io/api/v1/assignment/employees/${encodeURI(name)}`);
    let json = await response.json();
    return json.length > 1 ? json[1]['direct-subordinates'] : [];
}

const getAllSubordinates = async function (name) {
    let pending = [name];
    let fetched = new Set([name]);
    let result = [];
    while (pending.length > 0) {
        let allSubordinates = await Promise.all(pending.map(getSubordinates));
        let subordinates = allSubordinates.flatMap(x => x);
        pending = [];
        for (let name of subordinates) {
            if (!fetched.has(name)) {
                fetched.add(name);
                pending.push(name);
                result.push(name);
            }
        }

    }

    return result;
}

export default function Overview() {
    const history = useHistory();
    const params = useParams();
    let [subordinates, setSubordinates] = React.useState([]);

    React.useEffect(() => {
        getAllSubordinates(params.name)
            .then(result => {
                setSubordinates(result);
            });
    }, [params.name])

    return (
        <div className={styles.wrapper}>
            <h3>Employee Overview</h3>
            <div className={styles.employees_wrapper}>
                <div className={styles.title}>
                    <label>Subordinates of employee {params.name}:</label>
                </div>
                <div>
                    {
                        subordinates.map((subName, index) => <p key={index}
                            onClick={() => history.push('/overview/' + encodeURI(subName))}>
                            {subName}
                        </p>)
                    }
                </div>
            </div>
            <Link className={styles.back} to='/'>Back to Explorer</Link>
        </div>
    )
}