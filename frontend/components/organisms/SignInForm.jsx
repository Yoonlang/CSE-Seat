const SignInForm = () => {
    return (
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
                {
                    isShake[0] & isShake[1] ?
                        `학번과 비밀번호를 4자리 이상 입력해주세요.` :
                        isShake[0] ? `학번을 4자리 이상 입력해주세요.` :
                            isShake[1] ? `비밀번호를 4자리 이상 입력해주세요.` :
                                isFailed ?
                                    `학번 또는 비밀번호를 잘못 입력했습니다.` :
                                    ``
                }
            </span>
            <button className="formBtn" ref={signInBtn} onClick={handleSignIn}>로그인</button>
            <div className="changeBtn" onClick={changeFormState}>회원가입</div>
        </form>
    )

}

export default SignInForm