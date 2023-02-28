import React, { useEffect, useState } from 'react'

const Quiz = ({data, setStop, setQnNumber,qnNumber}) => {

  const [question, setQuestion] = useState(null);
  const [selectedAns, setSelectedAns] = useState(null);
  const [className , setClassName] = useState('answer');

  useEffect(() =>{
    setQuestion(data[qnNumber-1]);
  },[data,qnNumber]);

  const delay = (duration , callback) =>{
    setTimeout(()=>{
      callback();
    },duration);
  }

  const handleClick = (e)=>{
    setSelectedAns(e);
    setClassName("answer active");
    delay(1000,()=>{
      setClassName(e.correct ? "answer correct" : "answer wrong");
    });
    delay(4000,()=>{
      if(e.correct){
        setQnNumber((prev)=>prev+1);
        setSelectedAns(null);
      }
      else{
        setStop(true);
      }
    })
  }
  
  return (
    <div className='quiz'>
        <div className='question'>{question?.question}</div>
        <div className='answers'>
          {question?.answers.map((m) => {
              return <div className={ selectedAns=== m ? className :"answer"} onClick={()=>handleClick(m)}>{m.text}</div>  
          })}
        </div>
    </div>
  )
}

export default Quiz