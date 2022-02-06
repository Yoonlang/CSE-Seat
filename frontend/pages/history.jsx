import { PageDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"

const History = () => {
    return (
        <PageDiv dis="flex" ali="center">
            <HeadTitle title="history"/>
            <div>history</div>
            <style jsx>{`
                div{
                    width: 100%;
                }
            `}</style>
        </PageDiv>
    )
}

export default History;