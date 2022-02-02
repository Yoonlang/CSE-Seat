import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import SquareImg from "../atoms/Img";
import Seat from "../atoms/Seat";
import { seatModalAtom } from "../others/state";

const SeatModal = () => {
    const [modalState, setModalState] = useRecoilState(seatModalAtom);
    const modalOutside = useRef();

    const clickModal = (event) => {
        if(event.target === modalOutside.current) {
            let tempObject = {...modalState};
            tempObject.isModalOpen = false;
            setModalState(tempObject);
            modalOutside.current.style.display = "none";
        }
    }

    useEffect(() => {
        modalOutside.current.style.display = modalState.isModalOpen ? "flex" : "none";
    }, [modalState.isModalOpen])

    return (
        <>
            <div className="modal" onClick={clickModal} ref={modalOutside}>
                <div>
                    <span>{modalState.seatInfo.roomNumber === 0? "101" : 
                    (modalState.seatInfo.roomNumber === 1? "104" : "108")
                    }호 | {modalState.seatInfo.isToday ? "오늘" : "내일"} | {modalState.seatInfo.seatNumber}번 좌석</span>
                    <Seat length="150px" left={modalState.seatInfo.one} right={modalState.seatInfo.two} />
                    <div className="time">
                        <span></span>
                        <div>
                        </div>
                    </div>
                    <div className="cancel">
                        <SquareImg src="/images/cancel.png" length="30px"/>
                    </div>
                </div>
            </div>
            <style jsx>{`
            .modal{
                display: none;
                position: fixed;
                top:-1vh;
                left:-1%;
                justify-content: center;
                align-items: center;
                width: 102%;
                height: 102vh;
                background: rgba(0, 0, 0, 0.5);
                z-index: 11;
                cursor: auto;
            }
            .modal > div{
                display: flex;
                position: relative;
                flex-direction : column;
                align-items:center;
                width: 350px;
                min-height: 400px;
                background: #fff;
                z-index: 12;
            }
            .modal > div > span{
                width: 100%;
                font-size: 18px;
                margin: 10px 0 0 15px;
            }
            .cancel{
                position: absolute;
                top: 6px;
                right: 6px;
            }
        `}</style>
        </>
    );
}

export default SeatModal;