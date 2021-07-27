import React from 'react'
import { URL } from './constants';
const POST = async (endpoint, data) => {
    console.log(data);
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    console.log(request);
    let response = await fetch(URL + endpoint, request);
    return await response.json();
}

const GET = async (endpoint) => {
    console.log("GET request begin...");
    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    let response = await fetch(URL + endpoint, request);
    return await response.json();
}

export { POST, GET };
