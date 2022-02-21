import SquareImg from "../atoms/Img";
import Logo from "../molecules/Logo";
import Navigation from "../molecules/Navigation";
import { useEffect, useRef, useState } from 'react';
import { Div, MyLink } from "../atoms/Div";
import { useRecoilState } from "recoil";
import { loginAtom } from "../others/state";

const Header = () => {
    const [isMenuClick, setIsMenuClick] = useState(false);
    const [isLogin, setIsLogin] = useRecoilState(loginAtom);
    const modalOutside = useRef();

    const clickMenu = () => {
        if (isLogin) {
            setIsMenuClick(!isMenuClick);
        }
        else {
            window.location.href = '/sign';
        }
    }

    const signOut = async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/logout", {
            method: "GET",
            credentials: "include",
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
        });

        setIsLogin(false);
        setIsMenuClick(false);
    }

    const closeModal = (e) => {
        if (e.target === modalOutside.current) {
            setIsMenuClick(!isMenuClick);
        }
    }

    const closeModal2 = () => {
        setIsMenuClick(false);
    }

    // useEffect(() => {
    //     document.addEventListener("click", (e) => {
    //         console.log(e.target);
    //     })
    // }, [])

    return (
        <>
            <div className="block"></div>
            <div className="headerDiv">
                <div className="menu" onClick={clickMenu}>
                    <SquareImg src="/images/menu.png"
                        length="24px" />
                </div>
                <Logo />
                {
                    isLogin ?
                        <div className="loginInfoA" onClick={clickMenu}>
                            <Div width="60px">홍길동</Div>
                        </div>
                        :
                        <div className="loginInfoA">
                            <MyLink href="/sign" width="60px">로그인</MyLink>
                        </div>
                }

                <Navigation />
                {
                    isLogin ?
                        <div className="loginInfoB" onClick={clickMenu}>
                            <Div width="60px">홍길동</Div>
                        </div>
                        :
                        <div className="loginInfoB">
                            <MyLink href="/sign" width="60px">로그인</MyLink>
                        </div>
                }
                <div className="PCModal" >
                    <div onClick={closeModal2}><MyLink href="/info">내 정보</MyLink></div>
                    <div className="signOut" onClick={signOut}>로그아웃</div>
                </div>
            </div>
            <div className="mobileModalContainer" onClick={closeModal} ref={modalOutside}>
                <div className="mobileModal">
                    <div onClick={closeModal2}><MyLink href="/info">내 정보</MyLink></div>
                    <div className="signOut" onClick={signOut}>로그아웃</div>
                </div>
            </div>
            <style>{`
            .signOut{
                width: 100px;
                height: 49px;
                display:flex;
                align-items:center;
                justify-content:center;
                cursor: pointer;
            }
            .headerDiv{
                display: flex;
                position: relative;
                padding: 0 10px;
                align-items: center;
                border-bottom: solid;
                border-color: #ddd;
                border-width: 1px;
                background: #fff;
                z-index: 10;
            }
            .loginInfoA, .loginInfoB{
                display:flex;
                white-space: nowrap;
                cursor: pointer;
            }
            @media(min-width: 768px){
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
                    
                }
                .loginInfoA{
                    display: none;
                }
                .PCModal{
                    display: ${(isMenuClick ? "flex" : "none")};
                    flex-direction : column;
                    position: absolute;
                    right: 20px;
                    top: 59px;
                    width: 100px;
                    height: 100px;
                    background: #fff;
                    border: solid;
                    border-width: 1px;
                    border-color: #ddd;
                    cursor:pointer;
                }
                .mobileModalContainer{
                    display: none;
                }
            }
            @media(max-width: 767px){
                .block{
                    width: 100%;
                    height: 100px;
                }
                .headerDiv{
                    position: fixed;
                    top:0;
                    left:0;
                    width: 100%;
                    height: 100px;
                    justify-content: space-around;
                    flex-wrap: wrap;
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
                .PCModal{
                    display: none;
                }
                .mobileModalContainer{
                    display: ${(isMenuClick ? "flex" : "none")};
                    position: fixed;
                    top: -1vh;
                    left: -1%;
                    width: 102%;
                    height: 102vh;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 20;
                }
                .mobileModal{
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 20px;
                    width: 250px;
                    height: 100%;
                    background: #fff;
                }
            }
        `}</style>
        </>
    );
}

export default Header;