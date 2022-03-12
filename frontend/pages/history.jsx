import { BorderDiv, PageDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"
import styled from "styled-components";
import SeatHistory from "../components/organisms/SeatHistory";
import { Fragment } from "react";
import { completeHistoryAtom } from "../components/others/state";
import { useRecoilValue } from "recoil";

const HistoryDiv = styled(BorderDiv)`
    max-width: 723px;
`;

const History = () => {
    const completeHistoryData = useRecoilValue(completeHistoryAtom);

    return (
        <PageDiv dis="flex" ali="center" dir="column">
            <HeadTitle title="history" />
            <HistoryDiv>
                <div className="title">입퇴실 / 신청 기록 열람</div>
                <div className="seatHistorys">
                    {
                        completeHistoryData?.data.map((prop, index) => {
                            const { apply: { time: applyTime }, apply_id: id, part1_cancel_marker, part2_cancel_marker, date, part1, part1End, part2, state, want } = prop;
                            const splitDate = date.split('-');
                            const handledDate = `${splitDate[0]}년 ${splitDate[1][0] === '0' ? splitDate[1][1] : splitDate[1]}월 ${splitDate[2][0] === '0' ? splitDate[2][1] : splitDate[2]}일`
                            return <Fragment key={prop, index}>
                                <SeatHistory
                                    id={id}
                                    date={handledDate}
                                    part1={part1}
                                    part1End={part1End}
                                    part2={part2}
                                    cancel={[part1_cancel_marker, part2_cancel_marker]}
                                    state={state}
                                    detail={{ applyTime, want }}
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
                    background: rgba(241,241,241,0.98);
                }
            `}</style>
        </PageDiv>
    )
}

export default History;