const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to execute the script
app.post('/execute', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send('Input is required');
    }

    // Execute the shell script
    exec(`./script.sh "${input}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send(`Error: ${stderr}`);
        }
        res.send(stdout);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
