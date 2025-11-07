const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;
const address = '127.0.0.1';
const dataPath = "data.json";

app.use(cors())
app.use(express.json())

function readData() {
    const content = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(content || "{}");
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

//GET
// Entire Resume
app.get('/resume', (req, res) => {
    try {
        const data = readData();
        if (Object.keys(data).length > 0) {
            res.json(data); // don't wrap in another "resume"
        } else {
            res.json({ text: "There is no information to be displayed." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read resume data." });
    }
})
//retrieves one section from resume
app.get('/:section', (req, res) => {
    try {
        //retrieve data from json
        const data = readData();
        const section = req.params.section;
        //if category doesn't exist on JSON, return empty object/array
        if (!data[section]) {
            data[section] = section === 'basics' ? {} : [];
        }
        res.status(200).json({ [section]: data[section] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//ADD
//Adds an entry to a resume Section
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
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

//PUT
//update existing section
app.put('/:section{/:index}', (req, res) => {
    try {
        const data = readData();
        const section = req.params.section;
        const index = req.params.index;

        if (!data[section]) {
            return res.status(404).json({ error: 'Section not found' });
        }

        if (section === 'basics') {
            // update basics object
            data[section] = { ...data[section], ...req.body };
        } else {
            // update array entry
            if (index === undefined || !data[section][index]) {
                return res.status(404).json({ error: 'Entry not found' });
            }
            data[section][index] = { ...data[section][index], ...req.body };
        }

        writeData(data);
        res.status(200).json( {[section]: data[section] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//DELETE
//Deletes existing section
app.delete('/:section{/:index}', (req, res) => {
    try {
        const data = readData();
        const section = req.params.section;
        const index = req.params.index || undefined;

        if (!data[section]) {
            return res.status(404).json({ error: 'Section not found' });
        }

        if (section === 'basics') {
            // delete entire basics object
            delete data[section];
        } else {
            // delete one entry from the array
            if (index === undefined || !data[section][index]) {
                return res.status(404).json({ error: 'Entry not found' });
            }
            data[section].splice(index, 1);
            // remove entire section if array becomes empty
            if (data[section].length === 0) {
                delete data[section];
            }
        }

        writeData(data);
        res.status(200).json({ success: true, section, remaining: data[section] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, address, () => {
    console.log(`Listening on port ${address}:${port}`)
});


