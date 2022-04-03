import React from 'react'
import { Text, View, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native'
import { scale, ScaledSheet } from 'react-native-size-matters';
import {
    Ionicons,
    Octicons,
    MaterialCommunityIcons
} from '../../general/Icons'
import Styles from '../../screens/Home/HomeScreenStyles';


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
    return (
        <View style={Styles.header}>
            <View style={Styles.headerTop}>
                <TouchableOpacity style={Styles.selectedHomeContainer}>
                    <Text style={Styles.selectedHomeLabel}>Home</Text>
                    <MaterialCommunityIcons name='menu-down' style={Styles.selectedHomeIcon} />
                </TouchableOpacity>

                <View style={Styles.logsAddEntityContainer}>
                    <TouchableOpacity style={Styles.controlContainer}>
                        <Ionicons name="add" style={{
                            fontSize: scale(20),
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.controlContainer}>
                        <Octicons name='note' style={{
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