import { useState } from 'react'

const useModalVisibilityGlobal = () => {

    const [addDeviceModalVisibility, setaddDeviceModalVisibility] = useState(false);
    const [WiFiDeviceDetectionModalVisibility, setWiFiDeviceDetectionModalVisibility] = useState(false);
    const [deviceControlModalVisibility, setDeviceControlModalVisibility] = useState(false);

    const action_changes = async (action) => {
        const { type } = action;

        switch (await type) {
            case 'showAddDeviceModal':
                return setaddDeviceModalVisibility(true);
            case 'hideAddDeviceModal':
                return setaddDeviceModalVisibility(false);
            case 'showWiFiDeviceDetectionModal':
                return setWiFiDeviceDetectionModalVisibility(true);
            case 'hideWiFiDeviceDetectionModal':
                return setWiFiDeviceDetectionModalVisibility(false);
            case 'showDeviceControlModal':
                return setDeviceControlModalVisibility(true);
            case 'hideDeviceControlModal':
                return setDeviceControlModalVisibility(false);
            default:
                return null;
        }
    }


    return {
        addDeviceModalVisibility,
        WiFiDeviceDetectionModalVisibility,
        deviceControlModalVisibility,
        action_changes
    };
}

export default useModalVisibilityGlobal