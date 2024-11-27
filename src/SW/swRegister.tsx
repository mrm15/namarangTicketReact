const swRegister = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);

                    // Check for updates by listening to 'updatefound' event
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed') {
                                    console.log('New service worker installed');

                                    if (navigator.serviceWorker.controller) {
                                        console.log(`
                                        طراح سایت نمارنگ میگه:
                        alert('A new version is available! Please refresh the page to get the latest updates.');

                                        `)
                                        //alert('A new version is available! Please refresh the page to get the latest updates.');
                                    }
                                }
                            });
                        }
                    });

                    return registration.update();  // Return the promise
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
}
export default swRegister