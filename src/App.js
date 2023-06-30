import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useReducer, useRef } from 'react';


import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE':{
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case 'EDIT':{
      newState = state.map((it)=>it.id === action.data.id ? {...action.data} : it);
      break;
    }
    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummy = [
  {
    id: 1,
    emotion: 1,
    content: "일기1번",
    date: 1685762135005
  },
  {
    id: 2,
    emotion: 2,
    content: "일기2번",
    date: 1685762135006
  },
  {
    id: 3,
    emotion: 3,
    content: "일기3번",
    date: 1685762135007
  },
  {
    id: 4,
    emotion: 4,
    content: "일기4번",
    date: 1685762135008
  },
  {
    id: 5,
    emotion: 5,
    content: "일기5번",
    date: 1685762135009
  },
]

function App() {

  // const env = process.env;
  // env.PUBLIC_URL = env.PUBLIC_URL || "";

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(()=>{
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b)=>parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1;
      
      dispatch({type:"INIT", data:diaryList});
    }
  },[]);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type:"CREATE", data:{
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion
    },
  });
  dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type:"REMOVE", targetId});
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion)=>{
    dispatch({
      type: "EDIT",
      data:{
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader headText={"APP"} 
            leftChild={<MyButton text={"왼쪽 버튼"} onClick={() => alert("왼쪽 클릭")} />} 
            rightChild={<MyButton text={"오른쪽 버튼"} onClick={() => alert("오른쪽 클릭")} />}
            />
            <h2>App.js</h2>

            { <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
            <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
            <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
            <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
            <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} /> }

            <MyButton text={"버튼"} onClick={() => alert("click")} type={"positive"} />
            <MyButton text={"버튼"} onClick={() => alert("click")} type={"negative"} />
            <MyButton text={"버튼"} onClick={() => alert("click")} /> */}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
            
          </div>
        </BrowserRouter>

      </DiaryDispatchContext.Provider>


    </DiaryStateContext.Provider>
  );
}

export default App;
