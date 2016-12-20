(function () {
    if (!navigator.serviceWorker) return;
    navigator.serviceWorker.register('/public/js/sw.js', {scope: '/'}).then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });

        // if (reg.waiting) {
        //         var toast = this._toastsView.show("New version available", {
        //             buttons: ['refresh', 'dismiss']
        //         });
        //
        //         toast.answer.then(function(answer) {
        //             if (answer != 'refresh') return;
        //             worker.postMessage({action: 'skipWaiting'});
        //         });
        // }
        //
        // if (reg.installing) {
        //     indexController._trackInstalling(reg.installing);
        //     return;
        // }
        //
        // reg.addEventListener('updatefound', function() {
        //     indexController._trackInstalling(reg.installing);
        // });

})();