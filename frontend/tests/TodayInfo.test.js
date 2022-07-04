import React from 'react';
import { render } from '@testing-library/react'
import TodayInfo from '../components/organisms/TodayInfo';
import { RecoilRoot } from 'recoil';
import TodayInfoSeatData from '../components/organisms/TodayInfoSeatData';

describe("test TodayInfo", () => {
    it("자리 취소 버튼과 신청 기록 확인 버튼 테스트", () => {
        const { getByText } = render(
            <RecoilRoot>
                <TodayInfo />
            </RecoilRoot>
        );
    
        const seatCancelBtn = getByText("자리 취소");
        expect(seatCancelBtn).toBeInTheDocument();
    
        const checkHistoryBtn = getByText("신청 기록 확인")
        expect(checkHistoryBtn).toBeInTheDocument();
    })
    
    it("오늘 등의 base text 테스트", () => {
        const tempData = [];
        for (let i = 0; i < 4; i++) {
            tempData.push(JSON.parse(JSON.stringify({
                isPart: false,
                showingData: {
                    checkState: undefined,
                    seatRoom: undefined,
                    seatNum: undefined,
                },
                fetchingData: {
                    buildingId: undefined,
                    seatRoom: undefined,
                    seatNum: undefined,
                    isToday: undefined,
                },
            })));
        }
    
        const { getByText } = render(
            <RecoilRoot>
                <TodayInfoSeatData seatData={tempData} />
            </RecoilRoot>
        )
        
        const todayInfoBaseText = getByText("오늘");
        expect(todayInfoBaseText).toBeInTheDocument();
        
        const todayInfoBaseText1 = getByText("내일");
        expect(todayInfoBaseText1).toBeInTheDocument();
    
    })
})
