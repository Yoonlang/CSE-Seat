import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginAtom } from "./state";


const Checker = () => {
    const isLogin = useRecoilValue(loginAtom);

    useEffect(() => {
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