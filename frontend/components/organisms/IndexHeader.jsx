import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import SquareImg from "../atoms/Img";
import ColorTables from "../molecules/ColorTables";
import Explain from "../molecules/Explain";
import IndexNav from "../molecules/IndexNav";
import TodayButton from "../molecules/TodayButton";
import { todayAtom } from "../others/state";

const IndexHeader = () => {
    const [isNav, setIsNav] = useState(true);
    const [isToday, setIsToday] = useRecoilState(todayAtom);
    const nav = useRef();

    const changeUpDownState = () => {
        setIsNav(!isNav);
    }

    return (
        <>
        <div className="indexHeader">
            <div className="nav">
                <IndexNav />
            </div>
            <div className="explain">
                <Explain />
            </div>
            <div className="right">
                <div>
                    <TodayButton />
                </div>
                <ColorTables />
            </div>
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
            .indexHeader{
                display:flex;
                align-items:center;
                width: 100%;
            }
            .right{
                display: flex;
                align-items: center;
                gap: 30px;
            }
            @media(min-width: 750px){
                .indexHeader{
                    justify-content: space-between;
                    height: 130px;
                    padding: 0 15px;
                }
                .nav{
                    display:none;
                }
                .upDownBtn{
                    display:none;
                }
            }
            @media(max-width: 749px){
                .indexHeader{
                    height: 70px;
                    flex-wrap: wrap;
                    justify-content: right;
                    gap: 12px;
                    ${isNav ? `` : `
                    transform: translateY(-70px);
                    `}
                    transition: 0.7s;
                }
                .explain{
                    display: none;
                }
                .nav{
                    width: 100%;
                    height: 70px;
                    
                }
                .right div{
                    display: none;
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
    );
}

export default IndexHeader;