const app = require('./api/translate'); // exportiertes Express-App-Objekt
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf Port ${PORT}`);
});
