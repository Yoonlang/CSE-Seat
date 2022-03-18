const it4Pos = [35.8882729, 128.6109236];

export const isInLocation = () => {
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const dist = Math.pow(Math.pow(latitude - it4Pos[0], 2) + Math.pow(longitude - it4Pos[1], 2), 0.5);
        alert(dist);
        alert(latitude, longitude)
    }

    const error = () => {
        console.log("error!");
    }

    if (!navigator.geolocation) alert("not supported"); // 여기서 throw 던지고
    else navigator.geolocation.getCurrentPosition(success, error);
    // success 하면 거리 재서 맞으면 true, 아니면 false, error 뜨면 throw
}