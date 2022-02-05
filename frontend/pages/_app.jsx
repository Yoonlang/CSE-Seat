import {RecoilRoot} from 'recoil';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <RecoilRoot>
                <Header />
                <div className="page">
                    <Component {...pageProps} />
                </div>
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
                    color:#000;
                    text-decoration:none;
                }
                html, body{
                    height: 100%;
                }
                .page{
                    display:flex;
                    align-items: center;
                    height: 100%;
                }
                @media(min-width: 750px){
                    .page{
                        min-height: calc(100vh - 60px - 150px);
                    }
                }
                @media (min-width: 500px) and (max-width: 749px){
                    .page{
                        min-height: calc(100vh - 100px - 150px);
                    }
                }
                @media(max-width: 499px){
                    .page{
                        min-height: calc(100vh - 100px - 220px);
                    }
                }
            `}
            </style>
        </>
    );
}

export default MyApp;