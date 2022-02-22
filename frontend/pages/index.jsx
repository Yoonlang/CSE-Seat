import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import RoomSeats from '../components/molecules/RoomSeats';
import IndexHeader from '../components/organisms/IndexHeader';
import SeatModal from '../components/organisms/SeatModal';
import HeadTitle from '../components/others/headTitle';
import { showRoomAtom } from '../components/others/state';
import SquareImg from '../components/atoms/Img';
import { StyledResDiv } from '../components/atoms/Div';

const Index = ({ data }) => {
    const targetRoom = useRecoilValue(showRoomAtom);
    const [isNav, setIsNav] = useState(true);
    const nav = useRef();

    const changeUpDownState = () => {
        setIsNav(!isNav);
    }

    // const refreshData = () => {
    //     router.replace(router.asPath);
    // }

    // setInterval(() => {
    //     // refreshData();
    //     // console.log(data.data.rooms[0].seats[0][0]);
    // }, 2000);

    return (
        <StyledResDiv>
            <HeadTitle title="home" />
            <IndexHeader isNav={isNav} />
            <div className="rooms">
                {
                    data.data.rooms.map((prop, index) => {
                        const className = "room" + index;
                        const { num, m, seats } = prop;
                        return <Fragment key={prop + index}>
                            <div className={className}>
                                <RoomSeats roomNumber={num} m={m} seats={seats} />
                            </div>
                            <div className="bar"></div>
                        </Fragment>
                    })
                }
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
                .rooms{
                    display: flex;
                    height: 100%;
                }
                .rooms .bar{
                    width: 0;
                    height: 400px;
                    border: 1px solid #eee;
                    border-width: 0 1px 0 0;
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
                @media(min-width: 768px){
                    .upDownBtn{
                        display:none;
                    }
                    .rooms{
                        justify-content: space-between;
                    }
                }
                @media(max-width: 767px){
                    .rooms{
                        justify-content: center;
                        ${(isNav ? `` :
                    `
                        transform: translateY(-70px);
                        `)}
                        transition: 0.5s;
                    }
                    .rooms > div{
                        display: none;
                    }
                    .rooms .room${(targetRoom)}{
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
        </StyledResDiv>
    )
}

export async function getServerSideProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "GET",
    });
    const data = await res.json();

    return {
        props: { data }
    }
}

export default Index;