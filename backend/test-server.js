const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log('Server on port', PORT));
