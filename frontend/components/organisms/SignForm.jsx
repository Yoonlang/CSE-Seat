import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { SignInput } from "../atoms/Input";
import { useRecoilState, useSetRecoilState } from "recoil";
import { emailAtom, inputValueAtom, loginAtom, notificationAtom } from "../others/state";
import Checkbox from "../atoms/Checkbox";
import SquareImg from "../atoms/Img";
import Timer from "./Timer";
import myFetch from "../others/fetch"
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const SignForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isFailed, setIsFailed] = useState(false);
    const [handleEmail, setHandleEmail] = useRecoilState(emailAtom);
    const { isHoldEmail, isHoldAuth, isEmailButton } = handleEmail;
    const [isShake, setIsShake] = useState(new Array(8).fill(false));
    const [isSamePassword, setIsSamePassword] = useState(false);
    const [preventPushBtnTwice, setPreventPushBtnTwice] = useState({
        sendEmailBtn: false,
        signUpBtn: false,
    });
    const { sendEmailBtn: preventSendEmailBtn, signUpBtn: preventSignUpBtn } = preventPushBtnTwice;
    const [inputValue, setInputValue] = useRecoilState(inputValueAtom);
    const setLoginData = useSetRecoilState(loginAtom);
    const setNotice = useSetRecoilState(notificationAtom);
    const airplane = useRef();
    const signInBtn = useRef();
    const signUpForm = useRef();
    const emailBtn = useRef();
    const router = useRouter();

    const changeFormState = () => {
        setIsLoginForm(!isLoginForm);
    }

    const handleSignIn = async (e) => {
        if (inputValue[0].length >= 4 && inputValue[1].length >= 4) {
            e.preventDefault();
            try {
                const res = await myFetch("POST", "/user/login/process", {
                    sid: inputValue[0],
                    password: inputValue[1]
                })
                const data = await res.json();
                if (res.status === 400) throw "잠시 후 다시 시도해주세요";
                if (data.result === false) {
                    if (signInBtn.current.className.indexOf("wrong") === -1)
                        signInBtn.current.className += " wrong";
                    else {
                        signInBtn.current.className = signInBtn.current.className.substr(0, signInBtn.current.className.length - 6);
                        setTimeout(() => {
                            signInBtn.current.className += " wrong";
                        }, 1);
                    }
                    setIsFailed(true);
                }
                else {
                    setLoginData({
                        isLogin: true,
                        sid: undefined,
                    });
                    setInputValue([
                        inputValue[0],
                        '', '', '', '', '', '', '',
                    ])
                }
            } catch (e) {
                alert(e);
                router.replace(router.asPath);
            }
        }
        else {
            e.preventDefault();
            setIsFailed(false);
            const tempIsShake = [...isShake];
            if (inputValue[0].length < 4) tempIsShake[0] = true;
            if (inputValue[1].length < 4) tempIsShake[1] = true;
            setIsShake(tempIsShake);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setPreventPushBtnTwice({
            sendEmailBtn: preventSendEmailBtn,
            signUpBtn: true,
        })
        if (inputValue[2].length >= 4 && inputValue[3].length >= 2 && inputValue[4].length >= 10 && inputValue[5].length === 6 && !isHoldAuth && inputValue[6].length >= 4 && inputValue[7].length >= 4) {
            try {
                const res = await myFetch("POST", "/user/join/process", {
                    sid: inputValue[2],
                    password: inputValue[7],
                    name: inputValue[3],
                    email: inputValue[4],
                    authNum: inputValue[5],
                })
                const data = await res.json();
                if (res.status === 400) throw "잠시 후 다시 시도해주세요";
                if (data.result === false) {
                    alert(data.message);
                }
                else {
                    setLoginData({
                        isLogin: true,
                        sid: undefined,
                    });
                    setInputValue(new Array(8).fill(''))
                }
            } catch (e) {
                alert(e);
                router.replace(router.asPath);
            } finally {
                setPreventPushBtnTwice({
                    sendEmailBtn: preventSendEmailBtn,
                    signUpBtn: false,
                })
            }
        }
        else {
            const tempIsShake = [...isShake];
            if (inputValue[2].length < 4) tempIsShake[2] = true;
            if (inputValue[3].length < 2) tempIsShake[3] = true;
            if (inputValue[4].length < 10 || inputValue[4].indexOf("@knu.ac.kr") === -1 || inputValue[4].indexOf("@knu.ac.kr") !== inputValue[4].length - 10) tempIsShake[4] = true;
            else if (isEmailButton) {
                if (emailBtn.current?.className.indexOf("shake") === -1) emailBtn.current.className += " shake";
            }
            else if (!isEmailButton & !isHoldAuth && inputValue[5].length !== 6) tempIsShake[5] = true;
            if (inputValue[6].length < 4) tempIsShake[6] = true;
            if (inputValue[7].length < 4) tempIsShake[7] = true;
            if (!isSamePassword) tempIsShake[7] = true;
            setIsShake(tempIsShake);
            if (isEmailButton && emailBtn.current.className.indexOf("shake") === -1) emailBtn.current.className += " shake";
            setPreventPushBtnTwice({
                sendEmailBtn: preventSendEmailBtn,
                signUpBtn: false,
            })
        }
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        if (inputValue[4] === "@knu.ac.kr" || inputValue[4].indexOf(' ') !== -1) {
            alert("잘못된 이메일입니다.");
            return;
        }
        if (emailBtn.current.className.indexOf("shake") !== -1)
            emailBtn.current.className = emailBtn.current.className.substr(0, emailBtn.current.className.length - 6);

        setPreventPushBtnTwice({
            sendEmailBtn: true,
            signUpBtn: preventSignUpBtn
        })
        setHandleEmail({
            isHoldEmail: true,
            isHoldAuth: true,
            isEmailButton: true,
        });

        try {
            const res = await myFetch("POST", "/user/mail", {
                mail: inputValue[4],
            })
            const data = await res.json();
            if (res.status === 400) throw "잠시 후 다시 시도해주세요";
            if (data.result === true) {
                airplane.current.className += " active";
                setTimeout(() => {
                    setHandleEmail({
                        isHoldEmail: true,
                        isHoldAuth: false,
                        isEmailButton: false,
                    });
                    setNotice("이메일의 인증번호를 확인해주세요");
                    setPreventPushBtnTwice({
                        sendEmailBtn: false,
                        signUpBtn: preventSignUpBtn
                    })
                }, 1000);
            }
            else {
                emailBtn.current.className += " shake";
                setHandleEmail({
                    isHoldEmail: false,
                    isHoldAuth: true,
                    isEmailButton: true,
                });
                setPreventPushBtnTwice({
                    sendEmailBtn: false,
                    signUpBtn: preventSignUpBtn
                })
                alert(data.message);
            }
        } catch (e) {
            alert(e);
            router.replace(router.asPath);
            setPreventPushBtnTwice({
                sendEmailBtn: false,
                signUpBtn: preventSignUpBtn
            })
        }
    }

    const focusOnSendEmailBtn = () => {
        emailBtn.current.style.borderColor = "#5C9EFF";
    }

    const blurOnSendEmailBtn = () => {
        emailBtn.current.style.borderColor = "#ddd";
    }

    useEffect(() => {
        if (isShake[0] && inputValue[0].length >= 4) {
            const tempIsShake = [...isShake];
            tempIsShake[0] = false;
            setIsShake(tempIsShake);
        }
    }, [inputValue[0]])

    useEffect(() => {
        if (isShake[1] && inputValue[1].length >= 4) {
            const tempIsShake = [...isShake];
            tempIsShake[1] = false;
            setIsShake(tempIsShake);
        }
    }, [inputValue[1]])

    useEffect(() => {
        if (isShake[2] && inputValue[2].length >= 4) {
            const tempIsShake = [...isShake];
            tempIsShake[2] = false;
            setIsShake(tempIsShake);
        }
    }, [inputValue[2]])

    useEffect(() => {
        if (isShake[3] && inputValue[3].length >= 2) {
            const tempIsShake = [...isShake];
            tempIsShake[3] = false;
            setIsShake(tempIsShake);
        }
    }, [inputValue[3]])

    useEffect(() => {
        if (inputValue[4].indexOf('@') !== -1 && inputValue[4].indexOf('@') === inputValue[4].length - 1) {
            const tempInputValue = { ...inputValue };
            tempInputValue[4] += "knu.ac.kr";
            setInputValue(tempInputValue);
        }

        if (isShake[4] && inputValue[4].length >= 10 && inputValue[4].indexOf("@knu.ac.kr") !== -1 && inputValue[4].length - inputValue[4].indexOf("@knu.ac.kr") === 10) {
            const tempIsShake = [...isShake];
            tempIsShake[4] = false;
            setIsShake(tempIsShake);
        }
    }, [inputValue[4]])

    useEffect(() => {
        if (isShake[5] && inputValue[5].length === 6) {
            const tempIsShake = [...isShake];
            tempIsShake[5] = false;
            setIsShake(tempIsShake);
        }
    }, [inputValue[5]])

    useEffect(() => {
        if (isShake[6] && inputValue[6].length >= 4) {
            const tempIsShake = [...isShake];
            tempIsShake[6] = false;
            setIsShake(tempIsShake);
        }
    }, [inputValue[6]])

    useEffect(() => {
        if (isShake[7] && inputValue[7].length >= 4) {
            const tempIsShake = [...isShake];
            tempIsShake[7] = false;
            setIsShake(tempIsShake);
        }
    }, [inputValue[7]])

    useEffect(() => {
        if (isHoldAuth) {
            const tempHandleData = { ...handleEmail }
            const isQualify = inputValue[4]?.indexOf("@knu.ac.kr") === -1 ? false : inputValue[4].indexOf("@knu.ac.kr") + 10 === inputValue[4].length ? true : false;
            tempHandleData.isEmailButton = isQualify ? true : false;
            setHandleEmail(tempHandleData);
        }
    }, [inputValue[4], inputValue[5]])

    useEffect(() => {
        if (inputValue[6] === inputValue[7] && inputValue[6].length >= 4) setIsSamePassword(true);
        else setIsSamePassword(false);
    }, [inputValue[6], inputValue[7]])

    return (
        <>
            {
                isLoginForm ?
                    <SignInForm />
                    :
                    <SignUpForm />
            }
            <style jsx>{`
                .signForm{
                    display:flex;
                    position:relative;
                    align-items:center;
                    flex-direction:column;
                    width:400px;
                    height:${(isLoginForm ? "270px" : "480px")};
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
                .sendEmailBtn{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 300px;
                    height: 50px;
                    outline: none;
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
                    animation: fly 2s !important;
                }
                .samePassword{
                    display: ${(isSamePassword ? `flex` : `none`)};
                    position: absolute;
                    top: 65%;
                    right: 55px;
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