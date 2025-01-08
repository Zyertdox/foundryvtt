const express = require('express');
const { spawn } = require('child_process');
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

    // Spawn the shell script asynchronously
    const script = spawn('./script.sh', [input]);

    // Stream output back to the client
    res.setHeader('Content-Type', 'text/plain');

    script.stdout.on('data', (data) => {
        res.write(data.toString());
    });

    script.stderr.on('data', (data) => {
        res.write(data);
    });

    script.on('close', (code) => {
        res.end(`\nScript finished with exit code ${code}`);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
