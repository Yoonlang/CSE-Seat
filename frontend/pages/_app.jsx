import {RecoilRoot} from 'recoil';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <RecoilRoot>
                <Header />
                <div className="page">
                    {/* 아 개빡친다 height:100% 안먹히는거 개열받네 */}
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
                .page{
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