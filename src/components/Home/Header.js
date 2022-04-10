import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { scale } from 'react-native-size-matters';
import {
    Ionicons,
    Octicons,
    MaterialCommunityIcons
} from '../../general/Icons'
import Styles from '../../screens/Home/HomeScreenStyles';


//CONTEXTS
import {
    useModalContext,
    useNetInfoContext
} from '../../hooks/ContextProvider';

//EXTERNAL IMPORTS
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';

const tempRooms = [
    {
        id: 0,
        roomName: 'Living Room',
        numberofDevices: 15
    },
    {
        id: 1,
        roomName: 'Bathroom',
        numberofDevices: 15
    },
    {
        id: 2,
        roomName: 'Dining',
        numberofDevices: 15
    },
    {
        id: 3,
        roomName: 'Children\'s room',
        numberofDevices: 15
    },
    {
        id: 4,
        roomName: 'Master\'s bedroom',
        numberofDevices: 15
    },
    {
        id: 5,
        roomName: 'Kitchen',
        numberofDevices: 15
    },
]

const RoomItem = ({ roomName, numberofDevices }) => {
    return (
        <View style={Styles.roomContainer}>
            <Text style={Styles.roomLabel}>{roomName}</Text>
            <View style={Styles.roomDeviceCountRound}>
                <Text style={Styles.roomDeviceCountLabel}>{numberofDevices}</Text>
            </View>
        </View>
    )
}

const Header = () => {

    const { addDeviceModalVisibility, action_changes } = useContext(useModalContext);
    const { isConnected, network_changes } = useContext(useNetInfoContext);

    const [netinfo, setNetInfo] = useState('');
    const [netInfoConnected, setNetInfoConnected] = useState(false);


    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {

        if (addDeviceModalVisibility) {
            (async () => {
                if (Platform.OS === 'android' && !Constants.isDevice) {
                    setErrorMsg(
                        'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
                    );
                    return;
                }
                let { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }


                let turnedOn = await Location.hasServicesEnabledAsync();
                if (turnedOn) {

                    // let stats = await NetInfo.fetch().then((state) => {
                    //     setNetInfo(
                    //         `Connection type: ${state.type}
                    //             Is connected?: ${state.isConnected}
                    //             IP Address: ${state.details.ipAddress}
                    //             SSID: ${state.details.ssid}`
                    //     );
                    // });



                }
                else {
                    // alert(turnedOn);
                    // text = 'Waiting..';
                }


                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            })();
        }

        return () => {

        }
    }, [addDeviceModalVisibility])

    return (
        <View style={Styles.header}>
            <View style={Styles.headerTop}>
                <TouchableOpacity style={Styles.selectedHomeContainer}>
                    <Text style={Styles.selectedHomeLabel}>Home</Text>
                    <MaterialCommunityIcons name='menu-down' style={Styles.selectedHomeIcon} />
                </TouchableOpacity>

                <View style={Styles.logsAddEntityContainer}>
                    <TouchableOpacity style={Styles.controlContainer}
                        onPress={() => {
                            action_changes({ type: 'showAddDeviceModal' });
                        }}>
                        <Ionicons name="add" style={{
                            fontSize: scale(20),
                        }} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={Styles.roomListContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>

                {tempRooms.map((room, id) => (
                    <RoomItem key={room.id}
                        roomName={room.roomName}
                        numberofDevices={room.numberofDevices} />
                ))}


            </ScrollView>


        </View>
    )
}

export default Header