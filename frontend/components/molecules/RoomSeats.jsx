import {useEffect, useState} from 'react';
import Seat from "../atoms/Seat";
import SquareImg from '../atoms/Img';

// 각 방 안에
// 각 자리마다 오늘 / 내일 상태 나뉘게

const RoomData = [
    {
        room : 101,
        seats : [
            [22, 0, 1, 0, 0],
            [23, 1, 1, 0, 0],
            [24, 3, 3, 0, 0],
            [25, 0, 1, 0, 0],
            [26, 0, 0, 0, 0],
            [27, 0, 0, 0, 0],
            [28, 0, 1, 0, 0],
            [29, 3, 3, 0, 0],
            [30, 0, 0, 0, 0],
            [31, 0, 1, 0, 0],
            [32, 2, 2, 0, 0],
            [33, 3, 3, 0, 0],
            [34, 1, 1, 0, 0],
            [35, 0, 1, 0, 0],
            [36, 1, 1, 0, 0],
            [37, 1, 1, 0, 0],
            [38, 0, 0, 0, 0],
            [39, 0, 1, 0, 0],
            [40, 1, 1, 0, 0],
            [41, 1, 1, 0, 0],
        ],
    },
    {
        room : 104,
        seats : [
            [22, 0, 1, 0, 0],
            [23, 1, 1, 0, 0],
            [24, 3, 3, 0, 0],
            [25, 0, 1, 0, 0],
            [26, 0, 0, 0, 0],
            [27, 0, 0, 0, 0],
            [28, 0, 1, 0, 0],
            [29, 3, 3, 0, 0],
            [30, 0, 0, 0, 0],
            [31, 0, 1, 0, 0],
            [32, 2, 2, 0, 0],
            [33, 3, 3, 0, 0],
            [34, 1, 1, 0, 0],
            [35, 0, 1, 0, 0],
            [36, 1, 1, 0, 0],
            [37, 1, 1, 0, 0],
            [38, 0, 0, 0, 0],
            [39, 0, 1, 0, 0],
            [40, 1, 1, 0, 0],
            [41, 1, 1, 0, 0],
        ],
    },
    {
        room : 108,
        seats : [
            [22, 0, 1, 0, 0],
            [23, 1, 1, 0, 0],
            [24, 3, 3, 0, 0],
            [25, 0, 1, 0, 0],
            [26, 0, 0, 0, 0],
            [27, 0, 0, 0, 0],
            [28, 0, 1, 0, 0],
            [29, 3, 3, 0, 0],
            [30, 0, 0, 0, 0],
            [31, 0, 1, 0, 0],
            [32, 2, 2, 0, 0],
            [33, 3, 3, 0, 0],
            [34, 1, 1, 0, 0],
            [35, 0, 1, 0, 0],
            [36, 1, 1, 0, 0],
            [37, 1, 1, 0, 0],
            [38, 0, 0, 0, 0],
            [39, 0, 1, 0, 0],
            [40, 1, 1, 0, 0],
            [41, 1, 1, 0, 0],
        ],
    }  
]

const RoomSeats = ({roomNumber}) => {
    const [isToday, setIsToday] = useState(true);

    return (
        <>
            <div className="roomSeatsDiv">
                <span className="seatTitle">{RoomData[roomNumber].room}호 | {isToday ? "오늘" : "내일"}</span>
                <div className="front">
                    <SquareImg src="/images/square.png"
                    length="40px"/>
                    <span>정면</span>
                </div>
                <div className="seats">
                {
                    RoomData[roomNumber].seats.map((prop, index) => {
                        return (
                            <div className="seatDiv">
                                <Seat left={prop[1]} right={prop[2]}/>
                                <span>{prop[0]}</span>
                            </div>
                        );
                    })
                    // 내가 하고싶은거
                    // index가 올라가면서 이 div를 4개 단위로 끊어서 새로운 div에 넣어주고싶다
                    // 어떻게 해야할까?
                }
                </div>
            </div>
            <style jsx>{`
                .roomSeatsDiv{
                    display: flex;
                    flex-direction: column;
                    width: 300px;
                    height: 100%;
                }
                .seatTitle{
                    width: 100%;
                    margin: 15px;
                }
                .front{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
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
                    width: 25%;
                    flex-direction: column;
                    align-items:center;
                }
            `}</style>
        </>
    );
}

export default RoomSeats;