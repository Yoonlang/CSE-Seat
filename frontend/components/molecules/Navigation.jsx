import {Div, MyLink} from "../atoms/Div";

const Navigation = () => {
    return (
        <Div height="100%" margin="0 0 0 20px" jusContent="space-around">
            <div className="navDiv">
                <MyLink href="/" width="100%">
                    <span>자리 확인</span>
                </MyLink>
                <div></div>
                <MyLink href="/history" width="100%">
                    <span>내 기록 보기</span>
                </MyLink>
                <div></div>
                <MyLink href="/apply" width="100%">
                    <span>자리 신청</span>
                </MyLink>
            </div>
            <style jsx>{`
                .navDiv{
                    display:flex;
                    align-items: center;
                }
                .navDiv div{
                    width: 1px;
                    height: 15px;
                    background: #ddd;
                    border:solid;
                    border-width:1px;
                    border-color:#ddd;
                }
                span{
                    font-size: 16px;
                    white-space: nowrap;
                }
                @media(min-width:500px){
                    .navDiv{
                        width: 400px;
                    }
                }
                @media(max-width:499px){
                    .navDiv{
                        width: 100%;
                        height: 50px;
                    }
                }
            `}</style>
        </Div>
    );
}

export default Navigation;