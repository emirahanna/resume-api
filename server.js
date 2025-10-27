//Start with smallest step, client sending text to server, server updates JSON

const express = require('express');
const cors = require('cors');
const app = express();
const port =  3000;
const address = '127.0.0.1';

app.use(cors())
//should return full resume,
app.get('/viewResume', (req, res) => {
    res.json(resume)
})

app.post('/add:category', (req, res) => {
    //TODO: add the information to resume.basics
    //resume.basics.(new key): new value
    //or use a spread operator
})

app.post('/delete:category', (req, res) => {
    //TODO: remove the information to resume.basics
    // can we just create a new copy? and delete the old one once the new one has been created?
})

app.get('/get:category', (req, res) => {
    res.json(parseParam(req.params.category))
})

app.listen(port, address, () => {console.log(`Listening on port ${address}:${port}`)});
//here for testing returning JSON, can remove to a proper thing later
let resume = {
    "basics": {
        "name": "John Doe",
        "label": "Programmer",
        "image": "",
        "email": "john@gmail.com",
        "phone": "(912) 555-4321",
        "url": "https://johndoe.com",
        "summary": "A summary of John Doe…",
        "location": {
            "address": "2712 Broadway St",
            "postalCode": "CA 94115",
            "city": "San Francisco",
            "countryCode": "US",
            "region": "California"
        },
        "network": "Twitter",
        "username": "john",
        "profiles": [{
            "url": "https://twitter.com/john"
        }]
    },
    "work": [{
        "name": "Company",
        "position": "President",
        "url": "https://company.com",
        "startDate": "2013-01-01",
        "endDate": "2014-01-01",
        "summary": "Description…",
        "highlights": [
            "Started the company"
        ]
    }],
    "volunteer": [{
        "organization": "Organization",
        "position": "Volunteer",
        "url": "https://organization.com/",
        "startDate": "2012-01-01",
        "endDate": "2013-01-01",
        "summary": "Description…",
        "highlights": [
            "Awarded 'Volunteer of the Month'"
        ]
    }],
}

function parseParam(category){
    return resume[category]
}

