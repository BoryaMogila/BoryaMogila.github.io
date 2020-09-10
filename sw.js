var staticCacheName = 'borya-static-v4';
var contentImgsCache = 'borya-content-imgs-v7';
var allCaches = [
    staticCacheName,
    contentImgsCache
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/public/js/freelancer.js',
                '/public/vendor/jquery/jquery.min.js',
                '/public/vendor/bootstrap/js/bootstrap.min.js',
                '/public/vendor/bootstrap/css/bootstrap.min.css',
                '/public/css/freelancer.css',
                '/public/css/bootstrap-material-design.css',
                '/public/css/ripples.css',
                '/public/vendor/font-awesome/css/font-awesome.min.css',
                '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
                '//fonts.googleapis.com/icon?family=Material+Icons',
                '//fonts.googleapis.com/css?family=Montserrat:400,700',
                '//fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic',
                '//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js'
            ]).catch(function (error) {
                console.log(error)
            });
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('borya-') &&
                        !allCaches.includes(cacheName);
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

/* self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
          event.respondWith(serveStatic(new Request('/index.html')));
            return;
        }
        if (requestUrl.pathname.startsWith('/public/img/')) {
            event.respondWith(servePhoto(event.request));
            return;
        }
        if (requestUrl.pathname.startsWith('/public/')) {
            event.respondWith(serveStatic(event.request));
            return;
        }

    }
    if (requestUrl.href.search(/jpg|png/gi) !== -1) {
        event.respondWith(caches.open(contentImgsCache).then(function (cache) {
                cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function (networkResponse) {
                        console.log(networkResponse);
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse
                        })
                })
            }).catch(function (error) {
                console.log(error)
            })
        );
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        }).catch(function (error) {
            console.log(error)
        })
    );
}); */
function servePhoto(request) {
    return caches.open(contentImgsCache).then(function(cache) {
        return cache.match(request.url).then(function(response) {
            var avatarFetch =  fetch(request).then(function(networkResponse) {
                cache.put(request.url, networkResponse.clone());
                return networkResponse;
            });
            return response || avatarFetch;
        });
    }).catch(function (error) {
        console.log(error)
    });
}
function serveStatic(request) {
    return caches.open(staticCacheName).then(function(cache) {
        return cache.match(request.url).then(function(response) {
            //noinspection JSUnresolvedFunction
            var staticFetch = fetch(request).then(function(networkResponse) {
                cache.put(request.url, networkResponse.clone());
                return networkResponse;
            });
            return response || staticFetch;
        });
    }).catch(function (error) {
        console.log(error)
    });
}
