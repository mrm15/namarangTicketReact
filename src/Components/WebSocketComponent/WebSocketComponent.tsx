import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWebSocket from "../../hooks/useWebSocket";


const WebSocketComponent: React.FC = () => {
    const { sendMessage } = useWebSocket('ws://localhost:3001'); // اتصال به وب‌سوکت
    const messages = useSelector((state:any) => state?.websocketReducer.messages); // انتخاب پیام‌ها از Redux

   const runHandler = ()=> sendMessage({ type: 'ping', data: 'Hello server!' });


    return (
        <div className={"text-black bg-white p-5 absolute top-0 left-0"}>
            <h1 onClick={runHandler}>WebSocket Messages</h1>
            <div className={"overflow-scroll bg-gray-300 w-96 h-screen"}>
                {messages.map((msg, index) => (
                    <ul key={index} className={"flex justify-start gap-1 border border-gray-400"}>
                        <li  className={"w-8"}> {index}</li>
                        <li > {JSON.stringify(msg)}</li>
                    </ul>
                )).reverse()}
            </div>
        </div>
    );
};

export default WebSocketComponent;
