import { Fragment } from "react";

const DetailHistory = ({ isOpenModal = false, detail: { applyTime, isCancel, want: { friends, seat_num: seatNum, seat_room: seatRoom } }, part1, part2, state, part1End }) => {
    const handleTime = (time, isPart1) => {
        if (time == null) {
            if (part1.isPart & part2.isPart) {
                if (((state === 0 || state === 1) && part1End && isPart1) || state === 2) return 'X';
                return '';
            }
            else {
                if (state === 2) return 'X';
                return '';
            }
        }
        const splitTime = time.split(/:|-| |\n/);
        return `${splitTime[0]}년 ${splitTime[1][0] === '0' ? splitTime[1][1] : splitTime[1]}월 ${splitTime[2][0] === '0' ? splitTime[2][1] : splitTime[2]}일 ${splitTime[3][0] === '0' ? splitTime[3][1] : splitTime[3]}시 ${splitTime[4][0] === '0' ? splitTime[4][1] : splitTime[4]}분`;
    }

    return (
        <>
            <div className="detail">
                <div>
                    신청 날짜 및 시간 : <br className="br" /> {handleTime(applyTime)} <br />
                    {isCancel ? <>취소된 신청입니다. < br /></> : ``}<br />
                    {part1.isPart ?
                        <>
                            1부 입실 : {handleTime(part1.inTime, true)}< br />
                            1부 퇴실 : {handleTime(part1.outTime, false)}< br />
                        </>
                        : ``}
                    {part2.isPart ?
                        <>
                            2부 입실 : {handleTime(part2.inTime, true)}< br />
                            2부 퇴실 : {handleTime(part2.outTime, false)}< br />
                        </>
                        : ``}
                </div>
                <div>
                    <span>
                        원하는 강의실 :&nbsp;
                        {
                            seatRoom.join('호, ')
                        }
                        호<br />
                        {
                            seatNum === null ?
                                `` : `
                            원하는 자리 : ${seatNum}번
                            `
                        }
                    </span>
                    {
                        friends?.length === 0 ?
                            `` : `
                        입력한 친구 :<br />
                        <div>
                        ${friends.map((prop, index) => {
                                return <Fragment key={prop, index}>
                                    {prop}<br />
                                </Fragment>
                            })
                            }
                        </div>
                        `
                    }
                </div>
            </div>
            <style jsx>{`
        .detail{
            display: ${(isOpenModal ? 'flex' : 'none')};
            height: 100%;
            flex-wrap: wrap;
            border:solid;
            border-width: 0 0 1px 0;
            ${isCancel ? `
            background: #dedede;
            border-color: #ddd;
            ` : `
            background: #fff;
            border-color: #eee;
            `}
        }
        .detail > div{
            display: flex;
            height: 100%;
            line-height: 25px;
            flex-wrap: wrap;
        }
        .detail > div > span{
            width: 100%;
        }
        .detail > div > div{
            margin-left: 10px;
        }
        @media(min-width: 768px){
            .detail{
                padding: 30px 50px;
            }
            .detail > div{
                width: 50%;
            }
        }
        @media(max-width: 767px){
            .detail{
                padding: 25px 30px;
                gap: 15px;
            }
            .detail > div{
                width: 100%;
            }
            .br{
                display: none;
            }
        }
    `}</style>
        </>);
}

export default DetailHistory;