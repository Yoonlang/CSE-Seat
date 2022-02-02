import {useRef, useEffect} from 'react';

const Seat = ({length = "50px", left = 0, right = 0, dist = 0, width = 26}) => {
    const canvasRef = useRef();
    const seatColor = ['white', '#969696', '#0F5BCC', '#007435'];

    useEffect(() => {
        left = seatColor[left];
        right = seatColor[right];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 500;

        const hX = canvas.width / 2;
        const dis = Number(dist);
        const hW = width / 2;

        const fillLeft = (color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(hX - dist, 300 + hW);
            ctx.moveTo(hX - dist, 450 - hW);
            ctx.lineTo(63 - dist, 450 - hW);
            ctx.bezierCurveTo(50 + hW - dist, 350 + hW, 50 - dist, 300 + 10, hX - dist, 300 + hW);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(hX - dist, 140, 67, Math.PI * 0.5, Math.PI * 1.5);
            ctx.fill();
        }

        const fillRight = (color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(hX + dis, 300 + hW);
            ctx.bezierCurveTo(450 + dis, 310, 450 - hW + dis, 367, 450 - hW + dis, 450 - hW);
            ctx.lineTo(hX + dis, 437);
            ctx.moveTo(hX + dis, 313)
            ctx.fill();

            ctx.beginPath();
            ctx.arc(hX + dis, 140, 67, Math.PI * 1.5, Math.PI * 0.5);
            ctx.fill();

        }
        
        ctx.lineWidth = width;
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
        ctx.beginPath();
        ctx.arc(hX - dis, 140, 80, Math.PI * 0.5, Math.PI * 1.5);
        ctx.lineTo(hX - dis, 140 + 80 + hW);
        
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(hX + dis, 140, 80, Math.PI * 1.5, Math.PI * 2.5);
        ctx.lineTo(hX + dis, 140 - 80 - hW);
        ctx.stroke();

        ctx.beginPath();
        dist === 0 ? ctx.moveTo(hX - dis, 300) : ctx.moveTo(hX - dis, 300 - hW);
        dist === 0 ? ctx.moveTo(hX - dis, 450) : ctx.lineTo(hX - dis, 450);
        ctx.lineTo(50 - dis, 450);
        ctx.bezierCurveTo(50 - dis, 350, 50 - dis, 300, hX - dis, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(hX + dis, 300);
        ctx.bezierCurveTo(450 + dis, 300, 450 + dis, 350, 450 + dis, 450);
        ctx.lineTo(hX + dis, 450);
        dist === 0 ? ctx.moveTo(hX + dis, 300) : ctx.lineTo(hX + dis, 300 - hW);
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