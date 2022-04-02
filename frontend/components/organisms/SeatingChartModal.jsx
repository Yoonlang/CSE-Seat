import React, { useRef, useState, memo, useMemo } from "react";
import { useRecoilState } from "recoil";
import RoomSeats from "../molecules/RoomSeats";
import { seatingChartModalAtom } from "../others/state";
import { Fragment } from "react";

const SeatingChartModal = ({ data }) => {
    const [isOpenModal, setIsOpenModal] = useRecoilState(seatingChartModalAtom);
    const [targetRoom, setTargetRoom] = useState(0);
    const modalOutside = useRef();
    const cancelBtn = useRef();

    const closeModal = (event) => {
        if (event.target === modalOutside.current || event.target === cancelBtn.current) {
            setIsOpenModal(false);
        }
    }

    const changeTargetRoom = (prop) => {
        setTargetRoom(prop);
    }

    return (
        <>
            <div className="background" onClick={closeModal} ref={modalOutside}>
                <div className="modal">
                    <div className="header">
                        <span onClick={() => changeTargetRoom(0)}>101호</span>
                        <div></div>
                        <span onClick={() => changeTargetRoom(1)}>104호</span>
                        <div></div>
                        <span onClick={() => changeTargetRoom(2)}>108호</span>
                    </div>

                    <div className="rooms">
                        {
                            data?.data.rooms.map((prop, index) => {
                                const className = "room" + index;
                                const { num, m, seats } = prop;
                                return <Fragment key={prop + index}>
                                    <div className={className}>
                                        <RoomSeats length="40px" roomNumber={num} m={m} seats={seats} basic />
                                    </div>
                                    <div className="bar"></div>
                                </Fragment>
                            })
                        }
                    </div>
                    <img src="/images/cancel.png"
                        className="cancel"
                        onClick={closeModal}
                        ref={cancelBtn} />
                </div>
            </div>
            <style jsx>{`
            .background{
                display: ${(isOpenModal ? "flex" : "none")};
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0, 0, 0, 0.5);
                z-index: 11;
            }
            .modal{
                display: flex;
                position: relative;
                flex-direction: column;
                top:0;
                left:0;
                height: 70%;
                background: #fff;
                cursor: default;
                border:none;
                overflow: auto;
            }
            .header{
                position: absolute;
                top:0;
                left:0;
                justify-content: space-around;
                align-items:center;
                width: 80%;
                height: 40px;
                border: solid #bbb;
                border-width: 0 1px 1px 0;
            }
            .header > span{
                display: flex;
                justify-content: center;
                align-items:center;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
            .header > div{
                width: 1px;
                height: 15px;
                background: #bbb;
                border:solid;
                border-width:1px;
                border-color:#bbb;
            }
            .rooms{
                display: flex;
                justify-content: space-between;
                height: 100%;
                overflow: scroll;
            }
            .rooms .bar{
                width: 0;
                height: 90%;
                border: 1px solid #eee;
                border-width: 0 1px 0 0;
            }
            .cancel{
                position: absolute;
                top: 6px;
                right: 6px;
                width: 30px;
                height: 30px;
            }
            @media(min-width: 1024px){
                .modal{
                    width: 70%;
                    min-width: 900px;
                    max-width: 1300px;
                    padding-top: 20px;
                }
                .header{
                    display: none;
                }
            }
            @media(max-width: 1023px){
                .modal{
                    width: min(100%, 400px);
                    padding-top: 40px;
                }
                .header{
                    display: flex;
                }
                .rooms > div{
                    display: none;
                }
                .room${(targetRoom)}{
                    display: flex !important;
                    overflow-x: hidden;
                }
                .bar{
                    display: none;
                }
            }
        `}</style>
        </>
    );
}

const handleMemo = (prevData, nextData) => {
    return prevData.result === nextData.result;
}

export default React.memo(SeatingChartModal, handleMemo);