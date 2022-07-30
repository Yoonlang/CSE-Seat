import { Fragment } from "react";

const TodayInfoSeatData = ({ seatData }) => {
    const todayIntro = [`오늘`, `1부`, ``, `2부`, `내일`, `1부`, ``, `2부`,]
    return <>
        <div className="todayInfo">
            {
                seatData?.map((prop, index) => {
                    const { isPart, showingData: { seatNum, seatRoom } } = prop;
                    return (<Fragment key={prop, index}>
                        <span>{todayIntro[index * 2]}</span>
                        <span>{todayIntro[index * 2 + 1]}</span>
                        {isPart ? <span>{seatRoom}호 {seatNum}번 좌석</span> : <span></span>}
                    </Fragment>)
                })
            }
        </div>
        <style jsx="true">{`
            span{
                white-space: nowrap;
            }
            .todayInfo{
                display: grid;
                grid-template-rows: 1fr 1fr 1fr 1fr;
                width: 100%;
                height: 100%;
                align-items: center;
            }
            .todayInfo > span{
                text-align: center;
            }
            @media(min-width: 480px){
                .todayInfo{
                    grid-template-columns: 60px 60px 1fr;
                }
            }
            @media(max-width: 479px){
                .todayInfo{
                    grid-template-columns: 50px 50px 1fr;
                }
            }
        `}
        </style>
    </>
}

export default TodayInfoSeatData