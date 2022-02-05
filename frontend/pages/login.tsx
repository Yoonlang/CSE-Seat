import Button from "../components/atoms/Button";
import Form from "../components/atoms/Form";
import Input from "../components/atoms/Input";
import Span from "../components/atoms/Span";
import HeadTitle from "../components/others/headTitle"

const login = () => {
    return (
        <div className="fixed">
            <HeadTitle title="login"/>
            <div>login</div>
            <Span>안녕하세요</Span>
            <Form>
                <Input placeholder="안녕하세요"></Input>
                <Button width="600px">테스트용 버튼</Button>
            </Form>
        </div>
    )
}

export default login;