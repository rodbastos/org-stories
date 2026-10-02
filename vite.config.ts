import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Serve as Netlify Functions em /api/* durante `npm run dev`,
// sem precisar instalar o netlify-cli.
function devFunctions(): Plugin {
  return {
    name: 'dev-netlify-functions',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      for (const [k, v] of Object.entries(env)) {
        if (!(k in process.env)) process.env[k] = v;
      }

      server.middlewares.use('/api', (req, res) => {
        const name = (req.url ?? '').split('?')[0].replace(/^\/+|\/+$/g, '');
        const file = join(process.cwd(), 'netlify', 'functions', `${name}.ts`);
        if (!name || !existsSync(file)) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Function /api/${name} não encontrada` }));
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', async () => {
          try {
            const mod = await server.ssrLoadModule(`/netlify/functions/${name}.ts`);
            const headers = new Headers();
            for (const [k, v] of Object.entries(req.headers)) {
              if (typeof v === 'string') headers.set(k, v);
            }
            const body = chunks.length ? Buffer.concat(chunks) : undefined;
            const request = new Request(`http://localhost/api/${name}`, {
              method: req.method,
              headers,
              body: req.method === 'GET' || req.method === 'HEAD' ? undefined : body,
            });
            const response: Response = await mod.default(request);
            res.statusCode = response.status;
            response.headers.forEach((v, k) => res.setHeader(k, v));
            res.end(Buffer.from(await response.arrayBuffer()));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), devFunctions()],
});
