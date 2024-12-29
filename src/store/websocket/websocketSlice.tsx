import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the WebSocket state type
interface WebSocketState {
    messages: any[]; // Array to store received messages
}

// Initial state for WebSocket slice
const initialState: WebSocketState = {
    messages: [],
};

// WebSocket slice to handle messages
const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        // Add a new message to the state
        addMessage: (state, action: PayloadAction<any>) => {
            state.messages.push(action.payload);
        },
        // Clear all messages from the state
        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

// Export actions
export const { addMessage, clearMessages } = websocketSlice.actions;
export default websocketSlice.reducer;
