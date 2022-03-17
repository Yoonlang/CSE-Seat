import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Checkbox from "../atoms/Checkbox";
import { MyLink } from "../atoms/Div";
import { historyToIndexAndInfoAtom } from "../others/state";

const TodayInfo = () => {
    const [isSelectCancel, setIsSelectCancel] = useState(false);
    const [handledInfoData, setHandledInfoData] = useState();
    const [checkboxState, setCheckboxState] = useState([2, 2, 2, 2]);
    const checkData = useRecoilValue(historyToIndexAndInfoAtom);

    const handleCancel = () => {
        if (isSelectCancel) {
            if (checkboxState.some((prop) => {
                return prop === 1;
            })) {
                alert("신청");
            }
            setIsSelectCancel(false);
        }
        else setIsSelectCancel(true);
    }

    const clickCheckbox = (index) => {
        const tempCheckboxState = checkboxState.slice(0, 4);
        if (tempCheckboxState[index] !== 2) {
            tempCheckboxState[index] = tempCheckboxState[index] === 0 ? 1 : 0;
            setCheckboxState(tempCheckboxState);
        }
    }

    const handleCheckData = (req) => {
        const tempInfoData = [{
            isPart: false,
            showingData: {
                checkState: undefined,
                seatRoom: undefined,
                seatNum: undefined,
            },
            fetchingData: {
                buildingId: undefined,
                seatRoom: undefined,
                seatNum: undefined,
                isToday: undefined,
            },
        }, {
            isPart: false,
            showingData: {
                checkState: undefined,
                seatRoom: undefined,
                seatNum: undefined,
            },
            fetchingData: {
                buildingId: undefined,
                seatRoom: undefined,
                seatNum: undefined,
                isToday: undefined,
            },
        }, {
            isPart: false,
            showingData: {
                checkState: undefined,
                seatRoom: undefined,
                seatNum: undefined,
            },
            fetchingData: {
                buildingId: undefined,
                seatRoom: undefined,
                seatNum: undefined,
                isToday: undefined,
            },
        }, {
            isPart: false,
            showingData: {
                checkState: undefined,
                seatRoom: undefined,
                seatNum: undefined,
            },
            fetchingData: {
                buildingId: undefined,
                seatRoom: undefined,
                seatNum: undefined,
                isToday: undefined,
            },
        }];

        req?.forEach(({ apply_id, /* apply_id 필요없음 */ isToday = true, /*바꿔줘야함*/ part1, part2, part1End, state }) => {
            if (apply_id === 102) isToday = false; // 나중에 바꿔줘야함
            const dayIndex = isToday ? 0 : 2;
            if (part1.isPart && !part1.cancel_marker && ((part2.isPart & !part1End) | (!part2.isPart))) {
                tempInfoData[dayIndex].isPart = true;
                tempInfoData[dayIndex].showingData.checkState = state;
                tempInfoData[dayIndex].showingData.seatNum = part1.seat_num;
                tempInfoData[dayIndex].showingData.seatRoom = part1.seat_room;
                tempInfoData[dayIndex].fetchingData.buildingId = part1.building_id;
                tempInfoData[dayIndex].fetchingData.isToday = isToday;
                tempInfoData[dayIndex].fetchingData.seatNum = part1.seat_num;
                tempInfoData[dayIndex].fetchingData.seatRoom = part1.seat_room;
            }
            if (part2.isPart && !part2.cancel_marker) {
                tempInfoData[dayIndex + 1].isPart = true;
                if (isToday && part1.isPart && !part1.cancel_marker && !part1End)
                    tempInfoData[dayIndex + 1].showingData.checkState = 3;
                else
                    tempInfoData[dayIndex + 1].showingData.checkState = state;
                tempInfoData[dayIndex + 1].showingData.seatNum = part2.seat_num;
                tempInfoData[dayIndex + 1].showingData.seatRoom = part2.seat_room;
                tempInfoData[dayIndex + 1].fetchingData.buildingId = part2.building_id;
                tempInfoData[dayIndex + 1].fetchingData.isToday = isToday;
                tempInfoData[dayIndex + 1].fetchingData.seatNum = part2.seat_num;
                tempInfoData[dayIndex + 1].fetchingData.seatRoom = part2.seat_room;
            }
        });
        setHandledInfoData(tempInfoData);
    }

    useEffect(() => {
        if (checkData) handleCheckData(checkData);
    }, [checkData])

    useEffect(() => {
        const tempCheckbox = [];
        if (handledInfoData) handledInfoData?.forEach(({ isPart }, index) => {
            tempCheckbox[index] = isPart ? 0 : 2;
        })
        setCheckboxState(tempCheckbox);
        console.log(handledInfoData);
    }, [handledInfoData])

    return (
        <>
            <div className="today">
                <div className="todayInfo">
                    <span>오늘</span><span>1부</span><span>101호 47번 좌석</span>
                    <span></span><span>2부</span><span>101호 47번 좌석</span>
                    <span>내일</span><span>1부</span><span>101호 47번 좌석</span>
                    <span></span><span>2부</span><span>101호 47번 좌석</span>
                </div>
                <div className="infoOption">
                    {isSelectCancel ?
                        <>
                            {
                                checkboxState.map((prop, index) => {
                                    return (
                                        <div key={prop, index} onClick={() => clickCheckbox(index)}>
                                            <Checkbox state={checkboxState[index]} />
                                        </div>
                                    );
                                })
                            }
                        </>
                        :
                        <>
                            <div><button>입실</button><button>퇴실</button></div>
                            <div><button>입실</button><button>퇴실</button></div>
                            <div><button>입실</button><button>퇴실</button></div>
                            <div><button>입실</button><button>퇴실</button></div>
                        </>
                    }
                </div>
                <MyLink href="/history" border width="140px" height="30px" fontSize="13px">신청 기록 확인</MyLink>
                <button className="cancelBtn" onClick={handleCancel}>{isSelectCancel ? "취소하기" : "자리 취소"}</button>
            </div>
            <style jsx>{`
        .today{
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: 140px 50px;
            justify-items: flex-end;
            align-items: flex-end;
            width: 100%;
            max-width: 400px;
            height: 100%;
            padding: 0 5px;
        }
        .todayInfo{
            display: grid;
            grid-template-rows: 1fr 1fr 1fr 1fr;
            width: 100%;
            height: 100%;
            align-items: center;
        }
        .infoOption{
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            justify-self: center;
            height: 100%;
        }
        ${(isSelectCancel ? `
        .infoOption div{
            display: flex;
            width: 25px;
            height: 25px;
            overflow: hidden;
            cursor: pointer;
        }
        ` : `
        .infoOption div{
            display: flex;
            gap: 7px;
        }
        .infoOption button{
            width: 50px;
            height: 25px;
            border: 1px solid #ddd;
            outline: none;
            background: #fff;
            cursor: pointer;
        }
        `)}
        .cancelBtn{
            width: 100px;
            height: 30px;
            background: #fff;
            outline: none;
            border: 1px solid #ddd;
            font-size: 13px;
            justify-self: center;
        }
        @media(min-width: 480px){
            .todayInfo{
                grid-template-columns: 60px 60px 1fr;
            }
        }
        @media(max-width: 479px){
            .todayInfo{
                grid-template-columns: 50px 50px 1fr;
            }
        }
    `}</style>
        </>);
}

export default TodayInfo;