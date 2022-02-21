import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginAtom } from "./state";

const Checker = () => {
    const [isLogin, setIsLogin] = useRecoilState(loginAtom);

    useEffect(async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/login/check`, {
            method: "GET",
            credentials: "include",
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.result === true) {
                setIsLogin(true);
            }
        });
        const { url } = history.state;

        if (isLogin) {
            if (url === "/sign") {
                window.location.replace("/");
            }
        }
        else {
            if (url === "/" || url === "/sign") {
            }
            else {
                window.location.href = "/sign";
            }
        }
    })

    return <></>
}

export default Checker;