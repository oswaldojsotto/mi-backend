import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Users CRUD', () => {
  describe('GET /users', () => {
    it('debería devolver lista de usuarios', async () => {
      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });

    it('debería tener estructura correcta', async () => {
      const res = await request(app).get('/users');
      expect(res.body).toHaveProperty('ok', true);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('message', 'Users retrieved');
      expect(res.body).toHaveProperty('errors');
    });

    it('cada usuario debería tener id, name, email, createdAt, updatedAt', async () => {
      const res = await request(app).get('/users');
      const user = res.body.data[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  describe('GET /users/:id', () => {
    it('debería devolver un usuario por id', async () => {
      const res = await request(app).get('/users/1');
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.data.id).toBe(1);
    });

    it('debería devolver 404 si el usuario no existe', async () => {
      const res = await request(app).get('/users/9999');
      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
    });
  });

  describe('POST /users', () => {
    it('debería crear un usuario con datos válidos', async () => {
      const res = await request(app)
        .post('/users')
        .send({ name: 'Test User', email: 'test@example.com' });

      expect(res.status).toBe(201);
      expect(res.body.ok).toBe(true);
      expect(res.body.data.name).toBe('Test User');
      expect(res.body.data.email).toBe('test@example.com');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('createdAt');
    });

    it('debería fallar si falta el nombre', async () => {
      const res = await request(app)
        .post('/users')
        .send({ email: 'test@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
    });

    it('debería fallar si el email es inválido', async () => {
      const res = await request(app)
        .post('/users')
        .send({ name: 'Test', email: 'not-an-email' });

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
    });

    it('debería fallar si el body está vacío', async () => {
      const res = await request(app)
        .post('/users')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
    });
  });

  describe('PUT /users/:id', () => {
    it('debería actualizar un usuario existente', async () => {
      const res = await request(app)
        .put('/users/1')
        .send({ name: 'Updated Alice' });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.data.name).toBe('Updated Alice');
    });

    it('debería devolver 404 si el usuario no existe', async () => {
      const res = await request(app)
        .put('/users/9999')
        .send({ name: 'No User' });

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
    });

    it('debería fallar si no se envía ningún campo', async () => {
      const res = await request(app)
        .put('/users/1')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
    });

    it('debería fallar si el email es inválido', async () => {
      const res = await request(app)
        .put('/users/1')
        .send({ email: 'bad-email' });

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
    });
  });

  describe('DELETE /users/:id', () => {
    it('debería eliminar un usuario existente', async () => {
      const res = await request(app).delete('/users/2');
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.data.id).toBe(2);
    });

    it('debería devolver 404 si el usuario no existe', async () => {
      const res = await request(app).delete('/users/9999');
      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
    });

    it('no debería encontrar el usuario eliminado', async () => {
      await request(app).delete('/users/3');
      const res = await request(app).get('/users/3');
      expect(res.status).toBe(404);
    });
  });
});
