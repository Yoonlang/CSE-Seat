const SeatingChartModal = () => {
    // 한 room의 width를 250~400. width 조절 처리 끝
    // RoomSeats에 length 달 수 있게 설정해놨으니까
    // 내일 seat 크기 조절해서 modal창에 넣도록.
    return (
        <>
        <div className="background">
            <div className="modal">하이</div>
        </div>
        <style jsx>{`
            .background{
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: -1vh;
                left: -1vw;
                width: 102vw;
                height: 102vh;
                background: rgba(0, 0, 0, 0.5);
                z-index: 11;
            }
            .modal{
                display: flex;
                position: relative;
                top:0;
                left:0;
                height: 70%;
                background: #fff;
                cursor: default;
                border:none;
            }
            @media(min-width: 1024px){
                .modal{
                    width: 70%;
                    min-width: 850px;
                    max-width: 1300px;
                }
            }
            @media(max-width: 1023px){
                .modal{
                    width: 400px;
                }
            }
        `}</style>
        </>
    );
}

export default SeatingChartModal;