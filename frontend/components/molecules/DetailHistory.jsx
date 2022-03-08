
const DetailHistory = ({ isOpenModal = false, detail: { applyTime, isCancel } }) => {
    const splitApplyTime = applyTime.split(/:|-| |\n/);
    const handledApplyTime = `${splitApplyTime[0]}년 ${splitApplyTime[1][0] === '0' ? splitApplyTime[1][1] : splitApplyTime[1]}월 ${splitApplyTime[2][0] === '0' ? splitApplyTime[2][1] : splitApplyTime[2]}일 ${splitApplyTime[3][0] === '0' ? splitApplyTime[3][1] : splitApplyTime[3]}시 ${splitApplyTime[4][0] === '0' ? splitApplyTime[4][1] : splitApplyTime[4]}분`;
    return (
        <>
            <div className="detail">
                <div>
                    신청 날짜 및 시간 : <br className="br" /> {handledApplyTime} <br />
                    {isCancel ? <>취소된 신청입니다. < br /></> : ``}<br />
                    1부 입실 :   22.01.19   10:02<br />
                    1부 퇴실 :   22.01.19   18:00<br />
                    2부 입실 :   22.01.19   18:00<br />
                    2부 퇴실 :   22.01.19   21:09<br />
                </div>
                <div>
                    <span>
                        원하는 강의실 : 101호, 104호, 108호<br />
                        원하는 자리 : &nbsp;47
                    </span>
                    입력한 친구 :<br />
                    <div>
                        2018115201<br />
                        2018115202<br />
                        2018115203<br />
                    </div>
                </div>
            </div>
            <style jsx>{`
        .detail{
            display: ${(isOpenModal ? 'flex' : 'none')};
            height: 100%;
            flex-wrap: wrap;
            border-width: 0 0 1px 0;
            box-shadow: 0 -1px #ddd;
            ${isCancel ? `background: #eee;` : ``}
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