import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthProvider';
import MyQueryClientProvider from "./Components/MyQueryClientProvider/MyQueryClientProvider.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <MyQueryClientProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </MyQueryClientProvider>
    </Provider>
    // </React.StrictMode>,
)

// Request notification permission when the app loads
if ('Notification' in window && navigator.serviceWorker) {
    void Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else if (permission === 'denied') {
            console.log('Notification permission denied.');
        } else {
            console.log('Notification permission dismissed.');
        }
    });
}

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Service Worker registration (add this part below the render method)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log(`window.addEventListener('load')   FIRED!1️⃣`)
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log(`navigator.serviceWorker.register('/service-worker.js') FIRED!12️⃣`)
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log(`catch(error ) register('/service-worker FIRED! 🔴🔴`)

                console.error('Service Worker registration failed:', error);
            });
    });
}