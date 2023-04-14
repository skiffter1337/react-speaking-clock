import React, {useEffect, useRef} from 'react';

type AnalClockType = {
    clock: Date
}
const AnalogClock = (props: AnalClockType) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        const canvas = canvasRef.current;
        if(canvas) {
            const ctx = canvas.getContext("2d")
            if(ctx) {
                const radius = canvas.width / 2;


                const drawClock = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Рисуем циферблат
                    ctx.beginPath();
                    ctx.arc(radius, radius, radius - 5, 0, 2 * Math.PI);
                    ctx.stroke();

                    // Рисуем центр часов
                    ctx.beginPath();
                    ctx.arc(radius, radius, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = "black";
                    ctx.fill();

                    // Рисуем стрелки
                    const hour = props.clock.getHours();
                    const minute = props.clock.getMinutes();
                    const second = props.clock.getSeconds();

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
                    const minuteAngle = minute * 6;
                    const minuteRadians = minuteAngle * Math.PI / 180;
                    const minuteHandLength = radius * 0.7;
                    const minuteX = radius + minuteHandLength * Math.cos(minuteRadians);
                    const minuteY = radius + minuteHandLength * Math.sin(minuteRadians);
                    ctx.beginPath();
                    ctx.moveTo(radius, radius);
                    ctx.lineTo(minuteX, minuteY);
                    ctx.stroke();

                    // Рисуем секундную стрелку
                    const secondAngle = second * 6;
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
            }}
    }, [props.clock]);
    return  <canvas ref={canvasRef} width={200} height={200} />
};

export default AnalogClock;