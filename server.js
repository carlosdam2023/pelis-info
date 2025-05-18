// server.js
const express = require('express');
const path = require('path');
const open = require('open');
const app = express();

// Cambia 'tu-proyecto-angular' por el nombre de tu carpeta /dist
app.use(express.static(path.join(__dirname, 'dist/pelis-info')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/pelis-info/browser/index.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
  open(`http://localhost:${port}`); // Abre automáticamente el navegador
});
