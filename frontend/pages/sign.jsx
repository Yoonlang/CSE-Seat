import HeadTitle from "../components/others/headTitle"
import SignForm from "../components/organisms/SignForm";

const Sign = () => {
    return (
        <>
            <HeadTitle title="login"/>
            <div>
                <SignForm />
            </div>
            <style jsx>{`
                div{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: calc(100vh - 100px - 220px);
                }
            `}</style>
        </>
    )
}

export default Sign;