import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
const MIME = {'.otf':'font/otf','.woff2':'font/woff2','.ttf':'font/ttf','.png':'image/png','.svg':'image/svg+xml','.jpg':'image/jpeg'};
let html = readFileSync('index.html','utf8');
const rutas = [...new Set(html.match(/assets\/[A-Za-z0-9_\-./]+\.(otf|woff2|png|svg|jpg)/g))];
let total = 0;
for(const r of rutas){
  const ext = r.slice(r.lastIndexOf('.'));
  const buf = readFileSync(r);
  total += buf.length;
  const uri = `data:${MIME[ext]};base64,${buf.toString('base64')}`;
  html = html.split(r).join(uri);
}
// el formato local() ya no hace falta cuando la fuente viaja adentro
html = html.replace('<title>Feed Planner</title>', '<title>Feed Planner</title>\n<meta name="theme-color" content="#ffffff">\n<meta name="apple-mobile-web-app-capable" content="yes">');
mkdirSync('dist', {recursive:true});
writeFileSync('dist/Feed Planner.html', html);
console.log(`${rutas.length} assets · ${(total/1024).toFixed(0)} KB originales · archivo final ${(Buffer.byteLength(html)/1024/1024).toFixed(2)} MB`);
