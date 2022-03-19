import styled from 'styled-components';
import SquareImg from './Img';
import { useRef, useState } from 'react';
import { inputValueAtom } from '../others/state';
import { useRecoilState, useSetRecoilState } from 'recoil';

// interface SignInputProps{
//     placeholder?: string;
//     src: string;
//     radius?: string;
//     length?: string;
//     type?: string;
// }

// interface ApplyInputProps{
//     placeholder?: string;
// }
const StyledApplyInput = styled.input`
    width: 160px;
    height: 40px;
    color: #000;
    font-size: 14px;
    padding-left: 10px;
    text-align: left;
    border:solid;
    border-color: #ddd;
    border-width: 1px;

    ::placeholder{
        color: #aaa;
        font-size: 14px;
        text-align: center;
    }
`;

const ApplyInput = ({
    placeholder = "학번 입력"
}) => {
    return (
        <StyledApplyInput type="text" placeholder={placeholder} />
    );
};

const SignInputDiv = styled.div`
    display: flex;
    align-items: center;
    width: 300px;
    height: 50px;
    border: solid;
    border-color: #ddd;
    border-width: 1px;
    padding-left: 12px;
    gap: 14px;
`;

const StyledSignInput = styled.input`
    color: #000;
    font-size: 16px;
    text-align: left;
    outline: none;
    border: none;
    z-index: 2;
    
    ::placeholder{
        color: #aaa;
        font-size: 16px;
    }
`;

const SignInput = ({
    placeholder = "학번",
    src,
    radius = "0",
    length = "20px",
    type = "text",
    num = false
}) => {
    const signInputDiv = useRef();
    const signInput = useRef();
    const [inputValue, setInputValue] = useRecoilState(inputValueAtom);
    const clickDiv = () => {
        signInput.current.focus();
        signInputDiv.current.style.borderColor = "#5C9EFF";
    }

    const blurDiv = () => {
        signInputDiv.current.style.borderColor = "#ddd";
    }

    const handleValue = (e) => {
        const values = { ...inputValue };
        values[num] = e.target.value;
        setInputValue(values);
    }

    return (
        <SignInputDiv onClick={clickDiv} onBlur={blurDiv} ref={signInputDiv}>
            <SquareImg radius={radius} src={src} length={length} />
            <StyledSignInput onFocus={clickDiv} type={type} minLength={4} value={inputValue[num]} onChange={handleValue} placeholder={placeholder} ref={signInput} required />
        </SignInputDiv>
    );
};

export { ApplyInput, SignInput };