import FirebaseOperations from "./FirebaseOperations";

const APIInterface = () => {

    const { insertNewDevicetoFirebase,
        insertNewCategorytoFirebase } = FirebaseOperations();

    const fetchDeviceByIPAddress = async (payload) => {

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

    const insertUserDevice = async (payload) => {
        const { userID, deviceID, roomID, firebaseAddressPath, firebaseDeviceDefinition } = payload;
        await insertNewDevicetoDB(userID, deviceID, roomID, firebaseAddressPath);
        await insertNewDevicetoFirebase({
            firebaseDeviceAddress: firebaseAddressPath,
            discoveredWifiDeviceFBJSON: firebaseDeviceDefinition
        });
    }

    const insertNewDevicetoDB = async (userID, deviceID, roomID, firebaseAddressPath) => {
        let urlRequest = `http://192.168.100.7:8000/devicesprovision/userid/${userID}/deviceid/${deviceID}/roomid/${roomID}/firebaseaddress/${firebaseAddressPath}`;

        try {
            const response = await fetch(urlRequest);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    const insertNewCategorytoDB = async (userID, categoryID, roomID) => {
        let urlRequest = `http://192.168.100.7:8000/devicesprovision/userid/${userID}/categoryid/${categoryID}/roomid/${roomID}`;

        try {
            const response = await fetch(urlRequest);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    const insertUserCategory = async (payload) => {

        const { userID,
            categoryID,
            roomID,
            categoryExistence,
            firebaseCategoryPath } = payload;

        await insertNewCategorytoFirebase({
            firebaseCategoryAddress: firebaseCategoryPath,
            category: categoryID
        })

        if (categoryExistence < 1) {
            await insertNewCategorytoDB(userID, categoryID, roomID);

        }
    }

    const getCategoryByRoom = async (payload) => {
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

    const getFirebaseDetails = async (payload) => {
        const { roomID, categoryID } = payload;

        let urlRequest = `http://192.168.100.7:8000/devices/firebasedetails/roomID/${roomID}/categoryid/${categoryID}`;

        try {
            const response = await fetch(urlRequest);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }
    return {
        fetchDeviceByIPAddress,
        insertUserDevice,
        insertUserCategory,
        getCategoryByRoom,
        getFirebaseDetails
    }
}

export default APIInterface

