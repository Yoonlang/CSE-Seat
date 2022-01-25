import Img from "../atoms/Img";
import Span from "../atoms/Span";
import Link from "next/link";
import Div from "../atoms/Div";


const Logo = () => {

    return (
        <Link href="/">
            <a>
                <Div width="200px" height="60px" jusContent="left">
                    <Img src="https://github.com/Yoonlang/web-programming/blob/master/html/assets/dog1.jpg?raw=true" 
                        width="60px"
                        height="60px"
                    />
                    <Span size="25px">CSE Seat</Span>
                </Div>
            </a>
        </Link>
    );
}

export default Logo;