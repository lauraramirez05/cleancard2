#!/usr/bin/env node
// test with:
//      curl -X POST --data-binary @server.js http://localhost:3000
const http = require('http');
var crypto = require('crypto');
const port = 3000;

// app.use(cors());

http
  .createServer((req, response) => {
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    response.setHeader('Content-Type', 'application/json');
    // POST only
    // Test route to check if the frontend is connected
    if (req.method.toLowerCase() === 'get' && req.url === '/test') {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.end(
        JSON.stringify({ status: 'success', message: 'Frontend connected' }) +
          '\n'
      );
      return;
    }

    if (req.method.toLowerCase() != 'post') {
      response.statusCode = 405;
      response.end(
        JSON.stringify({ status: 'error', kind: 'wrong method' }) + '\n'
      );
      return;
    }
    // file upload required
    let contentLength = parseInt(req.headers['content-length']);
    if (isNaN(contentLength) || contentLength <= 0) {
      response.statusCode = 411;
      response.end(
        JSON.stringify({ status: 'error', kind: 'no content supplied' }) + '\n'
      );
      return;
    }
    // hash the content
    let hash = crypto.createHash('sha256');
    req.pipe(hash);
    req.on('end', () => {
      hash.end();
      // synthesize some results
      rawDigest = hash.read();
      levels = [];
      for (var i = 0; i < 8; i++) {
        let val = rawDigest.readUInt32BE(i);
        levels.push(val / 4_294_967_295);
      }
      // pass them back to the frontend
      response.end(
        JSON.stringify({
          status: 'success',
          levels: levels,
        }) + '\n'
      );
    });
  })
  .listen(3000, () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
