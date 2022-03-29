import { useRecoilState } from "recoil";
import { showRoomAtom, todayAtom } from "../others/state";

const IndexNav = () => {
    const [isToday, setIsToday] = useRecoilState(todayAtom);
    const [targetRoom, setTargetRoom] = useRecoilState(showRoomAtom);

    const changeToToday = (prop) => {
        prop ? setIsToday(true) : setIsToday(false);
    }

    const changeTargetRoom = (prop) => {
        setTargetRoom(prop);
    }

    return (
        <>
            <div className="nav">
                <div className="rooms">
                    <div className="room" onClick={() => changeTargetRoom(0)}>101호</div>
                    <div className="bar"></div>
                    <div className="room" onClick={() => changeTargetRoom(1)}>104호</div>
                    <div className="bar"></div>
                    <div className="room" onClick={() => changeTargetRoom(2)}>108호</div>
                </div>
                <div className="todays">
                    <div className="today" onClick={() => changeToToday(true)}>오늘 자리</div>
                    <div className="bar"></div>
                    <div className="today" onClick={() => changeToToday(false)}>내일 자리</div>
                </div>
            </div>
            <style jsx>{`
                .nav{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
                
                .rooms, .todays{
                    display: flex;
                    justify-content: space-around;
                    align-items:center;
                    width: 100%;
                    height: 50%;
                }
                .rooms{
                    margin-bottom: -0.5px;
                    box-shadow: 0 1px #ddd;
                }
                .todays{
                    margin-top: -0.5px;
                    border-bottom: solid;
                    border-width: 1px;
                    border-color: #ddd;
                }
                .room, .today{
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    width: 100%;
                    height: 100%;
                    color: #888;
                    cursor: pointer;
                    letter-spacing: 1.5px;
                }
                .room:nth-child(${targetRoom * 2 + 1}){
                    color: #000;
                    border: solid 1px #5C9EFF;
                }
                .today:nth-child(${isToday ? 1 : 3}){
                    color: #000;
                    border: solid 1px #5C9EFF;
                }
                .bar{
                    width: 0;
                    height: 100%;
                    background: #ddd;
                    border:solid;
                    border-width:0.5px;
                    border-color:#ddd;
                }
            `}</style>
        </>
    );
}

export default IndexNav;