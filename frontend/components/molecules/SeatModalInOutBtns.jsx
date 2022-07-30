var btnStyle = <style jsx>{`
button{
    width: 80px;
    height: 35px;
}
span{
    width: 200px !important;
    height: 100%;
}
.off{
    background: #fff;
    outline: none;
    border: 1px solid #ddd;
    color: #ddd;
    cursor: default;
}
.on{
    background: #fff;
    outline: none;
    border: 1px solid #999;
    color: #000;
    cursor: pointer;
}
`}</style>

const OnOffBtns = ({ myState, handleCheck }) => {
    if (myState === 0) {
        return <>
            <button className="on" onClick={() => handleCheck(true)}>입실</button>
            <button className="off">퇴실</button>
            {btnStyle}
        </>
    }
    if (myState === 1) {
        return <>
            <button className="off">입실</button>
            <button className="on" onClick={() => handleCheck(false)}>퇴실</button>
            {btnStyle}
        </>
    }
    if (myState === 3) {
        return <>
            <button className="off">입실</button>
            <button className="off">퇴실</button>
            {btnStyle}
        </>
    }
    return <></>
}

const SeatModalInOutBtns = ({ myState, handleCheck }) => {
    return <>
        <div className="check">
            <OnOffBtns myState={myState} handleCheck={handleCheck} />
        </div>
        <style jsx>{`
        .check{
            display: flex;
            justify-content: center;
            width: 100%;
            gap: 20px;
            margin: 10px 0;
        }
        `}</style>
    </>

}

export default SeatModalInOutBtns