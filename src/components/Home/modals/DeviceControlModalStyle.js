import { scale, ScaledSheet } from 'react-native-size-matters';
import { screenWidth } from '../../../general/Dimensions'

const DeviceControlModalStyle = ScaledSheet.create({

    container: {
        backgroundColor: '#e5c2ed',
        height: '100%',
        width: '100%',
        paddingTop: '30@s',
        // paddingHorizontal: '15@s',
        flexDirection: 'column'
    },

    mainContainer: {
        // flex: 1
    },

    header: {
        padding: '15@s',
        paddingLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '15@s'
        // marginBottom: '10@s'
    },

    backBtn: {
        backgroundColor: '#FFFFFF',
        padding: '10@s',
        borderRadius: '50@s',
        elevation: 2,
        marginRight: '10@s'
    },

    backBtnIcon: {
        fontSize: '15@s'
    },

    deviceListLabel: {
        fontFamily: 'Nunito-Bold',
        fontSize: '18@s'
    },

    deviceScroller: {
        // padding: '15@s',
        flexDirection: 'column',
        // flexWrap: 'nowrap',
        // backgroundColor: 'yellow'
    },





    device: {
        padding: '10@s',
        height: '150@s',
        width: '100%'
    },

    actualDevice: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: scale(10),
        elevation: 2
    },

    deviceHeader: {
        width: '100%',
        paddingTop: '15@s',
        paddingLeft: '15@s'
    },

    deviceNameLabel: {
        fontSize: '14@s',
        fontWeight: 'bold',
        letterSpacing: '1@s'
    },

    deviceControls: {
        // backgroundColor: 'red',
        paddingHorizontal: '15@s',
        flex: 1
    },

    switchControlContainer: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    rangeControlContainer: {
        flex: 0.5
    },

    rangeControl: {
        width: '100%', 
        height: '100%'
    }

});

export default DeviceControlModalStyle;
