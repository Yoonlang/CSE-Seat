import { Fragment, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MyLink } from "../atoms/Div";
import TodayInfoCheckboxes from "../molecules/TodayInfoCheckboxes";
import TodayInfoInOutBtns from "../molecules/TodayInfoInOutBtns";
import { isInLocation } from "../others/checkPos";
import { historyToIndexAndInfoAtom, loadingCheckInAtom, notificationAtom, refreshIndexAtom } from "../others/state";
import TodayInfoSeatData from "./TodayInfoSeatData";

const TodayInfo = () => {
    const [isSelectCancel, setIsSelectCancel] = useState(false);
    const [handledInfoData, setHandledInfoData] = useState();
    const [checkboxState, setCheckboxState] = useState([2, 2, 2, 2]);
    const checkData = useRecoilValue(historyToIndexAndInfoAtom);
    const [refreshData, setRefreshData] = useRecoilState(refreshIndexAtom);
    const setIsCheckInLoading = useSetRecoilState(loadingCheckInAtom);
    const setNotice = useSetRecoilState(notificationAtom);

    const handleCancel = () => {
        if (isSelectCancel) {
            if (checkboxState.some((prop) => {
                return prop === 1;
            })) {
                checkboxState.forEach(async (prop, index) => {
                    if (prop === 1) {
                        try {
                            const { seatNum, seatRoom, isToday, buildingId } = handledInfoData[index].fetchingData;
                            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/seat/reservation-cancel", {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    building_id: buildingId,
                                    seat_room: seatRoom,
                                    seat_num: seatNum,
                                    isToday: isToday,
                                    part1: index % 2 === 0 ? true : false,
                                    part2: index % 2 === 1 ? true : false,
                                })
                            })
                            const data = await res.json();
                            if (res.status === 400) throw "잠시 후 다시 시도해주세요";
                            if (data.result === true) {
                                setRefreshData(!refreshData);
                                setNotice("자리 취소 완료");
                            }
                            else alert(data.message);
                        } catch (e) {
                            alert(e);
                            router.replace(router.asPath);
                        }
                    }
                })
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
        req?.forEach(({ isToday, part1, part2, part1End, state }) => {
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

    const submitCheck = async (isCheckIn, { buildingId, seatNum, seatRoom }) => {
        if (isCheckIn) setIsCheckInLoading(true);
        if (isCheckIn && !await isInLocation()) {
            setIsCheckInLoading(false);
            return;
        }
        const leftURL = isCheckIn ? "/entry/check-in" : "/entry/check-out";
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + leftURL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    building_id: buildingId,
                    seat_room: seatRoom,
                    seat_num: seatNum,
                    part1: handledInfoData[0].isPart,
                    part2: handledInfoData[1].isPart,
                })
            })
            const data = await res.json();
            if (res.status === 400) throw "잠시 후 다시 시도해주세요";
            if (data.result === true) {
                setRefreshData(!refreshData);
                setNotice(isCheckIn ? "입실 완료" : "퇴실 완료");
            }
            else alert(data.message);
        } catch (e) {
            alert(e);
            router.replace(router.asPath);
        } finally {
            if (isCheckIn) setIsCheckInLoading(false);
        }
    }

    useEffect(() => {
        if (checkData) handleCheckData(checkData);
    }, [checkData])

    useEffect(() => {
        const tempCheckbox = [];
        if (handledInfoData) {
            handledInfoData?.forEach(({ isPart }, index) => {
                tempCheckbox[index] = isPart ? 0 : 2;
            });
            setCheckboxState(tempCheckbox);
        }
    }, [handledInfoData])

    return (
        <>
            <div className="today">
                <TodayInfoSeatData seatData={handledInfoData} />
                <div className="infoOption">
                    {isSelectCancel ?
                        <TodayInfoCheckboxes checkboxState={checkboxState} clickCheckbox={clickCheckbox} />
                        :
                        <TodayInfoInOutBtns seatData={handledInfoData} submit={submitCheck} />
                    }
                </div>
                <MyLink href="/history" border width="140px" height="30px" fontSize="13px">신청 기록 확인</MyLink>
                <button className="cancelBtn" onClick={handleCancel}>{isSelectCancel ? "취소하기" : "자리 취소"}</button>
            </div>
            <style jsx="true">{`
            .today{
                display: grid;
                grid-template-columns: 230px 1fr;
                grid-template-rows: 140px 50px;
                justify-items: flex-end;
                align-items: flex-end;
                width: 100%;
                max-width: 400px;
                height: 100%;
                padding: 0 5px;
                margin-bottom: 40px;
            }
            .infoOption{
                display:flex;
                flex-direction: column;
                justify-content: space-around;
                justify-self: center;
                height: 100%;
            }
            span{
                white-space: nowrap;
            }
            .cancelBtn{
                width: 100px;
                height: 30px;
                background: #fff;
                outline: none;
                border: 1px solid #ddd;
                font-size: 13px;
                justify-self: center;
            }
        `}</style>
        </>);
}

export default TodayInfo;