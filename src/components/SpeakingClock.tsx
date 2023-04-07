import React, {useEffect, useState} from 'react';
import s from './SpeakingClock.module.css'
export const SpeakingClock = () => {



    const [clock, setClock] = useState(new Date())


    useEffect(() => {
        setInterval(() => {
        setClock(new Date())
        }, 1000)
    }, [])

    return (
        <div className={s.clock}>
         <span>{clock.getHours().toString().padStart(2, "0")}:{clock.getMinutes().toString().padStart(2, "0")}:{clock.getSeconds().toString().padStart(2, "0")}</span>
        </div>
    );
};
