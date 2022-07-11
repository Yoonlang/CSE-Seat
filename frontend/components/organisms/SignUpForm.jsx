const SignUpForm = () => {
    return (
        <form className="signForm" ref={signUpForm}>
            <SignInput src="/images/user.png"
                radius="5px"
                isShake={isShake[2]}
                num={2} />
            <SignInput src="/images/user.png"
                radius="5px"
                placeholder="이름"
                minLength={2}
                isShake={isShake[3]}
                num={3} />
            <SignInput src="/images/mail.png"
                length="28px"
                placeholder="학교 이메일"
                isHold={isHoldEmail}
                minLength={10}
                isShake={isShake[4]}
                num={4} />
            {
                isHoldAuth ?
                    isEmailButton ?
                        <button className="sendEmailBtn" onFocus={focusOnSendEmailBtn} onBlur={blurOnSendEmailBtn} onClick={sendEmail} ref={emailBtn} disabled={preventSendEmailBtn}>이메일 인증 받기 <div className="stay" ref={airplane}><SquareImg src="/images/send.png" length="20px" /></div></button>
                        :
                        <div className="sendEmailBtn">이메일 인증 받기 <SquareImg src="/images/send.png" length="20px" /></div>
                    :
                    <>
                        <SignInput src="/images/check.png"
                            radius="5px"
                            length="23px"
                            placeholder="인증번호 확인"
                            isHold={isHoldAuth}
                            minLength={6}
                            maxLength={6}
                            isOnlyNum
                            isShake={isShake[5]}
                            num={5} />
                        <Timer />
                    </>
            }
            <SignInput src="/images/lock.png"
                type="password"
                placeholder="비밀번호"
                minLength={4}
                maxLength={10}
                isShake={isShake[6]}
                num={6} />
            <SignInput src="/images/lock.png"
                type="password"
                placeholder="비밀번호 확인"
                minLength={4}
                maxLength={10}
                isShake={isShake[7]}
                num={7} />
            <span className="samePassword"><Checkbox state={1} length={"20px"} border={false} /></span>
            <button className="formBtn" onClick={handleSignUp} disabled={preventSignUpBtn}>회원가입</button>
            <div className="changeBtn" onClick={changeFormState}>로그인</div>
        </form>
    )
}

export default SignUpForm