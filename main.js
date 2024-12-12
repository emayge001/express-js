const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((req, res) => {
    const requestUrl = req.url;

    if (requestUrl === '/') {
        fs.readFile('index.html', (error, data) => {
            if (error) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('<h1>File not read, Page Not Found</h1>');
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else if (requestUrl === '/about.html') {
        fs.readFile('./about.html', (error, data) => {
            if (error) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('<h1>File not read, Page Not Found</h1>');
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else if (requestUrl === '../services') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Services page</h1>');
        res.end();
    } else if (requestUrl === './contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Contact Page from the server</h1>');
        res.end();
    } else if (requestUrl.startsWith('/images/')) {
        const imagePath = path.join(__dirname, requestUrl);
        const imageStream = fs.createReadStream(imagePath);
        
        imageStream.on('open', () => {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Change content type according to your image type
            imageStream.pipe(res);
        });

        imageStream.on('error', () => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('<h1>Image not found</h1>');
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>Page Not Found</h1>');
        res.end();
    }
}).listen(3090, () => {
    console.log('Server is running on http://localhost:3090');
});
