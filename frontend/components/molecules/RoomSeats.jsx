import {useEffect, useState} from 'react';
import Seat from "../atoms/Seat";
import SquareImg from '../atoms/Img';

const RoomData = [
    {
        room : 101,
        today : [
            [47, 0, 1],
            [48, 2, 2],
            [49, 3, 3],
            [47, 0, 1],
            [48, 2, 2],
            [49, 3, 3],
            [47, 0, 1],
            [48, 2, 2],
            [49, 3, 3],
            [47, 0, 1],
            [48, 2, 2],
            [49, 3, 3],
        ],
        tomarrow : {
            42:[0, 1],
            43:[2, 2],
            44:[3, 3],
        }
    },
    {
        room : 104,
        today : {
            42:[0, 1],
            43:[2, 2],
            44:[3, 3],
        },
        tomarrow : {
            42:[0, 1],
            43:[2, 2],
            44:[3, 3],
        }
    },
    {
        room : 108,
        today : {
            42:[0, 1],
            43:[2, 2],
            44:[3, 3],
        },
        tomarrow : {
            42:[0, 1],
            43:[2, 2],
            44:[3, 3],
        }
    }  
]

const RoomSeats = () => {
    const [isToday, setIsToday] = useState(true);

    return (
        <>
            <div className="roomSeatsDiv">
                <span className="seatTitle">{RoomData[0].room}호 | {isToday ? "오늘" : "내일"}</span>
                <div className="front">
                    <SquareImg src="/images/square.png"
                    length="40px"/>
                    <span>정면</span>
                </div>
                <div className="seats">
                {
                    RoomData[0].today.map((prop, index) => {
                        return (
                            <div className="seatDiv">
                                <Seat left={prop[1]} right={prop[2]}/>
                                <span>{prop[2]}</span>
                            </div>
                        );
                    })
                }
                </div>
                
            </div>
            <style jsx>{`
                .roomSeatsDiv{
                    display: flex;
                    flex-direction: column;
                    width: 400px;
                    height: 100%;
                    background: #f0f0f0;
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
                }
                .seatDiv{
                    display: flex;
                }
            `}</style>
        </>
    );
}

export default RoomSeats;