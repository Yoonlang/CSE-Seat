import { atom } from 'recoil';

const loginAtom = atom({
    key : 'login',
    default: {
        isLogin: false,
        sid: undefined,
    }
})

const indexLoadingAtom = atom({
    key: 'indexLoading',
    default: true,
})

const refreshIndexAtom = atom({
    key: 'refreshIndex',
    default: false
})

const todayAtom = atom({
    key : 'today',
    default : true
})

const showRoomAtom = atom({
    key : 'room',
    default : 0
})

const inputValueAtom = atom({
    key : 'input',
    default : ['', '', '', '']
})

const seatModalAtom = atom({
    key : 'seatModal',
    default : {
        isModalOpen : false,
        seatInfo : {
            roomNumber : undefined,
            isToday : undefined,
            seatNumber : undefined, 
            one: undefined,
            two: undefined,
        }
    }
})

const seatingChartModalAtom = atom({
    key: 'seatingChartModal',
    default : false
})

const enrollFriendAtom = atom({
    key: 'enrollFriend',
    default: {
        isOn: true,
        friends: [2018115201, 2018115202, 2018115203]
    }
})

export { loginAtom, indexLoadingAtom, refreshIndexAtom, todayAtom, showRoomAtom, seatModalAtom, seatingChartModalAtom, enrollFriendAtom, inputValueAtom };