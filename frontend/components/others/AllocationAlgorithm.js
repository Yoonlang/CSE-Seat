const test = [
    [-1, 4, 3, 5],
    [4, 1, 5, 3],
    [3, 5, 30, 8],
    [8, 10, 40, 13],
    [5, 8, 13, 10],
]

const di = [0, 1, 0, -1, 1, 1, -1, -1];
const dj = [1, 0, -1, 0, -1, 1, 1, -1];
const zi = [1, 1, -1, -1];
const zj = [-1, 1, -1, 1];

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

// [
//     [-1, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
// ],

const arr = [
    {
        N: 5,
        M: 3,
        seats: [
            [
                [-1, 0, -1],
                [0, -1, -1],
                [-1, 0, -1],
                [-1, 0, 0],
                [0, -1, 0],
            ],
            [
                [-1, -1, 0],
                [-1, -1, 0],
                [0, -1, 0],
                [0, 0, -1],
                [0, 0, -1],
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
    // {
    //     building_id: "414",
    //     apply_time: "20220226170505",
    //     seat_room: ["101",],
    //     seat_num: "",
    //     isToday: false,
    //     part1: true,
    //     part2: false,
    //     friends: [2018115201,],
    // },
    // {
    //     building_id: "414",
    //     apply_time: "20220226170506",
    //     seat_room: ["101",],
    //     seat_num: "",
    //     isToday: false,
    //     part1: true,
    //     part2: true,
    //     friends: [],
    // },
    {
        building_id: "414",
        apply_time: "20220226170507",
        seat_room: ["101",],
        seat_num: "",
        isToday: false,
        part1: true,
        part2: true,
        friends: [2018115201, 2018115202, 2018115202,],
    },
]

const hopeNumber = [
    [0, 0, 0],
    [0, 0, 0],
]

const seatNumChanger = (num) => {
    let seatPosition = [0, 0, 0],
        flag = false;
    if(!num) return seatPosition;
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

const onlyException = (seats, weight, i, j, N, M) => {
    let data = {
        sum: weight,
        pos: [[i, j]],
    }
    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[1][ni][nj] === -1) continue;
            if(l < 4) seats[1][ni][nj] += d === 1 ? 5 : 1;
            else if(l < 8) seats[1][ni][nj] += d === 1 ? 3 : 0;
        }
    }
    
    let max = -1;
    let next = {
        i: undefined,
        j: undefined,
    }
    for(let p = 0; p < N; p++){
        for(let q = 0; q < M; q++){
            if(seats[1][p][q] > max){
                max = seats[1][p][q];
                next = {
                    i: p,
                    j: q,
                }
            }
        }
    }

    data.sum += max;
    data.pos.push([next.i, next.j]);

    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[1][ni][nj] === -1) continue;
            if(l < 4) seats[1][ni][nj] -= d === 1 ? 5 : 1;
            else if(l < 8) seats[1][ni][nj] -= d === 1 ? 3 : 0;
        }
    }

    return data;
}

const separateExceptionBacktracking = (seats, weight, i, j, N, M, num1, num2) => {
    let data = {
        sum: weight,
        pos: [[num1 === 1 ? 1 : 0, i, j]],
    };
    if(num2 === 1) return data;
    const isOne = num1 > 1 ? 1 : 0;
    seats[isOne ? 0 : 1][i][j] = -1;
    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[0][ni][nj] === -1) continue;
            if(l < 4) seats[0][ni][nj] += d === 1 ? 5 : 1;
            else if(l < 8) seats[0][ni][nj] += d === 1 ? 3 : 0;
        }
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[1][ni][nj] === -1) continue;
            if(l < 4) seats[1][ni][nj] += d === 1 ? 5 : 1;
            else if(l < 8) seats[1][ni][nj] += d === 1 ? 3 : 0;
        }
    }

    let max = -1;
    let next = {
        i: undefined,
        j: undefined,
    }
    for(let p = 0; p < N; p++){
        for(let q = 0; q < M; q++){
            if(seats[num1 === 2 ? (isOne ? 1 : 0) : (isOne ? 0 : 1)][p][q] > max){
                max = seats[num1 === 2 ? (isOne ? 1 : 0) : (isOne ? 0 : 1)][p][q];
                next = {
                    i: p,
                    j: q,
                }
            }
        }
    }

    let tempData = num1 > 1 ? separateExceptionBacktracking(seats, max, next.i, next.j, N, M, num1 - 1, num2) : separateExceptionBacktracking(seats, max, next.i, next.j, N, M, num1, num2 - 1);
    data.sum += tempData.sum;
    data.pos.push(...tempData.pos);
    
    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[0][ni][nj] === -1) continue;
            if(l < 4) seats[0][ni][nj] -= d === 1 ? 5 : 1;
            else if(l < 8) seats[0][ni][nj] -= d === 1 ? 3 : 0;
        }
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[1][ni][nj] === -1) continue;
            if(l < 4) seats[1][ni][nj] -= d === 1 ? 5 : 1;
            else if(l < 8) seats[1][ni][nj] -= d === 1 ? 3 : 0;
        }
    }
    seats[isOne ? 0 : 1][i][j] = weight;
    return data;
}

const separateBacktracking = (seats, part, weight, i, j, N, M, num) => {
    let data = {
        sum: weight,
        pos: [[i, j]],
    };
    if(num === 1) return data;
    seats[part[0] ? 0 : 1][i][j] = -1;
    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[part[0] ? 0 : 1][ni][nj] === -1) continue;
            if(l < 4) seats[part[0] ? 0 : 1][ni][nj] += d === 1 ? 5 : 1;
            else if(l < 8) seats[part[0] ? 0 : 1][ni][nj] += d === 1 ? 3 : 0;
        }
    }
    
    let max = -1;
    let next = {
        i: undefined,
        j: undefined,
    }
    for(let p = 0; p < N; p++){
        for(let q = 0; q < M; q++){
            if(seats[part[0] ? 0 : 1][p][q] > max){
                max = seats[part[0] ? 0 : 1][p][q];
                next = {
                    i: p,
                    j: q,
                }
            }
        }
    }

    let tempData = separateBacktracking(seats, part, max, next.i, next.j, N, M, num - 1);
    seats[part[0] ? 0 : 1][i][j] = weight;
    data.sum += tempData.sum;
    data.pos.push(...tempData.pos);

    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[part[0] ? 0 : 1][ni][nj] === -1) continue;
            if(l < 4) seats[part[0] ? 0 : 1][ni][nj] -= d === 1 ? 5 : 1;
            else if(l < 8) seats[part[0] ? 0 : 1][ni][nj] -= d === 1 ? 3 : 0;
        }
    }

    return data;
}

const makePosition = (num, part, roomNum, seatNum) => {
    const N = arr[roomNum].N,
        M = arr[roomNum].M,
        seats = JSON.parse(JSON.stringify(arr[roomNum].seats)),
        seatPosition = seatNumChanger(seatNum);

    for(let k = 0; k < 2; k++){
        if(part[k]){
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[k][i][j] === -1) continue;
                    if(part[0] ^ part[1] && seats[k === 0 ? 1 : 0][i][j] === -1) seats[k][i][j] += 5;
                    for(let l = 0; l < 8; l++){
                        let ni = di[l] + i;
                        let nj = dj[l] + j;
                        if(ni < 0 || ni >= N || nj < 0 || nj >= M){
                            seats[k][i][j]++;
                            continue;
                        }
                        if(seats[k][ni][nj] === -1) seats[k][i][j]++;
                    }
                    if(part[0] & part[1] && seats[k === 0 ? 1 : 0][i][j] !== -1) seats[k][i][j] += 20;
                    if(seatNum && seatPosition.toString() == [roomNum, i, j]){
                        seats[k][i][j] += 40;
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
    }

    let max = -1;
    let data;
    const friendArr = [];
    if(num > 1){
        if(part[0] ^ part[1]){
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[part[0] ? 0 : 1][i][j] === -1) continue;
                    friendArr.push([seats[part[0] ? 0 : 1][i][j], i, j]);
                }
            }
        }
        else{
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    // 1,2부 한자리만 있는거에 대해서 고려해야함.
                    friendArr.push([seats[0][i][j] + seats[1][i][j], i, j]);
                }
            }
        }

        friendArr.sort((a, b) => {
            return a[0] - b[0];
        })
        while(friendArr.length){
            const [weight, i, j] = friendArr.pop();
            for(let l = 0; l < 4; l++) {
                let flag = false;
                let pos;
                if(num === 2){
                    pos = [
                        [i, j],
                        [i + di[l], j + dj[l]],
                    ];
                }
                else if(num === 3){
                    pos = [
                        [i, j],
                        [i, j + zj[l]],
                        [i + zi[l], j],
                    ];
                }
                else{
                    pos = [
                        [i, j],
                        [i, j + zj[l]],
                        [i + zi[l], j],
                        [i + zi[l], j + zj[l]],
                    ];
                }
                
                for(let k = 0; k < num; k++){
                    if(pos[k][0] < 0 || pos[k][1] < 0 || pos[k][0] >= N || pos[k][1] >= M) {
                        flag = true;
                        break;
                    }
                    if(part[0] ^ part[1]){
                        if(seats[part[0] ? 0 : 1][pos[k][0]][pos[k][1]] === -1){
                            flag = true;
                            break;
                        }
                    }
                    else{
                        if(seats[0][pos[k][0]][pos[k][1]] === -1 || seats[1][pos[k][0]][pos[k][1]] === -1){
                            flag = true;
                            break;
                        }
                    }
                }
                if(flag) continue;
                let sum = 0;
                for(let k = 0; k < num; k++){
                    if(part[0] ^ part[1])
                        sum += seats[part[0] ? 0 : 1][pos[k][0]][pos[k][1]];
                    else
                        sum += seats[0][pos[k][0]][pos[k][1]] + seats[1][pos[k][0]][pos[k][1]];
                }
                if(sum > max) {
                    max = sum;
                    data = {
                        isIdeal: true,
                        dir: l,
                        i: i,
                        j: j,
                    }
                }
            }
            if(max > 0) break;
        }
    }
    else{ // 혼자 신청
        // 1,2부 신청이라면 1,2부를 합해줘야하나?
        // 1,2부인데 원하는 자리가 있는데 1부만 있는 경우 => 원하는 자리 근처 자리가 됨.
        if(part[0] ^ part[1]){
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[part[0] ? 0 : 1][i][j] > max){
                        max = seats[part[0] ? 0 : 1][i][j];
                        data = {
                            isIdeal: true,
                            i: i,
                            j: j,
                        }
                    }
                }
            }
        }
        else{
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[0][i][j] !== -1 && seats[1][i][j] !== -1 && seats[0][i][j] + seats[1][i][j] > max){
                        max = seats[0][i][j] + seats[1][i][j];
                        data = {
                            isIdeal: true,
                            i: i,
                            j: j,
                        }
                    }
                }
            }
        }
    }
    console.log(seats);


    if(max !== -1){
        // console.log(max, data);
        return 1;
    }

    if(part[0] ^ part[1]){
        // 친구, 한 파트, 이상적인 모양이 없을 때
        let friendArr1 = [];
        for(let i = 0; i < N; i++){
            for(let j = 0; j < M; j++){
                if(seats[part[0] ? 0 : 1][i][j] === -1) continue;
                friendArr1.push([seats[part[0] ? 0 : 1][i][j], i, j]);
            }
        }
        friendArr1.sort((a, b) => {
            return a[0] - b[0];
        })

        let max = -1;
        let posData;
        while(friendArr1.length){
            const [weight, i, j] = friendArr1.pop();
            let separateData = separateBacktracking(seats, part, weight, i, j, N, M, num);
            if(separateData.sum > max){
                max = separateData.sum;
                posData = separateData.pos;
            }
        }
        // 어차피 다 돌릴건데 소팅은 와 하냐?
        console.log(max, posData);
    }
    else{
        if(num === 1){
            let onlyArr = [];
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                        if(seats[0][i][j] === -1) continue;
                        onlyArr.push([seats[0][i][j], i, j]);
                }
            }
            onlyArr.sort((a, b) => {
                return a[0] - b[0];
            })

            while(onlyArr.length){
                const [weight, i, j] = onlyArr.pop();
                let onlyData = onlyException(seats, weight, i, j, N, M);
                console.log(onlyData);
            }
        }
        else{
            // 친구, 1,2부가 붙어있는 이상적인 자리가 없을 때.
            let friendArr2 = [];
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[0][i][j] === -1) continue;
                    friendArr2.push([seats[0][i][j], i, j]);
                }
            }
            friendArr2.sort((a, b) => {
                return a[0] - b[0];
            })

            let max = -1;
            let posData;
            while(friendArr2.length){
                const [weight, i, j] = friendArr2.pop();
                let separateExceptionData = separateExceptionBacktracking(seats, weight, i, j, N, M, num + 1, num);
                if(separateExceptionData.sum > max){
                    max = separateExceptionData.sum;
                    posData = separateExceptionData.pos;
                }
            }
            console.log(max, posData);
        }
    }
}

const solveReq = ({seat_room, seat_num, part1, part2, friends}) => {
    const emptySeat = handleEmptySeat(),
        isRoomApply = handleRoomApply(seat_room),
        part = [part1, part2],
        num = friends.length + 1;
    // basic motion -> 1,2부 신청 했는데, 일단 방에 빈자리가 신청 수보다 적으면 basic motion 취소
    // 친구신청인데, 우선하는 자리가 있다 => 그래도 1,2부 붙어있는 빈자리가 최고지.
    // 그니까 1,2부 붙어있는 자리 2개 2개씩 방 나뉘는게
    // 한방에서 2명 자리 붙어있고, 나머지 두명은 옮기는거보다 낫다 이거지.
    // => 이거대로 구현 ㄱ
    // 이게 맞나 생각 한번 해보고

    // 현재 makePosition이 끝까지 다해주는게 아니라는점 유의하면서 구현하기.
    if(part1 ^ part2){
        // 1부라면
        for(let i = 0; i < 3; i++){
            if(part1){
                if(isRoomApply[i] && emptySeat[0][i] >= num) makePosition(num, part, i, Number(seat_num));
                // 3방 모두 자리가 없을때 처리 해줘야함. ex) 4명 신청인데 방에 3명 자리만 있을 때
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

        // 1,2부, 친구신청이라면 친구 수만큼 강의실에 1,2부 같이 있는 좌석이 있는지 확인
        // 좌석이 없다? => 좌석 있는 수만큼 줄여서 num 넣고, 다른 방에도 넣어
        // 근데 전체 방 보니까 1,2부 같이 있는 좌석이 숫자만큼 없어.
        // 그럴때 이제 짜바리로 넣어주는거지.
        // 이건 밖에서 판단하자.
        // 안에서는 그냥 점수맞춰서 최대한 자리 잘 주면 끝.
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
