import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const Test = (text: string): string => {
  return `This is your text: ${text}`;
};



document.addEventListener('DOMContentLoaded', function(event) {
  console.log(Test('lol'));

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('main-content')
  );
});