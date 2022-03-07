import { useState, useRef, useEffect } from "react";
import { SignInput } from "../atoms/Input";
import SquareImg from "../atoms/Img";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { inputValueAtom, loginAtom } from "../others/state";
import Checkbox from "../atoms/Checkbox";

const SignForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isFailed, setIsFailed] = useState(false);
    const [isFileUpload, setIsFileUpload] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(false);
    const fileInput = useRef();
    const [inputValue, setInputValue] = useRecoilState(inputValueAtom);
    const setLoginData = useSetRecoilState(loginAtom);

    const changeFormState = () => {
        setIsLoginForm(!isLoginForm);
    }

    const clickFileDiv = () => {
        fileInput.current.click();
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
                    '', '', ''
                ])
            } catch (e) {
                console.log("error: ", e);
            }
        }
    }

    const handleSignUp = (e) => {
        if (!isFileUpload) {
            alert("모바일 학생증 사진을 업로드하세요.");
        }
        if (inputValue[2].length >= 4 && inputValue[3].length >= 4 && isFileUpload) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        if (inputValue[2] === inputValue[3] && inputValue[2].length >= 4) setIsSamePassword(true);
        else setIsSamePassword(false);

    }, [inputValue[2], inputValue[3]])

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
                        <div className="fileDiv" onClick={clickFileDiv}>
                            <SquareImg src="/images/user.png"
                                radius="5px" length="20px" />
                            <label htmlFor="inputFile">모바일 학생증 업로드</label>
                            <span className="fileUpload"><Checkbox state={1} length={"20px"} border={false} /></span>
                        </div>
                        <input type="file" id="inputFile"
                            accept="image/*"
                            ref={fileInput}
                            onChange={() => {
                                setIsFileUpload(true);
                            }}
                            required />
                        <SignInput src="/images/lock.png"
                            type="password"
                            placeholder="비밀번호" num={2} />
                        <SignInput src="/images/lock.png"
                            type="password"
                            placeholder="비밀번호 확인" num={3} />
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
                    height:${(isLoginForm ? "250px" : "300px")};
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
                .fileDiv label{
                    font-size: 14px;
                }
                .fileUpload{
                    ${(isFileUpload ? "display: flex;" : "display: none;")}
                    position: absolute;
                    right: 25px;
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
                .samePassword{
                    display: ${(isSamePassword ? `flex` : `none`)};
                    position: absolute;
                    top: 49%;
                    right: 25px;
                }
            `}</style>
        </>
    );
}

export default SignForm;