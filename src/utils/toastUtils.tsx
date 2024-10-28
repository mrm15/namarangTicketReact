import { toast, ToastOptions } from 'react-hot-toast';

// Common configuration for all toasts
const defaultOptions: ToastOptions = {
    // position: 'bottom-left',
    duration: 3000,
    style: {
        background: '#fff',
        color: '#000',
    },
};

// Generic function to merge custom options with default options
const mergeOptions = (customOptions?: ToastOptions): ToastOptions => {
    return { ...defaultOptions, ...customOptions, style: { ...defaultOptions.style, ...customOptions?.style } };
};

// Show success toast
export const showSimpleToast = (message: string, customOptions?: ToastOptions) => {
    toast(message, mergeOptions(customOptions));
};
// Show success toast
export const showSuccessToast = (message: string, customOptions?: ToastOptions) => {
    toast.success(message, mergeOptions(customOptions));
};

// Show error toast
export const showErrorToast = (message: string, customOptions?: ToastOptions) => {
    toast.error(message, mergeOptions(customOptions));
};

// Show loading toast
export const showLoadingToast = (message: string, customOptions?: ToastOptions) => {
    return toast.loading(message, mergeOptions(customOptions));
};

// Dismiss a toast by ID
export const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
};

// Update a loading toast to success or error
export const updateToast = (toastId: string, message: string, success = true, customOptions?: ToastOptions) => {
    dismissToast(toastId);
    if (success) {
        showSuccessToast(message, customOptions);
    } else {
        showErrorToast(message, customOptions);
    }
};

// Show a custom emoji toast
export const showEmojiToast = (message: string, emoji: string, customOptions?: ToastOptions) => {
    toast(`${emoji} ${message}`, mergeOptions(customOptions));
};
