import HeadTitle from "../components/others/headTitle"
import SignForm from "../components/organisms/SignForm";
import { Div } from "../components/atoms/Div";

const Sign = () => {
    return (
        <>
            <HeadTitle title="login"/>
            <Div>
                <SignForm />
            </Div>
        </>
    )
}

export default Sign;