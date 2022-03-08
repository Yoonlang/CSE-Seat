import { BorderDiv, PageDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"
import styled from "styled-components";
import SeatHistory from "../components/organisms/SeatHistory";
import { Fragment, useEffect, useState } from "react";

const HistoryDiv = styled(BorderDiv)`
    max-width: 723px;
`;

const History = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/history", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (data.result === true) {
                console.log(data);
                setData(data);
                setIsLoading(false);
            }
            else
                throw ("Can't load history");
        } catch (e) {
            console.log("Error: ", e);
        }
    }, []);

    return (
        <PageDiv dis="flex" ali="center" dir="column">
            <HeadTitle title="history" />
            <HistoryDiv>
                <div className="title">입퇴실 / 신청 기록 열람</div>
                <div className="seatHistorys">
                    {
                        isLoading ?
                            `` :
                            data?.data.map((prop, index) => {
                                const { date, part1, part2, seat_num, seat_room, apply_time: applyTime, cancel_marker: isCancel } = prop;
                                const splitDate = date.split('-');
                                const handledDate = `${splitDate[0]}년 ${splitDate[1][0] === '0' ? splitDate[1][1] : splitDate[1]}월 ${splitDate[2][0] === '0' ? splitDate[2][1] : splitDate[2]}일`
                                return <Fragment key={prop, index}>
                                    <SeatHistory
                                        date={handledDate}
                                        part={[part1, part2]}
                                        seatNum={seat_num}
                                        seatRoom={seat_room}
                                        detail={{ applyTime, isCancel }}
                                        isCancel={isCancel}
                                    />
                                </Fragment>
                            })
                    }
                </div>
            </HistoryDiv>
            <style jsx>{`
                .title{
                    padding: 6% 0 30px 4%;
                    width: 100%;
                    height: 100%;
                    font-size: 22px;
                }
                .seatHistorys{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </PageDiv>
    )
}

export default History;