import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoList from './Components/List/TodoList';
import HomePage from './Components/Home';
import Timer from './Components/Timer';
import CountDown from './Components/CountDownTimer/CountDown';
import { MouseFollow } from './Components/FollowMouse';
import FolderStruc from './Components/FolderStructure';
import Tabs from './Components/Tabs/Tabs';
import ProgressBar from './Components/ProgressBar';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route path='todo' element={<TodoList />} />
          <Route path='timer' element={<Timer />} />
          <Route path='countdown' element={<CountDown />} />
          <Route path='mouse' element={<MouseFollow />} />
          <Route path='folder' element={<FolderStruc />} />
          <Route path='Tab_form' element={<Tabs />} />
          <Route path='progress_bar' element={<ProgressBar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
