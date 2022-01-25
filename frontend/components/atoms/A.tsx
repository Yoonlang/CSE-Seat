import styled from 'styled-components';

interface AProps{
    children?:React.ReactNode;
    width:string;
    height:string;
    jusContent?:string;
    gap?:string;
}

const StyledA = styled.a<AProps>`
    text-decoration: none;
    display: flex;
    justify-content: ${(props:AProps) => props.jusContent};
    gap: ${(props:AProps) => props.gap}
    align-item:center;
    white-space: nowrap;
    width: ${(props:AProps) => props.width};
    height: ${(props:AProps) => props.height};
`;

const A = ({
    children,
    width,
    height,
    jusContent="center",
    gap="0px"
    }:AProps) => {
    const props = {
        width, height, jusContent, gap
    };
    return (
        <StyledA {...props}>{children}</StyledA>
    );
}

export default A;