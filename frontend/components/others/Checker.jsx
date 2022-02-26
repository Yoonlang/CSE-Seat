import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginAtom } from "./state";

const Checker = () => {
    const router = useRouter();
    const { pathname } = router;
    const [isFetching, setIsFetching] = useState(true);
    const [isLogin, setIsLogin] = useRecoilState(loginAtom);

    useEffect(async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/login/check`, {
            method: "GET",
            credentials: "include",
        })
        const data = await res.json();
        data.result === true ? setIsLogin(true) : setIsLogin(false);
    }, [pathname]);

    useEffect(() => {
        if (isLogin !== undefined) setIsFetching(false);
    }, [isLogin])

    useEffect(() => {
        if (!isFetching) {
            if (isLogin) {
                if (pathname === "/sign") router.replace("/");
            }
            else {
                if (pathname !== "/" && pathname !== "/sign") router.push("/sign");
            }
        }
    }, [pathname, isFetching, isLogin]);

    return <></>
}



export default Checker;