import { RecoilRoot } from 'recoil';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import { useState } from 'react';
import Checker from '../components/others/Checker';

const MyApp = ({ Component, pageProps }) => {
    return (
        <RecoilRoot>
            <Header />
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
                html, body{
                    height: 100%;
                }
            `}
            </style>
        </RecoilRoot>
    );
}

export default MyApp;