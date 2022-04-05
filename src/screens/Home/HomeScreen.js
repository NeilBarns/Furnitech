import React, { useRef, useEffect, useState, useContext } from 'react'
import { Text, View, StatusBar, Pressable, ScrollView, Image, Alert } from 'react-native'
import Styles from './HomeScreenStyles'

//COMPONENTS
import Header from '../../components/Home/Header'
import DHT from '../../components/Home/DHT';
import BottomSheetDeviceList from '../../components/Home/BottomSheetDeviceList';


//MODAL
import AddDeviceModal from '../../components/Home/modals/AddDeviceModal';

//CONTEXTS
import { useModalContext, useNetInfoContext } from '../../hooks/ContextProvider';

//EXTERNAL IMPORTS
import NetInfo from '@react-native-community/netinfo';

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

const DeviceCard = ({ categoryName, imageUrl, numberofDevices, refRBSheet, ssid, bssid }) => {

    return (
        <Pressable style={Styles.device}
            onPress={() => {
               
            }}>
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

                    {tempDevices.map((category, id) => (
                        <DeviceCard key={category.id}
                            categoryName={category.categoryName}
                            imageUrl={category.imageUrl}
                            numberofDevices={category.numberofDevices}
                            refRBSheet={refRBSheet}
                            ssid
                            bssid />
                    ))}

                </View>
            </ScrollView>

            <BottomSheetDeviceList refRBSheet={refRBSheet} />

            <AddDeviceModal />

        </View>
    )
}

export default HomeScreen

