const swUnregister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const registration of registrations) {
                void registration.unregister().then((success) => {
                    if (success) {
                        console.log('Service Worker unregistered successfully.');
                    } else {
                        console.log('Service Worker unregistration failed.');
                    }
                });
            }
        }).catch(error => {
            console.error('Error during Service Worker unregistration:', error);
        });
    }
}
export default swUnregister