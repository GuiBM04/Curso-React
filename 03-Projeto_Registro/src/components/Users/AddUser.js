import styles from './AddUser.module.css';

import { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

function AddUser(props) {
    const[enteredUserName, setEnteredUserName] = useState("");
    const[enteredAge, setEnteredAge] = useState("");
    const[error, setError] = useState();

    function userNameChangeHandler(event) {
        setEnteredUserName(event.target.value);
    }

    function ageChangeHandler(event) {
        setEnteredAge(event.target.value);
    }

    function errorHandler() {
        setError(null);
    }

    function addUserHandler(event) {
        event.preventDefault();

        if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age'
            })
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age'
            })
            return;
        }

        console.log(enteredUserName, enteredAge);

        props.onAddUser(enteredUserName, enteredAge);

        setEnteredUserName("");
        setEnteredAge("");
    }

    return (
        <Wrapper>
            {error && (<ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>)}
            <Card cssClass={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={enteredUserName} onChange={userNameChangeHandler}/>

                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}/>
                    
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
}

export default AddUser;