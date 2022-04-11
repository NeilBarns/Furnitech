import React, { useRef, useEffect, useState, useContext } from 'react'
import { Text, View, StatusBar, Pressable, ScrollView, Image, Alert } from 'react-native'
import Styles from './HomeScreenStyles'
import { getCategoryByRoom } from '../../hooks/APIInterface';

//COMPONENTS
import Header from '../../components/Home/Header'
import DHT from '../../components/Home/DHT';
import BottomSheetDeviceList from '../../components/Home/BottomSheetDeviceList';
import { toastConfig } from '../../general/Toasts'


//MODAL
import AddDeviceModal from '../../components/Home/modals/AddDeviceModal';

//CONTEXTS
import {
    useModalContext,
    useNetInfoContext,
    useUserManagementContext,
    useDeviceDiscoveryContext
} from '../../hooks/ContextProvider';

//EXTERNAL IMPORTS
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

//STORAGE
import AsyncStorageOperations from '../../hooks/AsyncStorageOperations';
import { getDatabase, ref, onValue } from "firebase/database";


const tempDevices = [
    {
        id: 0,
        categoryName: 'Switches',
        imageUrl: 'https://test-iworx.online/assets/light-switch.png',
        numberofDevices: 5
    },
    {
        id: 1,
        categoryName: 'Outlets',
        imageUrl: 'https://test-iworx.online/assets/outlet.png',
        numberofDevices: 5
    }
    ,
    {
        id: 2,
        categoryName: 'Strips',
        imageUrl: 'https://test-iworx.online/assets/neopixel.png',
        numberofDevices: 5
    }
]

const DeviceCard = ({ categoryName, imageUrl, numberofDevices }) => {

    return (
        <Pressable style={Styles.device}>
            <View style={Styles.actualDevice}>
                <View style={Styles.deviceCountContainer}>
                    <View style={Styles.deviceCountRound}>
                        <Text style={Styles.deviceCountLabel}>{numberofDevices}</Text>
                    </View>
                </View>

                <Image source={{ uri: imageUrl }}
                    style={Styles.deviceIcons} />

                <View style={Styles.deviceCategoryContainer}>
                    <Text style={Styles.deviceCategoryLabel}>{categoryName}</Text>
                </View>

                <View style={Styles.deviceQuickControlContainer}>
                    <Text style={Styles.deviceQuickControlLabel}>On</Text>
                    <Text>•</Text>
                    <Text style={Styles.deviceQuickControlLabel}>Off</Text>
                </View>
            </View>
        </Pressable>
    )
}


const HomeScreen = () => {

    const refRBSheet = useRef();

    const { addDeviceModalVisibility } = useContext(useModalContext);
    const { network_changes } = useContext(useNetInfoContext);
    const { user_changes, roomCategoryDetails } = useContext(useUserManagementContext);
    const { device_discovery_changes, savedSelectedRoomID } = useContext(useDeviceDiscoveryContext);

    const { getUserID } = AsyncStorageOperations();

    var userID = 1,
        selectedRoomID = 1;

    useEffect(() => {
        (async () => {
            await device_discovery_changes({ type: 'saveSelectedRoomID', payload: { selectedRoomID } })
        })();

        (async () => {
            userID = await getUserID();
            await user_changes({ type: 'saveUserId', payload: { userID } })
        })();

        (async () => {
            var saveRoomCategoryDetails = await getCategoryByRoom({ roomID: savedSelectedRoomID })

            await user_changes({ type: 'saveRoomCategoryDetails', payload: { saveRoomCategoryDetails } })
        })();



        // const db = getDatabase();
        // const reference = ref(db, 'Users/');
        // onValue(reference, (snapshot) => {
        //     const highscore = snapshot.val().person1;
        //     console.log(highscore);
        // });


    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            let isConnected = state.isConnected;
            network_changes({ type: 'saveNetworkConnected', payload: { isConnected } });
        });
    }, [])

    return (
        <View style={Styles.container}>

            <StatusBar
                backgroundColor='#E6E6E6'
                barStyle='dark-content'
                showHideTransition={'fade'}
            />

            <Header />

            <DHT />

            <ScrollView style={Styles.deviceScroller}
                showsVerticalScrollIndicator={false}>
                <View style={Styles.deviceContainer}>
                    {roomCategoryDetails !== undefined &&
                        roomCategoryDetails.map((category, categoryID) => (
                            <DeviceCard key={category.categoryID}
                                categoryName={category.categoryName}
                                imageUrl={category.categoryImage}
                                numberofDevices={category.device_count} />
                        ))
                    }
                </View>
            </ScrollView>

            <BottomSheetDeviceList refRBSheet={refRBSheet} />

            <AddDeviceModal />

            <Toast config={toastConfig} />

        </View>
    )
}

export default HomeScreen

