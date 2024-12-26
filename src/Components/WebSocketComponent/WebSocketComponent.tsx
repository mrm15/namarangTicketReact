import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWebSocket from "../../hooks/useWebSocket";


const WebSocketComponent: React.FC = () => {
    const { sendMessage } = useWebSocket('ws://localhost:3001'); // اتصال به وب‌سوکت
    const messages = useSelector((state:any) => state?.websocketReducer.messages); // انتخاب پیام‌ها از Redux

    useEffect(() => {
        // ارسال پیام به سرور
        sendMessage({ type: 'ping', data: 'Hello server!' });
    }, []);

    return (
        <div className={"text-black bg-white p-5"}>
            <h1>WebSocket Messages</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{JSON.stringify(msg)}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;
