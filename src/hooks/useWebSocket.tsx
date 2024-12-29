import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/websocket/websocketSlice';
import useAuth from './useAuth.tsx';

const useWebSocket = (url: string) => {
    const { auth } = useAuth();
    const userId = auth?.userInfo?.userData?.userId;
    const socketRef = useRef<Socket | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io(url, {
            transports: ['websocket'], // Use WebSocket as the transport
            // auth: {
            //     token: `Bearer ${auth?.accessToken}`, // Attach the token here
            // },
        });
        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('Socket.IO connected');
            socket.emit('identify', { userId });
        });

        socket.on('response', (message) => {
            console.log('Received message from server:', message);
            dispatch(addMessage(message)); // Add message to Redux store
        });

        // Clean up on unmount
        return () => {
            socket.disconnect();
        };
    }, [url, dispatch, userId]);

    // Function to send messages
    const sendMessage = (message: any) => {
        if (socketRef.current) {
            socketRef.current.emit('message', message);
        } else {
            console.warn('Socket.IO is not connected');
        }
    };

    return { sendMessage };
};

export default useWebSocket;
