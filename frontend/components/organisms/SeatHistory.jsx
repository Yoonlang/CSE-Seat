import { useState } from "react";
import DetailHistory from "../molecules/DetailHistory";

const SeatHistory = ({ date, part1, part2, part1End, state, detail, cancel }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleModal = () => {
        setIsOpenModal(!isOpenModal);
    }

    // 여기서 part1End, state, part1,2, cancelMarker 유무를 통해 입퇴실 버튼 보이게하는거 조절
    // 입퇴실 버튼부터 처리하자

    /*
    
    part1End => 1,2부 중 하나만 신청했으면 무조건 false
                1,2부 둘다 신청 + 1부가 끝났으면 true 
        ** 지금 이거 안되고 있음 **

    처음에 몇개 신청했는지를 알아야 1,2부 신청했고, 둘다 취소했는지 확인할 수 있음
    or
    취소했어도 isPart는 true로 남거나 ( 이건 안된다고 백쪽에서 얘기함 )
    
    지금처럼 isPart는 false로 남고 자리 번호만 남으면 
    이게 1,2부 신청했고, 1개만 취소한 상황인지, 처음부터 1부만 신청했는지 확인할 수 있는 방법이 없음
    자리 번호로 확인할 수야 있겠지만 의도하지 않은 상황

    둘다 취소한 상황이라 cancel_marker가 둘다 1인데도
    state는 0인 상황이 존재함 - 이렇게 되면 안됨

    

    
    
    
    
    
    
    
    
    */



    return (
        <>
            <div className="history">
                <span>{date}</span>
                {
                    part1.isPart ?
                        <div>
                            <span>1부 : {part1.seat_room}호 {part1.seat_num}번 좌석</span>
                            <button>입실</button>
                            <button>퇴실</button>
                        </div> : ``
                }
                {
                    part2.isPart ?
                        <div>
                            <span>2부 : {part2.seat_room}호 {part2.seat_num}번 좌석</span>
                            <button>입실</button>
                            <button>퇴실</button>
                        </div> :
                        cancel[1] ? <div><span>2부 : {part2.seat_room}호 {part2.seat_num}번 좌석</span></div> : ``
                }
                <button onClick={handleModal}>자세히 보기</button>
            </div>
            <DetailHistory
                isOpenModal={isOpenModal}
                detail={detail}
                part1={part1}
                part2={part2}
                state={state}
                part1End={part1End}
                cancel={cancel}
            />
            {/* ${isCancel ? `
                    background: #dedede;
                    border-color: #ccc;
                    box-shadow: 0 -1px #ddd;
                ` : `
                    background: #fff;
                    border-color: #eee;
                    box-shadow: 0 -1px #eee;
                `} */}
            <style jsx>{`
            .history{
                display: grid;
                grid-template-rows: 1fr 1fr 1fr;
                align-items: center;
                width: 100%;
                height: 120px;
                border: solid;
                border-width: 0 0 1px 0;
                white-space: nowrap;
                font-size: 16px;
                margin-top: 7px;
                background: #fff;

            }
            .history > span{
                align-self: start;
            }
            .history > button{
                grid-column: 2/2;
                grid-row: 1/4;
                height: 30px;
                background: #fff;
                outline: none;
                border: 1px solid #ccc;
                justify-self: center;
                cursor: pointer;
            }
            .history > div{
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .history > div > span{
                width: 160px;
            }
            .history > div > button{
                width: 50px;
                height: 25px;
                background: #fff;
                outline: none;
                border: 1px solid #ccc;
                justify-self: center;
                cursor: pointer;
            }
            @media(min-width: 480px){
                .history{
                    grid-template-columns: 1fr 150px;
                    padding: 12px 0 10px max(10px, 8%);
                }
                .history > button{
                    width: 100px;
                    font-size: 14px;
                }
                .history > div > span{
                    margin-right: 10px;
                }
            }
            @media(max-width: 479px){
                .history{
                    grid-template-columns: 1fr 100px;
                    padding: 12px 0 10px 7px;
                }
                .history > button{
                    width: 80px;
                    font-size: 12px;
                }
            }
        `}</style>
        </>);
}

export default SeatHistory;