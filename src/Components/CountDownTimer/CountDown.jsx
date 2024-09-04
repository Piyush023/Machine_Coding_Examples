import React from 'react'
import { useTimer } from '../../hooks/useTimer'
import { useState } from 'react'

function CountDown() {
    const [timerInput, setTimerInput] = useState({ hr: 0, min: 0, sec: 0 })
    const [hr, setHr] = useState(0)
    const [timerStart, setTimerStart] = useState(0)
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const { timeLeft } = useTimer(timerInput.hr, timerInput.min, timerInput.sec, timerStart)

    return (
        <div>
            <h1>Count Down Timer</h1>
            <input title='Hours' type='number' onChange={(e) => setHr(e.target.value)} />
            <input title='Minutes' type='number' onChange={(e) => setMin(e.target.value)} />
            <input title='Seconds' type='number' onChange={(e) => setSec(e.target.value)} />
            <button onClick={() => {
                setTimerInput({ hr: hr, min: min, sec: sec })
                setTimerStart(true)
            }}>Submit</button>
            <h2>Hr: {Math.floor(timeLeft / 3600)}, Min: {Math.floor((timeLeft % 3600) / 60)}, Sec: {timeLeft % 60}</h2>
        </div>
    )
}

export default CountDown
