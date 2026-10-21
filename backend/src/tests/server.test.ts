import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../server.js';
import { AddressInfo } from 'node:net';
import http from 'node:http';

test('Backend API Integration Tests', async (t) => {
  let server: http.Server;
  let baseUrl: string;

  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const address = server.address() as AddressInfo;
      baseUrl = `http://localhost:${address.port}`;
      resolve();
    });
  });

  t.after(() => {
    server.close();
  });

  await t.test('GET /health returns healthy status and uptime', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    const data = await res.json() as any;
    assert.equal(data.status, 'healthy');
    assert.equal(data.service, 'easwar-portfolio-api');
    assert.ok(typeof data.uptime === 'number');
  });

  await t.test('GET /api/projects returns verified projects catalog', async () => {
    const res = await fetch(`${baseUrl}/api/projects`);
    assert.equal(res.status, 200);
    const data = await res.json() as any;
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.projects));
    assert.ok(data.projects.length >= 4);

    const first = data.projects[0];
    assert.ok(first.title);
    assert.ok(first.techStack.length > 0);
  });

  await t.test('GET /api/projects/:slug returns specific project', async () => {
    const res = await fetch(`${baseUrl}/api/projects/ai-personalized-learning`);
    assert.equal(res.status, 200);
    const data = await res.json() as any;
    assert.equal(data.success, true);
    assert.equal(data.project.title, 'AI Personalized Learning Platform');
  });

  await t.test('GET /api/meta returns verified developer metadata', async () => {
    const res = await fetch(`${baseUrl}/api/meta`);
    assert.equal(res.status, 200);
    const data = await res.json() as any;
    assert.equal(data.success, true);
    assert.equal(data.meta.name, 'Easwar S');
    assert.equal(data.meta.github, 'https://github.com/siva2787');
  });

  await t.test('POST /api/contact validates inputs properly and rejects invalid bodies', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'not-an-email', message: 'hi' }),
    });
    assert.equal(res.status, 400);
    const data = await res.json() as any;
    assert.equal(data.success, false);
    assert.ok(data.errors);
  });

  await t.test('POST /api/contact reports honestly when email delivery is not configured', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Recruiter User',
        email: 'recruiter@techcompany.com',
        subject: 'Engineering Opportunity',
        message: 'Hello Easwar, we reviewed your AI projects and would love to connect!',
      }),
    });
    assert.equal(res.status, 503);
    const data = await res.json() as any;
    assert.equal(data.success, false);
  });
});
