import { useState, useEffect } from 'react'

const useNetInfoGlobal = () => {

    const [ssid, setSSID] = useState('------');
    const [bssid, setBSSID] = useState('------');
    const [wifiPwd, setwifiPwd] = useState('------');
    const [isConnected, setIsConnected] = useState(false);
    const [isLocationServiceEnabled, setIsLocationServiceEnabled] = useState(false);

    const network_changes = (action) => {
        const { type, payload } = action;

        switch (type) {
            case 'saveSSID':
                return setSSID(payload.ssid);
            case 'saveBSSID':
                return setBSSID(payload.bssid);
            case 'saveWiFIPwd':
                return setwifiPwd(payload.wifiPwd);
            case 'saveNetworkConnected':
                return setIsConnected(payload.isConnected);
            case 'saveLocationServiceConnected':
                return setIsLocationServiceEnabled(payload.isEnabled);
            default:
                return null;
        }
    }


    return {
        ssid,
        wifiPwd,
        bssid,
        isConnected,
        isLocationServiceEnabled,
        network_changes
    };
}

export default useNetInfoGlobal