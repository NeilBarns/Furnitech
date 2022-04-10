import { useState } from 'react'

const useDeviceDiscoveryGlobal = () => {

    const [hasWifiDeviceDiscovered, setHasWifiDeviceDiscovered] = useState(false);
    const [savedSelectedRoomName, setSelectedRoomName] = useState('Living Room');
    const [savedSelectedRoomID, setSelectedRoomID] = useState(0);
    const [discoveredWifiDevice, setDiscoveredWifiDevice] = useState();
    const [discoveredWifiDeviceItemName, setDiscoveredWifiDeviceItemName] = useState();
    const [discoveredWifiDeviceID, setDiscoveredWifiDeviceID] = useState('switch0');
    const [discoveredWifiDeviceFBName, setDiscoveredWifiDeviceFBName] = useState();
    const [discoveredWifiDeviceFBJSON, setDiscoveredWifiDeviceFBJSON] = useState();
    const [discoveredWifiDeviceCategory, setDiscoveredWifiDeviceCategory] = useState();
    const [discoveredWifiDeviceCategoryImage, setDiscoveredWifiDeviceCategoryImage] = useState();
    const [discoveredWifiDeviceCategoryExistence, setDiscoveredWifiDeviceCategoryExistence] = useState();

    const device_discovery_changes = (action) => {
        const { type, payload } = action;

        switch (type) {
            case 'hasWifiDeviceDiscovered':
                return setHasWifiDeviceDiscovered(payload.foundDevice);
            case 'saveSelectedRoomName':
                return setSelectedRoomName(payload.selectedRoomName);
            case 'saveSelectedRoomID':
                return setSelectedRoomID(payload.selectedRoomID);
            case 'saveDiscoveredWifiDevice':
                return setDiscoveredWifiDevice(payload.discoveredDevice);
            case 'saveDiscoveredWifiDeviceItemName':
                return setDiscoveredWifiDeviceItemName(payload.discoveredDeviceItemName);
            case 'saveDiscoveredWifiDeviceID':
                return setDiscoveredWifiDeviceID(payload.discoveredDeviceID);
            case 'saveDiscoveredWifiDeviceFBName':
                return setDiscoveredWifiDeviceFBName(payload.discoveredDeviceFBName);
            case 'saveDiscoveredWifiDeviceFBJSON':
                return setDiscoveredWifiDeviceFBJSON(payload.discoveredDeviceFBJSON);
            case 'saveDiscoveredWifiDeviceCategory':
                return setDiscoveredWifiDeviceCategory(payload.discoveredDeviceCategory);
            case 'saveDiscoveredWifiDeviceCategoryImage':
                return setDiscoveredWifiDeviceCategoryImage(payload.discoveredDeviceCategoryImage);
            case 'saveDiscoveredWifiDeviceCategoryExistence':
                return setDiscoveredWifiDeviceCategoryExistence(payload.discoveredDeviceCategoryExistence);
            case 'initializeDeviceDiscovery':
                setDiscoveredWifiDeviceItemName('');
                setDiscoveredWifiDeviceID();
                setDiscoveredWifiDeviceFBName('');
                setDiscoveredWifiDeviceFBJSON('');
                return null;
            default:
                return null;
        }
    }

    return {
        hasWifiDeviceDiscovered,
        savedSelectedRoomID,
        savedSelectedRoomName,
        discoveredWifiDevice,
        discoveredWifiDeviceItemName,
        discoveredWifiDeviceID,
        discoveredWifiDeviceFBName,
        discoveredWifiDeviceFBJSON,
        discoveredWifiDeviceCategory,
        discoveredWifiDeviceCategoryImage,
        discoveredWifiDeviceCategoryExistence,
        device_discovery_changes
    };
}

export default useDeviceDiscoveryGlobal