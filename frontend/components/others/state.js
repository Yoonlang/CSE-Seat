import {atom} from 'recoil';

const authAtom = atom({
    key : 'auth',
    default: ''
});

const userListAtom = atom({
    key : 'userList',
    default : []
});

const todayAtom = atom({
    key : 'today',
    default : true
})

const showRoomAtom = atom({
    key : 'room',
    default : 0
})

const seatModalAtom = atom({
    key : 'seatModal',
    default : {
        isModalOpen : false,
        seatInfo : {
            roomNumber : undefined,
            isToday : undefined,
            seatNumber : undefined,
            one : undefined,
            two : undefined
        }
    }
})

export { authAtom, userListAtom, todayAtom, showRoomAtom, seatModalAtom };