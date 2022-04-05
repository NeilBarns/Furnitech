import { View, Text, Modal, Image } from 'react-native'
import React, { useContext, useState } from 'react'

//STYLE
import Style from './DetectWiFIDevicesStyle'

//CONTEXTS
import { useModalContext, useNetInfoContext, useDeviceDiscoveryContext } from '../../../hooks/ContextProvider';

//EXTERNAL IMPORTS
import SmartConfig from 'react-native-smartconfig-quan';



const SmartConfiguration = (ssid,
    bssid,
    ssidPwd) => {

    let foundDevice = false;

    const TIME_OUT_SMART_CONFIG = 30 * 1000;

    foundDevice = false;

    SmartConfig.start(ssid, bssid, ssidPwd, TIME_OUT_SMART_CONFIG, (event) => {

        let { eventName, data } = event;

        if (eventName === 'onFoundDevice') {
            foundDevice = true;
            data = JSON.parse(data);
            console.log(data);

            // device_discovery_changes({ type: 'hasWifiDeviceDiscovered', payload: { foundDevice } });
            // device_discovery_changes({ type: 'saveDiscoveredWifiDevice', payload: { data } });


        } else {
            if (!foundDevice) {
                console.log('Not found');
            }
        }
    });
}



const DetectWiFIDevices = () => {
    const { WiFiDeviceDetectionModalVisibility,
        action_changes } = useContext(useModalContext);

    const { hasWifiDeviceDiscovered,
        discoveredWifiDevice,
        device_discovery_changes } = useContext(useDeviceDiscoveryContext);

    const { ssid, bssid, wifiPwd } = useContext(useNetInfoContext);



    return (
        <Modal visible={WiFiDeviceDetectionModalVisibility}
            transparent={true}
            animationType={'slide'}
            statusBarTranslucent={true}
            onShow={() => {
                (async () => {
                    await SmartConfiguration(ssid,
                        bssid,
                        wifiPwd);
                })();

            }}>
            <View style={Style.container}>
                <View style={Style.centerContainer}>
                    <Image source={{ uri: 'https://test-iworx.online/assets/locating.gif' }}
                        style={Style.detectionGIF} />
                    <Text style={Style.detectionLabel}>Detecting...</Text>
                </View>
            </View>
        </Modal>
    )
}

export default DetectWiFIDevices