(function () {
    if (!navigator.serviceWorker) return;
    navigator.serviceWorker.register('/sw.js?v=5').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
})();