import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar/NavBar';

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/app/home' element={ <Home /> } />
            </Routes>
        </div>
    );
}

  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'))
