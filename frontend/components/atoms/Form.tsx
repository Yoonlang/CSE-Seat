import React from 'react';
import styled from 'styled-components';

interface FormProps{
    children?: React.ReactNode;
    width?: string;
}

const StyledForm = styled.form<FormProps>`
    display:flex;
    flex-direction: column;
    justify-content: center;
`;

const Form = ({
    children
}:FormProps) => {
    const props = {

    }
    
    return(
        <StyledForm>{children}</StyledForm>
    )
}

export default Form;