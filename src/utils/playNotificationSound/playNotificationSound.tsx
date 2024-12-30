import notificationSound from "../../assets/audio/sub_tel.mp3";

export const playNotificationSound = () => {
    const audio = new Audio(notificationSound); // For imported file
    // const audio = new Audio('/notification.mp3'); // For public folder
    audio.play().catch((error) => console.error('Error playing sound:', error));
};





export const playNotificationSoundAsync = async () => {
    try {
        const audio = new Audio(notificationSound); // For imported file
        // const audio = new Audio('/notification.mp3'); // For public folder
        await audio.play(); // Wait for the audio to start playing
        console.log('Notification sound is playing');
    } catch (error) {
        console.error('Error playing sound:', error);
    }
};
