import React, { useRef, useEffect, useState, useContext } from 'react'
import { Text, View, StatusBar, Pressable, ScrollView, Image, FlatList, Alert } from 'react-native'
import Styles from './HomeScreenStyles'
import APIInterface from '../../hooks/APIInterface';

//COMPONENTS
import Header from '../../components/Home/Header'
import DHT from '../../components/Home/DHT';
import BottomSheetDeviceList from '../../components/Home/BottomSheetDeviceList';
import { toastConfig } from '../../general/Toasts'


//MODAL
import AddDeviceModal from '../../components/Home/modals/AddDeviceModal';
import DeviceControlModal from '../../components/Home/modals/DeviceControlModal';

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
// import { getDatabase, ref, onValue } from "firebase/database";

const HomeScreen = () => {
    const refRBSheet = useRef();

    const { action_changes } = useContext(useModalContext);
    const { network_changes } = useContext(useNetInfoContext);
    const { user_changes, roomCategoryDetails } = useContext(useUserManagementContext);
    const { device_discovery_changes, savedSelectedRoomID } = useContext(useDeviceDiscoveryContext);

    const { getCategoryByRoom } = APIInterface();


    const { getUserID, initializeStorage } = AsyncStorageOperations();

    var userID = "NeilBarns",
        selectedRoomID = 1,
        selectedRoomName = 'Living Room';

    useEffect(() => {
        
        (async () => {
            await initializeStorage()
        })();

        (async () => {
            await device_discovery_changes({ type: 'saveSelectedRoomID', payload: { selectedRoomID } })
        })();

        (async () => {
            await device_discovery_changes({ type: 'saveSelectedRoomName', payload: { selectedRoomName } })
        })();

        (async () => {
            // userID = await getUserID();
            await user_changes({ type: 'saveUserId', payload: { userID } })
        })();

        (async () => {
            var saveRoomCategoryDetails = await getCategoryByRoom({ roomID: savedSelectedRoomID })
            await user_changes({ type: 'saveRoomCategoryDetails', payload: { saveRoomCategoryDetails } })
        })();

    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            let isConnected = state.isConnected;
            network_changes({ type: 'saveNetworkConnected', payload: { isConnected } });
        });
    }, [])

    const DeviceCard = ({ item }) => {
        return (
            <Pressable style={Styles.device}
                onPress={() => {
                    (async () => {
                        let selectedCategoryID = item.categoryID;
                        let selectedCategoryName = item.categoryName;
                        await device_discovery_changes({ type: 'saveSelectedCategoryID', payload: { selectedCategoryID } });
                        await device_discovery_changes({ type: 'saveSelectedCategoryName', payload: { selectedCategoryName } });
                        await action_changes({ type: 'showDeviceControlModal' });
                    })();
                }}>
                <View style={Styles.actualDevice}>
                    <View style={Styles.deviceCountContainer}>
                        <View style={Styles.deviceCountRound}>
                            <Text style={Styles.deviceCountLabel}>{item.device_count}</Text>
                        </View>
                    </View>

                    <Image source={{ uri: item.categoryImage }}
                        style={Styles.deviceIcons} />

                    <View style={Styles.deviceCategoryContainer}>
                        <Text style={Styles.deviceCategoryLabel}>{item.categoryName}</Text>
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

    return (
        <View style={Styles.container}>

            <StatusBar
                backgroundColor='#E6E6E6'
                barStyle='dark-content'
                showHideTransition={'fade'}
            />

            <Header />

            <DHT />

            {roomCategoryDetails !== undefined &&
                <FlatList
                    style={Styles.deviceScroller}
                    data={roomCategoryDetails}
                    renderItem={DeviceCard}
                    keyExtractor={item => item.categoryID}
                    extraData={roomCategoryDetails}
                />
            }


            <BottomSheetDeviceList refRBSheet={refRBSheet} />

            <AddDeviceModal />
            <DeviceControlModal />

            <Toast config={toastConfig} />

        </View>
    )
}

export default HomeScreen

