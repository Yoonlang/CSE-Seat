import HeadTitle from "../components/others/headTitle"
import SignForm from "../components/organisms/SignForm";
import { PageDiv } from "../components/atoms/Div";

const Sign = () => {
    return (
        <PageDiv dis="flex" jus="center" ali="center">
            <HeadTitle title="login" />
            <SignForm />
        </PageDiv>
    )
}

// export async function getServerSideProps(context) {
//     // const data = await fetch("http://3.37.225.217:3000/", {
//     //     method: "GET",
//     //     headers: {
//     //     }
//     // }).then((res) => {
//     //     return res.json();
//     // }).then((res) => {
//     //     return res.json();
//     // }).catch((err) => {
//     // })

//     const cookie = context.req ? context.req.headers.cookie : '';
//     const {ctx, Component} = context;
//     console.log(ctx, Component)

//     const data = {a : 1, b : 2, c : 3}


//     return {
//         props: {data}
//     }
// }

export default Sign;