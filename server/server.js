const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = express();
api.use(bodyparser.json());
api.use(cors({
    origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type', 'Authorization'], optionsSuccessStatus: 200
}));
api.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});
const port = 5500;
api.post('/check-browser-version', (req, res) => {
    const { browser, version } = req.body;
    const filteredbrowser = browser.toLowerCase();
    const latestversion = getlatestversion(filteredbrowser);
    if (latestversion) {
        const islatest = parseInt(version, 10) >= latestversion;
        res.send({ islatest });
    } else {
        res.status(400).json({ error: 'Unsupported browser' })
    }
});
function getlatestversion(browser) {
    const browserslist = {
        opera: 111, chrome: 125, safari: 17, firefox: 126, msie: 11
    }
    return browserslist[browser];
}
api.listen(port);