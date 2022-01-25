import styled from 'styled-components';

interface InputProps{
    children?: React.ReactChild;
    width?: string;
    height?: string;
    placeholder?: string;
}

const StyledInput = styled.input<InputProps>`
    width: ${(props: InputProps) => props.width};
    height: ${(props: InputProps) => props.height};
`;

const Input = ({
    children,
    width = "400px",
    height = "40px",
    placeholder
    }:InputProps) => {
    const props = {
        width, height
    };
    return (
        <StyledInput {...props} placeholder={placeholder}>{children}</StyledInput>
    );
}

export default Input;