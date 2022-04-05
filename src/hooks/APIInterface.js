export const fetchDeviceByIPAddress = async (payload) => {

    const { ipAddress } = payload;
    let modified_ipAddress = ipAddress.split('.').join('');
    let urlRequest = `http://192.168.100.7:8000/devices/deviceIP/${modified_ipAddress}`;

    try {
        const response = await fetch(urlRequest);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

