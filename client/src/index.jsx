import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import { BrowserRouter } from 'react-router-dom';

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//    </Provider>
//   ,
//   document.getElementById('root')

// )

createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
);

