import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <BrowserRouter>
    <div className="App">
      <MyHeader headText={"App"}
                leftChild={
        <MyButton text={"왼쪽 버튼"} onClick={()=> alert("왼쪽 클릭")} />
      }
                  rightChild={
        <MyButton text={"오른쪽 버튼"} onClick={()=> alert("오른쪽 클릭")} />
      }
                />
      <h2>App.js</h2>  {/*// 페이지 전체적으로 보여주려면 routes 바깥에 두기*/}

      <MyButton text={"버튼"} onClick={()=> alert("버튼 클릭")} type={"positive"} />
      <MyButton text={"버튼"} onClick={()=> alert("버튼 클릭")} type={"negative"} />
      <MyButton text={"버튼"} onClick={()=> alert("버튼 클릭")} />

      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/new" element={<New />} />
        <Route path ="/edit" element={<Edit />} />
        <Route path ="/diary/:id" element={<Diary />} />
      </Routes>

      {/*<a href={"/new"}>NEW로 이동</a>  리액트 라우터에서 a 태그는 외부로 이동할때만*/}
    </div>
    </BrowserRouter>
);
}

export default App;
