// import ReactDOM from 'react-dom/client';

// //
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(<App />);

// // If you want to enable client cache, register instead.
// serviceWorker.unregister();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import ReactDOM from 'react-dom';
import React from 'react'
import ReactDOM,{ createRoot } from 'react-dom'; // Import createRoot from 'react-dom' for React v18
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root')); // Use createRoot instead of ReactDOM.render

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.unregister();
reportWebVitals();