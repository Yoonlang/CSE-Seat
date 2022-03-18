import { BorderDiv, PageDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"
import styled from "styled-components";
import BasicInfo from "../components/organisms/BasicInfo";
import TodayInfo from "../components/organisms/TodayInfo";
import EnrollFriend from "../components/organisms/EnrollFriend";
import { useEffect, useState } from "react";
import { isInLocation } from "../components/others/checkPos";

const InfoDiv = styled(BorderDiv)`
    max-width: 672px;
`;

const Info = () => {
    const [basicData, setBasicData] = useState(undefined);

    useEffect(async () => {
        isInLocation();
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/info", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (data.result === false) throw ("Can't load informatioin");
            setBasicData(data.data);
        } catch (e) {
            console.log("Error: ", e);
        }
    }, [])

    return (
        <PageDiv dis="flex" jus="center">
            <HeadTitle title="info" />
            <InfoDiv>
                <BasicInfo data={basicData} />
                <div className="bar"></div>
                <TodayInfo />
                <div className="bar"></div>
                <EnrollFriend />
            </InfoDiv>
            <style jsx>{`
                .bar{
                    height: 0;
                    box-shadow: 0 0 0 0.8px #ddd;
                    margin: 25px 0;
                }
                @media(min-width: 768px){
                    .bar{
                        width: 90%;
                    }
                }
                @media(max-width: 767px){
                    .bar{
                        width: 100%;
                    }
                }
            `}</style>
        </PageDiv >
    )
}

export default Info;