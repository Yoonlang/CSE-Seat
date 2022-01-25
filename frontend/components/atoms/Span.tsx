import styled from 'styled-components';

interface SpanProps{
    children?: React.ReactChild;
    size?: string;
    color?: string;
    weight?: string;
}

const StyledSpan = styled.span<SpanProps>`
    text-align:center;
    font-size: ${(props: SpanProps) => props.size};
    color: ${(props: SpanProps) => props.color};
    font-weight: ${(props: SpanProps) => props.weight};
`;

const Span = ({
    children,
    size = "14px",
    color = "#000",
    weight = "520",
    }:SpanProps) => {
    const props = {
        size, color, weight
    };
    return (
        <StyledSpan {...props}>{children}</StyledSpan>
    );
}

export default Span;