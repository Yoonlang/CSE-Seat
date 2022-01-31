import SquareImg from "../atoms/Img";
import Logo from "../molecules/Logo";
import Navigation from "../molecules/Navigation";
import {useState} from 'react';
import { Div, MyLink } from "../atoms/Div";

const Header = () => {
    const [isMenuClick, setIsMenuClick] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const userName = "최윤석님";

    const clickMenu = () => {
        setIsMenuClick(!isMenuClick);
    }

    const logout = () => {
        setIsLogin(false);
        setIsMenuClick(false);
        // 동시에 refresh
        // 다른곳으로 이동해도 메뉴가 꺼져야함
        
    }

    return (
        <>
        <div className="headerDiv">
            <div className="menu" onClick={clickMenu}>
                <SquareImg src="/images/menu.png" 
                length="24px"/>
            </div>
            <Logo />
            {
                isLogin?
                <div className="loginInfoA">
                    <Div width="60px">{userName}</Div>
                </div>
                :
                <div className="loginInfoA">
                    <MyLink href="/sign" width="60px">로그인</MyLink>
                </div>
            }
            
            <Navigation/>
            {
                isLogin?
                <div className="loginInfoB" onClick={clickMenu}>
                    <Div width="60px">{userName}</Div>
                </div>
                :
                <div className="loginInfoB">
                    <MyLink href="/sign" width="60px">로그인</MyLink>
                </div>
            }
            <div className="modal">
                <MyLink href="/info">내 정보</MyLink> 
                <div className="logout" onClick={logout}>로그아웃</div> 
            </div>
        </div>
        <style>{`
            .modal{
                display: ${(isMenuClick ? "flex" : "none")};
                flex-direction : column;
                position: absolute;
                width: 100px;
                height: 100px;
                background: #fff;
                border: solid;
                border-width: 1px;
                border-color: #ddd;
                z-index: 5;
                cursor:pointer;
            }
            .logout{
                width: 100px;
                height: 49px;
                display:flex;
                align-items:center;
                justify-content:center;
            }
            .headerDiv{
                display: flex;
                padding: 0 10px;
                align-items: center;
                border-bottom: solid;
                border-color: #ddd;
                border-width: 1px;
            }
            .loginInfoA, .loginInfoB{
                display:flex;
                white-space: nowrap;
                
            }
            @media(min-width: 750px){
                .headerDiv{
                    height: 60px;
                    display: flex;
                    justify-content: left;
                }
                .menu{
                    display: none;
                }
                .loginInfoB{
                    position: absolute;
                    right: 40px;
                    cursor: pointer;
                }
                .loginInfoA{
                    display: none;
                }
                .modal{
                    right: 20px;
                    top: 59px;
                }
            }
            @media(max-width: 749px){
                .headerDiv{
                    height: 100px;
                    justify-content: space-around;
                    flex-wrap: wrap;
                }
                .headerDiv:nth-child(2){
                    background: black;
                }
                .menu{
                    display:flex;
                    align-items:center;
                    width: 60px;
                    cursor: pointer;
                }
                .loginInfoB{
                    display: none;
                }
                .modal{
                    left: 0;
                    top: 99px;
                }
            }
        `}</style>
        </>
    );
}

export default Header;