// Violette : garde la page en cache pour qu'elle s'ouvre sans internet
const C='violette-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||!(u.origin===location.origin||u.hostname==='cdn.jsdelivr.net'))return;
 e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})
  .catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match(self.registration.scope))));
});
