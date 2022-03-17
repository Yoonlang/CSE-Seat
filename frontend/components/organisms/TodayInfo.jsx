import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Checkbox from "../atoms/Checkbox";
import { MyLink } from "../atoms/Div";
import { historyToIndexAndInfoAtom } from "../others/state";

const TodayInfo = () => {
    const [isSelectCancel, setIsSelectCancel] = useState(false);
    const [handledInfoData, setHandledInfoData] = useState([]);
    const [checkboxState, setCheckboxState] = useState([2, 2, 2, 2]);
    const checkData = useRecoilValue(historyToIndexAndInfoAtom);

    const handleCancel = () => {
        if (isSelectCancel) {
            if (checkboxState.some((prop) => {
                return prop === 1;
            })) {
                alert("신청");
                setCheckboxState([0, 0, 0, 0]);
            }
            setIsSelectCancel(false);
        }
        else setIsSelectCancel(true);
    }

    const clickCheckbox = (index) => {
        const tempCheckboxState = checkboxState.slice(0, 4);
        if (tempCheckboxState[index] !== 2) {
            tempCheckboxState[index] = tempCheckboxState[index] === 0 ? 1 : 0;
            setCheckboxState(tempCheckboxState);
        }
    }

    const handleCheckData = (req) => {
        console.log(req);
        // 뽑아내야할 정보들
        // 오늘/내일, 1/2부에 대해서
        // 보이는 정보
        // isPart => 정보 보이게 하기 + checkBox 비활성화
        // part1End, state => 그 자리에 대해서 입/퇴실 버튼 활성화 여부
        // 자리 번호 + 방 번호 => 보여주는 용도
        // isToday => 오늘인지 내일인지 알기 위해서

        // 요청할 때 필요한 정보
        // 1. 입/퇴실 버튼 누르는거 관련
        // buildingId, seatRoom, seatNum, part1, part2
        // 여기서 part1, part2는 그냥 자리 있으면 다 true가 맞음
        // 단일로 true / false 따지는게 아님
        // 2. 자리 취소 관련
        // buildingId, seatRoom, seatNum, isToday, part1, part2
        // cancel에서 part1, part2는 내가 취소하고싶은 것만이었나?

        // 뽑아내야할 정보는 완료했고, 이제 저걸 토대로 handledInfoData 만들기
        // 각 오늘/1부 에 대해서 들어가야할 정보들
        // 1. isPart로 이 자리가 내 자리로 예약되어있는지 확인한다
        // 1-1. 내 자리가 아니다 ? span 뺴고, 입퇴실 버튼 빼고, checkBox 2
        // 2. 내자리다 => 보여줘야할 정보와 fetch할때 필요한걸로 나눠
        // 2-1. 보여줘야할 정보들
        // 

        const myReq = { // 4개 각각에 대한 완성된 객체
            isPart: true,
            showingData: {
                checkState: 1, // 입퇴실 버튼용
                // 0, 1, 2, 3에 대해 앞에서 미리 처리해서 넣어두자
                seatRoom: 101,
                seatNum: 12,
            },
            fetchingData: {
                buildingId: 404,
                seatRoom: 101,
                seatNum: 12,
                isToday: true,
                // part1 part2에 대해서 여기서 처리해주는게 맞을까?
            },
        }


    }

    useEffect(() => {
        if (checkData) handleCheckData(checkData);
    }, [checkData])

    useEffect(() => {
        // infoData가 완성되면 checkbox 상태 그에 맞게 고쳐줘야함.
        if (handledInfoData) setCheckboxState([0, 0, 0, 0]);
    }, [handledInfoData])

    return (
        <>
            <div className="today">
                <div className="todayInfo">
                    <span>오늘</span><span>1부</span><span>101호 47번 좌석</span>
                    <span></span><span>2부</span><span>101호 47번 좌석</span>
                    <span>내일</span><span>1부</span><span>101호 47번 좌석</span>
                    <span></span><span>2부</span><span>101호 47번 좌석</span>
                </div>
                <div className="infoOption">
                    {isSelectCancel ?
                        <>
                            {
                                checkboxState.map((prop, index) => {
                                    return (
                                        <div key={prop, index} onClick={() => clickCheckbox(index)}>
                                            <Checkbox state={checkboxState[index]} />
                                        </div>
                                    );
                                })
                            }
                        </>
                        :
                        <>
                            <div><button>입실</button><button>퇴실</button></div>
                            <div><button>입실</button><button>퇴실</button></div>
                            <div><button>입실</button><button>퇴실</button></div>
                            <div><button>입실</button><button>퇴실</button></div>
                        </>
                    }
                </div>
                <MyLink href="/history" border width="140px" height="30px" fontSize="13px">신청 기록 확인</MyLink>
                <button className="cancelBtn" onClick={handleCancel}>{isSelectCancel ? "취소하기" : "자리 취소"}</button>
            </div>
            <style jsx>{`
        .today{
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: 140px 50px;
            justify-items: flex-end;
            align-items: flex-end;
            width: 100%;
            max-width: 400px;
            height: 100%;
            padding: 0 5px;
        }
        .todayInfo{
            display: grid;
            grid-template-rows: 1fr 1fr 1fr 1fr;
            width: 100%;
            height: 100%;
            align-items: center;
        }
        .infoOption{
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            justify-self: center;
            height: 100%;
        }
        ${(isSelectCancel ? `
        .infoOption div{
            display: flex;
            width: 25px;
            height: 25px;
            overflow: hidden;
            cursor: pointer;
        }
        ` : `
        .infoOption div{
            display: flex;
            gap: 7px;
        }
        .infoOption button{
            width: 50px;
            height: 25px;
            border: 1px solid #ddd;
            outline: none;
            background: #fff;
            cursor: pointer;
        }
        `)}
        .cancelBtn{
            width: 100px;
            height: 30px;
            background: #fff;
            outline: none;
            border: 1px solid #ddd;
            font-size: 13px;
            justify-self: center;
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
    `}</style>
        </>);
}

export default TodayInfo;