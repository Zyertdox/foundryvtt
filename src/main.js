import express from 'express';
import { spawn } from 'child_process';

const app = express();

let PORT = 30000;
process.argv.forEach(arg => {
    if (arg.startsWith('--port=')) {
        const portValue = arg.split('=')[1];
        if (portValue && !isNaN(portValue)) {
            PORT = parseInt(portValue, 10);
        } else {
            console.error('Invalid port value. Falling back to default port 30000.');
        }
    }
});

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Foundry</title>
</head>
<body>
    <h1>Update Foundry</h1>
    <form id="scriptForm">
        <input type="text" id="inputField" placeholder="Enter input" required />
        <button type="submit">Execute</button>
    </form>
    <pre id="output"></pre>

    <script>
        document.getElementById('scriptForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const input = document.getElementById('inputField').value;
            const outputElement = document.getElementById('output');
            outputElement.textContent = ''; // Clear previous output

            const response = await fetch('/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input }),
            });

            if (!response.body) {
                outputElement.textContent = 'No response received.';
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let previous = '';

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                let decoded = decoder.decode(value);
                if(previous !== decoded){
                    outputElement.textContent += decoder.decode(value);
                    previous = decoded;
                }
            }
        });
    </script>
</body>
</html>
    `;
    res.send(htmlContent);
});

// Endpoint to execute the script
app.post('/execute', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send('Input is required');
    }

    // Spawn the shell script asynchronously
    const script = spawn('/scripts/update.sh', [input]);

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
