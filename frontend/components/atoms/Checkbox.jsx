import { useEffect, useRef } from "react";

const Checkbox = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 25;
        canvas.height = 25;

        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(12.5, 12.5, 12, 0, Math.PI * 2);

    })

    return (
        <>
        <canvas ref={canvasRef} width="1920" height="1080"></canvas>
        <style jsx>{`
            canvas{
                width: 25px;
                height: 25px;
            }
        `}</style>
        </>
    );

}

export default Checkbox;