//Start with smallest step, client sending text to server, server updates JSON

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;
const address = '127.0.0.1';
const dataPath = "./data.json";

app.use(cors())
app.use(express.json())

function readData() {
    const raw = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(raw);
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

//should return full resume,
app.get('/resume', (req, res) => {
    const data = readData();
    Object.keys(data).length > 0 ? res.json(data) : res.json({"text" : "There is no information to be displayed."});
})

app.post('/:category', (req, res) => {
    try {
        const newEntry = req.body;
        const category = req.params.category;
        //retrieve data from json
        const data = readData();
        //assign the new entry
        if (category === 'basics') {
            data[category] = newEntry
        } else {
            if (!Array.isArray(data[category])) data[category] = [];
            data[category].push(newEntry);
        }
        //write the new data to the json
        writeData(data);
        // return the updated section
        res.json(data[category]);
    }
    catch (err) {
        console.error(err);
    }
})

app.delete('/:category/:title', (req, res) => {
    //TODO: remove the information to resume.basics
    // can we just create a new copy? and delete the old one once the new one has been created?
    let list = parseParam(req.params.category).category;
    console.log(list);
    let newList = [];
    for (let i = 0; i < list.length(); i++) {
        if (!list[i].position.equals(req.params.title)) {
            newList.push(list[i]);
        }
    }
    parseParam(req.params.category).category = newList;

})

app.get('/:category', (req, res) => {
    const data = readData();
    const category = req.params.category;
    res.json(data[category])
})

app.listen(port, address, () => {
    console.log(`Listening on port ${address}:${port}`)
});

app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({error: err.message});
});

function parseParam(category) {
    return resume[category]
}

