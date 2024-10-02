function requestNotificationPermission(retryCount = 0) {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications.');
        return;
    }

    // Max retries to avoid infinite loop, can set any limit
    const MAX_RETRIES = 3;

    void Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else if (permission === 'denied') {
            console.log('Notification permission denied.');
        } else if (permission === 'default') {
            // Retry if permission is dismissed (i.e., neither granted nor denied)
            console.log('Notification permission dismissed. Retrying...');

            if (retryCount < MAX_RETRIES) {
                setTimeout(() => {
                    requestNotificationPermission(retryCount + 1);
                }, 2000); // Add a small delay before retrying
            } else {
                console.log('Max retries reached, not retrying anymore.');
            }
        }
    });
}


const swRegister = () => {


    // Call the function to request notification permission
    requestNotificationPermission();

// Service Worker registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
}
export default swRegister