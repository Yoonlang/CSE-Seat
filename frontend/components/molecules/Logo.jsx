import SquareImg from "../atoms/Img";
import {MyLink} from "../atoms/Div";

const Logo = () => {
    return (
        <MyLink href="/" passHref={true} width="200px" height="100%">
            <SquareImg src="/images/cse.png" 
                length="45px"/>
            <span>CSE Seat</span>
            <style jsx>{`
                span{
                    margin-left: 10px;
                    font-size: 22px;
                    white-space: nowrap;
                }
                @media(max-width: 749px){
                    span{
                        display:none;
                    }
                }
            `}</style>
        </MyLink>
    );
}

export default Logo;