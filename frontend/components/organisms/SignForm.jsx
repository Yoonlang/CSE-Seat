import { useState, useRef, useEffect } from "react";
import { SignInput } from "../atoms/Input";
import SquareImg from "../atoms/Img";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputValueAtom, loginAtom } from "../others/state";

const SignForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isFileUpload, setIsFileUpload] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const fileInput = useRef();
    const inputValue = useRecoilValue(inputValueAtom);
    const [isLogin, setIsLogin] = useRecoilState(loginAtom);

    const changeFormState = () => {
        setIsLoginForm(!isLoginForm);
    }

    const clickFileDiv = () => {
        fileInput.current.click();
    }

    const handleSignIn = (e) => {
        if (inputValue[0].length >= 4 && inputValue[1].length >= 4) {
            e.preventDefault();
            fetch("http://localhost:8080/user/login/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sid: id,
                    password: password
                })
            }).then(res => {
                return res.json();
            }).then(res => {
                //setIsLogin(res.result);
                console.log(document.cookie);
            }).catch(err => {
                console.log("Error : ", err);
            })
        }
    }

    const handleSignUp = (e) => {
        if (inputValue[2].length >= 4 && inputValue[3].length >= 4) {
            e.preventDefault();
            console.log("hi");
        }
    }

    // useEffect(() => {
    //     if (isLogin) {
    //         if (document.referrer && document.referrer.indexOf("localhost") !== -1) {
    //             history.back();
    //         }
    //         else {
    //             window.location.replace("/");
    //         }
    //     }
    // }, [isLogin])

    useEffect(() => {
        console.log("HI");
    }, [inputValue[2], inputValue[3]])

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
                            <span className="fileUpload">✅</span>
                        </div>
                        <input type="file" id="inputFile"
                            accept="image/*"
                            ref={fileInput}
                            onChange={
                                () => {
                                    setIsFileUpload(true);
                                }
                            } />
                        <SignInput src="/images/lock.png"
                            type="password"
                            placeholder="비밀번호" num={2} />
                        <SignInput src="/images/lock.png"
                            type="password"
                            placeholder="비밀번호 확인" num={3} />
                        {/* <span className="samePassword">✅</span> */}
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
                }
                .changeBtn{
                    position: absolute;
                    bottom:20px;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}

export default SignForm;