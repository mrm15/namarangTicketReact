import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthProvider';
import MyQueryClientProvider from "./Components/MyQueryClientProvider/MyQueryClientProvider.tsx";
import swRegister from "./SW/swRegister.tsx"


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

swRegister();
// swUnregister()
