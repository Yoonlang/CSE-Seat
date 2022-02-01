import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { showRoomAtom, todayAtom } from "../others/state";

const IndexNav = () => {
    const [isToday, setIsToday] = useRecoilState(todayAtom);
    const [roomNumber, setRoomNumber] = useRecoilState(showRoomAtom);

    const changeToToday = () => {
        if(!isToday){
            setIsToday(!isToday);
        }
    }

    const changeToTomarrow = () => {
        if(isToday){
            setIsToday(!isToday);
        }
    }

    const changeRoomNumberToZero = () => {
        if(roomNumber != 0){
            setRoomNumber = 0;
        }
    }

    const changeRoomNumberToOne = () => {
        if(roomNumber != 1){
            setRoomNumber = 1;
        }
    }
    
    const changeRoomNumberToTwo = () => {
        if(roomNumber != 2){
            setRoomNumber = 2;
        }
    }

    return (
        <>
            <div className="nav">
                <div>
                    <span onClick={changeRoomNumberToZero}>101호</span>
                    <div></div>
                    <span onClick={changeRoomNumberToOne}>104호</span>
                    <div></div>
                    <span onClick={changeRoomNumberToTwo}>108호</span>
                </div>
                <div>
                    <span onClick={changeToToday}>오늘 자리</span>
                    <div></div>
                    <span onClick={changeToTomarrow}>내일 자리</span>
                </div>
            </div>
            <style jsx>{`
                .nav{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
                .nav > div{
                    display: flex;
                    justify-content: space-around;
                    align-items:center;
                    width: 100%;
                    height: 50%;
                    border-bottom: solid;
                    border-width: 1px;
                    border-color: #ddd;
                }
                .nav > div > span{
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
                .nav > div > div{
                    width: 1px;
                    height: 15px;
                    background: #ddd;
                    border:solid;
                    border-width:1px;
                    border-color:#ddd;
                }
            `}</style>
        </>
    );
}

export default IndexNav;