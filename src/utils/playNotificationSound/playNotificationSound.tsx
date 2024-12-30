import notificationSound from "../../assets/audio/sub_tel.mp3";

export const playNotificationSound = () => {
    const audio = new Audio(notificationSound); // For imported file
    // const audio = new Audio('/notification.mp3'); // For public folder
    audio.play().catch((error) => console.error('Error playing sound:', error));
};