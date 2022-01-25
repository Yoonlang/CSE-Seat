import Head from "next/head";
import React from "react";

interface Props{
    title: string
}

const HeadTitle = ({title}: Props) => {
    return (
        <Head>
            <title>{title} | CSE Seat</title>
        </Head>
    );
}

export default HeadTitle;