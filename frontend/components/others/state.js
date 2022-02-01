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

export {authAtom, userListAtom, todayAtom, showRoomAtom };