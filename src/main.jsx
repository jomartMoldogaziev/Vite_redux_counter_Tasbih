import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import allReducers from './store/reducers/index.js';

const store = createStore(allReducers);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
