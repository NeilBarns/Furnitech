import { useState } from 'react'

const useDeviceDiscovery = () => {

    const [hasWifiDeviceDiscovered, setHasWifiDeviceDiscovered] = useState(false);
    const [discoveredWifiDevice, setDiscoveredWifiDevice] = useState('');
    
    const device_discovery_changes = (action) => {
        const { type, payload } = action;

        switch (type) {
            case 'hasWifiDeviceDiscovered':
                return setHasWifiDeviceDiscovered(payload.foundDevice);
            case 'saveDiscoveredWifiDevice':
                return setDiscoveredWifiDevice(payload.data);
            default:
                return null;
        }
    }

    return {
        hasWifiDeviceDiscovered,
        discoveredWifiDevice,
        device_discovery_changes
    };
}

export default useDeviceDiscovery