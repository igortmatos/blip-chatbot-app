// src/config/sessionConfig.js
module.exports = {
    secret: 'seu-segredo-aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Usar secure: true em ambientes HTTPS
};