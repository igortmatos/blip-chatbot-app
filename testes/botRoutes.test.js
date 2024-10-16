// tests/botRoutes.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Testando Rotas do Bot', () => {
    it('Deve redirecionar para login se não autenticado', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(302); // Verifica o redirecionamento
    expect(res.headers.location).toBe('/login');
    });

    it('Deve retornar erro de chave de API inválida', async () => {
        const res = await request(app).post('/login').send({ apiKey: 'chave-invalida' });
        expect(res.statusCode).toEqual(401); // Verifica o erro 401
        expect(res.text).toBe('Chave de API inválida.');
    });

  // Adicione mais testes conforme necessário para outras rotas
});
