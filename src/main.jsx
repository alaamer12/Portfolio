import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import {ThemeProvider} from './context/ThemeContext';
import {HelmetProvider} from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);
