self.addEventListener("install", e=>{
    console.log("Updated idk");
    e.waitUntil(
    caches.open("static").then(cache=>{
        return cache.addAll(["./", "./download.png"]);
    })
   );
});

self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request);
        })
    );
});

