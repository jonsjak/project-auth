import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { API_URL } from 'utils/urls';
import { BASE_URL } from 'utils/urls';
import user from 'reducers/user';


const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(password);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        };
        fetch(`${BASE_URL}/register`, options)
            .then((response) => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data)
                    dispatch(user.actions.setAccessToken(data.response.accessToken))
                    dispatch(user.actions.setUserName(data.response.username))
                    dispatch(user.actions.setUserId(data.response.id))
                    dispatch(user.actions.setError(null))
                } else {
                    dispatch(user.actions.setAccessToken(null))
                    dispatch(user.actions.setUserName(null))
                    dispatch(user.actions.setUserId(null))
                    dispatch(user.actions.setError(data.response))
                }
            })
            .catch(error => {
                console.log('Fetch error: ', error);
                dispatch(user.actions.setAccessToken(null))
                dispatch(user.actions.setUserName(null))
                dispatch(user.actions.setUserId(null))
                dispatch(user.actions.setError(error.message))
            })
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField 
                type="text" 
                id="outlined-name-input" 
                label="Username" 
                variant="outlined"
                onChange={event => setUserName(event.target.value)}
                required
            />

            <TextField 
                type="password" 
                id="outlined-password-input" 
                label="Password" 
                variant="outlined"
                onChange={event => setPassword(event.target.value)}
                required
            />

            <Button 
                type="submit" 
                variant="outlined"
            >
            Submit
            </Button>
        </Box>
    )
};

export default Register;