import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { completeHistoryAtom, historyToIndexAndInfoAtom, loginAtom, refreshIndexAtom } from "./state";

const Checker = () => {
    const router = useRouter();
    const { pathname } = router;
    const [isFetching, setIsFetching] = useState(true);
    const [loginData, setLoginData] = useRecoilState(loginAtom);
    const setCompleteHistoryData = useSetRecoilState(completeHistoryAtom);
    const setHistoryToOther = useSetRecoilState(historyToIndexAndInfoAtom);
    const refreshData = useRecoilValue(refreshIndexAtom);
    const { isLogin } = loginData;


    const handleHistoryData = (data) => {
        const res = data.data.filter((prop) => {
            return prop.state === 2 ? 0 : 1;
        })
        console.log(res);
        setHistoryToOther(res);
    }

    useEffect(async () => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/login/check`, {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json();
            data.result === true ? setLoginData({
                isLogin: true,
                name: data.name,
            }) : setLoginData({
                isLogin: false,
                name: undefined,
            });
        } catch (e) {
            console.log("Error: ", e);
        }
    }, [pathname]);

    useEffect(async () => {
        if (pathname === '/' || pathname === 'info' || pathname === '/history') {
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/history`, {
                    method: "GET",
                    credentials: "include",
                })
                const data = await res.json();
                console.log(data);
                setCompleteHistoryData(data);
                handleHistoryData(data);
            } catch (e) {
                console.log("Error: ", e);
            }
        }
    }, [pathname, refreshData]);

    useEffect(async () => {
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