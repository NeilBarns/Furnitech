import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import {
    fetchDeviceByIPAddress,
    insertUserDevice
} from '../../../hooks/APIInterface';

//STYLE
import Style from './DetectWiFIDevicesStyle'

//CONTEXTS
import {
    useModalContext,
    useNetInfoContext,
    useDeviceDiscoveryContext,
    useUserManagementContext
} from '../../../hooks/ContextProvider';

//EXTERNAL IMPORTS
import SmartConfig from 'react-native-smartconfig-quan';

const SmartConfiguration = (ssid,
    bssid,
    ssidPwd,
    device_discovery_changes) => {

    let foundDevice = false;

    const TIME_OUT_SMART_CONFIG = 30 * 1000;

    foundDevice = false;

    SmartConfig.start(ssid, bssid, ssidPwd, TIME_OUT_SMART_CONFIG, (event) => {

        let { eventName, data } = event;

        if (eventName === 'onFoundDevice') {
            foundDevice = true;
            data = JSON.parse(data);

            let ipAddress = data.ip;

            (async () => {
                var discoveredDevice = await fetchDeviceByIPAddress({ ipAddress: ipAddress });
                var discoveredDeviceItemName = discoveredDevice[0].itemName;
                var discoveredDeviceID = discoveredDevice[0].deviceID;
                var discoveredDeviceFBName = discoveredDevice[0].firebaseName;
                var discoveredDeviceCategory = discoveredDevice[0].categoryName;
                var discoveredDeviceCategoryImage = discoveredDevice[0].categoryImage;

                await device_discovery_changes({ type: 'saveDiscoveredWifiDevice', payload: { discoveredDevice } });
                await device_discovery_changes({ type: 'saveDiscoveredWifiDeviceItemName', payload: { discoveredDeviceItemName } });
                await device_discovery_changes({ type: 'saveDiscoveredWifiDeviceID', payload: { discoveredDeviceID } });
                await device_discovery_changes({ type: 'saveDiscoveredWifiDeviceFBName', payload: { discoveredDeviceFBName } });
                await device_discovery_changes({ type: 'saveDiscoveredWifiDeviceCategory', payload: { discoveredDeviceCategory } });
                await device_discovery_changes({ type: 'saveDiscoveredWifiDeviceCategoryImage', payload: { discoveredDeviceCategoryImage } });
            })();

            device_discovery_changes({ type: 'hasWifiDeviceDiscovered', payload: { foundDevice } });

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
    const { loggedUserID } = useContext(useUserManagementContext);

    const { hasWifiDeviceDiscovered,
        discoveredWifiDevice,
        discoveredWifiDeviceItemName,
        discoveredWifiDeviceID,
        discoveredWifiDeviceFBName,
        discoveredWifiDeviceCategory,
        discoveredWifiDeviceCategoryImage,
        device_discovery_changes } = useContext(useDeviceDiscoveryContext);

    const { ssid, bssid, wifiPwd } = useContext(useNetInfoContext);

    const saveUserDevice = async () => {
        (async () => {
            await insertUserDevice({ userID: loggedUserID, deviceID: discoveredWifiDeviceID });
        })();
    }


    return (
        <Modal visible={WiFiDeviceDetectionModalVisibility}
            transparent={true}
            animationType={'slide'}
            statusBarTranslucent={true}
            onShow={() => {
                // (async () => {
                //     await SmartConfiguration(ssid,
                //         bssid,
                //         wifiPwd,
                //         device_discovery_changes,
                //         discoveredWifiDevice);
                // })();

                saveUserDevice();
            }}>
            <View style={Style.container}>
                <View style={Style.centerContainer}>
                    {hasWifiDeviceDiscovered === false &&
                        <View style={Style.confirmDeviceContainer}>
                            <Image source={{ uri: 'https://test-iworx.online/assets/locating.gif' }}
                                style={Style.detectionGIF} />
                            <Text style={Style.detectionLabel}>Detecting...</Text>
                        </View>
                    }
                    {hasWifiDeviceDiscovered === true &&
                        <View style={Style.confirmDeviceContainer}>
                            <Text style={Style.foundLbl}>Detected</Text>
                            <Text style={Style.deviceName}>{discoveredWifiDeviceItemName}</Text>
                            <View style={Style.categoryImageContainer}>
                                <Image source={{ uri: discoveredWifiDeviceCategoryImage }}
                                    style={Style.categoryImage}
                                    resizeMode={'contain'} />
                            </View>
                            <View style={Style.acceptDeviceBtnContainer}>
                                <TouchableOpacity style={Style.acceptDeviceBtn}
                                    onPress={() => {
                                        saveUserDevice();
                                    }}>
                                    <Text style={Style.acceptDeviceLabel}>CONFIRM DEVICE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </View>
        </Modal>
    )
}

export default DetectWiFIDevices