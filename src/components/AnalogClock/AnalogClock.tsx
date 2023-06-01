import React, {useEffect, useRef} from 'react';
import s from './AnalogClock.module.css'

type AnalogClockType = {
    currentTime: Date
}
const AnalogClock = (props: AnalogClockType) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d")
            if (ctx) {
                const radius = canvas.width / 2;


                const drawClock = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Рисуем циферблат
                    ctx.beginPath();
                    ctx.arc(radius, radius, radius - 5, 0, 2 * Math.PI);
                    ctx.stroke();

                    ctx.font = "bold 20px Montserrat";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    for (let i = 1; i <= 12; i++) {
                        const angle = (i - 3) * (Math.PI * 2) / 12;
                        const x = radius + Math.cos(angle) * (radius - 30);
                        const y = radius + Math.sin(angle) * (radius - 30);
                        ctx.fillText(i.toString(), x, y);
                    }
                    // Рисуем центр часов
                    ctx.beginPath();
                    ctx.arc(radius, radius, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = "black";
                    ctx.fill();

                    // Рисуем стрелки
                    const hour = props.currentTime.getUTCHours();
                    const minute = props.currentTime.getUTCMinutes();
                    const second = props.currentTime.getUTCSeconds();

                    // Рисуем часовую стрелку
                    const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
                    const hourRadians = hourAngle * Math.PI / 180;
                    const hourHandLength = radius * 0.5;
                    const hourX = radius + hourHandLength * Math.cos(hourRadians);
                    const hourY = radius + hourHandLength * Math.sin(hourRadians);
                    ctx.beginPath();
                    ctx.moveTo(radius, radius);
                    ctx.lineTo(hourX, hourY);
                    ctx.stroke();

                    // Рисуем минутную стрелку
                    const minuteAngle = minute * 6 - 90;
                    const minuteRadians = minuteAngle * Math.PI / 180;
                    const minuteHandLength = radius * 0.7;
                    const minuteX = radius + minuteHandLength * Math.cos(minuteRadians);
                    const minuteY = radius + minuteHandLength * Math.sin(minuteRadians);
                    ctx.beginPath();
                    ctx.moveTo(radius, radius);
                    ctx.lineTo(minuteX, minuteY);
                    ctx.stroke();

                    // Рисуем секундную стрелку
                    const secondAngle = second * 6 - 90;
                    const secondRadians = secondAngle * Math.PI / 180;
                    const secondHandLength = radius * 0.8;
                    const secondX = radius + secondHandLength * Math.cos(secondRadians);
                    const secondY = radius + secondHandLength * Math.sin(secondRadians);
                    ctx.beginPath();
                    ctx.moveTo(radius, radius);
                    ctx.lineTo(secondX, secondY);
                    ctx.strokeStyle = "#041e3a";
                    ctx.stroke();
                }

                drawClock();
            }
        }
    }, [props.currentTime]);
    return (
    <div>
        <canvas ref={canvasRef} width={200} height={200} className={s.analogClock}/>
    </div>
    )
};

export default AnalogClock;