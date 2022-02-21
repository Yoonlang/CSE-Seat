import { useRecoilValue, useSetRecoilState } from 'recoil';
import { seatModalAtom } from '../others/state';
import { Seat } from "../atoms/Seat";
import SquareImg from '../atoms/Img';
import { todayAtom } from '../others/state';
import { Fragment } from 'react';

const RoomSeats = ({ roomNumber = 0, length = "50px", basic = false, m, seats }) => {
    const setModalState = useSetRecoilState(seatModalAtom);
    const isToday = useRecoilValue(todayAtom);
    const allotment = 100 / m;

    const openSeatModal = ({ num, todayState, tomorrowState }) => {
        let seatInfo = {
            roomNumber: roomNumber,
            isToday: isToday,
            seatNumber: num,
            one: undefined,
            two: undefined
        };
        if (isToday) {
            seatInfo.one = todayState[0];
            seatInfo.two = todayState[1];
        }
        else {
            seatInfo.one = tomorrowState[0];
            seatInfo.two = tomorrowState[1];
        }
        let tempObject = {
            isModalOpen: true,
            seatInfo: seatInfo
        };
        setModalState(tempObject);
    }

    return (
        <>
            <div className="roomSeatsDiv">
                <span className="seatTitle">{roomNumber}호
                    {basic ? `` : <><span className="bar">|</span>{isToday ? "오늘" : "내일"}</>}</span>
                <div className="front">
                    <SquareImg src="/images/square.png"
                        length="40px" />
                    <span>정면</span>
                </div>
                <div className="seats">
                    {
                        seats.map((props, index) => {
                            return <Fragment key={props + index}>
                                {
                                    props.map((prop, index) => {
                                        if (Object.keys(prop).length == 0) {
                                            return <div className="seatDiv" key={prop + index}>
                                                <Seat length={length} key={prop + index} hidden />
                                            </div>
                                        }
                                        const { todayState, tomorrowState, num } = prop;
                                        return <div className="seatDiv" key={prop + index} onClick={() => openSeatModal(prop)}>
                                            {
                                                basic ?
                                                    <Seat length={length} /> :
                                                    isToday ?
                                                        <Seat length={length} left={todayState[0]} right={todayState[1]} />
                                                        :
                                                        <Seat length={length} left={tomorrowState[0]} right={tomorrowState[1]} />
                                            }
                                            <span>{num}</span>
                                        </div>
                                    })
                                }
                            </Fragment>
                        })
                    }
                </div>
            </div>
            <style jsx>{`
                .roomSeatsDiv{
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    margin-top: 20px;
                    margin-bottom: 40px;
                    width: 100%;
                    max-width: 400px;
                }
                .seatTitle{
                    width: 100%;
                    margin: 15px;
                }
                .bar{
                    margin: 0 14px;
                }
                .front{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                }
                .front span{
                    font-size: 14px;
                }
                .seats{
                    display:flex;
                    flex-wrap: wrap;
                }
                .seatDiv{
                    display: flex;
                    width: ${(allotment)}%;
                    flex-direction: column;
                    align-items:center;
                }
            `}</style>
        </>
    );
}

export default RoomSeats;