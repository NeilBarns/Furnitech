import { ScaledSheet } from 'react-native-size-matters';

const DetectWiFIDevicesStyle = ScaledSheet.create({

    container: {
        backgroundColor: 'rgba(0,0,0,.5)',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    centerContainer: {
        backgroundColor: 'white',
        height: '30%',
        width: '70%',
        borderRadius: '10@s',
        elevation: 5,
        alignItems: 'center',
        paddingTop: '10@s'
    },

    detectionGIF: {
        width: '100@s',
        height: '100@s'
    },

    detectionLabel: {
        fontFamily: 'Nunito-Bold',
        marginTop: '20@s',
        fontSize: '15@s'
    },

    confirmDeviceContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    foundLbl: {
        fontFamily: 'Nunito-Bold',
        fontWeight: 'bold'
    },

    deviceName: {
        fontSize: '18@s'
    },

    categoryImageContainer: {
        marginTop: '10@s',
        padding: '10@s',
        width: '100%',
        height: '85@s'
    },

    categoryImage: {
        width: '100%',
        height: '100%'
    },

    acceptDeviceBtnContainer: {
        marginTop: '20@s',
        width: '100%',
        paddingHorizontal: '45@s'
    },

    acceptDeviceBtn: {
        backgroundColor: '#d2f25e',
        paddingVertical: '12@s',
        borderRadius: '5@s',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },

    acceptDeviceLabel: {
        fontWeight: 'bold',
        letterSpacing: '1@s'
    },
});

export default DetectWiFIDevicesStyle;
