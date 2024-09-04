import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoList from './Components/List/TodoList';
import HomePage from './Components/Home';
import Timer from './Components/Timer';
import CountDown from './Components/CountDownTimer/CountDown';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="todo" element={<TodoList />} />
          <Route path="timer" element={<Timer />} />
          <Route path="countdown" element={<CountDown />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
