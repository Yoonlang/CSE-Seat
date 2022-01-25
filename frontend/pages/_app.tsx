import {RecoilRoot} from 'recoil';
import type { AppProps } from 'next/app';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <RecoilRoot>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </RecoilRoot>
            <style jsx global>{`
                @font-face{
                    font-family:'Nanum Gothic',sans-serif;
                }
                *{
                    font-family:'Nanum Gothic',sans-serif;
                    padding:0;
                    margin:0;
                    box-sizing: border-box;
                    text-decoration:none;
                }
                html{
                    width: 100%;
                    min-height: 100vh;
                }
                .fixed{
                    min-height: calc(100vh - 200px);
                }
            `}
            </style>
            { 
            // 여기서 적용하고 싶은 것 => Header랑 footer 사이 공간 생기도록
            }
        </>
    );
}

export default MyApp;