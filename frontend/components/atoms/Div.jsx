import styled from 'styled-components';
import Link from "next/link";
import React from 'react';

// interface DivProps{
//     children?: React.ReactNode;
//     display?:string;
//     jusContent?:string;
//     alignItem?:string;
//     flexWrap?:boolean;
//     flexDir?:string;
//     width?:string;
//     height?:string;
//     href?:string;
//     passHref?:boolean;
//     margin?:string;
//     padding?:string;
//     color?:string;
//     gap?:string;
//     hidden?:boolean;
// }

const StyledDiv = styled.div`
    display: ${(props) => props.display};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    justify-content: ${(props) => props.jusContent};
    align-items: ${(props) => props.alignItem};
    flex-direction: ${(props) => props.flexDir};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    background-color: ${(props) => props.color};
    gap: ${(props) => props.gap};
    overflow: ${(props) => props.hidden ? "hidden" : ""};
    ${(props) => props.flexWrap ? "flex-wrap:wrap" : ""};
`;

const Div = ({
    children,
    display="flex",
    flexDir="row",
    jusContent="center",
    alignItem="center",
    flexWrap=false,
    width="",
    height="100%",
    margin="",
    padding="",
    color="",
    gap="",
    hidden=false
    }) => {
    const props = {
        display, jusContent, alignItem, width, height, flexDir, margin, padding, color, gap, hidden, flexWrap
    };
    return (
        <StyledDiv {...props}>{children}</StyledDiv>
    );
}

const StyledA = styled.a`
    display: ${(props) => props.display};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    justify-content: ${(props) => props.jusContent};
    align-items: ${(props) => props.alignItem};
    flex-direction: ${(props) => props.flexDir};
    cursor: pointer;
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    gap: ${(props) => props.gap};
`;

const MyLink = ({
    children,
    href="/",
    passHref=false,
    display="flex",
    flexDir="row",
    jusContent="center",
    alignItem="center",
    width="100px",
    height="50px",
    margin,
    padding,
    gap
    }) => {

        const props = {
            display, jusContent, alignItem, width, height, flexDir, margin, padding, gap
        };

    return (
        <Link href={href} passHref={passHref}>
            <StyledA {...props}>
                {children}
            </StyledA>
        </Link>
    );
}

export {Div, MyLink};