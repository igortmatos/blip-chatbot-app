// src/controllers/botController.js
const axios = require('axios');

// Função para login
exports.login = (req, res) => {
    const { apiKey } = req.body;
    
    axios.get('https://http.msging.net/commands', {
    headers: { Authorization: `Key ${apiKey}` },
    }).then(() => {
        req.session.apiKey = apiKey;
        res.redirect('/');
    })
    .catch(() => res.status(401).send('Chave de API inválida.'));
};

// Função para exibir contatos
exports.getContacts = (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    axios.post('https://http.msging.net/commands', {
        id: '1',
        method: 'get',
        uri: `/contacts?$skip=${skip}&$take=${limit}`,
    }, 
    {
    headers: { Authorization: `Key ${req.session.apiKey}` },
    }).then(response => {
        const contacts = response.data.resource.items;
        res.send(`
        <h1>Lista de Contatos (Página ${page})</h1>
        <ul>
            ${contacts.map(contact => `<li><a href="/contato/${contact.identity}">${contact.identity}</a></li>`).join('')}
        </ul>
        `);
    }).catch(() => res.status(500).send('Erro ao buscar contatos.'));
};

// Função para exibir conversa
exports.getConversation = (req, res) => {
    const contactId = req.params.id;
    axios.post('https://http.msging.net/commands', {
        id: '1',
        method: 'get',
        uri: `/threads/${contactId}`,
    }, {
        headers: { Authorization: `Key ${req.session.apiKey}` },
    }).then(response => {
        const messages = response.data.resource.items;
        res.send(`
        <h1>Conversa com ${contactId}</h1>
        <ul>
            ${messages.map(msg => `<li>${msg.content}</li>`).join('')}
        </ul>
        `);
    }).catch(() => res.status(500).send('Erro ao carregar a conversa.'));
};