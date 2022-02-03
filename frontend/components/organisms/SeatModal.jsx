import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {Seat, seatColor} from "../atoms/Seat";
import { seatModalAtom } from "../others/state";

const SeatModal = () => {
    const [modalState, setModalState] = useRecoilState(seatModalAtom);
    const {isModalOpen, seatInfo: {one, two, roomNumber, isToday, seatNumber}} = modalState
    const [oneColor, setOneColor] = useState('');
    const [twoColor, setTwoColor] = useState('');
    const [isMySeat, setIsMySeat] = useState();
    const modalOutside = useRef();
    const cancelBtn = useRef();
// 고려해야할 사항
// 내 자리가 맞는지 아닌지에 따라서 button의 text가 달라짐.
// 그러면 seatModal이 계속 바뀔수도 있나? (내 자리가 아닐 때 클릭했다가 내 자리가 되어버렸어)
// useEffect같은걸로 seat 계속 체크해야겠는데
// 이게 안되고 그냥 에러처리를 해야하는거라면
// 내가 이 자리에 대해서 요청을 보낼 때 (빈자리라고 생각해서 신청하기를 눌렀는데
// 다른사람이 이미 신청해서 빈자리가 아닐 떄)
// 를 확인해서 처리하자

    const clickModal = (event) => {
        if(event.target === modalOutside.current || event.target === cancelBtn.current) {
            let tempObject = {...modalState};
            tempObject.isModalOpen = false;
            setModalState(tempObject);
            // 나갔다가 들어올때마다 데이터 fetching을 해준다?
            modalOutside.current.style.display = "none";
        }
    };

    const selectTime = (prop) => {
        console.log(prop);
        // 이제 여기서 prop이 0이냐 1이냐에 따라서 1부 눌렀는지 2부 눌렀는지 알수있게 되고,
        // 무슨 상태에서 눌렀는지에 따라서 처리해주면 됨.
    };

    useEffect(() => {
        modalOutside.current.style.display = isModalOpen ? "flex" : "none";
        setOneColor(seatColor[one]);
        setTwoColor(seatColor[two]);
        if(isModalOpen){
            if(one === 2 || two === 2){
                setIsMySeat(true);
            }
            else{
                setIsMySeat(false);
            }
        }
    }, [isModalOpen]);

    return (
        <>
            <div className="modal" onClick={clickModal} ref={modalOutside}>
                <div>
                    <span>{roomNumber === 0? "101" : 
                    (roomNumber === 1? "104" : "108")}호<bar>|</bar>
                    {isToday ? "오늘" : "내일"}<bar>|</bar>
                    {seatNumber}번 좌석</span>
                    <Seat length="120px" left={one} right={two} />
                    <div className="time">
                        <span>시간</span>
                        <div>
                            <div className="one" onClick={() => {selectTime(0)}}>1부
                            <span onClick={(e) => {
                                e.stopPropagation();
                                selectTime(0);
                            }}>(06:00 ~ 18:00)</span></div>
                            <div className="two" onClick={() => {selectTime(1)}}>2부
                            <span onClick={(e) => {
                                e.stopPropagation();
                                selectTime(1);
                            }}>(18:00 ~ 06:00)</span></div>
                        </div>
                    </div>

                    {isMySeat?
                    <>
                    <div>
                        <button>입실</button>
                        <button>퇴실</button>
                    </div>
                    <button className="submit">자리 수정</button>
                    </>
                    :
                    <button className="submit">신청하기</button>
                    }
                    
                    <img src="/images/cancel.png"
                    className="cancel"
                    onClick={clickModal}
                    ref={cancelBtn}
                    />
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
                gap: 25px;
                z-index: 12;
                padding-bottom: 90px;
            }
            .modal > div > span{
                width: 100%;
                font-size: 18px;
                margin: 10px 0 0 15px;
            }
            bar{
                margin: 0 14px;
            }
            .cancel{
                position: absolute;
                top: 6px;
                right: 6px;
                width: 30px;
                height: 30px;
            }
            .time{
                display:flex;
            }
            .time > span{
                padding-top: 8px;
                width: 70px;
                font-size: 20px;
            }
            .time > div{
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .time > div > div{
                display: flex;
                justify-content: center;
                align-items:center;
                width: 160px;
                height: 40px;
                font-size: 18px;
                
            }
            .time > div > div > span{
                margin-left: 5px;
                font-size: 14px;
                white-space: nowrap;
            }
            .one{
                border:solid;
                border-width: 1px;
                border-color: ${(oneColor === seatColor[0] ? "#ddd" : oneColor)};
                background: ${(oneColor)};
            }
            .one, .one > span{
                cursor: ${(oneColor === seatColor[0] ? "pointer" : 
                oneColor === seatColor[2] ? "pointer" : "default")};
                color: ${(oneColor === seatColor[0] ? "#000" : "#fff")};
            }
            .two{
                border:solid;
                border-width: 1px;
                border-color: ${(twoColor === seatColor[0] ? "#ddd" : twoColor)};
                background: ${(twoColor)};
            }
            .two, .two > span{
                cursor: ${(twoColor === seatColor[0] ? "pointer" : 
                twoColor === seatColor[2] ? "pointer" : "default")};
                color: ${(twoColor === seatColor[0] ? "#000" : "#fff")};
            }
            .submit{
                position: absolute;
                bottom: 25px;
                width: 160px;
                height: 40px;
                outline: none;
                border: solid;
                border-width: 1px;
                border-color: #ddd;
                background: #fff;
            }
        `}</style>
        </>
    );
}

export default SeatModal;