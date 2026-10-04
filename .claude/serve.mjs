import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.otf':'font/otf','.woff2':'font/woff2'};

// --- Supabase de mentira, sólo para probar el sync en local ---
const tabla = new Map();
const cuerpo = req => new Promise(r=>{ let d=''; req.on('data',c=>d+=c); req.on('end',()=>r(d)) });

createServer(async (req,res)=>{
  const u = new URL(req.url, 'http://x');
  if(u.pathname === '/rest/v1/feed'){
    res.setHeader('access-control-allow-origin','*');
    res.setHeader('access-control-allow-headers','*');
    res.setHeader('access-control-allow-methods','GET,POST,OPTIONS');
    if(req.method === 'OPTIONS'){ res.writeHead(204); return res.end() }
    if(req.method === 'GET'){
      const id = (u.searchParams.get('id')||'').replace(/^eq\./,'');
      const fila = tabla.get(id);
      res.writeHead(200, {'content-type':'application/json'});
      return res.end(JSON.stringify(fila ? [fila] : []));
    }
    if(req.method === 'POST'){
      const [f] = JSON.parse(await cuerpo(req));
      tabla.set(f.id, f);
      console.log('upsert', f.id, f.actualizado, 'slots:', f.datos?.slots?.length);
      res.writeHead(201); return res.end();
    }
  }
  let p = decodeURIComponent(u.pathname);
  if(p === '/') p = '/index.html';
  try{
    const buf = await readFile(join(root, p));
    res.writeHead(200, {'content-type': types[extname(p)] || 'application/octet-stream', 'cache-control':'no-store'});
    res.end(buf);
  }catch(e){ res.writeHead(404); res.end('404') }
}).listen(5178, ()=> console.log('serving on http://localhost:5178'));
