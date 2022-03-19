const BasicInfo = (data) => {
    if (data?.data)
        var { banned, major, name, sid } = data?.data;
    return (<>
        <div className="basic">
            <span>이름</span><span>{name}</span>
            <span>학과</span><span>{major}</span>
            <span>학번</span><span>{sid}</span>
            <span className="last">이용 가능 여부</span>
            <span className="last">{banned ? `이용 불가능` : `이용 가능`}</span>
            <div className="bar"></div>
        </div>
        <style jsx>{`
        .basic{
            display: grid;
            position: relative;
            grid-template-columns: 150px 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr;
            width: 100%;
            height: 180px;
            padding: 30px 10% 0 10%;
        }
        .basic > span{
            display: flex;
            align-items: center;
            padding-left: 10px;
            width: 100%;
            height: 100%;
            white-space: nowrap;
            border: solid #ddd;
            border-width: 0 0 1px 0;
        }
        .last{
            border: none !important;
        }
        .bar{
            position: absolute;
            top: calc(15px + 10%);
            left: calc(130px + 10%);
            width: 0;
            height: 80%;
            border: solid #ddd;
            border-width: 0 1px 0 0;

        }
    `}</style>
    </>);
}

export default BasicInfo;