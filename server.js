import http from 'http';

import app from './app.js';

const server = http.createServer(app);

const port = 3000

// pass a listener to the server to start it
server.listen(port, error => {
    console.log('listening on port '+port+ "...");
});