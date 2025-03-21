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
import InfiniteScroll from './Components/InfiniteScroll/InfiniteScroll';
import AutoComplete from './Components/AutoSuggestion/AutoComplete';
import Form from './Components/StepperForm/Form';
import MPBar from './Components/MultipleProgressBar/MultipleProgressBar';
import Pagination from './Components/Pagination/Pagination';
import Folder from './Components/FolderTree/Folder';
import StarRating from './Components/StarRating/StarRating';
import ChessBoard from './Components/Chessboard/index';

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
          {/* Zepto Interview Prep Questions */}
          <Route path={'infinite_scroll'} element={<InfiniteScroll />} />
          <Route path={'autoComplete'} element={<AutoComplete />} />
          <Route path={'stepperForm'} element={<Form />} />
          <Route path={'mpbar'} element={<MPBar />} />
          <Route path={'pagination'} element={<Pagination />} />
          <Route path={'treeFolder'} element={<Folder />} />
          <Route path={'star'} element={<StarRating />} />
          {/* IVP INTERVIEW QUESTION */}
          <Route path={'chess'} element={<ChessBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
