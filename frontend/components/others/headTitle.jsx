import Head from "next/head";
import React from "react";

const HeadTitle = ({ title }) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="컴퓨터학부 자리 신청 서비스" />
            <meta property="og:url" content="https://cse-seat.com/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="CSE Seat" />
            <meta property="og:description" content="컴퓨터학부 자리 신청 서비스" />
            <meta property="og:image" content="https://github.com/CSE-seat/CSE-Seat/blob/main/frontend/public/images/cse.png?raw=true" />
            <link rel="shortcut icon" type="image/x-icon" href="images/cse.png" />
            <title>{title} | CSE Seat</title>
        </Head>
    );
}

export default HeadTitle;