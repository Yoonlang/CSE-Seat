const TodayInfoInOutBtns = ({ seatData, submit }) => {
    return <>
        {
            seatData?.map((prop, index) => {
                const { isPart, showingData: { checkState }, fetchingData } = prop;
                return (<div key={prop, index}>
                    {isPart ?
                        (checkState === 0 ?
                            <><button className="on" onClick={() => submit(true, fetchingData)}>입실</button>
                                <button className="off">퇴실</button></> :
                            checkState === 1 ?
                                <><button className="off">입실</button>
                                    <button className="on" onClick={() => submit(false, fetchingData)}>퇴실</button></> :
                                <><button className="off">입실</button><button className="off">퇴실</button></>) :
                        <><button className="hide">입실</button><button className="hide">퇴실</button></>}
                </div>)
            })
        }
        <style jsx="true">{`
            div{
                display: flex;
                gap: 7px;
            }
            button{
                width: 50px;
                height: 25px;
                border: 1px solid #ddd;
                outline: none;
                background: #fff;
                cursor: pointer;
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
            .hide{
                visibility: hidden;
            }
        `}</style>
    </>
}

export default TodayInfoInOutBtns