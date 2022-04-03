import React, { useRef, useEffect, useState } from 'react'
import { Text, View, StatusBar, Pressable, ScrollView, Image, Alert } from 'react-native'
import Styles from './HomeScreenStyles'

//COMPONENTS
import Header from '../../components/Home/Header'
import DHT from '../../components/Home/DHT';
import BottomSheetDeviceList from '../../components/Home/BottomSheetDeviceList';


import NetInfo from "@react-native-community/netinfo";
import * as Location from 'expo-location';
import SmartConfig from 'react-native-smartconfig-quan';

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

    let foundDevice = false;

    const wifiName = ssid;
    const wifiPass = 'wEM4nxgq';
    // you can random bssid of wifi, but it need correct format
    const wifiBssid = bssid;

    // timeout not work with android, on android default is 45s
    const TIME_OUT_SMART_CONFIG = 30 * 1000; // 30s

    function config() {
        console.log('configuring...');
        foundDevice = false;

        SmartConfig.start(wifiName, wifiBssid, wifiPass, TIME_OUT_SMART_CONFIG, (event) => {
            console.log(event);
            let { eventName, data } = event;
            if (eventName === 'onFoundDevice') {
                foundDevice = true;
                data = JSON.parse(data);

                // data in event is ip of ESP
                console.log(data);
                // console.log('Found device\nip: ' + data.ip + '\nbssid: ' + data.bssid);
            } else {
                if (!foundDevice) {
                    console.log('Not found');
                }
            }
        });
    }


    return (
        <Pressable style={Styles.device}
            // onPress={() => (refRBSheet.current.open())}>
            onPress={() => {
                // NetInfo.fetch()
                //     .then((state) => {
                //         console.log(state)
                //     })

                // Smartconfig.start({
                //     // type: 'esptouch', //or airkiss, now doesn't not effect
                //     ssid: 'HUAWEI-2.4G-h3YP',
                //     bssid: 'e4:83:26:eb:d9:54', //"" if not need to filter (don't use null)
                //     password: 'wEM4nxgq',
                //     // timeout: 50000 //now doesn't not effect
                //     // ssid: 'HUAWEI-2.4G-h3YP',
                //     // password: 'wEM4nxgq',
                //     // bssid,
                //     count: 1,
                //     cast: 'broadcast'
                // }).then(data => {
                //     console.log(data);
                // }).catch(err => {
                //     console.log(err);
                // });
                config();
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
    const [netinfo, setNetInfo] = useState('');
    const [netInfoSSID, setNetInfoSSID] = useState();
    const [netInfoBSSID, setNetInfoBSSID] = useState();

    useEffect(() => {
        const wifiDetails = NetInfo.addEventListener((state) => {
            setNetInfo(`connectionType:${state.type}
          isConnected:${state.isConnected}
          SSID:${state.details.ssid}`);

            setNetInfoSSID(state.details.ssid);
            setNetInfoBSSID(state.details.bssid);
        })
        return () => {
            wifiDetails()
        }
    }, [netinfo.isConnected])




    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    const handleGetNetInfo = () => {
        NetInfo.fetch()
            .then((state) => {
                console.log(state)
            })
    };

    useEffect(() => {
        handleGetNetInfo();
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
                            ssid={netInfoSSID}
                            bssid={netInfoBSSID} />
                    ))}

                </View>
            </ScrollView>

            <BottomSheetDeviceList refRBSheet={refRBSheet} />

        </View>
    )
}

export default HomeScreen

