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

});

export default DetectWiFIDevicesStyle;
