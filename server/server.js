
// Backend: Node.js + Express (server.js)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function construirPrompt(form) {
  return `Diseña un personaje Funko Pop llamado ${form.nombre}, con una cabeza grande y ojos negros estilo Funko. Lleva ${form.ropa}, con colores ${form.colores}. El estilo general es ${form.estilo}. Sostiene ${form.accesorios} y está en una pose ${form.pose}. El fondo es ${form.fondo}. Figura vinilo coleccionable, estilo caricaturesco pero detallado.`;
}

app.post("/generar", async (req, res) => {
  const form = req.body;
  const prompt = construirPrompt(form);

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    res.json({ image: response.data.data[0].url });
  } catch (err) {
    console.error("Error al generar imagen:", err);
    res.status(500).send("Error al generar imagen");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
