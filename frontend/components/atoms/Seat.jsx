import {useRef, useEffect} from 'react';

const Seat = ({length = "50px", left = 0, right = 0}) => {
    const canvasRef = useRef();

    const seatColor = ['white', '#969696', '#0F5BCC', '#007435'];

    useEffect(() => {
        left = seatColor[left];
        right = seatColor[right];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 500;

        const fillLeft = (color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(250, 313);
            ctx.moveTo(250, 437);
            ctx.lineTo(63, 437);
            ctx.bezierCurveTo(63, 367, 50, 310, 250, 313);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(250, 140, 67, Math.PI * 0.5, Math.PI * 1.5);
            ctx.fill();

        }

        const fillRight = (color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(250, 313);
            ctx.bezierCurveTo(450, 310, 437, 367, 437, 437);
            ctx.lineTo(250, 437);
            ctx.moveTo(250, 313);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(250, 140, 67, Math.PI * 1.5, Math.PI * 0.5);
            ctx.fill();

        }
        
        ctx.lineWidth = 26;
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
        ctx.beginPath();
        ctx.arc(250, 140, 80, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(250, 300);
        ctx.moveTo(250, 450);
        ctx.lineTo(50, 450);
        ctx.bezierCurveTo(50, 350, 50, 300, 250, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(250, 300);
        ctx.bezierCurveTo(450, 300, 450, 350, 450, 450);
        ctx.lineTo(250, 450);
        ctx.moveTo(250, 300);
        ctx.stroke();
        
        fillLeft(left);
        fillRight(right);
    })

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
            <style jsx>{`
                canvas{
                    width:${(length)};
                    height:${(length)};
                }
            `}</style>
        </div>
    );
}

export default Seat;