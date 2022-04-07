import { useState } from 'react'

const useDeviceDiscoveryGlobal = () => {

    const [hasWifiDeviceDiscovered, setHasWifiDeviceDiscovered] = useState(false);
    const [discoveredWifiDevice, setDiscoveredWifiDevice] = useState();
    const [discoveredWifiDeviceItemName, setDiscoveredWifiDeviceItemName] = useState();
    const [discoveredWifiDeviceID, setDiscoveredWifiDeviceID] = useState();
    const [discoveredWifiDeviceFBName, setDiscoveredWifiDeviceFBName] = useState();
    const [discoveredWifiDeviceCategory, setDiscoveredWifiDeviceCategory] = useState();
    const [discoveredWifiDeviceCategoryImage, setDiscoveredWifiDeviceCategoryImage] = useState();

    const device_discovery_changes = (action) => {
        const { type, payload } = action;

        switch (type) {
            case 'hasWifiDeviceDiscovered':
                return setHasWifiDeviceDiscovered(payload.foundDevice);
            case 'saveDiscoveredWifiDevice':
                return setDiscoveredWifiDevice(payload.discoveredDevice);
            case 'saveDiscoveredWifiDeviceItemName':
                return setDiscoveredWifiDeviceItemName(payload.discoveredDeviceItemName);
            case 'saveDiscoveredWifiDeviceID':
                return setDiscoveredWifiDeviceID(payload.discoveredDeviceID);
            case 'saveDiscoveredWifiDeviceFBName':
                return setDiscoveredWifiDeviceFBName(payload.discoveredDeviceFBName);
            case 'saveDiscoveredWifiDeviceCategory':
                return setDiscoveredWifiDeviceCategory(payload.discoveredDeviceCategory);
            case 'saveDiscoveredWifiDeviceCategoryImage':
                return setDiscoveredWifiDeviceCategoryImage(payload.discoveredDeviceCategoryImage);
            default:
                return null;
        }
    }

    return {
        hasWifiDeviceDiscovered,
        discoveredWifiDevice,
        discoveredWifiDeviceItemName,
        discoveredWifiDeviceID,
        discoveredWifiDeviceFBName,
        discoveredWifiDeviceCategory,
        discoveredWifiDeviceCategoryImage,
        device_discovery_changes
    };
}

export default useDeviceDiscoveryGlobal