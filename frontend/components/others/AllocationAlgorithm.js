const test = [
    [-1, 4, 3, 5],
    [4, 1, 5, 3],
    [3, 5, 30, 8],
    [8, 10, 40, 13],
    [5, 8, 13, 10],
]

const test1 = [
    [-1, 4, 3, 5],
    [4, 1, 0, 3],
    [3, 0, 0, 3],
    [3, 0, 0, 3],
    [5, 3, 3, 5],
]

const di = [0, 1, 0, -1, 1, 1, -1, -1];
const dj = [1, 0, -1, 0, -1, 1, 1, -1];

const seatNumber = [
    [
        [-1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
        [13, 14, 15],
    ],
    [
        [16, 17, 18, 19],
        [20, 21, 22, 23],
        [24, 25, 26, 27],
        [28, 29, 30, 31],
        [32, 33, 34, 35],
        [36, 37, 38, 39],
        [40, 41, 42, 43],
        [44, 45, 46, 47],
    ],
    [
        [48, 49, 50, 51, 52],
        [53, 54, 55, 56, 57],
        [-1, -1, 58, 59, 60],
        [61, -1, 62, 63, 64],
        [-1, -1, 65, 66, 67],
        [68, -1, 69, 70, 71],
    ],
]

const arr = [
    {
        N: 5,
        M: 3,
        seats: [
            [
                [-1, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            [
                [-1, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ]
        ],
    },
    {
        N: 8,
        M: 4,
        seats: [
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ],
    },
    {
        N: 6,
        M: 5,
        seats: [
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [-1, -1, 0, 0, 0],
                [0, -1, 0, 0, 0],
                [-1, -1, 0, 0, 0],
                [-1, -1, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [-1, -1, 0, 0, 0],
                [0, -1, 0, 0, 0],
                [-1, -1, 0, 0, 0],
                [-1, -1, 0, 0, 0],
            ],
        ],
    },
]

const requests = [
    {
        building_id: "414",
        apply_time: "20220226170505",
        seat_room: ["101", "104", "108"],
        seat_num: "2",
        isToday: false,
        part1: true,
        part2: true,
        friends: [2018115201, 2018115202],
    },
    {
        building_id: "414",
        apply_time: "20220226170508",
        seat_room: ["104"],
        seat_num: "",
        isToday: false,
        part1: false,
        part2: true,
        friends: [218155201],
    },
    {
        building_id: "414",
        apply_time: "20220226170507",
        seat_room: ["104", "108"],
        seat_num: "2",
        isToday: false,
        part1: true,
        part2: true,
        friends: [],
    },
]

const hopeNumber = [
    [0, 0, 0],
    [0, 0, 0],
]

const seatNumChanger = (num) => {
    let seatPosition = [0, 0, 0],
        flag = false;
    seatNumber.forEach((e, index) => {
        const N = e.length;
        const M = e[0].length;
        for(let i = 0; i < N; i++){
            for(let j = 0; j < M; j++){
                if(num === e[i][j]){
                    seatPosition = [index, i, j];
                    flag = true;
                    break;
                }
            }
            if(flag) break;
        }
    })
    return seatPosition;
}

const handleEmptySeat = () => {
    const emptySeatNum = [
        [0, 0, 0],
        [0, 0, 0],
    ]
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 2; j++)
            for(let p = 0; p < arr[i].N; p++)
                for(let q = 0; q < arr[i].M; q++)
                        if(arr[i].seats[j][p][q] === 0) emptySeatNum[j][i]++;
    return emptySeatNum;
}

const handleRoomApply = (arr) => {
    const isRoomApply = [false, false, false];
    arr.forEach((e) => {
        e === '101' ? isRoomApply[0] = true : 
        e === '104' ? isRoomApply[1] = true :
        e === '108' ? isRoomApply[2] = true : false;
    })
    return isRoomApply;
}

const settingHopeNumber = (arr, part1, part2, num) => {
    const isRoomApply = handleRoomApply(arr);
    const part = [part1, part2];
    for(let i = 0; i < 2; i++)
        if(part[i])
            for(let j = 0; j < 3; j++)
                if(isRoomApply[j]) hopeNumber[i][j] += num;
}

const makePosition = (num, part, roomNum, seatNum) => {
    const N = arr[roomNum].N,
        M = arr[roomNum].M,
        seats = arr[roomNum].seats.slice(),
        seatPosition = seatNumChanger(seatNum);

    for(let k = 0; k < 2; k++){
        if(part[k]){
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[k][i][j] === -1) continue;
                    for(let l = 0; l < 8; l++){
                        let ni = di[l] + i;
                        let nj = dj[l] + j;
                        if(ni < 0 || ni >= N || nj < 0 || nj >= M){
                            seats[k][i][j]++;
                            continue;
                        }
                        if(seats[k][ni][nj] === -1) seats[k][i][j]++;
                    }
                    if(!(part[0] ^ part[1]) && seats[k === 0 ? 1 : 0][i][j] !== -1){
                        seats[k][i][j] += 20;
                    }
                    if(seatNum && seatPosition.toString() == [k, i, j]){
                        seats[k][i][j] += 40;
                        seats[k === 0 ? 1 : 0][i][j] += 40; // 이게 맞나?
                        // 지금 안맞음. 여기쪽 다시.
                        for(let d = 1; d <= 2; d++){
                            for(let l = 0; l < 4; l++){
                                let ni = di[l] * d + i;
                                let nj = dj[l] * d + j;
                                if(ni < 0 || ni >= N || nj < 0 || nj >= M) continue;
                                if(seats[k][ni][nj] === -1) continue;
                                seats[k][ni][nj] += d === 1 ? 10 : 5;
                            }
                        }
                        for(let l = 4; l < 8; l++){
                            let ni = di[l] + i;
                            let nj = dj[l] + j;
                            if(ni < 0 || ni >= N || nj < 0 || nj >= M) continue;
                            if(seats[k][ni][nj] === -1) continue;
                            seats[k][ni][nj] += 5;
                        }
                    }
                }
            }
        }

        console.log(seats);

    }





    if(part === 2){

    }
    else{
        
    }
}

const solveReq = ({seat_room, seat_num, part1, part2, friends}) => {
    const emptySeat = handleEmptySeat(),
        isRoomApply = handleRoomApply(seat_room),
        part = [part1, part2],
        num = friends.length + 1;
    // basic motion -> 1,2부 신청 했는데, 일단 방에 빈자리가 신청 수보다 적으면 basic motion 취소
    if(part1 ^ part2){
        // 1부라면
        for(let i = 0; i < 3; i++){
            if(part1){
                if(isRoomApply[i] && emptySeat[0][i] >= num) makePosition(num, part, i, Number(seat_num));
            }
            else{
                if(isRoomApply[i] && emptySeat[1][i] >= num) makePosition(num, part, i, Number(seat_num));
            }
        }
    }
    else{
        // 1,2부 둘다 신청
        for(let i = 0; i < 3; i++){
            if(isRoomApply[i] && Math.min(emptySeat[0][i], emptySeat[1][i]) >= num) makePosition(num, part, i, Number(seat_num));
        }
    }
}

const Allocation = () => {
    const sortedRequests = requests.slice().sort((a, b) => {
        return Number(a.apply_time) - Number(b.apply_time);
    });
    sortedRequests.forEach((e) => {
        settingHopeNumber(e.seat_room, e.part1, e.part2, e.friends.length + 1);
    })
    sortedRequests.forEach((e) => {
        solveReq(e);
    })

    // console.log(sortedRequests);
    // 이제 requests들 하나씩 꺼내면서 수행하면 됨.


    return <></>
}


export default Allocation;
