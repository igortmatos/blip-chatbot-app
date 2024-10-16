// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const botRoutes = require('./routes/botRoutes');
const sessionConfig = require('./config/sessionConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session(sessionConfig));  // Configuração da sessão
app.use('/', botRoutes);          // Usa as rotas do bot

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Exporta para uso nos testes