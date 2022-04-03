import { RecoilRoot } from 'recoil';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Checker from '../components/others/Checker';
import Waiting from '../components/others/Waiting';

const MyApp = ({ Component, pageProps }) => {
    return (
        <RecoilRoot>
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