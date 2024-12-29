import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useWebSocket from '../../hooks/useWebSocket';

const WebSocketComponent = () => {
    const messages = useSelector((state: RootState) => state.websocket.messages);
    const [messageInput, setMessageInput] = useState('');
    const { sendMessage } = useWebSocket('http://localhost:3001'); // Adjust URL to match your backend server

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            sendMessage({ type: 'chat', message: messageInput });
            setMessageInput('');
        }
    };

    return (
        <div>
            <h1>Socket.IO Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{JSON.stringify(message)}</li>
                ))}
            </ul>
            <input
                type="text"
                value={messageInput}
                onChange={handleInputChange}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
};

export default WebSocketComponent;
