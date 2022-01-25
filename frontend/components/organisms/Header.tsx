import React, {useState} from "react";
import { useRecoilState } from "recoil";
import Span from "../atoms/Span";
import Logo from "../molecules/Logo";
import Navigation from "../molecules/Navigation";
import { nameState } from "../others/state";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [name, setNameState] = useRecoilState(nameState);
    
    return (
        <>
            <Logo></Logo>
            <Navigation></Navigation>
            <Span>
                {isLogin ? name : "로그인 / 회원가입"}
            </Span>
        </>
    );
}

export default Header;