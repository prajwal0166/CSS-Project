const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = express();

api.use(bodyParser.json());

// CORS configuration
api.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));

// Logging middleware
api.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

const port = 5500;

// Handle OPTIONS requests (CORS preflight requests)
api.options('/check-browser-version', (req, res) => {
    res.sendStatus(200);
});

// POST endpoint to check browser version
api.post('/check-browser-version', (req, res) => {
    const { browser, version } = req.body;
    const filteredBrowser = browser.toLowerCase();
    const latestVersion = getLatestVersion(filteredBrowser);
    if (latestVersion) {
        const isLatest = parseInt(version, 10) >= latestVersion;
        res.send({ isLatest });
    } else {
        res.status(400).json({ error: 'Unsupported browser' });
    }
});

function getLatestVersion(browser) {
    const browsersList = {
        opera: 111,
        chrome: 125,
        safari: 17,
        firefox: 126,
        msie: 11
    };
    return browsersList[browser];
}

api.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
