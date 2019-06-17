console.log("HAI");
self.addEventListener("install",  (e) => {
  console.log("Sw Install");
  e.waitUntil(
    caches.open("my_first_cache").then( (cache) => {
      return cache.addAll([

      ]);

    })
  );
});
self.addEventListener("fetch", (event) => {
  console.log("fetch");
  event.respondWith(
    caches.open("my_first_cache").then(function (cache) {
      return cache.match(event.request).then((resp) => {
        return resp || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });

      });
    })
  );

});
self.addEventListener('activate', function(event) {
  console.log("activate");
  var cacheKeeplist = [];
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
