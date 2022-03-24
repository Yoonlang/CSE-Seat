import { useState, useEffect, useRef } from "react";
import { SignInput } from "../atoms/Input";
import { useRecoilState, useSetRecoilState } from "recoil";
import { inputValueAtom, loginAtom } from "../others/state";
import Checkbox from "../atoms/Checkbox";
import SquareImg from "../atoms/Img";

const SignForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isFailed, setIsFailed] = useState(false);
    const [handleEmail, setHandleEmail] = useState({
        isHoldEmail: false,
        isHoldAuth: true,
        isEmailButton: false,
    });
    const { isHoldEmail, isHoldAuth, isEmailButton } = handleEmail;
    const [isSamePassword, setIsSamePassword] = useState(false);
    const [inputValue, setInputValue] = useRecoilState(inputValueAtom);
    const setLoginData = useSetRecoilState(loginAtom);
    const airplane = useRef();

    const changeFormState = () => {
        setIsLoginForm(!isLoginForm);
    }

    const handleSignIn = async (e) => {
        if (inputValue[0].length >= 4 && inputValue[1].length >= 4) {
            e.preventDefault();
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login/process", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sid: inputValue[0],
                        password: inputValue[1]
                    })
                })
                const data = await res.json();
                if (data.result === false) {
                    setIsFailed(true);
                    throw ("Can't login");
                }
                setLoginData({
                    isLogin: true,
                    sid: undefined,
                });
                setInputValue([
                    inputValue[0],
                    '', '', '', '', '', '', '',
                ])
            } catch (e) {
                console.log("error: ", e);
            }
        }
    }

    const handleSignUp = (e) => {
        if (inputValue[2].length >= 4 && inputValue[3].length >= 2)
            if (inputValue[4].length >= 10 && inputValue[5].length === 6)
                if (inputValue[6].length >= 4 && inputValue[7].length >= 4) {
                    e.preventDefault();

                }
    }

    const test = () => {
        setHandleEmail({
            isHoldEmail: true,
            isHoldAuth: true,
            isEmailButton: true,
        });
        airplane.current.className += " active";
        setTimeout(() => {
            setHandleEmail({
                isHoldEmail: true,
                isHoldAuth: false,
                isEmailButton: false,
            });
        }, 2000);

        // 1. @knu.ac.kr이 입력 되면 버튼이 활성화된다.
        // 2. 버튼을 클릭하면 이메일란은 고정되고, fetching하며 이메일에 성공적으로 보냈는지 검사한다.
        // 3. 이메일에 성공적으로 보냈다면 비행기를 날려보내고 alert를 띄운다.
        // 4. 이메일에 보내는 데 실패했다면, 잘못됐다는 걸 알려주고 이메일 고정을 해체하고, 비행기 보내기 X
        // 5. 비행기 보내고나면 div를 input으로 바꿔

        // 원래는 이 버튼을 누르면 post로 fetch가 진행되어야함.
        // 혹시 이메일을 잘못 보내거나 서버측에서 에러가 생겨서 error가 발생하면
        // 그 에러에 대해 alert로 알려주고
        // isHoldEmail, isHoldAuth, isEmailButton 다시 풀어줘야함.
    }

    useEffect(() => {
        console.log(handleEmail);
        // if (!isHoldAuth) alert("이메일을 확인해주세요.");
        // 이것도 fetch 보내서 result가 true면 alert 떠야함.
    }, [handleEmail])

    useEffect(() => {
        // 1. @knu.ac.kr이면 옆에 메일 보내기 뜨게. 다시 지우면 사라짐
        // 2. 메일 보내기를 눌러서 result 성공이 뜨면 이메일은 잠구고 (메일 보내기를 눌렀으면 일단 email 수정 금지)
        // 3. 메일 보내기 없애주고, 인증번호 확인은 적을 수 있게 되어야함.
        if (isHoldAuth) {
            const tempHandleData = { ...handleEmail }
            const isQualify = inputValue[4]?.indexOf("@knu.ac.kr") === -1 ? false : inputValue[4].indexOf("@knu.ac.kr") + 10 === inputValue[4].length ? true : false;
            tempHandleData.isEmailButton = isQualify ? true : false;
            setHandleEmail(tempHandleData);
        }

        // 현재 메일 보내기 버튼은 뜬 상태


    }, [inputValue[4], inputValue[5]])

    useEffect(() => {
        if (inputValue[6] === inputValue[7] && inputValue[6].length >= 4) setIsSamePassword(true);
        else setIsSamePassword(false);
    }, [inputValue[6], inputValue[7]])

    useEffect(() => {
        if (isFailed)
            setTimeout(() => {
                setIsFailed(false);
            }, 300);
    }, [isFailed])

    return (
        <>
            {
                isLoginForm ?
                    <form className="signForm">
                        <SignInput src="/images/user.png"
                            radius="5px" num={0} />
                        <SignInput src="/images/lock.png"
                            type="password"
                            placeholder="비밀번호" num={1} />
                        <button className="formBtn" onClick={handleSignIn}>로그인</button>
                        <div className="changeBtn" onClick={changeFormState}>회원가입</div>
                    </form>
                    :
                    <form className="signForm">
                        <SignInput src="/images/user.png"
                            radius="5px" num={2} />
                        <SignInput src="/images/user.png"
                            radius="5px"
                            placeholder="이름"
                            minLength={2}
                            num={3} />
                        <SignInput src="/images/mail.png"
                            length="28px"
                            placeholder="학교 이메일"
                            isHold={isHoldEmail}
                            minLength={10}
                            num={4} />
                        {
                            isHoldAuth ?
                                isEmailButton ?
                                    <div className="sendEmailBtn" onClick={test}>이메일 인증 받기 <div className="stay" ref={airplane}><SquareImg src="/images/send.png" length="20px" /></div></div>
                                    :
                                    <div className="sendEmailBtn">이메일 인증 받기 <SquareImg src="/images/send.png" length="20px" /></div>
                                :
                                <SignInput src="/images/check.png"
                                    radius="5px"
                                    length="23px"
                                    placeholder="인증번호 확인"
                                    isHold={isHoldAuth}
                                    minLength={6}
                                    maxLength={6}
                                    isOnlyNum
                                    num={5} />
                        }
                        <SignInput src="/images/lock.png"
                            type="password"
                            placeholder="비밀번호"
                            minLength={4}
                            maxLength={10}
                            num={6} />
                        <SignInput src="/images/lock.png"
                            type="password"
                            placeholder="비밀번호 확인"
                            minLength={4}
                            maxLength={10}
                            num={7} />
                        <span className="samePassword"><Checkbox state={1} length={"20px"} border={false} /></span>
                        <button className="formBtn" onClick={handleSignUp}>회원가입</button>
                        <div className="changeBtn" onClick={changeFormState}>로그인</div>
                    </form>
            }
            <style jsx>{`
                .signForm{
                    display:flex;
                    position:relative;
                    align-items:center;
                    flex-direction:column;
                    width:400px;
                    height:${(isLoginForm ? "250px" : "480px")};
                    border:solid;
                    border-color:#ddd;
                    border-width:1px;
                    gap: 5px;
                    padding: 20px;
                    background: #fff;
                }
                #inputFile{
                    display:none;
                }
                .fileDiv{
                    display:flex;
                    width: 300px;
                    height: 50px;
                    align-items:center;
                    border:solid;
                    border-color:#ddd;
                    border-width:1px;
                    padding-left: 12px;
                    gap: 14px;
                }
                .formBtn{
                    width: 300px;
                    height: 40px;
                    border:none;
                    outline:none;
                    ${(isFailed ? `
                    background: #da2127;
                    transition: 0.1s;
                    ` : `
                    background: #5C9EFF;
                    transition: 1s;
                    `)}
                    color: #fff;
                    font-size: 14px;
                    font-weight: 550;
                    letter-spacing: 3px;
                    margin: 10px 0;
                    transition-property: background;
                }
                .changeBtn{
                    position: absolute;
                    bottom:20px;
                    cursor: pointer;
                }
                .sendEmailBtn{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 300px;
                    height: 50px;
                    border: solid 1px #ddd;
                    background: none;
                    cursor: pointer;
                    font-size: 14px;
                    gap: 15px;
                    ${(isEmailButton ? `opacity: 1;` : `opacity: 0.5;`)}
                }
                .stay{
                    animation: stay 2s infinite;
                }
                .active{
                    animation: fly 2s infinite !important;
                }
                .samePassword{
                    display: ${(isSamePassword ? `flex` : `none`)};
                    position: absolute;
                    top: 65%;
                    right: 25px;
                }
                @keyframes stay{
                    0%{transform: translateX(0) translateY(0);}
                    50%{transform: translateX(5px) translateY(-5px);}
                    100%{transform: translateX(0) translateY(0);}
                }
                @keyframes fly{
                    0%{transform: translateX(0) translateY(0);}
                    10%{transform: translateX(-10px) translateY(10px);}
                    100%{transform: translateX(500px) translateY(-500px);}
                }
            `}</style>
        </>
    );
}

export default SignForm;