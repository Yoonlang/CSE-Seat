import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginAtom } from "./state";

const Checker = () => {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(true);
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
            setIsFetching(false);
        });
    }, [router.pathname]);

    useEffect(() => {
        const { pathname } = router;
        if (!isFetching) {
            if (isLogin) {
                if (pathname === "/sign") {
                    if (document.referrer && document.referrer.indexOf("localhost") !== -1) {
                        history.back();
                    }
                    else {
                        router.replace("/");
                    }
                }
            }
            else {
                if (pathname === "/" || pathname === "/sign") {
                }
                else {
                    router.push("/sign");
                }
            }
        }
    }, [isFetching, isLogin]);

    return <></>
}

export default Checker;