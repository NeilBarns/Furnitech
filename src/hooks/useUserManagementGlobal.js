import { useState } from 'react'

const useUserManagementGlobal = () => {

    const [loggedUserID, setLoggedUserID] = useState();
    const [roomCategoryDetails, setRoomCategoryDetails] = useState();

    const user_changes = async (action) => {
        const { type, payload } = action;

        switch ( await type ) {
            case 'saveUserId':
                return await setLoggedUserID(await payload.userID);
            case 'saveRoomCategoryDetails':
                return await setRoomCategoryDetails(await payload.saveRoomCategoryDetails);
            default:
                return null;
        }
    }

    return {
        loggedUserID,
        roomCategoryDetails,
        user_changes
    }
}

export default useUserManagementGlobal