import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import RoomSeats from '../components/molecules/RoomSeats';
import IndexHeader from '../components/organisms/IndexHeader';
import SeatModal from '../components/organisms/SeatModal';
import HeadTitle from '../components/others/headTitle';
import { indexLoadingAtom, refreshIndexAtom, showRoomAtom } from '../components/others/state';
import SquareImg from '../components/atoms/Img';
import { StyledResDiv } from '../components/atoms/Div';
import Refresh from '../components/atoms/Refresh';
import { ColorTables } from '../components/molecules/ColorTables';

const Index = ({ data }) => {
    const [updateData, setUpdateData] = useState();
    const [isLoading, setIsLoading] = useRecoilState(indexLoadingAtom);
    const [isNav, setIsNav] = useState(true);
    const targetRoom = useRecoilValue(showRoomAtom);
    const refreshData = useRecoilValue(refreshIndexAtom);
    const nav = useRef();

    const changeUpDownState = () => {
        setIsNav(!isNav);
    }

    const alertNotice = () => {
        alert("이용불가 시간 안내\n104호 -> 4/16 09:30 ~ 10:45\n104호 4/18 13:30 ~ 14:40\n104호 4/22 09:00 ~ 13:00");
    }

    useEffect(async () => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
                method: "GET",
                credentials: "include",
            })
            const fetchingData = await res.json();
            setUpdateData(fetchingData);
        } catch (e) {
            console.log("error: ", e);
        }
    }, [refreshData]);

    useEffect(() => {
        if (updateData !== undefined) setIsLoading(false);
    }, [updateData]);

    return (
        <StyledResDiv>
            <HeadTitle title="home" />
            <IndexHeader isNav={isNav} />
            <div className="rooms">
                {
                    isLoading ?
                        data?.data.rooms.map((prop, index) => {
                            const className = "room" + index + " room";
                            const { num, m, seats } = prop;
                            return <Fragment key={prop + index}>
                                <div className={className}>
                                    <div className="color"><ColorTables /></div>
                                    <RoomSeats roomNumber={num} m={m} seats={seats} basic />
                                </div>
                                <div className="bar"></div>
                            </Fragment>
                        })
                        :
                        updateData?.data.rooms.map((prop, index) => {
                            const className = "room" + index + " room";
                            const { num, m, seats } = prop;
                            return <Fragment key={prop + index}>
                                <div className={className}>
                                    <div className="color"><ColorTables /></div>
                                    <RoomSeats roomNumber={num} m={m} seats={seats} />
                                </div>
                                {
                                    index === 2 ? `` : <div className="bar"></div>
                                }
                            </Fragment>
                        })
                }
            </div>


            <SeatModal />
            <div className="notice" onClick={alertNotice}>
                <SquareImg src="/images/bell_color.png" length="25px" />
            </div>
            <div className="refreshBtn">
                <Refresh />
            </div>
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
                    position:relative;
                    height: 100%;
                }
                .rooms .bar{
                    width: 0;
                    height: 600px;
                    border: 1px solid #eee;
                    border-width: 0 1px 0 0;
                }
                .color{
                    display: flex;
                    position: absolute;
                    top: 10px;
                    right: 5px;
                    width: auto;
                    height: auto;
                }
                .modal{
                    position: fixed;
                    top:0;
                    left:0;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 11;
                }
                .room{
                    position: relative;
                    height: 100%;
                }
                .modal div{
                    width: 100px;
                    height: 100px;
                    background: #fff;
                }
                @media(min-width: 768px){
                    .notice{
                        display: none;
                    }
                    .refreshBtn{
                        display: none;
                    }
                    .upDownBtn{
                        display: none;
                    }
                    .rooms{
                        height: 100%;
                        justify-content: space-around;
                        overflow-x: hidden;
                    }
                    .color{
                        display: none;
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
                    .room, .bar{
                        display: none;
                    }
                    .rooms .room${(targetRoom)}{
                        display: flex !important;
                        overflow-x: hidden;
                    }
                    .notice{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: fixed;
                        bottom: 125px;
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
                    .refreshBtn{
                        display: flex;
                        position: fixed;
                        bottom: 75px;
                        right: 25px;
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
        </StyledResDiv >
    )
}

export async function getStaticProps() {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: "GET",
        });
        const data = await res.json();
        return {
            props: { data }
        }
    } catch (e) {
        console.log("error: ", e);
    }
    return {
        props: {}
    }
}

export default Index;