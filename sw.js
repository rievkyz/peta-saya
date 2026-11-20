const V='peta-saya-v2',SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(req,r)=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(req,cp))}return r};
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET')return;
 if(new URL(req.url).origin===location.origin){ // file aplikasi: utamakan versi terbaru
  e.respondWith(fetch(req).then(r=>put(req,r)).catch(()=>caches.match(req)));
 }else{ // tile dan library: utamakan cache
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>put(req,r)).catch(()=>hit)));
 }
});
