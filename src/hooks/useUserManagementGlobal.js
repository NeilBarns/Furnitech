import { useState } from 'react'

const useUserManagementGlobal = () => {

    const [loggedUserID, setLoggedUserID] = useState('');

    const user_changes = (action) => {
        const { type, payload } = action;

        switch (type) {
            case 'saveUserId':
                return setLoggedUserID(payload.userID);
            default:
                return null;
        }
    }

    return {
        loggedUserID,
        user_changes
    }
}

export default useUserManagementGlobal