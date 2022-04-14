import { useState } from 'react'

const useUserManagementGlobal = () => {

    const [loggedUserID, setLoggedUserID] = useState('NeilBarns');
    const [roomCategoryDetails, setRoomCategoryDetails] = useState();
    const [deviceList, setDeviceList] = useState();

    const user_changes = async (action) => {
        const { type, payload } = action;

        switch (await type) {
            case 'saveUserId':
                return setLoggedUserID(await payload.userID);
            case 'saveRoomCategoryDetails':
                return setRoomCategoryDetails(await payload.saveRoomCategoryDetails);
            case 'saveDeviceList':
                return setDeviceList(await payload.fetchedDeviceList);
            default:
                return null;
        }
    }

    return {
        loggedUserID,
        roomCategoryDetails,
        deviceList,
        user_changes
    }
}

export default useUserManagementGlobal