import { useState } from "react";
import DetailHistory from "../molecules/DetailHistory";

const SeatHistory = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleModal = () => {
        setIsOpenModal(!isOpenModal);
    }

    return (
    <>
        <div className="history">
            <span>예약 날짜 : 22.01.19</span>
            <div>
                <span>오전 : 101호 47번 좌석</span>
                <button>입실</button>
                <button>퇴실</button>
            </div>
            <div>
                <span>오후 : 101호 47번 좌석</span>
                <button>입실</button>
                <button>퇴실</button>
            </div>
            <button onClick={handleModal}>자세히 보기</button>
        </div>
        <DetailHistory isOpenModal={isOpenModal}/>
        <style jsx>{`
            .history{
                display: grid;
                grid-template-rows: 1fr 1fr 1fr;
                align-items: center;
                width: 100%;
                height: 120px;
                border: solid #ddd;
                border-width: 1px 0 0 0;
                box-shadow: 0 1px #ddd;
                white-space: nowrap;
                font-size: 16px;
            }
            .history > button{
                grid-column: 2/2;
                grid-row: 1/4;
                height: 30px;
                background: #fff;
                outline: none;
                border: 1px solid #ccc;
                justify-self: center;
                cursor: pointer;
            }
            .history > div{
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .history > div > button{
                width: 50px;
                height: 25px;
                background: #fff;
                outline: none;
                border: 1px solid #ccc;
                justify-self: center;
                cursor: pointer;
            }
            @media(min-width: 480px){
                .history{
                    grid-template-columns: 1fr 150px;
                    padding: 10px 0 10px max(10px, 8%);
                }
                .history > button{
                    width: 100px;
                    font-size: 14px;
                }
                .history > div > span{
                    margin-right: 10px;
                }
            }
            @media(max-width: 479px){
                .history{
                    grid-template-columns: 1fr 100px;
                    padding: 10px 0 10px 7px;
                }
                .history > button{
                    width: 80px;
                    font-size: 12px;
                }
                .history > div > span{
                    margin-right: 5px;
                }
            }
        `}</style>
    </>);
}

export default SeatHistory;