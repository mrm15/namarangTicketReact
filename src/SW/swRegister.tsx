const sendSubscriptionToServer = async (subscription: PushSubscription) => {
    try {

        const response = await fetch('http://localhost:3001/subscribe/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
        });


        if (!response.ok) {
            throw new Error('Failed to store subscription on the server');
        }
        console.log('Subscription sent to server');
    } catch (error) {
        console.error(error);
    }
};

const subscribeUserToPush = async () => {
    try {
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BFwnHq2aI1MFaLa6rbf4nV7f-A6bjfenDdR-X12LaoVOISVI5KKVYnetEvsNk-jteDf4COKwXyZ-kUaR3KvgtdY')
        });

        console.log('User subscribed:', subscription);
        return subscription;
    } catch (error) {
        console.error('Failed to subscribe user:', error);
        return null;
    }
};

const handlePushSubscription = async () => {

    const subscription = await subscribeUserToPush()
    if (subscription) {
        await sendSubscriptionToServer(subscription)
    }
};

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
            void handlePushSubscription()
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

// Define the subscription functions (or you can import them from a separate file)
const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};



const swRegister = () => {




// Service Worker registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    // Call the function to request notification permission
                    // requestNotificationPermission()
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
}
export default swRegister