import { useState } from "react";
import { useRecoilState } from "recoil";
import DetailHistory from "../molecules/DetailHistory";
import { refreshIndexAtom } from "../others/state";

const SeatHistory = ({ id, date, part1, part2, part1End, state, detail, cancel }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [refreshData, setRefreshData] = useRecoilState(refreshIndexAtom);
    let isCancel = false;
    if (cancel[0] & cancel[1]) isCancel = true;
    if (part1.isPart ^ part2.isPart) {
        if (part1.isPart & part1.cancel_marker) isCancel = true;
        if (part2.isPart & part2.cancel_marker) isCancel = true;
    }

    const handleModal = () => {
        setIsOpenModal(!isOpenModal);
    }

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
            if (data.result === false) {
                throw ("Can't check");
            }
            console.log(data);
            setRefreshData(!refreshData);
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
                isCancel={isCancel}
            />

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
                ${isCancel ? `
                    background: #dedede;
                    border-color: #ccc;
                    box-shadow: 0 -1px #ddd;
                ` : `
                    background: #fff;
                    border-color: #eee;
                    box-shadow: 0 -1px #eee;
                `}
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