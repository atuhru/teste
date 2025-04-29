import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginForm from './LoginForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginForm onSubmit={(data) => console.log(data)} />);
