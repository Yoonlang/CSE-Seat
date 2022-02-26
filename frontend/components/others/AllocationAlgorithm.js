const arr = [
    [
        [-1, 0, 0, 0],
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
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [-1, -1, 0, 0],
        [0, -1, 0, 0],
        [-1, -1, 0, 0],
        [-1, -1, 0, 0],
    ]
]

const requests = [
    {
        building_id: "414",
        apply_time: "20220226170505",
        seat_room: [101, 104, 108],
        seat_num: "2",
        isToday: false,
        part1: true,
        part2: true,
        friends: [],
    },
    {
        building_id: "414",
        apply_time: "20220226170508",
        seat_room: [101],
        seat_num: "2",
        isToday: false,
        part1: true,
        part2: true,
        friends: [],
    },
    {
        building_id: "414",
        apply_time: "20220226170507",
        seat_room: [101, 104, 108],
        seat_num: "2",
        isToday: false,
        part1: true,
        part2: true,
        friends: [],
    },
]

const Allocation = () => {
    // console.log("==============================")
    // console.log(arr);
    // console.log("==============================")
    // console.log("==============================")
    const sortedRequests = requests.slice().sort((a, b) => {
        return Number(a.apply_time) - Number(b.apply_time);
    });
    // console.log(sortedRequests);
    // 이제 requests들 하나씩 꺼내면서 수행하면 됨.



    return <></>
}


export default Allocation;
