import { SignInput } from "../atoms/Input";

const SignInErrorText = ({ isShake, isFailed }) => {
    if (isShake[0] & isShake[1])
        return `학번과 비밀번호를 4자리 이상 입력해주세요.`
    if (isShake[0])
        return `학번을 4자리 이상 입력해주세요.`
    if (isShake[1])
        return `비밀번호를 4자리 이상 입력해주세요.`
    if (isFailed)
        return `학번 또는 비밀번호를 잘못 입력했습니다.`
    return ``
}

const SignInForm = ({ isShake, isFailed, handleSignIn, changeFormState }) => {
    return (
        <>
            <form className="signForm">
                <SignInput src="/images/user.png"
                    radius="5px"
                    isShake={isShake[0]}
                    num={0} />
                <SignInput src="/images/lock.png"
                    maxLength={10}
                    type="password"
                    placeholder="비밀번호"
                    isShake={isShake[1]}
                    num={1} />
                <span className="signInError">
                    <SignInErrorText isShake={isShake} isFailed={isFailed} />
                </span>
                <button className="formBtn" ref={signInBtn} onClick={handleSignIn}>로그인</button>
                <div className="changeBtn" onClick={changeFormState}>회원가입</div>
            </form>
            <style jsx>{`
                .signForm{
                    display:flex;
                    position:relative;
                    align-items:center;
                    flex-direction:column;
                    width:400px;
                    height:"270px";
                    border:solid;
                    border-color:#ddd;
                    border-width:1px;
                    gap: 5px;
                    padding: 20px;
                    background: #fff;
                    margin: 30px 0;
                }
                .signInError{
                    display: flex;
                    align-items: center;
                    width: 300px;
                    height: 20px;
                    font-size: 13px;
                    color: #dc2b3c;
                }
                .formBtn{
                    width: 300px;
                    height: 40px;
                    border:none;
                    outline:none;
                    background: #5C9EFF;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 550;
                    letter-spacing: 3px;
                    margin: 10px 0;
                    cursor: pointer;
                }
                .wrong{
                    animation: wrong 1s;
                }
                .changeBtn{
                    position: absolute;
                    bottom:20px;
                    cursor: pointer;
                }
                .shake{
                    border-color: #da2127 !important;
                    border-width: 1.5px;
                    animation: shake 0.5s;
                }
                @keyframes shake{
                    25%{
                        transform: translate(20px);
                    }
                    50%{
                        transform: translate(-10px);
                    }
                    70%{
                        transform: translate(5px);
                    }
                    90%{
                        transform: translate(-2px);
                    }
                    100%{
                        transform: translate(0);
                    }
                }
                @keyframes wrong{
                    0%{
                        background: #5C9EFF;
                    }
                    10%{
                        background: #da2127;
                    }
                    100%{
                        background: #5C9EFF;
                    }
                }
            `}</style>
        </>
    )
}

export default SignInForm