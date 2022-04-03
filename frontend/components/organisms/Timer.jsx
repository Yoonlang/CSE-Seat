import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { emailAtom, timerAtom } from "../others/state";

const Timer = () => {
    const [timer, setTimer] = useRecoilState(timerAtom);
    const { time } = timer;
    const [min, setMin] = useState(parseInt(time / 60));
    const [sec, setSec] = useState(time % 60);
    const setHandleEmail = useSetRecoilState(emailAtom);

    useEffect(() => {
        setTimer({
            isRun: true,
            time: time,
            delay: 1000,
        })
    }, []);

    useEffect(() => {
        setMin(parseInt(time / 60));
        setSec(time % 60);

        if (time < 0) {
            setTimer({
                isRun: false,
                time: '300',
                delay: null
            })
            setHandleEmail({
                isHoldEmail: true,
                isEmailButton: true,
                isHoldAuth: true,
            })
        }
    }, [time])

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