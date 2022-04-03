import Head from "next/head";
import React from "react";

const HeadTitle = ({ title }) => {
    return (
        <Head>
            <title>{title} | CSE Seat</title>
        </Head>
    );
}

export default HeadTitle;