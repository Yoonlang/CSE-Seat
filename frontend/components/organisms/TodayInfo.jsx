import { useState } from "react";
import Checkbox from "../atoms/Checkbox";
import { MyLink } from "../atoms/Div";

const TodayInfo = () => {
    const [isSelectCancel, setIsSelectCancel] = useState(true);

    const handleCancel = () => {
        if(isSelectCancel){
            alert("신청");
            setIsSelectCancel(false);
        }
        else{
            setIsSelectCancel(true);
        }
    }

    return (
    <>
    <div className="today">
        <div className="todayInfo">
            <span>오늘</span><span>1부</span><span>101호 47번 좌석</span>
            <span></span><span>2부</span><span>101호 47번 좌석</span>
            <span>내일</span><span>1부</span><span>101호 47번 좌석</span>
            <span></span><span>2부</span><span>101호 47번 좌석</span>
        </div>
        <div>
            {isSelectCancel ? 
            <>
            <Checkbox />
            <Checkbox />
            </>
                :
            <>
            <button>입실</button><button>퇴실</button>
            <button>입실</button><button>퇴실</button>
            <button>입실</button><button>퇴실</button>
            <button>입실</button><button>퇴실</button>
            </>
            }
        </div>
        <MyLink href="/history" border width="140px" height="30px">신청 기록 확인</MyLink>
        <button className="cancelBtn" onClick={handleCancel}>{isSelectCancel ? "취소하기" : "자리 취소"}</button>
    </div>
    <style jsx>{`
        .today{
            display: grid;
            grid-template-columns: 300px 1fr;
            grid-template-rows: 1fr 50px;
            width: 100%;
            height: 100%;

        }
        .todayInfo{
            display: grid;
            grid-template-columns: 60px 60px 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr;
        }

        .cancelBtn{
            width: 100px;
            height: 30px;
            background: #fff;
            outline: none;
            border: 1px solid #ddd;
        }
        
    `}</style>
    </>);
}

export default TodayInfo;