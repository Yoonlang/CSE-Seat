import { RecoilRoot } from 'recoil';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Checker from '../components/others/Checker';
import Waiting from '../components/others/Waiting';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
    return (
        <RecoilRoot>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="컴퓨터학부 자리 신청 서비스" />
                <meta property="og:url" content="https://cse-seat.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="CSE Seat" />
                <meta property="og:description" content="컴퓨터학부 자리 신청 서비스" />
                <meta property="og:image" content="https://github.com/CSE-seat/CSE-Seat/blob/main/frontend/public/images/cse.png?raw=true" />
                <meta property="og:image:width" content="600" />
                <meta property="og:image:height" content="300" />
                <link rel="shortcut icon" type="image/x-icon" href="images/cse.png" />
            </Head>
            <Header />
            <Waiting />
            <Checker />
            <Component {...pageProps} />
            <Footer />
            <style jsx global>{`
                @font-face{
                    font-family:'Nanum Gothic',sans-serif;
                }
                *{
                    font-family:'Nanum Gothic',sans-serif;
                    padding:0;
                    margin:0;
                    box-sizing: border-box;
                    color:#000;
                    text-decoration:none;
                }
                html{
                    overflow-x: hidden;
                }
                html, body{
                    height: 100%;
                }
                div#__next{
                    height: auto;
                }
            `}
            </style>
        </RecoilRoot>
    );
}

export default MyApp;