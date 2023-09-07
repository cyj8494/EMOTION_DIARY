import React, {useEffect, useReducer, useRef} from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// 2개의 파라미터 (state, action)
const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case "INIT" : {
      return action.data;
    }
    case "CREATE" : {
      // const newItem = { ...action.data };
      newState = [action.data, ...state]; // 변경될 값
      break;
    }
    case "REMOVE" : {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case "EDIT" : {
      newState = state.map((it)=>it.id === action.data.id ? {...action.data} : it);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState)); // 모든 데이터의 crud는 reduce를 통하므로 여기서 로컬스토리지에 저장을 한다.
  return newState;
};

// Context API
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();



function App() {

  // data의 기본 state는 []
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {

    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort(
          (a,b) => parseInt(b.id) - parseInt(a.id)
      );

      if(diaryList.length >= 1) {
        dataId.current  = parseInt(diaryList[0].id) + 1;
        dispatch({type:"INIT", data: diaryList});
      }
    }
  }, []);


  // 일기 id로 사용
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type : "CREATE",
      data : {
        id: dataId.current,
        date : new Date(date).getTime(),
        content,
        emotion,
      }
    });
    dataId.current += 1;
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type : "EDIT",
      data : {
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion,

      }
    });
  };

  return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
          <BrowserRouter>
            <div className="App">
              <h2>App.js</h2>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<New />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/diary/:id" element={<Diary />} />
              </Routes>
            </div>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
  );
}

export default App;