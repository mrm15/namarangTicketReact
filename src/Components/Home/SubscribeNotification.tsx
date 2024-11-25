import React, {useEffect, useState} from 'react';
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import toast from "react-hot-toast";
import {v4 as uuidV4} from 'uuid'; // Install with `npm install uuid`

const SubscribeNotification = () => {

    const getDeviceId = () => {
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = uuidV4(); // Generate a UUID
            localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
    }
    const [showButton, setShowButton] = useState(false);
    const myAxios = useAxiosPrivate()

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

    const sendSubscriptionToServer = async (subscription: PushSubscription) => {
        try {

            const url = "/subscribe";
            // const data = JSON.stringify(subscription)
            const data = {
                deviceId: getDeviceId(),
                subscription,
            }

            const response = await myAxios.post(url, data);


            if (!response.ok) {
                throw new Error('Failed to store subscription on the server');
            }
            toast.success("نوتیفیکشن سایت برای شما فعال شد.")
        } catch (error) {
            console.error(error);
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


    const checkPushSubscription = async () => {
        try {

            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            debugger
            if (subscription) {
                console.log('User is already subscribed:', subscription);
                // Optionally, show a message to the user that they are already subscribed
            } else {
                setShowButton(true)

                console.log('User is not subscribed, prompting for subscription...');
                // If not subscribed, we will prompt them to subscribe
                requestNotificationPermission();

            }
        } catch (error) {
            console.error('Error checking subscription:', error);
        }
    };


    const {auth} = useAuth();

    useEffect(() => {

        if (auth?.userInfo?.userData?.phoneNumber) {
            // The user is logged in, proceed to check push subscription
            void checkPushSubscription();

        } else {
            console.log('User is not logged in');
        }
    }, [auth?.userInfo?.userData?.phoneNumber]);

    return (
        <div>

            {showButton && <button
                onClick={() => {
                    requestNotificationPermission()
                }}
            >فعالسازی نوتیف</button>}
        </div>
    );
};

export default SubscribeNotification;