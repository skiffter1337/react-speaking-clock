import React, {useEffect, useState} from 'react';
import s from './SpeakingClock.module.css'
import AnalogClock from "../AnalogClock/AnalogClock";
import Switch from "@material-ui/core/Switch";




export const SpeakingClock = () => {


    const [clock, setClock] = useState(new Date())
    const [mode, setMode] = useState(false)
    console.log(mode)
    let time = `${clock.getHours().toString().padStart(2, "0")}:${clock.getMinutes().toString().padStart(2, "0")}:${clock.getSeconds().toString().padStart(2, "0")}`

    useEffect(() => {
        const intervalId = setInterval(() => {
            setClock(new Date())
            document.title = time
        }, 1000)

        return () => clearInterval(intervalId)
    }, [clock])

    const onSwitchMode = () => setMode(!mode)


    return (
        <>
            <div className={s.clockBlock}>
                {mode ? <AnalogClock clock={clock}/> : <div className={s.clock}>
                    <span className={s.time}>{time}</span>
                </div>}
                <div className={s.dateBlock}>
                    <span
                        className={s.date}>{`${clock.toLocaleString('en', {weekday: 'long'})} - ${clock.getDate()} ${clock.toLocaleString('en', {month: 'long'})} ${clock.getFullYear()}`}</span>
                </div>
                <span className={s.switchSpan}>Switch to change mode - <Switch onChange={onSwitchMode} className={s.switch} size={'small'}/></span>
            </div>
        </>
    );
};
