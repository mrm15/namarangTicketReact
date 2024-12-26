import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// تعریف نوع استیت وب‌سوکت
interface WebSocketState {
    messages: any[]; // آرایه‌ای برای ذخیره پیام‌های دریافتی
}

// مقدار اولیه استیت
const initialState: WebSocketState = {
    messages: [],
};

// ساخت WebSocket Slice
const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        // اضافه کردن پیام جدید
        addMessage: (state, action: PayloadAction<any>) => {
            state.messages.push(action.payload);
        },
        // پاک کردن تمام پیام‌ها
        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const { addMessage, clearMessages } = websocketSlice.actions;
export default websocketSlice.reducer;
