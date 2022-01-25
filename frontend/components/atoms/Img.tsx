import styled from 'styled-components';

interface ImgProps{
    width?: string;
    height?: string;
    invert?: boolean;
    objectFit?: string;
    src: string;
}

const StyledImg = styled.img<ImgProps>`
    width:${(props:ImgProps) => props.width};
    height:${(props:ImgProps) => props.height};
    filter: invert(${(props:ImgProps) => props.invert ? 1 : 0});
    object-fit: ${(props:ImgProps) => props.objectFit};
`;

const Img = ({
    width="40px",
    height="40px",
    invert=false,
    objectFit="fill",
    src
}:ImgProps) => {

    const props = {
        width, height, invert, objectFit
    }

    return (
        <StyledImg src={src} {...props} />
    );
}

export default Img;