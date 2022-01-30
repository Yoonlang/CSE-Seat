import {Div} from "../atoms/Div";
import Logo from "../molecules/Logo";
import Navigation from "../molecules/Navigation";

const Header = () => {
    return (
        <Div width="100%" jusContent="left">
            <div className="headerDiv">
                <div className="aaa">메뉴</div>
                <Logo></Logo>
                <Navigation></Navigation>
                <span className="loginInfo">로그인</span>
            </div>
            <style>{`
                .headerDiv{
                    display: flex;
                    align-items: center;
                }
                .loginInfo{
                    display:flex;
                    position: absolute;
                    right: 40px;
                }
                @media(min-width: 750px){
                    .headerDiv{
                        height: 60px;
                    }
                    .aaa{
                        display: none;
                    }
                }
                @media(max-width: 749px){
                    .headerDiv{
                        height: 100px;
                    }
                    .headerDiv:nth-child(2){
                        background: black;
                    }
                }
            `}</style>
        </Div>
    );
}

export default Header;