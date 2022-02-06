import { useEffect, useState } from "react";
import styled from "styled-components";
import { PageDiv, StyledResDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"

const Apply = () => {
    const ApplyDiv = styled(StyledResDiv)`
        display: flex;
        flex-direction: column;
        max-width: 523px;
        background: #fff;
        @media(min-width: 768px){
            box-shadow: 0 -5px 10px 3px #ddd;
        }
    `;

// const checkRoomNum = isRoomHope.reduce((cnt, prop) => cnt + prop, 0);
// const checkRoomNum = isRoomHope.filter(prop => prop).length;
    const [isRoomHope, setIsRoomHope] = useState([false, false, false]);

    const clickRoom = (prop) => {
        const tempRoomHope = isRoomHope.slice(0, 3);
        tempRoomHope[prop] = !tempRoomHope[prop];
        setIsRoomHope(tempRoomHope);
    }

    useEffect(() => {
        console.log(isRoomHope);
    }, [isRoomHope])

    return (
        <PageDiv dis="flex" jus="center">
            <HeadTitle title="apply"/>
            <ApplyDiv>
                <div>자리 신청</div>
                <div className="room">
                    <span>원하는 호실</span>
                    <button onClick={() => clickRoom(0)}>101호</button>
                    <button onClick={() => clickRoom(1)}>104호</button>
                    <button onClick={() => clickRoom(2)}>108호</button>
                </div>
                <div></div>
                <div></div>
            </ApplyDiv>
            <style jsx>{`
                .room{
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr;
                    grid-template-columns: 200px 1fr;
                    width: 100%;
                    height: 140px;
                    background: #ddd;

                }
                .room span {
                    grid-column: 1/1;
                    grid-row: 1/4;
                }
                .room button{
                    width: 160px;
                    height: 35px;
                }
                
            `}</style>
        </PageDiv>
    )
}

export default Apply;