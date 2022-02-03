import ColorTables from "../molecules/ColorTables";
import Explain from "../molecules/Explain";
import IndexNav from "../molecules/IndexNav";
import TodayButton from "../molecules/TodayButton";

const IndexHeader = ({isNav = true}) => {
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
                <div>
                    <TodayButton />
                </div>
                <ColorTables />
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
                align-items: center;
                gap: 30px;
            }
            @media(min-width: 750px){
                .indexHeader{
                    justify-content: space-between;
                    height: 130px;
                    padding: 0 15px;
                }
                .nav{
                    display:none;
                }
            }
            @media(max-width: 749px){
                .indexHeader{
                    height: 70px;
                    flex-wrap: wrap;
                    justify-content: right;
                    gap: 12px;
                    ${isNav ? `` : `
                    transform: translateY(-70px);
                    `}
                    transition: 0.7s;
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
                .right div{
                    display: none;
                }
            }

        `}</style>
        </>
    );
}

export default IndexHeader;