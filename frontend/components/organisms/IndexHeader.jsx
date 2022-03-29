import Refresh from "../atoms/Refresh";
import { ColorTables } from "../molecules/ColorTables";
import Explain from "../molecules/Explain";
import IndexNav from "../molecules/IndexNav";
import TodayButton from "../molecules/TodayButton";

const IndexHeader = ({ isNav = true }) => {
    return (
        <>
            <div className="indexHeader">
                <div className="block"></div>
                <div className="nav">
                    <IndexNav />
                </div>
                <div className="explain">
                    <Explain />
                </div>
                <div className="right">
                    <div className="onlyPC">
                        <Refresh />
                        <TodayButton />
                        <ColorTables />
                    </div>
                </div>
            </div>
            <style jsx>{`
            .indexHeader{
                display:flex;
                align-items:center;
                width: 100%;
            }
            .right{
                display: flex;
                gap: 30px;
                height: 130px;
            }
            .right .onlyPC{
                display: flex;
                gap: 25px;
                height: 70%;
            }
            @media(min-width: 768px){
                .indexHeader{
                    justify-content: space-between;
                    height: 130px;
                    padding: 0 15px;
                }
                .nav{
                    display:none;
                }
                .block{
                    display: none;
                }
                .right{
                    align-items: center;
                }
            }
            @media(max-width: 767px){
                .indexHeader{
                    height: 70px;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                    gap: 12px;
                    ${isNav ? `` : `
                    transform: translateY(-70px);
                    `}
                    transition: 0.5s;
                }
                .block{
                    width: 100%;
                    height: 70px;
                }
                .explain{
                    display: none;
                }
                .nav{
                    position:fixed;
                    left:0;
                    width: 100%;
                    height: 70px;
                    background: #fff;
                    z-index: 4;
                }
                .right .onlyPC{
                    display: none;
                }
            }

        `}</style>
        </>
    );
}

export default IndexHeader;