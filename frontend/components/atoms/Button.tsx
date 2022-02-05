import React from 'react';
import styled from 'styled-components';

interface ButtonProps{
    children?: React.ReactChild;
    width?: string;
    height?: string;
    size?: string;
    color?: string;
    weight?: string;
    background?:string;
    url?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledButton = styled.button<ButtonProps>`
    font-size: ${(props: ButtonProps) => props.size};
    color: ${(props:ButtonProps) => props.color};
    background: ${(props:ButtonProps) => props.background};
    width: ${(props:ButtonProps) => props.width};
    height: ${(props:ButtonProps) => props.height};
    outline: none;
`;

const Button = ({
    children,
    width = "300px",
    height = "40px",
    size = "14px",
    color = "#000",
    weight = "520",
    background = "none",
    url,
    onClick
    }:ButtonProps) => {
    const props = {
        width, height, size, color, weight, background
    };
    return (
        <StyledButton {...props}>{children}</StyledButton>
    );
}

export default Button;