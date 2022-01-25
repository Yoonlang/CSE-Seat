import Link from "next/link";
import Button from "../atoms/Button";
import Div from "../atoms/Div";

const Navigation = () => {
    return (
        <Div width="100%" height="50px">
            <Link href="/">
                <a>자리 확인</a>
            </Link>
            <Link href="/history">
                <a>내 기록 보기</a>
            </Link>
            <Link href="/apply">
                <a>자리 신청</a>
            </Link>
        </Div>
    );
}

export default Navigation;