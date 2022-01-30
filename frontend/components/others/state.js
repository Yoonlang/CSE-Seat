import {atom} from 'recoil';

const authAtom = atom({
    key : 'auth',
    default: ''
});

const userListAtom = atom({
    key : 'userList',
    default : []
});

export {authAtom, userListAtom};