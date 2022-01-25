import styled from 'styled-components';

interface DivProps{
    children?: React.ReactNode;
    display?:string;
    jusContent?:string;
    alignItem?:string;
    width:string;
    height:string;
}

const StyledDiv = styled.div<DivProps>`
    display: ${(props:DivProps) => props.display};
    width: ${(props:DivProps) => props.width};
    height: ${(props:DivProps) => props.height};
    justify-content: ${(props:DivProps) => props.jusContent ? props.jusContent : ''};
    align-items: ${(props:DivProps) => props.alignItem ? props.alignItem : ''};
`;

const Div = ({
    children,
    display="flex",
    jusContent="center",
    alignItem="center",
    width,
    height
    }:DivProps) => {
    const props = {
        display, jusContent, alignItem, width, height
    };
    return (
        <StyledDiv {...props}>{children}</StyledDiv>
    );
}

export default Div;