import { useState } from "react";
import DetailHistory from "../molecules/DetailHistory";

const SeatHistory = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
    <>
        <div className="history">

        </div>
        <DetailHistory isOpenModal={isOpenModal}/>
        <style jsx>{`
            .history{
                width: 100%;
                height: 50px;
                background: #ddd;
            }
        `}</style>
    </>);
}

export default SeatHistory;