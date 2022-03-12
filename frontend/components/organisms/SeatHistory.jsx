import { useState } from "react";
import DetailHistory from "../molecules/DetailHistory";

const SeatHistory = ({ id, date, part1, part2, part1End, state, detail, cancel }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleModal = () => {
        setIsOpenModal(!isOpenModal);
    }

    /*
    
    part1End => 1,2부 중 하나만 신청했으면 무조건 false
                1,2부 둘다 신청 + 1부가 끝났으면 true  (취소됐어도 1,2부 신청은 1,2부 신청.)

    처음에 몇개 신청했는지를 알아야 1,2부 신청했고, 둘다 취소했는지 확인할 수 있음
    or
    취소했어도 isPart는 true로 남거나 ( 이건 안된다고 백쪽에서 얘기함 )
    
    지금처럼 isPart는 false로 남고 자리 번호만 남으면 
    이게 1,2부 신청했고, 1개만 취소한 상황인지, 처음부터 1부만 신청했는지 확인할 수 있는 방법이 없음
    자리 번호로 확인할 수야 있겠지만 의도하지 않은 상황

    둘다 취소한 상황이라 cancel_marker가 둘다 1인데도
    state는 0인 상황이 존재함 - 이렇게 되면 안됨
    취소됐든 끝났으면 무조건 state는 2가 되어야함


    1,2 신청 기준        state   part1End
    1부 입실 전 =>         0       false
    1부 입실 후 =>         1       false
    1부 퇴실 후 6시 전 =>   2       false
    1부 노쇼 => 2부는 자동으로 취소된다 했으니까
                         2       true
    6시 후 2부 입실 전 =>   0       true
    2부 입실 후 =>         1       true
    2부 퇴실 후 =>         2       true

    1부 신청 기준      state       part1End (false)
    1부 입실 전 =>      0
    1부 입실 후 =>      1
    1부 퇴실 후 =>      2
    1부 노쇼   =>      2

    2부 신청 기준      state       part1End (false)
    2부 입실 전 =>      0
    2부 입실 후 =>      1
    2부 퇴실 후 =>      2
    2부 노쇼   =>      2

    입퇴실 관련

    state가 0인 경우엔 입실 보여주고
    state가 1인 경우엔 퇴실 버튼 보여주면 됨
    어디에?
    isPart가 하나뿐이라면 거기에 보여주면 됨
    1,2부다? part1End 기준으로 나누면 됨.

    */

    const test = async (isCheckIn) => {
        const leftURL = isCheckIn ? "/entry/check-in" : "/entry/check-out";
        // 1부에 대한건지 알아야해
        let isPart1;
        if (part1.isPart ^ part2.isPart) isPart1 = part1.isPart ? true : false;
        else if (part1.isPart & part2.isPart) isPart1 = part1End ? false : true;

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + leftURL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    building_id: "414",
                    seat_room: isPart1 ? part1.seat_room : part2.seat_room,
                    seat_num: isPart1 ? part1.seat_num : part2.seat_num,
                    part1: part1.isPart,
                    part2: part2.isPart,
                })
            })
            const data = await res.json();
            console.log(data);
            // history에 대한 데이터 refresh 해줘야함
            // if (data.result === false)
            //     throw ("Can't check");
            // if (!isCheckIn) {
            //     setRefreshData(!refreshData);
            //     closeModal();
            // }
        } catch (e) {
            console.log("Error: ", e);
        }


    }

    return (
        <>
            <div className="history">
                <span>{date}</span>
                {
                    part1.isPart ?
                        <div>
                            <span>1부 : {part1.seat_room}호 {part1.seat_num}번 좌석</span>
                            {
                                state === 2 ? `` :
                                    !part1End ?
                                        (
                                            state === 0 ?
                                                <>
                                                    <button className="on" onClick={() => test(true)}>입실</button>
                                                    <button className="off">퇴실</button>
                                                </> :
                                                <>
                                                    <button className="off">입실</button>
                                                    <button className="on" onClick={() => test(false)}>퇴실</button>
                                                </>
                                        ) : ``
                            }
                        </div> : ``
                }
                {
                    part2.isPart ?
                        <div>
                            <span>2부 : {part2.seat_room}호 {part2.seat_num}번 좌석</span>
                            {
                                state === 2 ? `` :
                                    part1End || !(part1.isPart) ?
                                        (
                                            state === 0 ?
                                                <>
                                                    <button className="on" onClick={() => test(true)}>입실</button>
                                                    <button className="off">퇴실</button>
                                                </> :
                                                <>
                                                    <button className="off">입실</button>
                                                    <button className="on" onClick={() => test(false)}>퇴실</button>
                                                </>
                                        ) : ``
                            }
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
            .history > div > .off{
                width: 50px;
                height: 25px;
                background: #fff;
                outline: none;
                border: 1px solid #ddd;
                color: #ddd;
                justify-self: center;
                cursor: default;
            }
            .history > div > .on{
                width: 50px;
                height: 25px;
                background: #fff;
                outline: none;
                border: 1px solid #999;
                color: #000;
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