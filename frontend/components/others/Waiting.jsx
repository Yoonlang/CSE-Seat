import { useRecoilValue } from "recoil";
import { loadingCheckInAtom } from "./state";

const Waiting = () => {
    const isLoading = useRecoilValue(loadingCheckInAtom);

    return <>
        {
            isLoading ?
                // <div className="loading">
                //     <div className="loader"><div></div></div>
                // </div>
                ``
                : ``
        }
        <style jsx>{`
        .loading{
            display: flex;
            position: fixed;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(230, 230, 230, 0.5);
            z-index: 20;
        }
        .loader{
            width: 30px;
            height: 30px;
            border: 4px solid #242F3F;
            animation: loader 2.5s infinite ease;
        }
        .loader > div {
            vertical-align: top;
            width: 100%;
            background: #242F3F;
            animation: loader-inner 2.5s infinite ease-in;
        }

        @keyframes loader {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(180deg); }
            50% { transform: rotate(180deg); }
            75% { transform: rotate(360deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes loader-inner {
            0% { height: 0%; }
            25% { height: 0%; }
            50% { height: 100%; }
            75% { height: 100%; }
            100% { height: 0%; }
        }
        `}</style>
    </>
}

export default Waiting;