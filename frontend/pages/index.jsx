import {useState, useRef} from 'react';
import { useRecoilValue } from 'recoil';
import RoomSeats from '../components/molecules/RoomSeats';
import IndexHeader from '../components/organisms/IndexHeader';
import SeatModal from '../components/organisms/SeatModal';
import HeadTitle from '../components/others/headTitle';
import { showRoomAtom } from '../components/others/state';
import SquareImg from '../components/atoms/Img';

const Index = () => {
    const targetRoom = useRecoilValue(showRoomAtom);
    const [isNav, setIsNav] = useState(true);
    const nav = useRef();

    const changeUpDownState = () => {
        setIsNav(!isNav);
    }

    return (
    <>
        <HeadTitle title="home" />
        <IndexHeader isNav={isNav}/>
        <div className="roomsDiv">
            <div className="room0">
                <RoomSeats roomNumber={0}/>
            </div>
            <div className="room1">
                <RoomSeats roomNumber={1}/>
            </div>
            <div className="room2">
                <RoomSeats roomNumber={2}/>
            </div>
        </div>
        <SeatModal />
        <div className="upDownBtn" onClick={changeUpDownState} ref={nav}>
            {
                isNav ?
                <SquareImg src="/images/minus.png" length="22px" />
                :
                <SquareImg src="/images/plus.png" length="22px" />
            }
            
        </div>
        <style jsx>{`
            .roomsDiv{
                width: 100%;
                justify-content: space-around;
                display: flex;
                gap: 20px;
            }
            .modal{
                position: fixed;
                top:-1vh;
                left:-1%;
                justify-content: center;
                align-items: center;
                width: 102%;
                height: 102vh;
                background: rgba(0, 0, 0, 0.5);
                z-index: 11;
            }
            .modal div{
                width: 100px;
                height: 100px;
                background: #fff;
            }
            @media(min-width: 750px){
                .upDownBtn{
                    display:none;
                }
            }
            @media(max-width: 749px){
                .roomsDiv{
                    ${(isNav ? `` : 
                    `
                    transform: translateY(-70px);
                    `)}
                    transition: 0.7s;
                }
                .roomsDiv div{
                    display: none;
                }
                .roomsDiv .room${(targetRoom)}{
                    display: flex !important;
                }
                .upDownBtn{
                    display:flex;
                    align-items:center;
                    justify-content: center;
                    position: fixed;
                    bottom: 25px;
                    right: 25px;
                    width: 40px;
                    height: 40px;
                    background: #fff;
                    border: solid;
                    border-radius: 50% 50%;
                    border-width: 1px;
                    border-color: #ccc;
                    cursor: pointer;
                }
            }
        `}</style>
    </>
    )
}

export default Index;