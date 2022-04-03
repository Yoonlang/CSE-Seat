import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { notificationAtom } from "../others/state";


const Notification = () => {
    const notice = useRecoilValue(notificationAtom);
    const notification = useRef();

    useEffect(() => {
        if (notice.length !== 0) {
            if (notification.current.className.indexOf("active") !== -1) {
                notification.current.className = notification.current.className.substr(0, notification.current.className.length - 7);
                setTimeout(() => {
                    notification.current.className += " active";
                }, 1)
            }
            else notification.current.className += " active";
        }
    }, [notice])

    return (
        <>
            <div className="notification" ref={notification}>
                <span>{notice}</span>
            </div>
            <style jsx>{`
                .notification{
                    display: flex;
                    position: fixed;
                    bottom: -60px;
                    left: 0;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 60px;
                    background: #5C9EFF;
                    z-index: 20;
                }
                .notification > span{
                    color: #fff;
                    letter-spacing: 0.5px;
                    font-size: 16px;
                }
                .active{
                    animation: show 3s;
                }
                @keyframes show{
                    20%{transform: translateY(-60px);}
                    80%{transform: translateY(-60px);}
                }
            `}</style>
        </>
    );
}

export default Notification