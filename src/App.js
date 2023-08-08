import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RouteTest from "./components/RouteTest";

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h2>App.js</h2>  {/*// 페이지 전체적으로 보여주려면 routes 바깥에 두기*/}
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/new" element={<New />} />
        <Route path ="/edit" element={<Edit />} />
        <Route path ="/diary/:id" element={<Diary />} />
      </Routes>
      <RouteTest/>
      {/*<a href={"/new"}>NEW로 이동</a>  리액트 라우터에서 a 태그는 외부로 이동할때만*/}
    </div>
    </BrowserRouter>
);
}

export default App;
