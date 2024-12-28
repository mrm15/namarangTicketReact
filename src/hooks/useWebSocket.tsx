import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {addMessage} from "../store/websocket/websocketSlice";
import useAuth from "./useAuth.tsx"; // ایمپورت اکشن برای اضافه کردن پیام


const useWebSocket = (url: string) => {
    const {auth} = useAuth();
    // const phoneNumber = auth?.userInfo?.userData?.phoneNumber || 0
    const userId = auth?.userInfo?.userData?.userId

    const socketRef = useRef<WebSocket | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // اتصال به وب‌سوکت
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('WebSocket connected');
            socket.send(JSON.stringify({ type: 'identify', data: { userId: userId } }));

        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);

            // اضافه کردن پیام به استیت Redux
            dispatch(addMessage(message));
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // بستن اتصال هنگام خروج از کامپوننت
        return () => {
            socket.close();
        };
    }, [url, dispatch]);

    // تابعی برای ارسال پیام
    const sendMessage = (message: any) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not connected');
        }
    };

    return { sendMessage }; // فقط تابع ارسال پیام بازگردانده می‌شود
};

export default useWebSocket;
