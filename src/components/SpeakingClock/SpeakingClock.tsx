import React, {useEffect, useState} from 'react';
import s from './SpeakingClock.module.css'


export const SpeakingClock = () => {


    const [clock, setClock] = useState(new Date())

    let time = `${clock.getHours().toString().padStart(2, "0")}:${clock.getMinutes().toString().padStart(2, "0")}:${clock.getSeconds().toString().padStart(2, "0")}`

    useEffect(() => {
        const intervalId = setInterval(() => {
            setClock(new Date())
            document.title = time
        }, 1000)

        return () => clearInterval(intervalId)
    }, [clock])


    return (
        <div className={s.speakingClock}>

            <div className={s.clockBlock}>
                <div className={s.clock}>
                    <span className={s.time}>{time}</span>
                </div>
                <div className={s.dateBlock}>
                    <span
                        className={s.date}>{`${clock.toLocaleString('en', {weekday: 'long'})} - ${clock.getDate()} ${clock.toLocaleString('en', {month: 'long'})}`}</span>
                </div>
            </div>
        </div>
    );
};
