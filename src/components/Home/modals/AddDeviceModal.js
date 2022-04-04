import { View, Text, Modal, ScrollView, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'

//STYLES
import Style from './AddDeviceModalStyle'

//CONTEXTS
import { useModalContext, useNetInfoContext } from '../../../hooks/ContextProvider';

//EXTERNAL IMPORTS
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';
import { EvilIcons } from '../../../general/Icons';


//MODALS
import DetectWiFIDevices from './DetectWiFIDevices';

const AddDeviceModal = () => {

    const { addDeviceModalVisibility,
        action_changes } = useContext(useModalContext);
    let { ssid, isConnected, isLocationServiceEnabled, network_changes } = useContext(useNetInfoContext);

    const [revealPassord, setRevealPassword] = useState(true);
    const [pwdInputEditable, setPwdInputEditable] = useState(false);
    const [inputtedPwd, setInputtedPwd] = useState('');

    const [intervalID, setIntervalID] = useState();

    const revealPassword = (reveal) => {
        if (reveal) {
            setRevealPassword(false);
        }
        else {
            setRevealPassword(true);
        }
    }

    useEffect(() => {
        if (isConnected === true && isLocationServiceEnabled === true) {
            ssid = ssid;
            setPwdInputEditable(true);
        }
        else {
            let ssid = '------';
            network_changes({ type: 'saveSSID', payload: { ssid } });
            setPwdInputEditable(false);
        }

    }, [isConnected, isLocationServiceEnabled])


    return (
        <Modal visible={addDeviceModalVisibility}
            transparent={true}
            animationType={'slide'}
            statusBarTranslucent={true}
            onShow={() => {
                var interval = setInterval(() => {
                    (async () => {
                        const isEnabled = await Location.hasServicesEnabledAsync();
                        network_changes({ type: 'saveLocationServiceConnected', payload: { isEnabled } });
                        console.log(isConnected)
                        if (isEnabled === true) {
                            NetInfo.fetch("wifi").then(state => {
                                let ssid = state.details.ssid;
                                let bssid = state.details.bssid;
                                network_changes({ type: 'saveSSID', payload: { ssid } });
                                network_changes({ type: 'saveBSSID', payload: { bssid } });
                            });
                        }
                    })();
                }, 1000);
                setIntervalID(interval);
            }}>

            <View style={Style.container}>

                <View style={Style.mainContainer}>

                    <View>
                        <Text style={Style.addDeviceLabel}>Add Device</Text>
                        <Text style={Style.descriptionLabel}>Connect your phone to 2.4/4G connection{"\n"}to make sure that the Smart Devices will be functional.</Text>
                    </View>

                    <View style={Style.detection}>

                        {isConnected === true &&
                            < View style={Style.checkerCard}>
                                <View style={Style.checkerCardMain}>

                                    <View style={Style.checkerCardIconContainer}>
                                        <Image source={{ uri: 'https://test-iworx.online/assets/checked2.png' }}
                                            resizeMode={'contain'}
                                            style={Style.checkerCardIcon} />
                                    </View>

                                    <View style={Style.checkerCardLbl}>
                                        <Text>Connected to WiFi</Text>
                                    </View>

                                </View>
                            </View>
                        }

                        {isConnected === false &&
                            <View style={Style.checkerCard}>
                                <View style={Style.checkerCardMain_negative}>

                                    <View style={Style.checkerCardIconContainer_negative}>
                                        <Image source={{ uri: 'https://test-iworx.online/assets/remove.png' }}
                                            resizeMode={'contain'}
                                            style={Style.checkerCardIcon} />
                                    </View>

                                    <View style={Style.checkerCardLbl}>
                                        <Text>Not connected to WiFi</Text>
                                    </View>

                                </View>
                            </View>
                        }


                        {isLocationServiceEnabled === true &&
                            <View style={Style.checkerCard}>
                                <View style={Style.checkerCardMain}>
                                    <View style={Style.checkerCardIconContainer}>
                                        <Image source={{ uri: 'https://test-iworx.online/assets/checked2.png' }}
                                            resizeMode={'contain'}
                                            style={Style.checkerCardIcon} />
                                    </View>
                                    <View style={Style.checkerCardLbl}>
                                        <Text>Location service enabled</Text>
                                    </View>

                                </View>
                            </View>
                        }

                        {isLocationServiceEnabled === false &&
                            <View style={Style.checkerCard}>
                                <View style={Style.checkerCardMain_negative}>

                                    <View style={Style.checkerCardIconContainer_negative}>
                                        <Image source={{ uri: 'https://test-iworx.online/assets/remove.png' }}
                                            resizeMode={'contain'}
                                            style={Style.checkerCardIcon} />
                                    </View>

                                    <View style={Style.checkerCardLbl}>
                                        <Text>Location service disabled</Text>
                                    </View>

                                </View>
                            </View>
                        }

                        <View style={Style.netInfoContainer}>
                            <Text style={Style.normalLabel}>Device will be connected to</Text>
                            <Text style={Style.ssidLabel}>{ssid}</Text>

                            <View style={Style.ssidPwdContainer}>
                                <View style={Style.passwordInputContainer}>
                                    <TextInput textAlign={'center'}
                                        secureTextEntry={revealPassord}
                                        placeholder="WiFi password"
                                        editable={pwdInputEditable}
                                        onChangeText={(text) => {
                                            setInputtedPwd(text);
                                        }}
                                        style={Style.passwordInput} />
                                    <Pressable style={Style.revealPasswordButton}
                                        onPressOut={() => {
                                            revealPassword(false);
                                        }}
                                        onPressIn={() => {
                                            revealPassword(true);
                                        }
                                        }>
                                        <EvilIcons name='eye' style={Style.revealPasswordButtonIcon} />
                                    </Pressable>
                                </View>
                            </View>

                            <View style={Style.detectBtnContainer}>
                                <TouchableOpacity style={Style.detectBtn}
                                onPress={() => {
                                    clearInterval(intervalID);
                                    action_changes({ type: 'showWiFiDeviceDetectionModal' });

                                    let wifiPwd = inputtedPwd;
                                    network_changes({ type: 'saveWiFIPwd', payload: { wifiPwd } });

                                }}>
                                    <Text style={Style.detectBtnLabel}>DETECT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={Style.cancelBtnContainer}>
                        <TouchableOpacity style={Style.cancelBtn}
                            onPress={() => {
                                action_changes({ type: 'hideAddDeviceModal' });
                            }}>
                            <Text style={Style.cancelBtnLabel}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <DetectWiFIDevices />
            
        </Modal>
    )
}

export default AddDeviceModal