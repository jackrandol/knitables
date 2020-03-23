// src/useAuthSubmit.js

import React, { useState } from 'react';
import axios from './axioscopy';

export function useAuthSubmit(url, values) {
    const [error, setError ] = useState();

    const handleSubmit = () => {
        axios.post(url, values).then(({ data }) => {
            if (!data.success) {
                setError(true);
                //this is for a generic error message, not specific you'll have
                //to change this to work for your code
            } else {
                location.replace('/');
            }
        }).catch(err => {
            console.log(err);
            setError(true);
        });
    };

    return [error, handleSubmit];

}
