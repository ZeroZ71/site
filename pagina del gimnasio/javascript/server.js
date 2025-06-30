// Importa el módulo HTTP de Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Crea el servidor
const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    // Determina el tipo de contenido
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Archivo no encontrado</h1>', 'utf-8');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// El servidor escucha en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000/');
});
