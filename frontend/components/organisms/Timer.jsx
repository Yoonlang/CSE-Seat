import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { emailAtom } from "../others/state";


const Timer = () => {
    const [min, setMin] = useState(5);
    const [sec, setSec] = useState(0);
    const time = useRef(300);
    const timerId = useRef(null);
    const setHandleEmail = useSetRecoilState(emailAtom);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -= 1;
        }, 1000);
    }, [])

    useEffect(() => {
        if (time.current < 0) {
            clearInterval(timerId.current);
            setHandleEmail({
                isHoldEmail: true,
                isEmailButton: true,
                isHoldAuth: true,
            })
        }
    }, [sec]);

    return (<>
        <div>{min}분 {sec}초</div>
        <style jsx>{`
            div{
                position: absolute;
                top: 42%;
                right: 60px;
                z-index: 200;
            }
        `}</style>
    </>)
}

export default Timer;