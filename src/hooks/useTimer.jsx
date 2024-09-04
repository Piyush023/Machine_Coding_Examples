import { useEffect } from "react"
import { useState } from "react"

export const useTimer = (hour, min, sec, isStarted) => {
    // Input Comes in String form from a input and we have to convert that into Number
    const totalInputTime = (hour * 3600) + (min * 60) + sec * 1

    const [timeLeft, setTimeLeft] = useState(totalInputTime)

    useEffect(() => {
        if (!isStarted) {
            return
        }
        setTimeLeft(totalInputTime)
        let interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (timeLeft === 1) {
                    clearInterval(interval)
                    return
                } else {
                    return prev - 1
                }
            })
        }, 1000)
        return () => clearInterval(interval);
    }, [totalInputTime, isStarted])

    return { timeLeft }
}
