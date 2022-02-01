import { useRecoilValue } from 'recoil';
import RoomSeats from '../components/molecules/RoomSeats';
import IndexHeader from '../components/organisms/IndexHeader';
import HeadTitle from '../components/others/headTitle';
import { showRoomAtom, todayAtom } from '../components/others/state';

const Index = () => {

    const isToday = useRecoilValue(todayAtom);
    const targetRoom = useRecoilValue(showRoomAtom);

    return (
    <>
        <HeadTitle title="home" />
        <IndexHeader />
        <div className="roomsDiv">
            <div>
                <RoomSeats roomNumber={0}/>
            </div>
            <div>
                <RoomSeats roomNumber={1}/>
            </div>
            <div>
                <RoomSeats roomNumber={2}/>
            </div>
        </div>
        <style jsx>{`
            .roomsDiv{
                width: 100%;
                justify-content: space-around;
                display: flex;
                gap: 20px;
            }
            .roomsDiv:nth-child(0){
                display:none;

            }
        `}</style>
    </>
    )
}

export default Index;