import React, {useState, useEffect} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timer, setTimer] = useState('25:00')
  const [paused, setPaused] = useState(true)
  const [seconds, setSeconds] = useState(60)
  const [clockStart, setClockStart] = useState(false)
  const [sessionDisplay, setSessionDisplay] = useState(25)
  const [breakDisplay, setBreakDisplay] = useState(5)
  const [reset, setReset] = useState(false)
  useEffect(() => {
    if(breakLength<=0){
      setBreakLength(1)
    }
    if(breakLength >=60){
      setBreakLength(60)
    }
  }, [breakLength])
  useEffect(() => {
    if(sessionLength<=0){
      setSessionLength(1)
    }
    if(sessionLength >=60){
      setSessionLength(60)
    }
  }, [sessionLength])
  let interval1
  useEffect(() => {
    if(seconds === 0){
      setSeconds(60)
    }
    
    if(paused){
      clearInterval(interval1)
      return
    }
    if(reset){
      clearInterval(interval1)
      setSeconds(60)
      setReset(false)
      setPaused(true)
      return
    }
    for(let i=1; i<10; i++){
      if(seconds === i){
        setSeconds(`0${i}`)
      }
    }
    interval1 = setInterval(()=>{
          setSeconds(seconds-1)
          
    }, 1000)
    return ()=>clearInterval(interval1)
      
      
    
    
  }, [paused, seconds, reset])
  useEffect(() => {
    let interval
    if(paused){
      clearInterval(interval)
      return
    }
    if(reset){
      clearInterval(interval)
      setSessionDisplay(25)
      setSessionLength(25)
      setReset(false)
      return
    }
    interval = setInterval(()=>{
          setSessionDisplay(sessionDisplay-1)
          
    }, 60000)
    return ()=>clearInterval(interval)
  }, [paused, sessionDisplay, reset])
  
  
  
  

  
  
  return (
    <div>
      <div style={{display: 'flex', width: '60vw', justifyContent: 'space-around'}}>
        <div>
        <h3 id='break-label'>Break Length</h3>
        <button onClick={()=>setBreakLength(breakLength-1)} id="break-decrement">↓</button>
        <button onClick={()=>setBreakLength(breakLength+1)} id="break-increment">↑</button>
        <p id="break-length">{breakLength}</p>
        </div>
        <div>
        <h3 id='session-label'>Session Length</h3>
        <button onClick={()=>{setSessionLength(sessionLength-1); setSessionDisplay(sessionDisplay-1)}} id="session-decrement">↓</button>
        <button onClick={()=>{setSessionLength(sessionLength+1); setSessionDisplay(sessionDisplay+1)}} id="session-increment">↑</button>
        <p id="session-length">{sessionLength}</p>
        </div>
        
      </div>
      <div>
        <h4 id="timer-label">Session</h4>
        <h1 id="time-left">{`${sessionDisplay}:${seconds === 60 ? '00' : seconds}`}</h1>
      </div>
      <div>
        <button onClick={()=>setPaused(!paused)} id="start-stop">{paused ? 'Start' : 'Stop'}</button>
        <button onClick={()=>setReset(true)} id="reset">Reset</button>
      </div>
    </div>
  )
}

