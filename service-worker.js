self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/cv.js',
                '/icon192.png',
                '/icon512.png',
                '/competences.html',
                '/contact.html',
                '/portfolio.html',
                '/curriculum.html',
                '/Competences_Thumbnail.jpg',
                '/Contact_Thumbnail.jpg',
                '/Portfolio_Thumbnail.jpg',
                '/Cv_Thumbnail.jpg',
                '/logo.png',
                '/thumbnail.jpg',
                '/Accueil_Thumbnail.jpg',
                '/TRAVIS.png',
                '/SHOPPLY.png',
                '/pdp.jpg',
                '/DENTAL.png',
                '/DECORIAT.png',
                '/Carte Visite.png',
                '/background.jpg',
                '/ALA.png',
                '/BOOK.png',
                '/JOKER.png',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});