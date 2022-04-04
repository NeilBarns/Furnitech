import { View, Text, Modal, Image } from 'react-native'
import React, { useContext } from 'react'

//STYLE
import Style from './DetectWiFIDevicesStyle'

//CONTEXTS
import { useModalContext, useNetInfoContext } from '../../../hooks/ContextProvider';

//EXTERNAL IMPORTS
import SmartConfig from 'react-native-smartconfig-quan';



const SmartConfiguration = (ssid, bssid, ssidPwd) => {

    console.log('configuring...');
    let foundDevice = false;

    const TIME_OUT_SMART_CONFIG = 30 * 1000;

    foundDevice = false;

    SmartConfig.start(ssid, bssid, ssidPwd, TIME_OUT_SMART_CONFIG, (event) => {
        console.log(event);
        let { eventName, data } = event;
        if (eventName === 'onFoundDevice') {
            foundDevice = true;
            data = JSON.parse(data);
            console.log(data);
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

    const { ssid, bssid, wifiPwd } = useContext(useNetInfoContext);


    return (
        <Modal visible={WiFiDeviceDetectionModalVisibility}
            transparent={true}
            animationType={'slide'}
            statusBarTranslucent={true}
            onShow={() => {
                SmartConfiguration(ssid, bssid, wifiPwd);
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