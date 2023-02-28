import React, { useEffect, useMemo, useState } from 'react';
import "./App.css";
import Quiz from './components/Quiz';
import Start from './components/Start';
import Timer from './components/Timer';

const App = () => {

  const [ userName, setUserName ] = useState(null);
  const [qnNumber, setQnNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(()=> [
    {id: 1, amount: "$ 100"},
    {id: 2, amount: "$ 200"},
    {id: 3, amount: "$ 300"}
  ].reverse(),[]);

  useEffect(()=>{
    if(qnNumber > 1 && qnNumber <= 3){
      setEarned(moneyPyramid.find((m)=> m.id === qnNumber-1).amount);
    }else if(qnNumber === 4){
      setStop(true);
      setEarned("$ 300");
    }
  },[moneyPyramid,qnNumber])
  return (
    <div className='app'>
      {userName ? (
      <>
      <div className='main'>
        {stop ? <h1 className='end-text'>You earned:{earned} </h1>: (
        <>
        <div className='top'>
          <div className='timer'>
            <Timer setStop={setStop} qnNumber={qnNumber} />
          </div>
        </div>
        <div className='bottom'>
          <Quiz data={data} setStop={setStop} setQnNumber={setQnNumber} qnNumber={qnNumber} />
        </div>
        </>)}
      </div>
      <div className='pyramid'>
        <ul className='moneylist'>
          {moneyPyramid.map((m)=>(
          <li className={qnNumber === m.id ? 'money active':'money'}>
            <span className='moneyNumber'>{m.id}</span>
            <span className='moneyAmount'>{m.amount}</span>
          </li>
          ))}
        </ul>
      </div>
      </>
      ) : <Start setUserName={setUserName} />}
    </div>
  )
}

export default App