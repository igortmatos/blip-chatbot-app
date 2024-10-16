// src/routes/botRoutes.js
const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

// Middleware de autenticação
const checkAuth = (req, res, next) => {
    if (!req.session.apiKey) {
        return res.redirect('/login');
    }
    next();
};

router.get('/login', (req, res) => {
    res.send(`
    <form action="/login" method="POST">
        <input type="text" name="apiKey" placeholder="Insira sua chave API" required />
        <button type="submit">Login</button>
    </form>
    `);
});

router.post('/login', botController.login);

router.get('/', checkAuth, botController.getContacts);

router.get('/contato/:id', checkAuth, botController.getConversation);

module.exports = router;