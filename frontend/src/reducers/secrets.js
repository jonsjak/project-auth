import { createSlice } from "@reduxjs/toolkit";

const secrets = createSlice({
    name: 'secrets',
    initialState: {
        secretMessage: '',
        error: null
    },
    reducers: {
        setSecretMessage: (store, action) => {
            store.secretMessage = action.payload
        },
        setError: (store, action) => {
            store.error = action.payload
        }
    }
});

export default secrets;