import React from 'react';
import { render } from '@testing-library/react'
import TodayInfo from '../components/organisms/TodayInfo';
import { RecoilRoot } from 'recoil';

it("test", () => {
    const { getByText } = render(
        <RecoilRoot>
            <TodayInfo />
        </RecoilRoot>
    );

    const todayInfoBaseText = getByText("오늘");
    expect(todayInfoBaseText).toBeInTheDocument();

    const seatCancelBtn = getByText("자리 취소");
    expect(seatCancelBtn).toBeInTheDocument();

    const checkHistoryBtn = getByText("신청 기록 확인")
    expect(checkHistoryBtn).toBeInTheDocument();
})
