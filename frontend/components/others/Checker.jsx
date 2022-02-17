import { useEffect } from "react";


const Checker = ({ isLogin = false }) => {
    useEffect(() => {
        const { url } = history.state;
        console.log(history);
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