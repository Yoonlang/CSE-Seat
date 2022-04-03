const it4Pos = {
    latitude: 35.8882729,
    longitude: 128.6109236,
}

export const isInLocation = async () => {
    let isCheck = undefined;
    const options = {
        enableHighAccuracy: true,
    }

    const getPosition = (options) => {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options))
    }

    if (!navigator.geolocation) console.log("Not support in browser");
    else {
        try{
            const position = await getPosition(options);
            const {latitude, longitude} = position.coords;
            const dist = Math.pow(Math.pow(latitude - it4Pos.latitude, 2) + Math.pow(longitude - it4Pos.longitude, 2), 0.5);
            isCheck = dist < 0.01 ? true : false; // 일단 0.101 원래는 0.001
        } catch (e) {
            if(e.code === 1) alert("입실을 위해 위치 엑세스를 허용하세요.");
        }
    }
    if(isCheck === false) alert("입실을 위해 건물 주변에 있어야 합니다.");
    return isCheck;
}
