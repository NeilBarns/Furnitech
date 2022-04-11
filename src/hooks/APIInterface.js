export const fetchDeviceByIPAddress = async (payload) => {

    const { ipAddress, roomID } = payload;
    let modified_ipAddress = ipAddress.split('.').join('');
    let urlRequest = `http://192.168.100.7:8000/devices/deviceIP/${modified_ipAddress}/roomID/${roomID}`;

    try {
        const response = await fetch(urlRequest);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const insertUserDevice = async (payload) => {
    const { userID, deviceID, roomID } = payload;

    let urlRequest = `http://192.168.100.7:8000/devicesprovision/userid/${userID}/deviceid/${deviceID}/roomid/${roomID}`;

    try {
        const response = await fetch(urlRequest);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }

}


export const insertUserCategory = async (payload) => {
    const { userID,
        categoryID,
        roomID,
        categoryExistence } = payload;

    if (categoryExistence < 1) {
        let urlRequest = `http://192.168.100.7:8000/devicesprovision/userid/${userID}/categoryid/${categoryID}/roomid/${roomID}`;

        try {
            const response = await fetch(urlRequest);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }
}

export const getCategoryByRoom = async (payload) => {
    const { roomID } = payload;

    let urlRequest = `http://192.168.100.7:8000/devices/roomID/${roomID}`;

    try {
        const response = await fetch(urlRequest);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }

}

