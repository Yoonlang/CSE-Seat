import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginAtom } from "./state";

const Checker = () => {
    // 여기서 쿠키로 get 보내서 로그인정보 확인.
    const isLogin = useRecoilValue(loginAtom);

    useEffect(async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/login/check`, {
            method: "GET",
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
        });
        const { url } = history.state;

        if (isLogin) {
            if (url === "/sign") {
                // window.location.replace("/");
            }
        }
        else {
            if (url === "/" || url === "/sign") {
            }
            else {
                // window.location.href = "/sign";
            }
        }
    })

    return <></>
}

export default Checker;