import RoomSeats from '../components/molecules/RoomSeats';
import HeadTitle from '../components/others/headTitle';

const Index = () => {

    return (
    <>
        <HeadTitle title="home" />
        {/* <IndexHeader /> */}
        <RoomSeats roomNumber={0}/>
        <RoomSeats roomNumber={1}/>
        <RoomSeats roomNumber={2}/>
    </>
    )
}

export default Index;