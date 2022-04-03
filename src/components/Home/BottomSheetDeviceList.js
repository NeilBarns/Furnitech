import { View, Text, Alert } from 'react-native'
import React from 'react'
import BottomSheet from "react-native-raw-bottom-sheet";
import { scale } from 'react-native-size-matters';
import { changeStatusBarStyle } from '../../general/StatusBar';

const BottomSheetDeviceList = ({ refRBSheet }) => {
    return (
        <BottomSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeDuration={0}
            openDuration={0}
            animationType={'fade'}
            onOpen={() => {
                changeStatusBarStyle(false, 'rgba(0,0,0,.5)', 'dark-content');
            }}
            onClose={() => {
                changeStatusBarStyle(false, '#E6E6E6', 'dark-content');
            }}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.5)'
                },
                container: {
                    height: '75%',
                    borderRadius: scale(15),
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                },
                draggableIcon: {
                    backgroundColor: "white"
                }
            }}
        >

        </BottomSheet>
    )
}

export default BottomSheetDeviceList