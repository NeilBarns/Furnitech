import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    Switch
} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AntDesign } from '../../../general/Icons';
import APIInterface from '../../../hooks/APIInterface'

//STYLES
import Styles from './DeviceControlModalStyle'

//CONTEXTS
import {
    useModalContext,
    useDeviceDiscoveryContext,
    useUserManagementContext
} from '../../../hooks/ContextProvider';

//EXTERNAL IMPORT
import Slider from '@react-native-community/slider';
import FirebaseOperations from '../../../hooks/FirebaseOperations';

const DeviceControlModal = () => {
    const { deviceControlModalVisibility,
        action_changes } = useContext(useModalContext);

    const { getFirebaseDetails } = APIInterface();

    const [intialDeviceList, setIntialDeviceList] = useState();

    const { loggedUserID, deviceList } = useContext(useUserManagementContext);

    const { savedSelectedRoomID,
        savedSelectedCategoryID,
        savedSelectedCategoryName,
        savedSelectedRoomName } = useContext(useDeviceDiscoveryContext);

    const { subscribe } = FirebaseOperations();


    const InitializeDeviceList = () => {
        (async () => {
            setIntialDeviceList(await getFirebaseDetails({ roomID: savedSelectedRoomID, categoryID: savedSelectedCategoryID }))
        })();
    }


    useEffect(() => {
        if (intialDeviceList !== undefined) {
            let firebaseDeviceAddress = `users/${loggedUserID}/devices/${savedSelectedRoomID}/${savedSelectedCategoryName}`;
            subscribe({ firebasePath: firebaseDeviceAddress });
        }
    }, [intialDeviceList])


    const DeviceCard = ({ item }) => {

        return (
            <View style={Styles.device}>
                <View style={Styles.actualDevice}>

                    <View style={Styles.deviceHeader}>
                        <Text style={Styles.deviceNameLabel}>{item.definedName}</Text>
                    </View>
                    <View style={Styles.deviceControls}>
                        <View style={Styles.switchControlContainer}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={item.power ? '#f5dd4b' : '#f4f3f4'}
                                // onValueChange={toggleSwitch}
                                value={item.power}
                            />
                        </View>
                        <View style={Styles.rangeControlContainer}>
                            <Slider
                                style={Styles.rangeControl}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#E6E6E6"
                                maximumTrackTintColor="#000000"
                                value={item.dim}
                                step={5}
                                onValueChange={(value) => {
                                    console.log(value);
                                }}
                            />
                            <Text></Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    return (
        <Modal visible={deviceControlModalVisibility}
            transparent={true}
            animationType={'slide'}
            statusBarTranslucent={true}
            onShow={() => {
                InitializeDeviceList();
            }}>
            <View style={Styles.container}>
                <View style={Styles.mainContainer}>
                    <View style={Styles.header}>
                        <TouchableOpacity style={Styles.backBtn}
                            onPress={() => {
                                action_changes({ type: 'hideDeviceControlModal' });
                            }}>
                            <AntDesign style={Styles.backBtnIcon} name='left' />
                        </TouchableOpacity>
                        <Text style={Styles.deviceListLabel}>{savedSelectedRoomName} {savedSelectedCategoryName}</Text>
                    </View>
                </View>
                <FlatList
                    style={Styles.deviceScroller}
                    data={deviceList}
                    renderItem={DeviceCard}
                    keyExtractor={item => item.definedName}
                    extraData={deviceList}
                />
            </View>
        </Modal>
    )
}

export default DeviceControlModal