import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Log from "./components/Log"
import Dashboard from './components/Dash';
import Register from './components/Register';
import Todo from './components/Todo';
import VerTarea from './components/VerTarea';
import ToBuyList from './components/ToBuy';
import WishList from './components/Wish';
import MoodList from './components/Mood';
import Ciclo from './components/Ciclo';


const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path='/login' exact element={<Log />} />
        <Route path='/register' exact element={<Register />} />
        <Route path="/" exact element={<Dashboard />} />
        <Route path='/todo' exact element={<Todo />} />
        <Route path='/todo/:id' exact element={<VerTarea />} />
        <Route path='/tobuy' exact element={<ToBuyList/>} />
        <Route path='/wish' exact element={<WishList/>} />
        <Route path='/mood' exact element={<MoodList/>} />
        <Route path='/ciclo' exact element={<Ciclo/>} />
      </Routes>
    </div>
  )
}

export default App;


//import New from "./components/New";
// <Route path='/pirate/new' exact element={<New/>} />