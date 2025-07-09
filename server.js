const app = require("./api/translate");
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
