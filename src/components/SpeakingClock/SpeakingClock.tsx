import React, {useEffect, useMemo, useState} from 'react';
import s from './SpeakingClock.module.css'
import AnalogClock from "../AnalogClock/AnalogClock";
import Switch from "@material-ui/core/Switch";


export const SpeakingClock = () => {


    const [currentTime, setCurrentTime] = useState(new Date())
    const [isAnalogClock, setIsAnalogClock] = useState(false)

    let time = useMemo(() => `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`, [currentTime])


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date())
            document.title = time
        }, 1000)

        return () => clearInterval(intervalId)
    }, [currentTime])

    const onSwitchMode = () => setIsAnalogClock(!isAnalogClock)
    console.log('tick')

    return (
        <>
            <div className={s.clockBlock}>
                {isAnalogClock
                    ?
                    <AnalogClock currentTime={currentTime}/>
                    :
                    <span className={s.time}>{time}</span>
                }
                <div className={s.dateBlock}>
                    <span
                        className={s.date}>{`${currentTime.toLocaleString('en', {weekday: 'long'})} - ${currentTime.getDate()} ${currentTime.toLocaleString('en', {month: 'long'})} ${currentTime.getFullYear()}`}</span>
                </div>
                <span className={s.switchSpan}>
                    Switch to change mode -
                    <Switch onChange={onSwitchMode} className={s.switch} size={'small'}/>
                </span>
            </div>
        </>
    );
};
